import '@fontsource/oswald/500.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import './globals.css';
import FormaConnectorScript from "next/script";


export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Te Eitei`, template: `%s | Kiribati Football` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | Te Eitei`,
    description: site.description,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 628, alt: 'The Kiribati national team line up in Suva' }],
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image', site: '@kirifootball' },
};

export const viewport = { themeColor: '#000E30' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {site.gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
            </Script>
          </>
        ) : null}
      
<FormaConnectorScript id="forma-connector" data-forma-connector="1" src="https://formacms.app/visual-cms.js" strategy="afterInteractive" data-editor="https://formacms.app" data-content="/forma/content.json" data-live="https://formacms.app/api/content?site=crDXuulyjyhyVbuE7DqllJeZe-uhOTuJbGsZPS7BN1c" />
</body>
    </html>
  );
}
