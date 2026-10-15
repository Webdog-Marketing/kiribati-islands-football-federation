export default function Squad({ players }) {
  const keepers = players.filter((p) => p.position === 'Goalkeeper');
  const groups = [
    ['Goalkeepers', keepers],
    ['Defenders', players.filter((p) => p.position === 'Defender')],
    ['Midfielders', players.filter((p) => p.position === 'Midfielder')],
    ['Forwards', players.filter((p) => p.position === 'Forward')],
  ];
  const known = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
  const rest = players.filter((p) => !known.includes(p.position));
  const hasPositions = groups.some(([, l]) => l.length);
  if (rest.length) groups.push([hasPositions ? 'Outfield players' : 'Squad', rest]);
  const shown = groups.filter(([, l]) => l.length);
  return shown
    .map(([label, list]) => (
      <div className="squad-group" key={label}>
        {shown.length > 1 ? <h3 className="squad-h">{label}</h3> : null}
        <ul className="squad">
          {list.map((p) => (
            <li className="player" key={p.id || p.name}>
              {p.image ? (
                <div className="player-photo"><img src={p.image} alt={p.name} loading="lazy" /></div>
              ) : null}
              <div className="player-line">
                {p.number != null ? <span className="num-inline">{p.number}</span> : null}
                <div>
                  <h4>{p.name}</h4>
                  {p.club ? <p>{p.club}</p> : null}
                  {p.note ? <p className="player-note">{p.note}</p> : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ));
}
