export function Stamp({ angkatan, size = 68, className = "" }: { angkatan?: number; size?: number; className?: string }) {
  return (
    <div className={`stamp ${className}`} style={{ width: size, height: size }} aria-label={angkatan ? `Angkatan ${angkatan}` : "Angkatan belum dicantumkan"}>
      <div>
        <div style={{ fontSize: size * 0.135, letterSpacing: "0.12em" }}>ANGK.</div>
        <div style={{ fontSize: size * 0.3, marginTop: size * 0.03 }}>{angkatan ?? "—"}</div>
      </div>
    </div>
  );
}
