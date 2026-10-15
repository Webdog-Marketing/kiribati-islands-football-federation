import Link from 'next/link';
import PageHero from '@/components/PageHero';
import BoardMember from '@/components/BoardMember';
import { getBoard, regionalAssociations } from '@/lib/airtable';

export const revalidate = 600;
export const metadata = {
  title: 'About',
  description: 'The Kiribati Islands Football Federation organises and grows football across Kiribati\u2019s islands. Meet the Executive Board.',
};

const stats = [
  { figure: '500', label: 'Registered players', text: 'Men, women and children playing football and futsal in KIFF-affiliated competitions.', tone: 'red' },
  { figure: '2030', label: 'Target', text: 'An OFC associate member since 2007. Next: full OFC membership, then FIFA.', tone: 'navy' },
  { figure: '1979', label: 'First international', text: 'Te Eitei played their first international fixture against Fiji on 30 August 1979.', tone: 'yellow' },
];

export default async function About() {
  const board = await getBoard();
  return (
    <>
      <PageHero
        title="About Kiribati Football"
        intro="The Kiribati Islands Football Federation is the governing body of football across Kiribati’s 34 atolls, reefs and islands."
        image="/images/kiff-executive-board.jpg"
        imageAlt=""
        position="50% 35%"
      />

      <section className="section">
        <div className="wrap">
          <figure className="pull-quote">
            <blockquote>
              <p>Football connects every island in our nation. Our ambition is simple: to see Kiribati recognised on the world football stage.</p>
            </blockquote>
            <figcaption>Tekeeua Kauongo, Chief Executive Officer</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap two-col">
          <div>
            <h2 className="h2">Our story</h2>
          </div>
          <div>
            <p className="lede">Founded to organise and grow football across Kiribati’s islands, KIFF oversees national competitions, youth development, and our men’s and women’s national teams.</p>
            <p>We’re an associate member of the Oceania Football Confederation, working toward full FIFA membership and building a football culture that reaches every atoll.</p>
          </div>
        </div>
        <div className="wrap">
          <ul className="stat-blocks">
            {stats.map((s) => (
              <li key={s.figure} className={`stat stat--${s.tone}`}>
                <span className="stat-figure">{s.figure}</span>
                <span className="stat-label">{s.label}</span>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="h2">Our mission</h2>
          </div>
          <div>
            <p className="lede">To grow the game at every level in Kiribati.</p>
            <p>From schools and grassroots clubs to our national teams, while building the partnerships, recognition and infrastructure needed to take Kiribati football onto the international stage.</p>
            <dl className="facts">
              <div><dt>First international</dt><dd>Fiji 24–0 Kiribati, 30 August 1979</dd></div>
              <div><dt>Honours</dt><dd>2026 FMF IDC Premier Division; 2024 Outrigger Challenge Cup (futsal)</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {board.length ? (
        <section className="section section--red" aria-labelledby="board">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2 id="board" className="h2">Executive Board</h2>
                <p>The people leading football in Kiribati.</p>
              </div>
            </div>
            <ul className="board">
              {board.map((m) => <BoardMember key={m.id || m.name} m={m} />)}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="regions">
        <div className="wrap two-col">
          <div>
            <h2 id="regions" className="h2">Regional football associations</h2>
            <p className="muted" style={{ marginTop: 16 }}>KIFF oversees football across all of the islands of Kiribati, working with these regional associations.</p>
          </div>
          <ol className="regions">
            {regionalAssociations.map((r) => <li key={r}>{r}</li>)}
          </ol>
        </div>
      </section>

      <section className="section section--navy">
        <div className="wrap crest-story">
          <img src="/logos/kiribati-crest.svg" alt="The Kiribati national football team crest" width="280" />
          <div>
            <h2 className="h2">The frigatebird crest</h2>
            <p className="lede" style={{ marginTop: 20 }}>Our crest takes its inspiration from the national emblem of Kiribati: a frigatebird flying over a rising sun.</p>
            <p style={{ color: 'rgba(255,255,255,.82)' }}>We drew the frigatebird as it really looks, black with the male&rsquo;s striking red throat pouch. The 17 rays of the sun stand for the 16 Gilbert Islands and Banaba, and the three pairs of waves for the three archipelagos of our nation.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap support">
          <h2>Work with us</h2>
          <div>
            <p className="lede">Sponsors, kit suppliers, coaches and volunteers all help us grow the game.</p>
            <div className="btn-row">
              <Link href="/get-involved" className="btn btn-red">Get involved</Link>
              <Link href="/contact" className="btn btn-navy">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
