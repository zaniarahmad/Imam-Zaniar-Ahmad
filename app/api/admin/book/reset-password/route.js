import { createHash } from 'node:crypto';
import { hashPassword } from 'better-auth/crypto';
import { adminEmails, db, equalSecret, limited } from '../../../../../lib/book-store.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const reply = (body, status) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  const origin = process.env.BETTER_AUTH_URL;
  if (!origin || request.headers.get('origin') !== origin) return reply({ error: 'Invalid request origin.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json') || Number(request.headers.get('content-length') || 0) > 4096) return reply({ error: 'Invalid request.' }, 400);
  try {
    if (await limited(request, 'admin-password-reset', 5)) return reply({ error: 'Please try again in ten minutes.' }, 429);
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const expiry = Date.parse(process.env.BOOK_RESET_EXPIRES_AT || '');
    if (!Number.isFinite(expiry) || Date.now() >= expiry || !equalSecret(body.code, process.env.BOOK_RESET_CODE) || !adminEmails().includes(email)) return reply({ error: 'The reset code is invalid or expired.' }, 401);
    if (typeof body.password !== 'string' || body.password.length < 12 || body.password.length > 128) return reply({ error: 'Choose a password between 12 and 128 characters.' }, 400);
    const sql = db();
    await sql`CREATE TABLE IF NOT EXISTS book_admin_reset_uses (token_hash text PRIMARY KEY, used_at timestamptz NOT NULL DEFAULT now())`;
    const tokenHash = createHash('sha256').update(body.code).digest('hex');
    const passwordHash = await hashPassword(body.password);
    // Claiming the token, changing the hash and revoking sessions are one atomic statement.
    const result = await sql`WITH claimed AS (
      INSERT INTO book_admin_reset_uses (token_hash)
      SELECT ${tokenHash} WHERE EXISTS (SELECT 1 FROM "account" a JOIN "user" u ON u.id=a."userId" WHERE lower(u.email)=${email} AND a."providerId"='credential')
      ON CONFLICT DO NOTHING RETURNING token_hash
    ), changed AS (
      UPDATE "account" SET password=${passwordHash}, "updatedAt"=now()
      WHERE "providerId"='credential' AND "userId" IN (SELECT id FROM "user" WHERE lower(email)=${email})
      AND EXISTS (SELECT 1 FROM claimed) RETURNING "userId"
    ), revoked AS (
      DELETE FROM "session" WHERE "userId" IN (SELECT "userId" FROM changed) RETURNING id
    ) SELECT count(*)::int AS changed FROM changed`;
    if (!result[0]?.changed) return reply({ error: 'This reset code has already been used or the account is unavailable.' }, 409);
    return reply({ ok: true }, 200);
  } catch { return reply({ error: 'The password could not be reset. Please try again.' }, 503); }
}
