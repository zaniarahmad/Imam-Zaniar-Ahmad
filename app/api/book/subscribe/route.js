import { sourceForOrigin, limited, subscribeEmail } from '../../../../lib/book-store.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function reply(request, value, status = 200) { const origin = request.headers.get('origin'); return Response.json(value, { status, headers: { 'Cache-Control': 'no-store', ...(sourceForOrigin(origin) ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {}) } }); }
export function OPTIONS(request) { const origin=request.headers.get('origin'); return new Response(null,{status:sourceForOrigin(origin)?204:403,headers:{...(sourceForOrigin(origin)?{'Access-Control-Allow-Origin':origin}:{}),'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'}}); }
export async function POST(request) {
  const source = sourceForOrigin(request.headers.get('origin'));
  if (!source) return reply(request,{error:'This signup must be submitted from an author’s website.'},403);
  if (!request.headers.get('content-type')?.includes('application/json') || Number(request.headers.get('content-length') || 0)>4096) return reply(request,{error:'Invalid signup request.'},400);
  try {
    const input = await request.json();
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    if (input.website || input.consent !== true || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(request,{error:'Please enter a valid email address.'},400);
    if (await limited(request)) return reply(request,{error:'Too many requests. Please try again in ten minutes.'},429);
    const clean = value => typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, '').slice(0, 120) : '';
    const attribution = { utm_source: clean(input.attribution?.utm_source), utm_medium: clean(input.attribution?.utm_medium), utm_campaign: clean(input.attribution?.utm_campaign) };
    try { attribution.referrer = input.attribution?.referrer ? new URL(input.attribution.referrer).hostname.slice(0, 120) : ''; } catch { attribution.referrer = ''; }
    await subscribeEmail(email,source,attribution);
    return reply(request,{ok:true});
  } catch { return reply(request,{error:'We couldn’t save your email. Please try again shortly.'},503); }
}
