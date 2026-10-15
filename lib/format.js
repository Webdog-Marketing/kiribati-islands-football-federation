export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(d);
}
export const isPlayed = (f) => f.homeScore !== null && f.homeScore !== undefined && f.homeScore !== '';
export const isKiribati = (name = '') => /kiribati/i.test(name);
export function resultFor(f) {
  if (!isPlayed(f) || !(isKiribati(f.home) || isKiribati(f.away))) return null;
  const us = isKiribati(f.home) ? f.homeScore : f.awayScore;
  const them = isKiribati(f.home) ? f.awayScore : f.homeScore;
  return us > them ? 'W' : us < them ? 'L' : 'D';
}
