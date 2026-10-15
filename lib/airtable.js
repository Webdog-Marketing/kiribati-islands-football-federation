// Reads content from Airtable. If AIRTABLE_TOKEN / AIRTABLE_BASE_ID aren't set,
// or Airtable can't be reached, the built-in content in lib/content.js is used.
import * as local from './content';

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;
const REVALIDATE = 600; // seconds: Airtable edits appear within ~10 minutes

async function fetchTable(table, params = '') {
  if (!TOKEN || !BASE) return null;
  const records = [];
  let offset = '';
  try {
    do {
      const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}?pageSize=100${params}${offset ? `&offset=${offset}` : ''}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: REVALIDATE, tags: ['airtable'] },
      });
      if (!res.ok) {
        console.error(`Airtable ${table}: ${res.status}`);
        return null;
      }
      const json = await res.json();
      records.push(...json.records);
      offset = json.offset || '';
    } while (offset);
    return records;
  } catch (e) {
    console.error(`Airtable ${table}:`, e.message);
    return null;
  }
}

// "Image URL" (text) wins over an attachment, because Airtable attachment links expire.
function img(f, urlField = 'Image URL', fileField = 'Image') {
  if (f[urlField]) return f[urlField];
  const a = f[fileField];
  if (Array.isArray(a) && a[0]) return a[0].thumbnails?.full?.url || a[0].url;
  return '';
}

const slugify = (s = '') =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Tick the "Hidden" checkbox in Airtable to take a row off the site without deleting it.
const published = (f) => f.Hidden !== true;

export async function getNews() {
  const rows = await fetchTable('News');
  if (!rows) return local.news;
  return rows
    .map((r) => r.fields)
    .filter((f) => f.Title && published(f))
    .map((f) => ({
      slug: f.Slug || slugify(f.Title),
      title: f.Title,
      date: f.Date || '',
      category: f.Category || 'News',
      image: img(f),
      imageAlt: f['Image Alt'] || f.Title,
      excerpt: f.Excerpt || '',
      body: f.Body || '',
      featured: !!f.Featured,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug) {
  const all = await getNews();
  return all.find((a) => a.slug === slug) || null;
}

export async function getFixtures() {
  const rows = await fetchTable('Fixtures');
  if (!rows) return local.fixtures;
  return rows
    .map((r) => ({ id: r.id, ...r.fields }))
    .filter((f) => f.Home && f.Away && f.Date)
    .map((f) => ({
      id: f.id,
      date: f.Date,
      time: f['Kick-off'] || '',
      competition: f.Competition || '',
      round: f.Round || '',
      home: f.Home,
      away: f.Away,
      homeScore: f['Home Score'] ?? null,
      awayScore: f['Away Score'] ?? null,
      venue: f.Venue || '',
      report: f['Report Link'] || '',
    }));
}

export async function getPlayers() {
  const rows = await fetchTable('Players');
  if (!rows) return { players: local.players, staff: local.staff };
  const all = rows
    .map((r) => ({ id: r.id, ...r.fields }))
    .filter((f) => f.Name && published(f))
    .map((f) => ({
      id: f.id,
      name: f.Name,
      number: f.Number ?? null,
      position: f.Position || '',
      club: f.Club || '',
      island: f.Island || '',
      caps: f.Caps ?? null,
      goals: f.Goals ?? null,
      role: f.Role || '',
      image: img(f, 'Photo URL', 'Photo'),
    }));
  return {
    players: all.filter((p) => !p.role).sort((a, b) => (a.number ?? 99) - (b.number ?? 99)),
    staff: all.filter((p) => p.role),
  };
}

export async function getProducts() {
  const rows = await fetchTable('Products');
  if (!rows) return local.products;
  return rows
    .map((r) => ({ id: r.id, ...r.fields }))
    .filter((f) => f.Name && published(f))
    .sort((a, b) => (a.Order ?? 99) - (b.Order ?? 99))
    .map((f) => ({ id: f.id, name: f.Name, price: f.Price || '', image: img(f), url: f['Shop Link'] || '' }));
}

export async function getPartners() {
  const rows = await fetchTable('Partners');
  if (!rows) return local.partners;
  return rows
    .map((r) => ({ id: r.id, ...r.fields }))
    .filter((f) => f.Name && published(f))
    .sort((a, b) => (a.Order ?? 99) - (b.Order ?? 99))
    .map((f) => ({ name: f.Name, url: f.Website || '', logo: img(f, 'Logo URL', 'Logo') }));
}

export const { honours, milestones } = local;
