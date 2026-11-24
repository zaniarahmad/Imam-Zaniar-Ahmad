import { getMigrations } from 'better-auth/db/migration';
import { getBookAuth } from '../../../../../lib/book-auth.mjs';
import { db, adminEmails, equalSecret, migrateBookTables } from '../../../../../lib/book-store.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request) {
  try {
    const body = await request.json();
    if (!equalSecret(body.code,process.env.BOOK_SETUP_CODE)) return Response.json({error:'Invalid setup code.'},{status:401});
    const auth = getBookAuth();
    const {runMigrations}=await getMigrations(auth.options);
    await runMigrations(); await migrateBookTables();
    if (body.migrateOnly === true) return Response.json({ok:true});
    const email=String(body.email||'').trim().toLowerCase();
    if (!adminEmails().includes(email) || typeof body.password!=='string' || body.password.length<12 || body.password.length>128) return Response.json({error:'Use your approved email and a password of at least 12 characters.'},{status:400});
    const sql=db();
    const existing=await sql`SELECT id FROM "user" WHERE lower(email)=${email}`;
    if (existing.length) return Response.json({error:'Your account is already set up. Please sign in.'},{status:409});
    await auth.api.signUpEmail({body:{email,password:body.password,name:'Book administrator'}});
    return Response.json({ok:true});
  } catch {return Response.json({error:'Setup could not be completed. Please try again.'},{status:503});}
}
