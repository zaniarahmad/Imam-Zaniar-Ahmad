'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../subscriber-dashboard.module.css';

export default function ResetPassword() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (fields.get('password') !== fields.get('confirm')) { setMessage('The passwords do not match.'); return; }
    setStatus('saving'); setMessage('');
    try {
      const response = await fetch('/api/admin/book/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fields.get('email'), code: fields.get('code'), password: fields.get('password') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset(); setStatus('success'); setMessage('Your password has been changed. Sign in with your new password.');
    } catch (error) { setStatus('idle'); setMessage(error.message || 'Unable to connect. Please try again.'); }
  }
  return <section className={styles.shell}>
    <h1>Reset dashboard password</h1><p>This changes only your book subscriber dashboard password, not your Google password.</p>
    {status !== 'success' && <form className={styles.login} onSubmit={submit}>
      <label>Email address<input name="email" type="email" autoComplete="username" defaultValue="zan@hcoinnovation.com" required /></label>
      <label>One-time reset code<input name="code" type="password" autoComplete="off" required /></label>
      <label>New password<input name="password" type="password" minLength={12} maxLength={128} autoComplete="new-password" required /></label>
      <label>Confirm new password<input name="confirm" type="password" minLength={12} maxLength={128} autoComplete="new-password" required /></label>
      <button className="button button--primary" type="submit" disabled={status === 'saving'}>{status === 'saving' ? 'Saving…' : 'Change my password'}</button>
    </form>}
    <p role="status">{message}</p><Link href="/admin/book-subscribers">Back to sign in</Link>
  </section>;
}
