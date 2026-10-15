import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Squad from '@/components/Squad';
import FixtureRow from '@/components/FixtureRow';
import { getSquad, getFixtures, honours } from '@/lib/airtable';
import { teams, teamBySlug } from '@/lib/teams';
import { isPlayed } from '@/lib/format';

export const revalidate = 600;
export const dynamicParams = false;
export const generateStaticParams = () => teams.map((t) => ({ slug: t.slug }));

export function generateMetadata({ params }) {
  const t = teamBySlug(params.slug);
  return t ? { title: t.nickname || t.name, description: `${t.name}: squad, fixtures, results and honours.` } : {};
}

export default async function TeamPage({ params }) {
  const t = teamBySlug(params.slug);
  if (!t) notFound();
  const [{ players, staff }, fixtures] = await Promise.all([getSquad(t.slug), getFixtures({ team: t.slug })]);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = fixtures.filter((f) => !isPlayed(f) && f.date >= today).sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  const results = fixtures.filter(isPlayed).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (b.time || '').localeCompare(a.time || '')));
  const teamHonours = honours.filter((h) => h.team === t.slug);
  const hasContent = players.length || fixtures.length || teamHonours.length;

  return (
    <>
      <PageHero
        title={t.nickname || t.name}
        intro={t.nickname ? `${t.name}. ${t.intro}` : t.intro}
        image={t.image || undefined}
        position={t.position}
      />

      <nav className="team-tabs wrap" aria-label="National teams">
        {teams.map((x) => (
          <Link key={x.slug} href={`/teams/${x.slug}`} aria-current={x.slug === t.slug ? 'page' : undefined}>{x.short}</Link>
        ))}
      </nav>

      {!hasContent ? (
        <section className="section">
          <div className="wrap two-col">
            <div>
              <h2 className="h2">Coming soon</h2>
            </div>
            <div>
              <p className="lede">Squad lists, fixtures and results for the {t.name.toLowerCase()} will appear here as soon as they&rsquo;re announced.</p>
              <p>Interested in playing, coaching or supporting this team?</p>
              <Link href="/contact?topic=Joining%20the%20KIFF%20community" className="btn btn-red">Get in touch</Link>
            </div>
          </div>
        </section>
      ) : null}

      {players.length || staff.length ? (
        <section className="section">
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 32 }}>Squad</h2>
            <Squad players={players} />
            {staff.length ? (
              <div className="squad-group staff-group">
                <h3 className="squad-h">Staff</h3>
                <ul className="staff">
                  {staff.map((s) => (<li key={s.name}><strong>{s.name}</strong><span>{s.role}</span></li>))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {fixtures.length ? (
        <section className="section section--mist">
          <div className="wrap">
            {upcoming.length ? (
              <div className="fixture-group">
                <h2>Upcoming</h2>
                <ul className="fixtures">{upcoming.map((f) => <FixtureRow key={f.id} f={f} />)}</ul>
              </div>
            ) : null}
            {results.length ? (
              <div className="fixture-group">
                <h2>Results</h2>
                <ul className="fixtures">{results.map((f) => <FixtureRow key={f.id} f={f} />)}</ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {teamHonours.length ? (
        <section className="section section--navy">
          <div className="wrap two-col">
            <h2 className="h2">Honours</h2>
            <ul className="honours">
              {teamHonours.map((h) => (
                <li key={h.year + h.title}>
                  <span className="year">{h.year}</span>
                  <div><h3>{h.title}</h3><p>{h.detail}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap support">
          <h2>Are you eligible to play for Kiribati?</h2>
          <div>
            <p className="lede">We want to hear from I-Kiribati players anywhere in the world, including those with family ties to Kiribati.</p>
            <Link href="/contact?topic=Joining%20the%20KIFF%20community" className="btn btn-red">Contact the federation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
