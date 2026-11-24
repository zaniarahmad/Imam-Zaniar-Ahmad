import { getBookAuth } from '../../../../lib/book-auth.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const allowed = new Set(['get-session','sign-in/email','sign-out','ok']);
async function handler(request) {
  const endpoint = new URL(request.url).pathname.replace('/api/book-auth/','');
  if (!allowed.has(endpoint)) return Response.json({error:'Not found'},{status:404});
  try { return await getBookAuth().handler(request); } catch (error) { console.error('Book authentication unavailable', {name:error.name,configured:!!process.env.BETTER_AUTH_SECRET,databaseConfigured:!!process.env.DATABASE_URL}); return Response.json({error:'Sign-in is temporarily unavailable.'},{status:503}); }
}
export { handler as GET, handler as POST };
