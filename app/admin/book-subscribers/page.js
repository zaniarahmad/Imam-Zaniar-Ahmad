import SubscriberDashboard from './subscriber-dashboard';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
export const metadata={title:'Private book subscriber dashboard',robots:{index:false,follow:false}};
export default function Page(){
 if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') redirect('https://imam-zaniar-ahmad-eosin.vercel.app/admin/book-subscribers');
 return <div className="page-shell" data-clarity-mask="true"><SubscriberDashboard /></div>;
}
