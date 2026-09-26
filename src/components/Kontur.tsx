/** Garis kontur peta yang berputar pelan, sebagai latar hero. */
function ring(base: number, phi: number) {
  const pts: string[] = [];
  const N = 90;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = base * (1 + 0.09 * Math.sin(3 * a + phi) + 0.05 * Math.sin(5 * a + phi * 2.1) + 0.025 * Math.sin(9 * a + phi * 0.7));
    pts.push(`${i === 0 ? "M" : "L"}${(300 + r * Math.cos(a)).toFixed(1)} ${(300 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

export function Kontur({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 11 }, (_, i) => ({ d: ring(34 + i * 24, i * 0.55), o: 0.5 - i * 0.03 }));
  return (
    <svg aria-hidden viewBox="0 0 600 600" className={`kontur pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="1.1">
      <g className="kontur-a">
        {rings.map((r, i) => (
          <path key={i} d={r.d} opacity={r.o} />
        ))}
      </g>
    </svg>
  );
}
