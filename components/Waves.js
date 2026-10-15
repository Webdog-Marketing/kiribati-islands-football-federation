// The three pairs of white and navy waves from the Kiribati flag.
// Each navy band stands for one of the archipelagos: Gilbert, Phoenix and Line Islands.
function wavePath(y, amp, period, width, bottom) {
  let d = `M0 ${y}`;
  for (let x = 0; x < width; x += period) {
    const h = period / 2;
    d += ` C${x + h * 0.36} ${y - amp} ${x + h * 0.64} ${y - amp} ${x + h} ${y}`;
    d += ` C${x + h + h * 0.36} ${y + amp} ${x + h + h * 0.64} ${y + amp} ${x + period} ${y}`;
  }
  return `${d} L${width} ${bottom} L0 ${bottom} Z`;
}

export default function Waves({ className = '', top = 'transparent' }) {
  const W = 1440;
  const H = 132;
  const period = 240;
  const amp = 9;
  const start = 16;
  const step = 19;
  const colours = ['#FFFFFF', '#000E30', '#FFFFFF', '#000E30', '#FFFFFF', '#000E30'];
  return (
    <div className={`waves ${className}`} style={{ background: top }} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" focusable="false">
        {colours.map((c, i) => (
          <path key={i} fill={c} d={wavePath(start + i * step, amp, period, W, H)} />
        ))}
      </svg>
    </div>
  );
}
