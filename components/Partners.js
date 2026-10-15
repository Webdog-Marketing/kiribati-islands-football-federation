export default function Partners({ partners }) {
  return (
    <ul className="partner-grid">
      {partners.map((p) => (
        <li key={p.name}>
          <a className="partner-card" href={p.url || '#'} target="_blank" rel="noopener noreferrer">
            <span className="partner-logo">
              {p.logo ? <img src={p.logo} alt="" /> : null}
              <span className="partner-name">{p.name}</span>
            </span>
            {p.role ? <span className="partner-role">{p.role}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
