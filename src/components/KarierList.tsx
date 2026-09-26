"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ALUR_LAMAR, LOWONGAN } from "@/data/site";
import { toast } from "@/lib/prefs";

export function KarierList() {
  const [q, setQ] = useState("");
  const [pend, setPend] = useState<string | null>(null);
  const [buka, setBuka] = useState<number | null>(null);

  const list = useMemo(
    () =>
      LOWONGAN.filter((l) => {
        if (pend && !l.pendidikan.includes(pend)) return false;
        const hay = [l.posisi, l.perusahaan, l.kota, ...l.prodi, ...l.skill].join(" ").toLowerCase();
        return q
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
          .every((k) => hay.includes(k));
      }),
    [q, pend],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" />
          <label htmlFor="k-q" className="sr-only">Cari lowongan</label>
          <input id="k-q" className="input pl-11" placeholder="Cari posisi, perusahaan, atau keahlian…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div role="group" aria-label="Tingkat pendidikan" className="flex flex-wrap gap-2">
          {["Diploma", "Sarjana"].map((p) => (
            <button key={p} type="button" className="chip" aria-pressed={pend === p} onClick={() => setPend(pend === p ? null : p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-lg" aria-live="polite"><strong>{list.length}</strong> lowongan</p>

      <ul className="mt-4 space-y-5">
        {list.map((l) => {
          const o = buka === l.id;
          return (
            <li key={l.id} id={`l${l.id}`} className="index-card no-grow scroll-mt-40 p-5 md:p-6">
              <div className="flex flex-wrap items-start gap-5">
                <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-sm border border-ink/25 bg-white">
                  <Image src={l.logo} alt={`Logo ${l.perusahaan}`} width={80} height={80} className="h-full w-full object-contain p-1.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2 text-[0.78rem] font-bold uppercase tracking-wider">
                    <span className="rounded-sm bg-forest px-2.5 py-0.5 text-white">{l.tipe}</span>
                    <span className="rounded-sm border border-ink/40 px-2.5 py-0.5">{l.pendidikan.join(" / ")}</span>
                    <span className="py-0.5 text-mute">{l.posted}</span>
                  </div>
                  <h2 className="font-display mt-2 text-2xl font-semibold leading-tight md:text-[1.75rem]">{l.posisi}</h2>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-ink2">
                    <span className="font-semibold">{l.perusahaan}</span>
                    <span className="inline-flex items-center gap-1"><Icon name="pin" size={16} />{l.kota}</span>
                  </p>
                  <p className="mt-2 text-ink2">{l.ringkas}</p>
                </div>
                <div className="flex w-full gap-2.5 md:w-auto md:flex-col">
                  <button type="button" className="btn btn-ink btn-sm flex-1" onClick={() => toast("Demo: di situs asli, tombol ini membuka form lamaran")}>
                    Lamar sekarang
                  </button>
                  <button type="button" className="btn btn-line btn-sm flex-1" aria-expanded={o} aria-controls={`rinci-${l.id}`} onClick={() => setBuka(o ? null : l.id)}>
                    {o ? "Tutup rincian" : "Lihat rincian"}
                  </button>
                </div>
              </div>

              {o && (
                <div id={`rinci-${l.id}`} className="rise mt-6 grid gap-8 border-t border-ink/25 pt-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold">Deskripsi</h3>
                    <p className="mt-2 text-[1.05rem]">{l.deskripsi}</p>
                    <h3 className="font-display mt-5 text-xl font-semibold">Program studi</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {l.prodi.map((p) => (
                        <li key={p} className="rounded-sm bg-paper2 px-3 py-1 text-[0.92rem]">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Yang akan kamu pelajari</h3>
                    <ol className="mt-2 space-y-2">
                      {l.skill.map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span className="font-display w-6 shrink-0 text-xl font-semibold italic text-stamp">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {list.length === 0 && <p className="index-card mt-4 p-8 text-center text-lg">Belum ada lowongan yang cocok. Coba kata kunci lain.</p>}

      <section className="mt-16" aria-labelledby="alur">
        <h2 id="alur" className="font-display text-3xl font-semibold">Alur lamaran</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-5">
          {ALUR_LAMAR.map((a, i) => (
            <li key={a.judul} className="relative rounded-sm border border-ink bg-card p-4">
              <span className="font-display text-4xl font-semibold text-gold">{i + 1}</span>
              <p className="mt-1 font-bold">{a.judul}</p>
              <p className="mt-1 text-[0.92rem] text-ink2">{a.isi}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
