import { getBookAuth } from '../../../../lib/book-auth.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const allowed = new Set(['get-session','sign-in/email','sign-out','ok']);
async function handler(request) {
  const endpoint = new URL(request.url).pathname.replace('/api/book-auth/','');
  if (!allowed.has(endpoint)) return Response.json({error:'Not found'},{status:404});
  try { return await getBookAuth().handler(request); } catch { return Response.json({error:'Sign-in is temporarily unavailable.'},{status:503}); }
}
export { handler as GET, handler as POST };
