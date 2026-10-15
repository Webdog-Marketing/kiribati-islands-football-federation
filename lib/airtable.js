// Reads content from Airtable. If AIRTABLE_TOKEN / AIRTABLE_BASE_ID aren't set,
// or a table is missing or empty, the built-in content in lib/content.js is used.
import * as local from './content';
import { NATIONAL_TEAMS } from './teams';

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;
const REVALIDATE = 600; // seconds: Airtable edits appear within ~10 minutes

async function fetchTable(table) {
  if (!TOKEN || !BASE) return null;
  const records = [];
  let offset = '';
  try {
    do {
      const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}?pageSize=100${offset ? `&offset=${offset}` : ''}`;
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
    return records.length ? records : null; // empty table = use built-in content
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
function imgs(f, urlField, fileField) {
  const fromText = (f[urlField] || '').split(/\s*\n\s*/).filter(Boolean);
  const fromFiles = (f[fileField] || []).map((a) => a.thumbnails?.large?.url || a.url);
  return [...fromText, ...fromFiles];
}
const list = (v) => (Array.isArray(v) ? v : (v || '').split(/\s*[,\n]\s*/)).filter(Boolean);

const slugify = (s = '') =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Tick the "Hidden" checkbox in Airtable to take a row off the site without deleting it.
const published = (f) => f.Hidden !== true;
const rowsOf = (records) => records.map((r) => ({ id: r.id, ...r.fields })).filter(published);

/* News */
export async function getNews() {
  const rows = await fetchTable('News');
  if (!rows) return local.news;
  return rowsOf(rows)
    .filter((f) => f.Title)
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
      author: f.Author || '',
      sourceName: f['Source Name'] || '',
      sourceUrl: f['Source URL'] || '',
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug) {
  const all = await getNews();
  return all.find((a) => a.slug === slug) || null;
}

/* Fixtures: "Team" is mens / womens / futsal / youth, or a competition slug */
export async function getFixtures({ team, nationalOnly } = {}) {
  const rows = await fetchTable('Fixtures');
  const all = !rows
    ? local.fixtures
    : rowsOf(rows)
        .filter((f) => f.Home && f.Away)
        .map((f) => ({
          id: f.id,
          team: f.Team || 'mens',
          date: f.Date || '',
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
  return all.filter((f) => (team ? f.team === team : nationalOnly ? NATIONAL_TEAMS.includes(f.team) : true));
}

/* Players and staff */
export async function getSquad(team) {
  const rows = await fetchTable('Players');
  let players, staff;
  if (!rows) {
    players = local.players;
    staff = local.staff;
  } else {
    const all = rowsOf(rows)
      .filter((f) => f.Name)
      .map((f) => ({
        id: f.id,
        team: f.Team || 'mens',
        name: f.Name,
        number: f.Number ?? null,
        position: f.Position || '',
        club: f.Club || '',
        note: f.Note || '',
        role: f.Role || '',
        image: img(f, 'Photo URL', 'Photo'),
      }));
    players = all.filter((p) => !p.role);
    staff = all.filter((p) => p.role);
  }
  return {
    players: players.filter((p) => p.team === team).sort((a, b) => (a.number ?? 99) - (b.number ?? 99) || a.name.localeCompare(b.name)),
    staff: staff.filter((s) => s.team === team),
  };
}

/* Competitions */
export async function getCompetitions() {
  const rows = await fetchTable('Competitions');
  if (!rows) return local.competitions;
  return rowsOf(rows)
    .filter((f) => f.Name)
    .sort((a, b) => (a.Order ?? 99) - (b.Order ?? 99))
    .map((f) => ({
      slug: f.Slug || slugify(f.Name),
      name: f.Name,
      category: f.Category || '',
      season: f.Season || '',
      image: img(f),
      logo: img(f, 'Logo URL', 'Logo'),
      summary: f.Summary || '',
      description: f.Description || '',
      teams: list(f.Teams),
      gallery: imgs(f, 'Gallery URLs', 'Gallery'),
    }));
}

export async function getCompetition(slug) {
  return (await getCompetitions()).find((c) => c.slug === slug) || null;
}

export async function getStandings(slug) {
  const rows = await fetchTable('Standings');
  const all = !rows
    ? local.standings
    : rowsOf(rows)
        .filter((f) => f.Team && f.Competition)
        .map((f) => ({
          competition: f.Competition,
          season: f.Season || '',
          stage: f.Stage || '',
          pos: f.Pos ?? null,
          team: f.Team,
          p: f.P ?? 0, w: f.W ?? 0, d: f.D ?? 0, l: f.L ?? 0, gf: f.GF ?? 0, ga: f.GA ?? 0, pts: f.Pts ?? 0,
        }));
  return all
    .filter((r) => r.competition === slug)
    .sort((a, b) => (a.pos ?? 99) - (b.pos ?? 99) || b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga));
}

/* Partners */
export async function getPartners() {
  const rows = await fetchTable('Partners');
  if (!rows) return local.partners;
  return rowsOf(rows)
    .filter((f) => f.Name)
    .sort((a, b) => (a.Order ?? 99) - (b.Order ?? 99))
    .map((f) => ({ name: f.Name, role: f.Role || '', url: f.Website || '', logo: img(f, 'Logo URL', 'Logo') }));
}

/* Executive Board */
export async function getBoard() {
  const rows = await fetchTable('Board');
  if (!rows) return local.board;
  return rowsOf(rows)
    .filter((f) => f.Name)
    .sort((a, b) => (a.Order ?? 99) - (b.Order ?? 99))
    .map((f) => ({ id: f.id, name: f.Name, role: f.Role || '', bio: f.Bio || '', image: img(f, 'Photo URL', 'Photo') }));
}

export const { honours, milestones, regionalAssociations } = local;
