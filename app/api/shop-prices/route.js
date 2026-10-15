// Returns Kiribati jersey prices in the visitor's local currency, using
// Shopify Markets (UK, EU, US & Canada, Australia). Other countries get GBP.
// Works without a token; add SHOPIFY_STOREFRONT_TOKEN for higher rate limits.
export const dynamic = 'force-dynamic';

const ENDPOINT = 'https://shop.wovn.club/api/2026-04/graphql.json';
const COLLECTION = 'kiribati-islands-football-federation';

const QUERY = `query Prices($country: CountryCode, $handle: String!) @inContext(country: $country) {
  collection(handle: $handle) {
    products(first: 50) {
      nodes {
        handle
        priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
      }
    }
  }
}`;

export async function GET(req) {
  const country = (req.headers.get('x-vercel-ip-country') || 'GB').toUpperCase();
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.SHOPIFY_STOREFRONT_TOKEN) headers['X-Shopify-Storefront-Access-Token'] = process.env.SHOPIFY_STOREFRONT_TOKEN;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: QUERY, variables: { country, handle: COLLECTION } }),
      next: { revalidate: 900 },
    });
    const json = await res.json();
    const nodes = json?.data?.collection?.products?.nodes;
    if (!res.ok || !nodes) throw new Error(JSON.stringify(json?.errors || res.status));
    const prices = Object.fromEntries(
      nodes.map((n) => [n.handle, { min: n.priceRange.minVariantPrice.amount, max: n.priceRange.maxVariantPrice.amount, currency: n.priceRange.minVariantPrice.currencyCode }])
    );
    return Response.json({ country, prices }, { headers: { 'Cache-Control': 'private, max-age=900' } });
  } catch (e) {
    console.error('Shop prices:', e.message);
    return Response.json({ country, prices: {} }, { status: 200 });
  }
}
