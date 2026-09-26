"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ALUMNI } from "@/data/alumni";
import { JURUSAN } from "@/data/vendors";
import { inisial } from "@/data/vendors";

const HURUF = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TAMPIL = 12;
const kota = [...new Set(ALUMNI.map((a) => a.kota))].sort();
const tahun = [...new Set(ALUMNI.map((a) => a.lulus))].sort((a, b) => b - a);

type Urut = "nama" | "baru" | "lama";

export function AlumniDirectory() {
  const [q, setQ] = useState("");
  const [jur, setJur] = useState<string | null>(null);
  const [thn, setThn] = useState("");
  const [kt, setKt] = useState("");
  const [huruf, setHuruf] = useState<string | null>(null);
  const [urut, setUrut] = useState<Urut>("nama");
  const [banyak, setBanyak] = useState(TAMPIL);
  const [usahaSaja, setUsahaSaja] = useState(false);

  const hasil = useMemo(() => {
    const kata = q.toLowerCase().split(/\s+/).filter(Boolean);
    const l = ALUMNI.filter((a) => {
      if (jur && a.jurusan !== jur) return false;
      if (thn && String(a.lulus) !== thn) return false;
      if (kt && a.kota !== kt) return false;
      if (huruf && !a.nama.toUpperCase().startsWith(huruf)) return false;
      if (usahaSaja && !a.usahaId) return false;
      const hay = [a.nama, a.jurusan, a.kota, a.profesi, a.instansi, String(a.lulus)].join(" ").toLowerCase();
      return kata.every((k) => hay.includes(k));
    });
    return l.sort((a, b) => (urut === "nama" ? a.nama.localeCompare(b.nama, "id") : urut === "baru" ? b.lulus - a.lulus : a.lulus - b.lulus));
  }, [q, jur, thn, kt, huruf, urut, usahaSaja]);

  const adaHuruf = useMemo(() => new Set(ALUMNI.map((a) => a.nama[0].toUpperCase())), []);
  const aktif = q || jur || thn || kt || huruf || usahaSaja;
  const reset = () => (setQ(""), setJur(null), setThn(""), setKt(""), setHuruf(null), setUsahaSaja(false), setBanyak(TAMPIL));
  const ubah = <T,>(f: (v: T) => void) => (v: T) => (f(v), setBanyak(TAMPIL));

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <Icon name="search" size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
        <label htmlFor="a-q" className="sr-only">Cari nama, jurusan, kota, atau tempat bekerja</label>
        <input id="a-q" type="search" value={q} onChange={(e) => ubah(setQ)(e.target.value)} placeholder="Cari nama, jurusan, kota, atau tempat bekerja…" className="input !min-h-14 !rounded-sm !border !border-ink pl-12 text-[1.05rem]" />
      </form>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto]">
        <div role="group" aria-label="Jurusan" className="flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={jur === null} onClick={() => ubah(setJur)(null)}>Semua jurusan</button>
          {JURUSAN.map((j) => (
            <button key={j} type="button" className="chip" aria-pressed={jur === j} onClick={() => ubah(setJur)(jur === j ? null : j)}>{j}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <label className="flex items-center gap-2 font-medium">
          Lulus
          <select className="input !min-h-10 !w-auto !py-1" value={thn} onChange={(e) => ubah(setThn)(e.target.value)}>
            <option value="">Semua tahun</option>
            {tahun.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 font-medium">
          Kota
          <select className="input !min-h-10 !w-auto !py-1" value={kt} onChange={(e) => ubah(setKt)(e.target.value)}>
            <option value="">Semua kota</option>
            {kota.map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 font-medium">
          Urutkan
          <select className="input !min-h-10 !w-auto !py-1" value={urut} onChange={(e) => setUrut(e.target.value as Urut)}>
            <option value="nama">Nama A–Z</option>
            <option value="baru">Lulusan terbaru</option>
            <option value="lama">Lulusan tertua</option>
          </select>
        </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-ink/25 py-3">
        <nav aria-label="Lompat ke huruf" className="flex flex-wrap gap-1">
          {HURUF.map((h) => (
            <button key={h} type="button" disabled={!adaHuruf.has(h)} aria-pressed={huruf === h} onClick={() => ubah(setHuruf)(huruf === h ? null : h)}
              className="font-display grid h-9 w-9 place-items-center rounded font-semibold hover:bg-ink/10 disabled:opacity-25 aria-pressed:bg-ink aria-pressed:text-paper">
              {h}
            </button>
          ))}
        </nav>
        <label className="flex cursor-pointer items-center gap-2.5 font-medium">
          <input type="checkbox" className="h-5 w-5 accent-[var(--ink)]" checked={usahaSaja} onChange={(e) => ubah(setUsahaSaja)(e.target.checked)} />
          Yang punya usaha di marketplace
        </label>
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-3 text-lg" aria-live="polite">
        <span><strong className="font-display text-3xl">{hasil.length}</strong> alumni ditemukan</span>
        {aktif && <button type="button" className="underline underline-offset-4" onClick={reset}>Hapus semua filter</button>}
      </p>

      {hasil.length === 0 ? (
        <div className="index-card mt-4 p-8 text-center">
          <p className="font-display text-3xl font-semibold">Belum ada yang cocok</p>
          <p className="mt-2 text-ink2">Coba ejaan lain atau kurangi filter.</p>
          <button type="button" className="btn btn-ink mt-5" onClick={reset}>Hapus semua filter</button>
        </div>
      ) : (
        <>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {hasil.slice(0, banyak).map((a) => (
              <li key={a.id} className="index-card flex gap-4 p-4">
                <span aria-hidden className="font-display grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ink bg-ink text-paper text-xl font-semibold">{inisial(a.nama)}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-semibold leading-tight">{a.nama}</h2>
                  <p className="mt-0.5 text-[0.95rem] text-ink2">{a.jurusan} · {a.jenjang} · lulus {a.lulus}</p>
                  <p className="mt-1 text-[0.95rem]">{a.profesi}, <span className="text-ink2">{a.instansi}</span></p>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.9rem] text-mute"><Icon name="pin" size={15} />{a.kota}</p>
                  {a.usahaId && (
                    <Link href={`/marketplace/${a.usahaId}`} className="mt-2 inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-forest underline underline-offset-4">
                      Lihat usahanya <Icon name="arrow" size={15} />
                    </Link>
                  )}
                  {a.contoh && <span className="mt-2 ml-0 block text-[0.7rem] font-bold uppercase tracking-wider text-stamp">Data contoh</span>}
                </div>
              </li>
            ))}
          </ul>
          {hasil.length > banyak && (
            <div className="mt-8 text-center">
              <button type="button" className="btn btn-line" onClick={() => setBanyak(banyak + TAMPIL)}>
                Tampilkan lebih banyak ({hasil.length - banyak} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
