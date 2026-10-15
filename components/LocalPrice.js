'use client';
// Shows the GBP price straight away, then swaps in the visitor's local
// currency once /api/shop-prices answers.
import { useEffect, useState } from 'react';

let request;
const load = () => (request ||= fetch('/api/shop-prices').then((r) => r.json()).catch(() => ({ prices: {} })));

const fmt = (amount, currency) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Number(amount));
  } catch {
    return `${amount} ${currency}`;
  }
};

export default function LocalPrice({ handle, fallback }) {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    let live = true;
    load().then(({ prices }) => {
      const p = prices?.[handle];
      if (!live || !p) return;
      setText(`${p.min !== p.max ? 'From ' : ''}${fmt(p.min, p.currency)}`);
    });
    return () => { live = false; };
  }, [handle]);
  return <span className="price">{text}</span>;
}
