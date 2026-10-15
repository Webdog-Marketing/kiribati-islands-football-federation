// Sends contact form messages to marketing@kiri.football through the Zoho mailbox.
// Needs ZOHO_SMTP_USER and ZOHO_SMTP_PASSWORD in Vercel (see README).
import nodemailer from 'nodemailer';
import { TOPICS } from '@/lib/contact-topics';

export const runtime = 'nodejs';

const TO = process.env.CONTACT_TO || 'marketing@kiri.football';
const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Spam trap: real people never fill in the hidden "website" field.
  if (data.website) return Response.json({ ok: true });

  const firstName = clean(data.firstName, 80);
  const lastName = clean(data.lastName, 80);
  const email = clean(data.email, 200);
  const topic = TOPICS.includes(data.topic) ? data.topic : 'General Enquiry';
  const message = clean(data.message, 5000);

  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'Please fill in your name and a valid email address.' }, { status: 400 });
  }

  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  if (!user || !pass) {
    console.error('Contact form: ZOHO_SMTP_USER / ZOHO_SMTP_PASSWORD not set');
    return Response.json({ ok: false, error: `The form isn't set up yet. Please email ${TO} directly.` }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const name = `${firstName} ${lastName}`;
  const text = `New message from kiri.football\n\nName: ${name}\nEmail: ${email}\nInterested in: ${topic}\n\n${message || '(no message)'}`;
  const html = `<p><strong>New message from kiri.football</strong></p>
<table cellpadding="4">
<tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
<tr><td><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
<tr><td><strong>Interested in</strong></td><td>${esc(topic)}</td></tr>
</table>
<p>${esc(message || '(no message)').replace(/\n/g, '<br>')}</p>`;

  try {
    await transporter.sendMail({
      from: `"kiri.football website" <${user}>`,
      to: TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `[Website] ${topic}: ${name}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact form send failed:', e.message);
    return Response.json({ ok: false, error: `Sorry, your message couldn't be sent. Please email ${TO} directly.` }, { status: 502 });
  }
}
