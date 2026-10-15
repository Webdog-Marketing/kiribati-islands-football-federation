import PageHero from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata = { title: 'Contact', description: 'Get in touch with the Kiribati Islands Football Federation.' };

export default function Contact() {
  return (
    <>
      <PageHero title="Contact" intro="Questions about the national team, partnerships, media or playing for Kiribati." />
      <section className="section">
        <div className="wrap two-col">
          <div className="contact-card">
            <h2>Email</h2>
            <p><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></p>
            <h2 style={{ marginTop: 28 }}>Based in</h2>
            <p>{site.location}</p>
          </div>
          <div>
            <h2 className="h3" style={{ marginBottom: 14 }}>Follow Te Eitei</h2>
            <ul>
              {site.social.map((s) => (
                <li key={s.label} style={{ marginBottom: 10 }}>
                  <a className="text-link" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
