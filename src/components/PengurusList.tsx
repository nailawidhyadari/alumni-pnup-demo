"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { BIDANG } from "@/data/site";

export function PengurusList() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const k = q.toLowerCase().trim();
    if (!k) return BIDANG.map((b) => ({ ...b, cocok: true }));
    return BIDANG.flatMap((b) => {
      const semua = [b.koordinator, ...b.anggota];
      const kena = semua.some((n) => n.toLowerCase().includes(k)) || b.nama.toLowerCase().includes(k);
      return kena ? [{ ...b, cocok: true }] : [];
    });
  }, [q]);
  const ada = (n: string) => q && n.toLowerCase().includes(q.toLowerCase());

  return (
    <div>
      <div className="relative max-w-md">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" />
        <label htmlFor="p-q" className="sr-only">Cari nama pengurus atau bidang</label>
        <input id="p-q" type="search" className="input pl-11" placeholder="Cari nama atau bidang…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {list.map((b) => (
          <details key={b.nama} open={!!q} className="index-card group p-5 open:bg-card">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
              <span>
                <span className="kicker">Bidang</span>
                <span className="font-display mt-0.5 block text-xl font-bold leading-snug">{b.nama}</span>
                <span className="mt-0.5 block text-[0.9rem] text-mute">{b.anggota.length + 1} pengurus</span>
              </span>
              <Icon name="arrow" className="mt-2 transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-4 border-t border-ink/25 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stamp">Koordinator</p>
              <p className={`font-display text-lg font-semibold ${ada(b.koordinator) ? "bg-gold/50" : ""}`}>{b.koordinator}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-stamp">Anggota</p>
              <ul className="mt-1 space-y-0.5">
                {b.anggota.map((n) => (
                  <li key={n} className={ada(n) ? "bg-gold/50" : ""}>{n}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 text-lg text-ink2">Tidak ada nama yang cocok.</p>}
    </div>
  );
}
