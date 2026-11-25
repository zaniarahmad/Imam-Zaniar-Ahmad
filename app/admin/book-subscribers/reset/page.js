import { redirect } from 'next/navigation';
import ResetPassword from './reset-password';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Reset dashboard password', robots: { index: false, follow: false } };
export default function Page() {
  if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') redirect('https://imam-zaniar-ahmad-eosin.vercel.app/admin/book-subscribers/reset');
  return <div className="page-shell" data-clarity-mask="true"><ResetPassword /></div>;
}
