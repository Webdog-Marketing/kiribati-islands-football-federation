export default function BoardMember({ m }) {
  const initials = m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
  return (
    <li className="board-member">
      <div className="board-photo">
        {m.image ? <img src={m.image} alt={m.name} loading="lazy" /> : <span aria-hidden="true">{initials}</span>}
      </div>
      <p className="board-role">{m.role}</p>
      <h3>{m.name}</h3>
      {m.bio ? <p className="board-bio">{m.bio}</p> : null}
    </li>
  );
}
