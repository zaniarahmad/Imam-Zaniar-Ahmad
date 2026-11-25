'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
export default function BookSignup() {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');
  async function subscribe(event) {
    event.preventDefault();
    if (state === 'saving' || state === 'success') return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setState('saving'); setMessage('');
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch('https://imam-zaniar-ahmad-eosin.vercel.app/api/book/subscribe', { method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fields.get('email'), consent: true, website: fields.get('website'), attribution: {utm_source:params.get('utm_source') || '',utm_medium:params.get('utm_medium') || '',utm_campaign:params.get('utm_campaign') || '',referrer:document.referrer} }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Please try again in a moment.');
      setState('success'); setMessage('You’re on the list. We’ll keep you updated about the book.'); form.reset();
      window.dataLayer?.push({ event: 'book_waitlist_signup', signup_source: 'imam_zaniar', book: 'happily_ever_after' });
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'We couldn’t save your email. Please try again.'); }
  }
  return <form className={styles.signupForm} onSubmit={subscribe} aria-label="Book launch updates">
    <label htmlFor="book-email">Be the first to know when it&apos;s available.</label>
    <div className={styles.emailRow}><input id="book-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required maxLength={254} disabled={state === 'saving' || state === 'success'} data-clarity-mask="true" aria-describedby="book-signup-note book-signup-status" /><button type="submit" disabled={state === 'saving' || state === 'success'}>{state === 'saving' ? 'Saving…' : state === 'success' ? 'You’re on the list' : 'Keep me updated'}</button></div>
    <div className={styles.honeypot} aria-hidden="true"><label htmlFor="book-website">Leave this empty</label><input id="book-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className={styles.signupNote} id="book-signup-note">By selecting “Keep me updated”, you agree to receive book previews and launch updates from Sheikh Alaa Elsayed and Imam Zaniar Ahmad. Unsubscribe at any time. <Link href="/privacy">Privacy</Link></p><p className={styles.signupStatus} id="book-signup-status" role={state === 'error' ? 'alert' : 'status'}>{message}</p>
  </form>;
}
