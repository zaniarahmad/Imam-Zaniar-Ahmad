import { bookAdmin } from '../../../../../lib/book-auth.mjs';
import { db, SOURCE_LABELS, csvCell, unsubscribeToken } from '../../../../../lib/book-store.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    if (!await bookAdmin()) return Response.json({error:'Unauthorized'},{status:401});
    const sql=db();
    const rows=await sql`SELECT s.id,s.email,s.status,s.created_at,s.updated_at,s.consent_version,array_agg(o.source ORDER BY o.source) AS sources FROM book_subscribers s JOIN book_signup_sources o ON o.subscriber_id=s.id GROUP BY s.id ORDER BY s.created_at DESC LIMIT 10000`;
    if(new URL(request.url).searchParams.get('format')==='csv') {
      const csv=[['Email','Signed up through','Date','Status','Consent version','Unsubscribe URL'],...rows.map(r=>[r.email,r.sources.map(s=>SOURCE_LABELS[s]).join('; '),r.created_at,r.status,r.consent_version,`https://www.imamzaniarahmad.com/book-unsubscribe?token=${unsubscribeToken(r.id)}`])].map(r=>r.map(csvCell).join(',')).join('\r\n');
      return new Response('\uFEFF'+csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="book-subscribers.csv"','Cache-Control':'private, no-store'}});
    }
    return Response.json({rows,limit:10000},{headers:{'Cache-Control':'private, no-store'}});
  }catch{return Response.json({error:'The subscriber list is temporarily unavailable.'},{status:503});}
}
