import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata = { title: 'About', description: 'The Kiribati Islands Football Federation is the governing body of football across Kiribati\u2019s atolls, reefs and islands.' };

const pillars = [
  { title: 'Awareness', text: 'Growing global recognition for Kiribati football. Sharing our teams, our competitions and our island nation with fans around the world.' },
  { title: 'Revenue', text: 'Turning fans into supporters. Every jersey sold helps fund KIFF’s programmes, from grassroots development to our national teams.' },
  { title: 'FIFA membership', text: 'Every match played, every fan reached and every partnership formed brings us a step closer to full OFC and FIFA membership.' },
  { title: 'Football development', text: 'From inter-school championships to our national league, we’re building football at every level across Kiribati’s islands.' },
];

export default function About() {
  return (
    <>
      <PageHero
        title="An island nation with big footballing ambitions"
        intro="The Kiribati Islands Football Federation is the governing body of football across Kiribati’s 34 atolls, reefs and islands."
        image="/images/kiribati-aerial.jpg"
        imageAlt=""
      />

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="h2">Our story</h2>
          </div>
          <div>
            <p className="lede">We run national competitions for men, women and young players, operate our national teams, and are working toward full FIFA membership.</p>
            <p>Football is more than a game here. It&rsquo;s a source of national pride and a way of bringing island communities together, from Tarawa to the outer islands.</p>
            <p>Kiribati is home to more than 135,000 people spread across a vast stretch of the Pacific Ocean. Many of our players learn the game barefoot on sand, and our national team plays as Te Eitei.</p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 40 }}>What we focus on</h2>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>
            ))}
          </div>
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
