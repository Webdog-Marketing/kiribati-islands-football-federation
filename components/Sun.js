// The rising sun from the crest. 17 rays: the 16 Gilbert Islands and Banaba.
export default function Sun({ size = 28, color = '#FFC800', className = '' }) {
  const rays = 17;
  const cx = 50, cy = 50, r1 = 22, r2 = 46;
  let d = '';
  for (let i = 0; i < rays; i++) {
    const a = (Math.PI * 2 * i) / rays - Math.PI / 2;
    const w = (Math.PI * 2) / rays / 3.2;
    const p = (ang, r) => `${(cx + Math.cos(ang) * r).toFixed(2)} ${(cy + Math.sin(ang) * r).toFixed(2)}`;
    d += `M${p(a - w, r1)} L${p(a, r2)} L${p(a + w, r1)} Z `;
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={d} fill={color} />
      <circle cx={cx} cy={cy} r={r1 + 1} fill={color} />
    </svg>
  );
}
