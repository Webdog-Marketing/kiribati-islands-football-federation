import Link from 'next/link';
import { formatDate, isPlayed, isKiribati, resultFor } from '@/lib/format';

export default function FixtureRow({ f }) {
  const played = isPlayed(f);
  const res = resultFor(f);
  return (
    <li className="fixture">
      <div className="fixture-when">
        <time dateTime={f.date}>{formatDate(f.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        <span>{[f.competition, f.round].filter(Boolean).join(', ')}</span>
      </div>
      <div className="fixture-teams">
        <span className={`team home ${isKiribati(f.home) ? 'is-us' : ''}`}>{f.home}</span>
        <span className="score">
          {played ? (<>{f.homeScore}<span className="dash">&ndash;</span>{f.awayScore}</>) : (f.time || 'v')}
        </span>
        <span className={`team away ${isKiribati(f.away) ? 'is-us' : ''}`}>{f.away}</span>
      </div>
      <div className="fixture-end">
        {res ? <span className={`result result--${res}`} title={{ W: 'Win', D: 'Draw', L: 'Defeat' }[res]}>{res}</span> : null}
        <span className="venue">{f.venue}</span>
        {f.report ? <Link href={f.report} className="text-link">Match report</Link> : null}
      </div>
    </li>
  );
}
