import { neon } from '@neondatabase/serverless';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const CONSENT_VERSION = 'book-updates-2026-11-23';
export const SOURCE_LABELS = { imam_zaniar: 'Imam Zaniar’s website', sheikh_alaa: 'Sheikh Alaa’s website' };
export function db() {
  if (!process.env.DATABASE_URL) throw new Error('Database connection is not configured');
  return neon(process.env.DATABASE_URL);
}
export function adminEmails() { return (process.env.BOOK_ADMIN_EMAILS || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean); }
export function equalSecret(actual, expected) {
  if (!actual || !expected) return false;
  const a = createHash('sha256').update(actual).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}
export function sourceForOrigin(origin) {
  if (['https://imamzaniarahmad.com', 'https://www.imamzaniarahmad.com'].includes(origin)) return 'imam_zaniar';
  if (['https://sheikhalaa.com', 'https://www.sheikhalaa.com'].includes(origin)) return 'sheikh_alaa';
  if (process.env.VERCEL_ENV === 'preview' && origin === `https://${process.env.VERCEL_URL}`) return 'imam_zaniar';
  if (process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin || '')) return 'imam_zaniar';
  return null;
}
export async function migrateBookTables() {
  const sql = db();
  await sql`CREATE TABLE IF NOT EXISTS book_subscribers (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, status text NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed','unsubscribed')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), consent_version text NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS book_signup_sources (subscriber_id uuid NOT NULL REFERENCES book_subscribers(id), source text NOT NULL CHECK (source IN ('imam_zaniar','sheikh_alaa')), first_signup timestamptz NOT NULL DEFAULT now(), last_signup timestamptz NOT NULL DEFAULT now(), consent_version text NOT NULL, PRIMARY KEY (subscriber_id,source))`;
  await sql`CREATE TABLE IF NOT EXISTS book_rate_limits (key text NOT NULL, bucket bigint NOT NULL, hits integer NOT NULL DEFAULT 1, PRIMARY KEY(key,bucket))`;
  await sql`CREATE INDEX IF NOT EXISTS book_subscribers_date ON book_subscribers (created_at DESC)`;
}
export async function limited(request, scope = 'signup', limit = 8) {
  if (!process.env.BOOK_SIGNING_SECRET) throw new Error('Signing key is not configured');
  const address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = createHmac('sha256', process.env.BOOK_SIGNING_SECRET).update(`${scope}:${address}`).digest('hex');
  const bucket = Math.floor(Date.now() / 600000);
  const sql = db();
  const rows = await sql`INSERT INTO book_rate_limits (key,bucket) VALUES (${key},${bucket}) ON CONFLICT(key,bucket) DO UPDATE SET hits=book_rate_limits.hits+1 RETURNING hits`;
  await sql`DELETE FROM book_rate_limits WHERE bucket < ${bucket - 144}`;
  return rows[0].hits > limit;
}
export async function subscribeEmail(email, source) {
  const sql = db();
  await sql`WITH subscriber AS (INSERT INTO book_subscribers(email,consent_version) VALUES (${email},${CONSENT_VERSION}) ON CONFLICT(email) DO UPDATE SET status='subscribed', updated_at=now(), consent_version=EXCLUDED.consent_version RETURNING id) INSERT INTO book_signup_sources(subscriber_id,source,consent_version) SELECT id,${source},${CONSENT_VERSION} FROM subscriber ON CONFLICT(subscriber_id,source) DO UPDATE SET last_signup=now(),consent_version=EXCLUDED.consent_version`;
}
export function unsubscribeToken(id) { return `${id}.${createHmac('sha256', process.env.BOOK_SIGNING_SECRET).update(`book-unsubscribe:${id}`).digest('base64url')}`; }
export function validUnsubscribeToken(token) { const id = token?.split('.')[0]; return /^[0-9a-f-]{36}$/i.test(id || '') && equalSecret(token, unsubscribeToken(id)) ? id : null; }
export function csvCell(value) { let s = String(value ?? ''); if (/^[=+@\-\t\r]/.test(s)) s = `'${s}`; return `"${s.replaceAll('"','""')}"`; }
