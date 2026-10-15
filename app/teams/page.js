import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { teams } from '@/lib/teams';

export const metadata = { title: 'National teams', description: 'Kiribati\u2019s men\u2019s, women\u2019s, futsal and youth national teams.' };

export default function Teams() {
  return (
    <>
      <PageHero title="National teams" intro="Four teams carrying the frigatebird for Kiribati." image="/images/te-eitei-lineup.jpg" />
      <section className="section">
        <div className="wrap">
          <ul className="team-grid">
            {teams.map((t) => (
              <li key={t.slug}>
                <Link href={`/teams/${t.slug}`} className="team-card">
                  <div className="team-card-media">
                    {t.image ? <img src={t.image} alt="" loading="lazy" /> : <img className="crest" src="/logos/kiribati-crest.svg" alt="" />}
                  </div>
                  <div className="team-card-body">
                    {t.nickname ? <p className="team-nick">{t.nickname}</p> : null}
                    <h2>{t.name}</h2>
                    <p>{t.intro}</p>
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
