import PageHero from '@/components/PageHero';
import FixtureRow from '@/components/FixtureRow';
import { getFixtures } from '@/lib/airtable';
import { teams } from '@/lib/teams';
import { isPlayed } from '@/lib/format';

export const revalidate = 600;
export const metadata = { title: 'Fixtures & results', description: 'Upcoming matches and results for Kiribati\u2019s national teams.' };

const label = (slug) => teams.find((t) => t.slug === slug)?.short || '';

export default async function FixturesPage() {
  const all = await getFixtures({ nationalOnly: true });
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((f) => !isPlayed(f) && f.date >= today).sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  const results = all.filter(isPlayed).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (b.time || '').localeCompare(a.time || '')));
  return (
    <>
      <PageHero title="Fixtures & results" intro="Every match for Kiribati’s national teams. Kick-off times are local to the venue." image="/images/te-eitei-match-action.jpg" />
      <section className="section">
        <div className="wrap">
          <div className="fixture-group">
            <h2>Upcoming</h2>
            {upcoming.length ? (
              <ul className="fixtures">{upcoming.map((f) => <FixtureRow key={f.id} f={f} teamLabel={label(f.team)} />)}</ul>
            ) : (
              <p className="empty">No fixtures announced yet. New matches appear here as soon as they&rsquo;re confirmed.</p>
            )}
          </div>
          <div className="fixture-group">
            <h2>Results</h2>
            {results.length ? <ul className="fixtures">{results.map((f) => <FixtureRow key={f.id} f={f} teamLabel={label(f.team)} />)}</ul> : <p className="empty">No results yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
