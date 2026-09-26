"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { toast } from "@/lib/prefs";

type Ulasan = { nama: string; bintang: number; teks: string; tgl: string };

function Bintang({ n, besar = false }: { n: number; besar?: boolean }) {
  return (
    <span className="inline-flex text-gold" aria-label={`${n} dari 5 bintang`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={besar ? 26 : 18} className={i <= n ? "fill-current" : "opacity-30"} />
      ))}
    </span>
  );
}

export function Reviews({ vendorId }: { vendorId: number }) {
  const key = `ika-ulasan-${vendorId}`;
  const [daftar, setDaftar] = useState<Ulasan[]>([]);
  const [nama, setNama] = useState("");
  const [bintang, setBintang] = useState(0);
  const [teks, setTeks] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setDaftar(JSON.parse(raw));
    } catch {}
  }, [key]);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !bintang || teks.trim().length < 10) {
      setErr("Mohon isi nama, pilih bintang, dan tulis ulasan minimal 10 huruf.");
      return;
    }
    setErr("");
    const baru = [{ nama: nama.trim(), bintang, teks: teks.trim(), tgl: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }, ...daftar];
    setDaftar(baru);
    try {
      localStorage.setItem(key, JSON.stringify(baru));
    } catch {}
    setNama("");
    setBintang(0);
    setTeks("");
    toast("Terima kasih atas ulasannya");
  };

  const rata = daftar.length ? daftar.reduce((a, b) => a + b.bintang, 0) / daftar.length : 0;

  return (
    <section className="mt-12" aria-labelledby="ulasan">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="ulasan" className="font-display text-2xl font-bold">Ulasan & rating</h2>
        {daftar.length > 0 && (
          <p className="flex items-center gap-2 font-semibold">
            <Bintang n={Math.round(rata)} /> {rata.toFixed(1).replace(".", ",")} dari {daftar.length} ulasan
          </p>
        )}
      </div>

      {daftar.length === 0 ? (
        <p className="mt-3 rounded-md border border-dashed border-ink/40 bg-card p-5 text-ink2">
          Belum ada ulasan. Pernah memakai produk atau jasa ini? Jadilah yang pertama menulis.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {daftar.map((u, i) => (
            <li key={i} className="rounded-md border border-ink/25 bg-card p-4">
              <div className="flex flex-wrap items-center gap-x-3">
                <strong>{u.nama}</strong>
                <Bintang n={u.bintang} />
                <span className="text-sm text-mute">{u.tgl}</span>
              </div>
              <p className="mt-1.5">{u.teks}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={kirim} className="mt-6 rounded-md border-[1.5px] border-ink bg-card p-5" noValidate>
        <h3 className="font-display text-xl font-bold">Tulis ulasan</h3>
        <p className="mt-1 text-[0.85rem] text-mute">Demo: ulasan hanya tersimpan di peramban ini. Di situs sebenarnya, ulasan memerlukan login alumni.</p>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="u-nama" className="mb-1 block font-semibold">Nama Anda</label>
            <input id="u-nama" className="input" value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" />
          </div>
          <fieldset>
            <legend className="mb-1 font-semibold">Penilaian</legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" aria-pressed={bintang === i} aria-label={`${i} bintang`} onClick={() => setBintang(i)} className="grid h-12 w-12 place-items-center rounded-md hover:bg-gold/20">
                  <Icon name="star" size={30} className={`text-gold ${i <= bintang ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="u-teks" className="mb-1 block font-semibold">Ulasan</label>
            <textarea id="u-teks" rows={4} className="input" value={teks} onChange={(e) => setTeks(e.target.value)} />
          </div>
          {err && <p role="alert" className="font-semibold text-stamp">{err}</p>}
          <button type="submit" className="btn btn-ink self-start">Kirim ulasan</button>
        </div>
      </form>
    </section>
  );
}
