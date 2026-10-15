import { getNews, getCompetitions } from '@/lib/airtable';
import { teams } from '@/lib/teams';
import { site } from '@/lib/site';

export default async function sitemap() {
  const [news, comps] = await Promise.all([getNews(), getCompetitions()]);
  const pages = ['', '/news', '/teams', ...teams.map((t) => `/teams/${t.slug}`), '/competitions', ...comps.map((c) => `/competitions/${c.slug}`), '/fixtures', '/about', '/get-involved', '/shop', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })),
    ...news.map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date || undefined, priority: 0.6 })),
  ];
}
