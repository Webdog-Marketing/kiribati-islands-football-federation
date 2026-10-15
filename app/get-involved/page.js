import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Partners from '@/components/Partners';
import { getPartners } from '@/lib/airtable';

export const revalidate = 600;
export const metadata = { title: 'Get involved', description: 'Partner with the Kiribati Islands Football Federation, volunteer, or help us find I-Kiribati players around the world.' };

const ways = [
  { id: 'partner', title: 'Become a partner', text: 'Put your brand alongside the Kiribati national team. We tailor partnerships around kit, travel, coaching and community programmes.', topic: 'Sponsorship / Partnership' },
  { id: 'volunteer', title: 'Volunteer', text: 'Coaches, referees, media, design and admin skills are all useful, whether you are in Kiribati or helping remotely.', topic: 'Volunteering' },
  { id: 'kit', title: 'Donate kit', text: 'Boots, balls, bibs and goalkeeper gloves go a long way on islands where equipment is hard to come by.', topic: 'General Enquiry' },
  { id: 'players', title: 'Diaspora players', text: 'Playing abroad with family ties to Kiribati? Tell us about yourself so our coaches can follow your progress.', topic: 'Joining the KIFF community' },
];

export default async function GetInvolved() {
  const partners = await getPartners();
  return (
    <>
      <PageHero title="Get involved" intro="Kiribati football runs on goodwill. Here’s how you can help." image="/images/te-eitei-celebration.jpg" />
      <section className="section">
        <div className="wrap pillars">
          {ways.map((w) => (
            <div key={w.id} id={w.id}>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <Link className="text-link" href={`/contact?topic=${encodeURIComponent(w.topic)}`}>Get in touch about this</Link>
            </div>
          ))}
        </div>
      </section>
      {partners.length ? (
        <section className="section section--mist">
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 32 }}>Our partners</h2>
            <Partners partners={partners} />
          </div>
        </section>
      ) : null}
    </>
  );
}
