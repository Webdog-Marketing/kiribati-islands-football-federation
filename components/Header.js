'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Kiribati national football team home">
          <img src="/logos/kiribati-crest.svg" alt="" width="40" height="56" />
          <span className="brand-text">
            <span className="brand-name">Kiribati</span>
            <span className="brand-sub">Te Eitei</span>
          </span>
        </Link>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop" className="btn btn-red nav-shop">Shop</Link>
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
