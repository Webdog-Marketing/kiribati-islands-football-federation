// Pulls the Kiribati products straight from the WOVN Shopify store.
// Uses Shopify's public collection feed, so no API key is needed.
// Add or remove products from the "Kiribati Islands Football Federation"
// collection in Shopify and the site updates within ~10 minutes.
import { products as snapshot } from './content';

const STORE = 'https://shop.wovn.club';
const COLLECTION = 'kiribati-islands-football-federation';
const REVALIDATE = 600;

// "WOVN x Kiribati Islands Football 2027 Home Jersey" -> "2027 Home Jersey"
export const shortName = (title = '') =>
  title.replace(/^WOVN\s*x\s*Kiribati(\s+Islands)?(\s+Football)?\s*/i, '').trim() || title;

const sized = (src, width = 900) => (src ? `${src}${src.includes('?') ? '&' : '?'}width=${width}` : '');

const firstSentence = (html = '') => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
};

const money = (amount) => {
  const n = Number(amount);
  return Number.isFinite(n) ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n) : '';
};

export async function getProducts() {
  try {
    const res = await fetch(`${STORE}/collections/${COLLECTION}/products.json?limit=50`, {
      next: { revalidate: REVALIDATE, tags: ['shopify'] },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const { products = [] } = await res.json();
    if (!products.length) return snapshot;
    return products.map((p) => {
      const prices = (p.variants || []).map((v) => Number(v.price)).filter(Number.isFinite);
      const min = prices.length ? Math.min(...prices) : null;
      const max = prices.length ? Math.max(...prices) : null;
      return {
        id: String(p.id),
        name: shortName(p.title),
        fullName: p.title,
        price: min === null ? '' : `${min !== max ? 'From ' : ''}${money(min)}`,
        image: sized(p.images?.[0]?.src),
        imageAlt: p.images?.[0]?.alt || p.title,
        url: `${STORE}/products/${p.handle}`,
        blurb: firstSentence(p.body_html),
        soldOut: (p.variants || []).length > 0 && p.variants.every((v) => v.available === false),
      };
    });
  } catch (e) {
    console.error('Shopify products:', e.message);
    return snapshot;
  }
}
