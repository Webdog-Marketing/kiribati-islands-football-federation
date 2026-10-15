import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getCompetitions } from '@/lib/airtable';

export const revalidate = 600;
export const metadata = { title: 'Competitions', description: 'Football and futsal competitions overseen by the Kiribati Islands Football Federation.' };

export default async function Competitions() {
  const comps = await getCompetitions();
  return (
    <>
      <PageHero title="Competitions" intro="Football and futsal competitions overseen by the Kiribati Islands Football Federation." image="/images/competitions/kiff-pro-league.jpg" />
      <section className="section">
        <div className="wrap">
          <ul className="comp-grid">
            {comps.map((c) => (
              <li key={c.slug}>
                <Link href={`/competitions/${c.slug}`} className="comp-card">
                  <div className="comp-card-media">
                    {c.image ? <img src={c.image} alt="" loading="lazy" /> : <img className="crest" src="/logos/kiribati-crest.svg" alt="" />}
                  </div>
                  <div className="comp-card-body">
                    <p className="tag">{c.category}</p>
                    <h2>{c.name}</h2>
                    {c.summary ? <p>{c.summary}</p> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
