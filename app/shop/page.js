import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/shopify';
import { site } from '@/lib/site';

export const revalidate = 600;
export const metadata = { title: 'Shop', description: 'Official Kiribati national team jerseys by WOVN. Every purchase supports KIFF.' };

export default async function Shop() {
  const products = await getProducts();
  return (
    <>
      <PageHero title="Shop" intro="The 2027 Kiribati kit collection, made by WOVN. Every purchase helps fund football across our islands." />
      <section className="section">
        <div className="wrap">
          <div className="shop-grid">
            {products.map((p) => <ProductCard key={p.id} product={p} showBlurb />)}
          </div>
          <p className="muted" style={{ marginTop: 32 }}>
            Orders, sizing and delivery are handled by our kit partner WOVN.{' '}
            <a className="text-link" href={site.shopUrl} target="_blank" rel="noopener noreferrer">View the full collection</a>
          </p>
        </div>
      </section>
    </>
  );
}
