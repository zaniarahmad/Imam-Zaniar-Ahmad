import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { headers } from 'next/headers';
import { adminEmails } from './book-store.mjs';

let authInstance;
export function getBookAuth() {
  if (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET) throw new Error('Admin authentication is not configured');
  if (!authInstance) authInstance = betterAuth({
    appName: 'Happily Ever After subscriber dashboard',
    baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3212'),
    basePath: '/api/book-auth',
    secret: process.env.BETTER_AUTH_SECRET,
    database: new Pool({ connectionString: process.env.DATABASE_URL, max: 3 }),
    emailAndPassword: { enabled: true, minPasswordLength: 12 },
    rateLimit: { enabled: true, storage: 'database', window: 60, max: 12 },
    session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 30 },
    advanced: { cookiePrefix: 'book-admin' },
  });
  return authInstance;
}
export async function bookAdmin() {
  const session = await getBookAuth().api.getSession({ headers: headers() });
  return session && adminEmails().includes(session.user.email.toLowerCase()) ? session : null;
}
