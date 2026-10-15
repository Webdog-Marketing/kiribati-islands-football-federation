import { getNews } from '@/lib/airtable';
import { site } from '@/lib/site';

export default async function sitemap() {
  const news = await getNews();
  const pages = ['', '/news', '/te-eitei', '/fixtures', '/about', '/get-involved', '/shop', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })),
    ...news.map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date || undefined, priority: 0.6 })),
  ];
}
