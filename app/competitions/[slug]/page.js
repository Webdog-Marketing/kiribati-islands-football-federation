import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import FixtureRow from '@/components/FixtureRow';
import StandingsTable from '@/components/StandingsTable';
import { getCompetitions, getCompetition, getStandings, getFixtures } from '@/lib/airtable';
import { isPlayed } from '@/lib/format';

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCompetitions()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const c = await getCompetition(params.slug);
  return c ? { title: c.name, description: c.summary || `${c.name}: table, results, teams and gallery.` } : { title: 'Competition not found' };
}

export default async function CompetitionPage({ params }) {
  const c = await getCompetition(params.slug);
  if (!c) notFound();
  const [table, fixtures] = await Promise.all([getStandings(c.slug), getFixtures({ team: c.slug })]);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = fixtures.filter((f) => !isPlayed(f) && f.date >= today).sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  const results = fixtures.filter(isPlayed).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const teams = c.teams.length ? c.teams : [...new Set(table.map((r) => r.team))].sort();
  const stage = table[0]?.stage;

  return (
    <>
      <PageHero title={c.name} intro={[c.category, c.season].filter(Boolean).join(', ')} image={c.image || undefined} />

      <section className="section">
        <div className="wrap comp-intro">
          {c.logo ? <img className="comp-logo" src={c.logo} alt={`${c.name} logo`} /> : null}
          <div>{c.description ? <Prose text={c.description} /> : <p className="lede">{c.summary}</p>}</div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="table">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="table" className="h2">League table</h2>
              {stage || c.season ? <p className="muted">{[c.season, stage].filter(Boolean).join(', ')}</p> : null}
            </div>
          </div>
          {table.length ? <StandingsTable rows={table} /> : <p className="empty">The table will appear here once the season is under way.</p>}
        </div>
      </section>

      <section className="section" aria-labelledby="results">
        <div className="wrap">
          {upcoming.length ? (
            <div className="fixture-group">
              <h2>Upcoming</h2>
              <ul className="fixtures">{upcoming.map((f) => <FixtureRow key={f.id} f={f} />)}</ul>
            </div>
          ) : null}
          <div className="fixture-group">
            <h2 id="results">Results</h2>
            {results.length ? <ul className="fixtures">{results.map((f) => <FixtureRow key={f.id} f={f} />)}</ul> : <p className="empty">Results will appear here after each round.</p>}
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="teams">
        <div className="wrap two-col">
          <div>
            <h2 id="teams" className="h2">Teams</h2>
            {teams.length ? <p style={{ marginTop: 16, color: 'rgba(255,255,255,.8)' }}>{teams.length} teams</p> : null}
          </div>
          {teams.length ? (
            <ul className="team-list">{teams.map((t) => <li key={t}>{t}</li>)}</ul>
          ) : (
            <p className="lede">The list of teams will be published before the competition starts.</p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="gallery">
        <div className="wrap">
          <h2 id="gallery" className="h2" style={{ marginBottom: 28 }}>Gallery</h2>
          {c.gallery.length ? (
            <ul className="gallery">
              {c.gallery.map((src, i) => (
                <li key={src + i}>
                  <a href={src} target="_blank" rel="noopener noreferrer"><img src={src} alt={`${c.name} photo ${i + 1}`} loading="lazy" /></a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Photos from this competition are coming soon. Got some to share? <Link className="text-link" href="/contact?topic=Media%20%26%20Press">Send them to us</Link>.</p>
          )}
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap btn-row">
          <Link href="/competitions" className="btn btn-navy">All competitions</Link>
        </div>
      </section>
    </>
  );
}
