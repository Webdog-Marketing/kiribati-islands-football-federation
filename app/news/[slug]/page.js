import Link from 'next/link';
import { notFound } from 'next/navigation';
import Prose from '@/components/Prose';
import NewsCard from '@/components/NewsCard';
import { getArticle, getNews } from '@/lib/airtable';
import { formatDate } from '@/lib/format';
import { site } from '@/lib/site';

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  if (!a) return { title: 'Article not found' };
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, type: 'article', images: a.image ? [{ url: a.image }] : undefined },
    // Republished articles point search engines at the original
    alternates: a.sourceUrl ? { canonical: a.sourceUrl } : undefined,
  };
}

export default async function Article({ params }) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const more = (await getNews()).filter((n) => n.slug !== a.slug).slice(0, 3);
  const url = `${site.url}/news/${a.slug}`;

  return (
    <>
      <article>
        <header className="wrap article-head">
          <p className="meta">
            <Link href="/news" className="text-link">News</Link>
            <span className="tag">{a.category}</span>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
          <h1>{a.title}</h1>
          {a.excerpt ? <p className="lede">{a.excerpt}</p> : null}
          {a.sourceUrl ? (
            <p className="credit">
              {a.author ? <>By <strong>{a.author}</strong>. </> : null}
              Originally published by{' '}
              <a href={a.sourceUrl} target="_blank" rel="noopener">{a.sourceName || 'the original source'}</a>.
            </p>
          ) : a.author ? (
            <p className="credit">By <strong>{a.author}</strong></p>
          ) : null}
          {a.image ? (
            <figure className="article-figure">
              <img src={a.image} alt={a.imageAlt || ''} />
            </figure>
          ) : null}
        </header>
        <div className="wrap article-body">
          <Prose text={a.body} />
          {a.sourceUrl ? (
            <aside className="source-box">
              <p>Written by {a.author || 'the original author'} and first published by {a.sourceName || 'the original publisher'}. Shared here with their permission.</p>
              <a className="btn btn-navy" href={a.sourceUrl} target="_blank" rel="noopener">Read the original{a.sourceName ? ` on ${a.sourceName}` : ''}</a>
            </aside>
          ) : null}
          <div className="share">
            <strong>Share</strong>
            <a className="text-link" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="text-link" href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(a.title)}`} target="_blank" rel="noopener noreferrer">X</a>
            <a className="text-link" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-link" href={`https://wa.me/?text=${encodeURIComponent(`${a.title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </article>
      {more.length ? (
        <section className="section section--mist">
          <div className="wrap">
            <div className="section-head"><h2 className="h2">More news</h2><Link href="/news" className="text-link">All news</Link></div>
            <div className="news-grid">{more.map((p) => <NewsCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      ) : null}
    </>
  );
}
