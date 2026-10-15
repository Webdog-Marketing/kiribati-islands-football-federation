import PageHero from '@/components/PageHero';
import { getProducts } from '@/lib/airtable';
import { site } from '@/lib/site';

export const revalidate = 600;
export const metadata = { title: 'Shop', description: 'Official Kiribati national team jerseys and merchandise. Every purchase supports KIFF.' };

export default async function Shop() {
  const products = await getProducts();
  return (
    <>
      <PageHero title="Shop" intro="Official Kiribati national team kit. Every purchase helps fund football across our islands." />
      <section className="section">
        <div className="wrap">
          <div className="shop-grid">
            {products.map((p) => (
              <article key={p.id} className="product" style={{ border: '1px solid var(--line)' }}>
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
          <p className="muted" style={{ marginTop: 32 }}>Orders are handled by our kit partner WOVN.</p>
        </div>
      </section>
    </>
  );
}
