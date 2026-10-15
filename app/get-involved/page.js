import PageHero from '@/components/PageHero';
import { getPartners } from '@/lib/airtable';
import { site } from '@/lib/site';

export const revalidate = 600;
export const metadata = { title: 'Get involved', description: 'Partner with the Kiribati Islands Football Federation, volunteer, or help us find I-Kiribati players around the world.' };

const ways = [
  { id: 'partner', title: 'Become a partner', text: 'Put your brand alongside the Kiribati national team. We tailor partnerships around kit, travel, coaching and community programmes.', subject: 'Partnership enquiry' },
  { id: 'volunteer', title: 'Volunteer', text: 'Coaches, referees, media, design and admin skills are all useful, whether you are in Kiribati or helping remotely.', subject: 'Volunteering' },
  { id: 'kit', title: 'Donate kit', text: 'Boots, balls, bibs and goalkeeper gloves go a long way on islands where equipment is hard to come by.', subject: 'Kit donation' },
  { id: 'players', title: 'Diaspora players', text: 'Playing abroad with family ties to Kiribati? Tell us about yourself so our coaches can follow your progress.', subject: 'Player registration' },
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
              <a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent(w.subject)}`}>Email us about this</a>
            </div>
          ))}
        </div>
      </section>
      {partners.length ? (
        <section className="section section--mist">
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 32 }}>Our partners</h2>
            <div className="partners">
              {partners.map((p) => (
                <a key={p.name} className="partner" href={p.url || '#'} target="_blank" rel="noopener noreferrer">
                  {p.logo ? <img src={p.logo} alt={p.name} /> : p.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
