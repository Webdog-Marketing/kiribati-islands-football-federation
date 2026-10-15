// Renders simple text from Airtable: blank line = new paragraph,
// "## " = heading, "- " = bullet, **bold**, [link](https://...)
function inline(text) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) parts.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      parts.push(<a key={k++} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>);
    }
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Prose({ text = '' }) {
  const blocks = text.replace(/\r/g, '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        if (b.startsWith('## ')) return <h2 key={i}>{inline(b.slice(3))}</h2>;
        if (b.startsWith('### ')) return <h3 key={i}>{inline(b.slice(4))}</h3>;
        if (/^- /m.test(b) && b.split('\n').every((l) => l.startsWith('- ')))
          return <ul key={i}>{b.split('\n').map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        if (b.startsWith('> ')) return <blockquote key={i}><p>{inline(b.replace(/^> ?/gm, ''))}</p></blockquote>;
        return <p key={i}>{inline(b.replace(/\n/g, ' '))}</p>;
      })}
    </div>
  );
}
