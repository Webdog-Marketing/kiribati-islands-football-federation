export default function StandingsTable({ rows, caption }) {
  return (
    <div className="table-scroll">
      <table className="standings">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            <th scope="col" className="c-pos">Pos</th>
            <th scope="col" className="c-team">Team</th>
            <th scope="col" title="Played">P</th>
            <th scope="col" title="Won">W</th>
            <th scope="col" title="Drawn">D</th>
            <th scope="col" title="Lost">L</th>
            <th scope="col" title="Goals for" className="c-hide">GF</th>
            <th scope="col" title="Goals against" className="c-hide">GA</th>
            <th scope="col" title="Goal difference">GD</th>
            <th scope="col" title="Points">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const gd = r.gf - r.ga;
            return (
              <tr key={r.team}>
                <td className="c-pos">{r.pos ?? i + 1}</td>
                <th scope="row" className="c-team">{r.team}</th>
                <td>{r.p}</td><td>{r.w}</td><td>{r.d}</td><td>{r.l}</td>
                <td className="c-hide">{r.gf}</td><td className="c-hide">{r.ga}</td>
                <td>{gd > 0 ? `+${gd}` : gd}</td>
                <td className="c-pts">{r.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
