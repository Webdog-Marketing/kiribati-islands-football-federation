import Link from 'next/link';
import Waves from './Waves';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Waves />
      <div className="footer-body">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/logos/kiff-wordmark-white.svg" alt="Kiribati Islands Football Federation" width="263" height="64" />
            <p>Te Eitei, the Kiribati men&rsquo;s national team. Uniting the islands of Kiribati through football and working towards full OFC and FIFA membership.</p>
            <ul className="social">
              {site.social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-h">The team</h2>
            <ul>
              <li><Link href="/te-eitei">Squad</Link></li>
              <li><Link href="/fixtures">Fixtures &amp; results</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/shop">Shop</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-h">The federation</h2>
            <ul>
              <li><Link href="/about">About KIFF</Link></li>
              <li><Link href="/get-involved">Partner with us</Link></li>
              <li><Link href="/get-involved#volunteer">Volunteer</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-h">Get in touch</h2>
            <p><a href={`mailto:${site.email}`}>{site.email}</a><br />{site.location}</p>
          </div>
        </div>
        <div className="wrap footer-base">
          <p>&copy; {new Date().getFullYear()} {site.federation}</p>
          <p>Site by <a href="https://www.webdogsports.marketing" target="_blank" rel="noopener noreferrer">Webdog Sports Marketing</a></p>
        </div>
      </div>
    </footer>
  );
}
