import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata = { title: 'Contact', description: 'Get in touch with the Kiribati Islands Football Federation.' };

export default function Contact({ searchParams }) {
  const topic = typeof searchParams?.topic === 'string' ? searchParams.topic : '';
  return (
    <>
      <PageHero title="Contact us" intro="A member of the KIFF team will respond to you shortly." />
      <section className="section">
        <div className="wrap contact-layout">
          <ContactForm initialTopic={topic} />
          <aside className="contact-card">
            <h2>Email</h2>
            <p><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></p>
            <h2 style={{ marginTop: 28 }}>Based in</h2>
            <p>{site.location}</p>
            <h2 style={{ marginTop: 28 }}>Follow us</h2>
            <ul>
              {site.social.map((s) => (
                <li key={s.label} style={{ marginBottom: 6 }}>
                  <a className="text-link" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
