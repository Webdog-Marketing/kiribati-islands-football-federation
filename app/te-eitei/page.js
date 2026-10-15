import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getPlayers, honours } from '@/lib/airtable';

export const revalidate = 600;
export const metadata = { title: 'Te Eitei', description: 'The squad, staff and honours of Te Eitei, the Kiribati men\u2019s national football team.' };

const ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
const PLURAL = { Goalkeeper: 'Goalkeepers', Defender: 'Defenders', Midfielder: 'Midfielders', Forward: 'Forwards' };

export default async function TeEitei() {
  const { players, staff } = await getPlayers();
  const groups = [...ORDER, ''].map((pos) => ({
    pos,
    list: players.filter((p) => (pos ? p.position === pos : !ORDER.includes(p.position))),
  })).filter((g) => g.list.length);

  return (
    <>
      <PageHero
        title="Te Eitei"
        intro="The Kiribati men’s national team. Raised on sandy pitches across the islands, champions in Suva in 2026."
        image="/images/te-eitei-celebration-wide.jpg"
        imageAlt=""
        position="50% 40%"
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 className="h2">The squad</h2>
              <p className="muted">The players who represented Kiribati in their most recent campaign.</p>
            </div>
          </div>
          {groups.length ? (
            groups.map((g) => (
              <div className="squad-group" key={g.pos || 'other'}>
                <h2>{PLURAL[g.pos] || 'Squad'}</h2>
                <ul className="squad">
                  {g.list.map((p) => (
                    <li className="player" key={p.id}>
                      <div className="player-photo">
                        {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <span className="num" aria-hidden="true">{p.number ?? ''}</span>}
                      </div>
                      {p.number != null ? <span className="num-inline">{p.number}</span> : null}
                      <h3>{p.name}</h3>
                      <p>{[p.club, p.island].filter(Boolean).join(', ')}</p>
                      {p.caps != null || p.goals != null ? (
                        <p>{p.caps != null ? `${p.caps} caps` : ''}{p.caps != null && p.goals != null ? ', ' : ''}{p.goals != null ? `${p.goals} goals` : ''}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="two-col">
              <img src="/images/te-eitei-lineup.jpg" alt="The Kiribati starting eleven in Suva, October 2026" loading="lazy" />
              <div>
                <p className="lede">Player profiles are on their way. In the meantime, here&rsquo;s the side that lined up in Suva on the way to the 2026 IDC Premier Division title.</p>
                <Link href="/news/te-eitei-crowned-idc-premier-division-champions" className="text-link">Read the final report</Link>
              </div>
            </div>
          )}

          {staff.length ? (
            <div className="squad-group staff-group">
              <h2>Staff</h2>
              <ul className="staff">
                {staff.map((s) => (
                  <li key={s.name}><strong>{s.name}</strong><span>{s.role}</span></li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section--navy">
        <div className="wrap two-col">
          <div>
            <h2 className="h2">Honours</h2>
            <p style={{ marginTop: 16, color: 'rgba(255,255,255,.8)' }}>Te Eitei is the name the men&rsquo;s team plays under. Kiribati&rsquo;s first recorded senior international came against Fiji at the 1979 South Pacific Games.</p>
          </div>
          <ul className="honours">
            {honours.map((h) => (
              <li key={h.year + h.title}>
                <span className="year">{h.year}</span>
                <div><h3>{h.title}</h3><p>{h.detail}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap support">
          <h2>Are you eligible to play for Kiribati?</h2>
          <div>
            <p className="lede">We want to hear from I-Kiribati players anywhere in the world, including those with family ties to Kiribati.</p>
            <Link href="/contact" className="btn btn-red">Contact the federation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
