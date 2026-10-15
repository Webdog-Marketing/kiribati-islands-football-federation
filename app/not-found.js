import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" intro="This page may have moved when the site was rebuilt." />
      <section className="section"><div className="wrap btn-row">
        <Link href="/" className="btn btn-red">Go to the homepage</Link>
        <Link href="/news" className="btn btn-navy">Read the latest news</Link>
      </div></section>
    </>
  );
}
