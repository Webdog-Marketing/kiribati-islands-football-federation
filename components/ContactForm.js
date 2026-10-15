'use client';
import { useState } from 'react';
import { TOPICS } from '@/lib/contact-topics';

export default function ContactForm({ initialTopic = '' }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <h2>Thank you</h2>
        <p>Your message is on its way. A member of the KIFF team will respond to you shortly.</p>
        <button type="button" className="btn btn-navy" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="firstName">First name <span aria-hidden="true">*</span></label>
        <input id="firstName" name="firstName" autoComplete="given-name" required />
      </div>
      <div className="field">
        <label htmlFor="lastName">Last name <span aria-hidden="true">*</span></label>
        <input id="lastName" name="lastName" autoComplete="family-name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="topic">Interested in</label>
        <select id="topic" name="topic" defaultValue={TOPICS.includes(initialTopic) ? initialTopic : ''}>
          <option value="" disabled>Choose a topic</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field--full form-foot">
        <button type="submit" className="btn btn-red" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit'}
        </button>
        {status === 'error' ? <p className="form-error" role="alert">{error}</p> : null}
      </div>
    </form>
  );
}
