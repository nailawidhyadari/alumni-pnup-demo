"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { KOTA } from "@/lib/geo";
import { toast } from "@/lib/prefs";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [kota, setKota] = useState("");
  const [cari, setCari] = useState(false);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (kota) p.set("kota", kota);
    router.push(`/marketplace${p.size ? `?${p}` : ""}`);
  };

  const gps = () => {
    if (!navigator.geolocation) return toast("Peramban ini tidak mendukung lokasi. Pilih kota saja.");
    setCari(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => router.push(`/marketplace?lat=${pos.coords.latitude.toFixed(4)}&lng=${pos.coords.longitude.toFixed(4)}&radius=50`),
      () => {
        setCari(false);
        toast("Lokasi tidak bisa dibaca. Silakan pilih kota di daftar.");
      },
      { timeout: 8000, maximumAge: 600000 },
    );
  };

  return (
    <form onSubmit={kirim} role="search" className="rounded-sm border border-ink bg-card p-4 shadow-[0_12px_28px_-16px_rgba(19,36,65,0.45)] sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_11rem]">
        <div className="relative">
          <label htmlFor="h-q" className="sr-only">Cari usaha alumni</label>
          <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" />
          <input id="h-q" className="input pl-11" placeholder="Cari: kontraktor, umrah, abon…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <label htmlFor="h-k" className="sr-only">Kota</label>
          <select id="h-k" className="input" value={kota} onChange={(e) => setKota(e.target.value)}>
            <option value="">Semua kota</option>
            {KOTA.map((k) => (
              <option key={k.label} value={k.label}>{k.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
        <button type="submit" className="btn btn-ink flex-1">Cari usaha alumni</button>
        <button type="button" onClick={gps} disabled={cari} className="btn btn-line flex-1">
          <Icon name="locate" size={18} /> {cari ? "Mencari lokasi…" : "Alumni sekitarku"}
        </button>
      </div>
    </form>
  );
}
