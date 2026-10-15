import PageHero from '@/components/PageHero';
import NewsCard from '@/components/NewsCard';
import { getNews } from '@/lib/airtable';

export const revalidate = 600;
export const metadata = { title: 'News', description: 'The latest from Te Eitei and the Kiribati Islands Football Federation.' };

export default async function NewsPage() {
  const news = await getNews();
  const [first, ...rest] = news;
  return (
    <>
      <PageHero title="News" intro="Match reports, squad news and updates from the Kiribati Islands Football Federation." />
      <section className="section">
        <div className="wrap">
          {first ? <div style={{ marginBottom: 64 }}><NewsCard post={first} size="lg" /></div> : <p className="empty">No news yet. Check back soon.</p>}
          <div className="news-grid">
            {rest.map((p) => <NewsCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
