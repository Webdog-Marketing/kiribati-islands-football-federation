import Link from 'next/link';
import Waves from '@/components/Waves';
import Sun from '@/components/Sun';
import NewsCard from '@/components/NewsCard';
import { getNews, getFixtures, getProducts, getPartners, milestones } from '@/lib/airtable';
import { formatDate, isPlayed, isKiribati } from '@/lib/format';
import { site } from '@/lib/site';

export const revalidate = 600;

export default async function Home() {
  const [news, fixtures, products, partners] = await Promise.all([getNews(), getFixtures(), getProducts(), getPartners()]);
  const featured = news.find((n) => n.featured) || news[0];
  const others = news.filter((n) => n !== featured).slice(0, 3);
  const today = new Date().toISOString().slice(0, 10);
  const results = fixtures.filter(isPlayed).sort((a, b) => (a.date < b.date ? 1 : -1));
  const upcoming = fixtures.filter((f) => !isPlayed(f) && f.date >= today).sort((a, b) => (a.date > b.date ? 1 : -1));
  const last = results[0];
  const next = upcoming[0];

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img src="/images/te-eitei-lineup.jpg" alt="The Kiribati national team line up before the IDC Premier Division final in Suva" />
        </div>
        <div className="wrap hero-inner">
          <p className="hero-badge"><Sun size={26} /> 2026 FMF IDC Premier Division champions</p>
          <h1 className="hero-title" aria-label="Te Eitei">
            <span>Te</span>
            <span>Eitei</span>
          </h1>
          <p className="hero-sub">The Kiribati men&rsquo;s national football team. Small nation, big heart, and now a trophy to show for it.</p>
          <div className="btn-row">
            {featured ? <Link href={`/news/${featured.slug}`} className="btn btn-red">Read the final report</Link> : null}
            <Link href="/te-eitei" className="btn btn-ghost">Meet the team</Link>
          </div>
        </div>
        <Waves />
      </section>

      {last ? (
        <section className="result-band" aria-labelledby="latest-result">
          <div className="wrap result-grid">
            <div>
              <h2 id="latest-result" className="result-label">Latest result</h2>
              <div className="scoreline">
                <span className={`team home ${isKiribati(last.home) ? 'is-us' : ''}`}>{last.home}</span>
                <span className="goals">{last.homeScore}<span className="dash">&ndash;</span>{last.awayScore}</span>
                <span className={`team away ${isKiribati(last.away) ? 'is-us' : ''}`}>{last.away}</span>
              </div>
              <p className="result-meta">
                {[last.competition, last.round].filter(Boolean).join(', ')}. {last.venue}, {formatDate(last.date)}
              </p>
            </div>
            <div className="result-aside">
              {next ? (
                <>
                  <h2>Next match</h2>
                  <p>{next.home} v {next.away}<br />{formatDate(next.date)}{next.time ? `, ${next.time}` : ''}<br />{next.venue}</p>
                </>
              ) : (
                <>
                  <h2>Next match</h2>
                  <p>Fixtures will be announced here. Follow the team for updates.</p>
                </>
              )}
              <Link href="/fixtures" className="text-link">All fixtures &amp; results</Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap mission-grid">
          <div>
            <p className="mission-quote">
              Our national team is more than just a team. It&rsquo;s a symbol of hope, inspiration and national pride for 135,000 people across the Pacific.
            </p>
            <p className="lede muted">We give I-Kiribati players at home and abroad the chance to play, coach and represent their nation, and we&rsquo;re working towards full OFC and FIFA membership.</p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href="/about" className="btn btn-navy">About the federation</Link>
            </div>
          </div>
          <div className="mission-media">
            <img src="/images/te-eitei-celebration.jpg" alt="Kiribati players celebrate together on the pitch" loading="lazy" />
            <span className="sun-stamp"><Sun size={56} /></span>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="latest-news">
        <div className="wrap">
          <div className="section-head">
            <h2 id="latest-news" className="h2">Latest news</h2>
            <Link href="/news" className="text-link">All news</Link>
          </div>
          <div className="news-layout">
            {featured ? <NewsCard post={featured} size="lg" /> : null}
            <div className="news-stack">
              {others.map((p) => <NewsCard key={p.slug} post={p} size="sm" />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="milestones">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="milestones" className="h2">The road so far</h2>
              <p>From our first recorded international to a first trophy abroad.</p>
            </div>
          </div>
          <ol className="timeline">
            {milestones.map((m) => (
              <li key={m.year}>
                <span className="year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
                {m.image ? <img src={m.image} alt="" loading="lazy" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="explore">
        <div className="wrap">
          <h2 id="explore" className="h2" style={{ marginBottom: 32 }}>Explore</h2>
          <nav className="key-links" aria-label="Key pages">
            <Link href="/te-eitei">
              <h3>The squad</h3>
              <p>Players, staff and honours of the men&rsquo;s national team.</p>
              <span className="go">View the squad</span>
            </Link>
            <Link href="/fixtures">
              <h3>Fixtures &amp; results</h3>
              <p>Every Te Eitei match, with reports from the big ones.</p>
              <span className="go">See fixtures</span>
            </Link>
            <Link href="/get-involved">
              <h3>Get involved</h3>
              <p>Partner with KIFF, volunteer your skills or help us find I-Kiribati players overseas.</p>
              <span className="go">Find out how</span>
            </Link>
          </nav>
        </div>
      </section>

      <section className="section section--red" aria-labelledby="shop">
        <div className="wrap shop-split">
          <div>
            <h2 id="shop" className="h2">Wear the frigatebird</h2>
            <p className="lede">Every shirt sold helps fund KIFF, from grassroots football to the national team.</p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/shop" className="btn btn-yellow">Visit the shop</Link>
            </div>
          </div>
          <div className="products">
            {products.slice(0, 2).map((p) => (
              <article key={p.id} className="product">
                <div className="product-media">
                  {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <img className="crest" src="/logos/kiribati-crest.svg" alt="" />}
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  {p.price ? <p className="price">{p.price}</p> : null}
                  <a href={p.url || site.shopUrl} className="btn btn-red" target="_blank" rel="noopener noreferrer">Buy now</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap support">
          <h2>Help us put Kiribati on the football map</h2>
          <div>
            <p className="lede">KIFF is building football across our islands with very little funding. Partnerships, kit, coaching and shirt sales all make a real difference.</p>
            <div className="btn-row">
              <Link href="/get-involved" className="btn btn-red">Get involved</Link>
              <Link href="/shop" className="btn btn-navy">Shop</Link>
            </div>
          </div>
        </div>
      </section>
      {partners.length ? (
        <section className="section" aria-labelledby="partners">
          <div className="wrap">
            <div className="section-head">
              <h2 id="partners" className="h2">Our partners</h2>
              <Link href="/get-involved" className="text-link">Become a partner</Link>
            </div>
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
