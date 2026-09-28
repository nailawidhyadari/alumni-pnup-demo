"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { GRUP, JURUSAN } from "@/data/vendors";
import { KOTA } from "@/lib/geo";

const F0 = { usaha: "", judul: "", grup: "Produk", deskripsi: "", kota: "", nama: "", jabatan: "", angkatan: "", jurusan: "", wa: "" };

export function DaftarForm() {
  const [f, setF] = useState(F0);
  const [foto, setFoto] = useState<string | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const url = useRef<string | null>(null);

  useEffect(() => () => {
    if (url.current) URL.revokeObjectURL(url.current);
  }, []);

  const set = (k: keyof typeof F0) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!f.usaha.trim()) x.usaha = "Isi nama usaha.";
    if (!f.judul.trim()) x.judul = "Isi judul penawaran.";
    if (f.deskripsi.trim().length < 20) x.deskripsi = "Tulis deskripsi minimal 20 huruf.";
    if (!f.kota) x.kota = "Pilih kota terdekat.";
    if (!f.nama.trim()) x.nama = "Isi nama pemilik.";
    const a = Number(f.angkatan);
    if (!(a >= 1980 && a <= 2026)) x.angkatan = "Isi tahun angkatan, misalnya 2009.";
    if (!f.jurusan) x.jurusan = "Pilih jurusan.";
    if (!/^(\+?62|0)8\d{7,12}$/.test(f.wa.replace(/[\s-]/g, ""))) x.wa = "Isi nomor WhatsApp yang benar, misalnya 0812 3456 7890.";
    setErr(x);
    if (Object.keys(x).length) {
      document.getElementById(`f-${Object.keys(x)[0]}`)?.focus();
      return;
    }
    setOk(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (ok) {
    return (
      <div role="status" className="index-card no-grow mx-auto max-w-2xl p-8 text-center md:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-white"><Icon name="check" size={32} /></span>
        <h2 className="font-display mt-5 text-3xl font-semibold">Terima kasih, {f.nama.split(" ")[0]}.</h2>
        <p className="mt-3 text-lg text-ink2">
          Data usaha <strong>{f.usaha}</strong> sudah kami terima dan menunggu verifikasi pengurus. Setelah disetujui, usahamu akan tampil di marketplace.
        </p>
        <p className="mt-4 rounded-sm bg-gold/30 p-3 text-sm">Ini demo: data tidak dikirim ke mana pun dan hanya tampil di layar ini.</p>
        <button type="button" className="btn btn-line mt-6" onClick={() => (setF(F0), setFoto(null), setOk(false))}>Isi formulir lagi</button>
      </div>
    );
  }

  const Salah = (k: string) => (err[k] ? <p id={`e-${k}`} role="alert" className="mt-1 font-semibold text-stamp">{err[k]}</p> : null);
  const a11y = (k: string) => ({ id: `f-${k}`, "aria-invalid": !!err[k], "aria-describedby": err[k] ? `e-${k}` : undefined });

  return (
    <form onSubmit={kirim} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="font-display text-2xl font-semibold">1. Tentang usaha</legend>
          <div>
            <label htmlFor="f-usaha" className="mb-1 block font-semibold">Nama usaha</label>
            <input {...a11y("usaha")} className="input" value={f.usaha} onChange={set("usaha")} placeholder="Contoh: Kedai Airumi" />
            {Salah("usaha")}
          </div>
          <div>
            <label htmlFor="f-judul" className="mb-1 block font-semibold">Judul penawaran</label>
            <input {...a11y("judul")} className="input" value={f.judul} onChange={set("judul")} placeholder="Contoh: Abon Ikan Marlin" />
            {Salah("judul")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-grup" className="mb-1 block font-semibold">Kategori</label>
              <select {...a11y("grup")} className="input" value={f.grup} onChange={set("grup")}>
                {GRUP.map((g) => <option key={g.nama}>{g.nama}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="f-kota" className="mb-1 block font-semibold">Kota terdekat</label>
              <select {...a11y("kota")} className="input" value={f.kota} onChange={set("kota")}>
                <option value="">Pilih kota…</option>
                {KOTA.map((k) => <option key={k.label}>{k.label}</option>)}
              </select>
              {Salah("kota")}
            </div>
          </div>
          <div>
            <label htmlFor="f-deskripsi" className="mb-1 block font-semibold">Deskripsi singkat</label>
            <textarea {...a11y("deskripsi")} rows={5} className="input" value={f.deskripsi} onChange={set("deskripsi")} placeholder="Apa yang Anda tawarkan, dan apa keunggulannya?" />
            {Salah("deskripsi")}
          </div>
          <div>
            <label htmlFor="f-foto" className="mb-1 block font-semibold">Foto atau logo <span className="font-normal text-mute">(opsional)</span></label>
            <input
              id="f-foto"
              type="file"
              accept="image/*"
              className="input !py-2.5"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (url.current) URL.revokeObjectURL(url.current);
                url.current = file ? URL.createObjectURL(file) : null;
                setFoto(url.current);
              }}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-2xl font-semibold">2. Tentang pemilik</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-nama" className="mb-1 block font-semibold">Nama lengkap</label>
              <input {...a11y("nama")} className="input" value={f.nama} onChange={set("nama")} autoComplete="name" />
              {Salah("nama")}
            </div>
            <div>
              <label htmlFor="f-jabatan" className="mb-1 block font-semibold">Jabatan <span className="font-normal text-mute">(opsional)</span></label>
              <input {...a11y("jabatan")} className="input" value={f.jabatan} onChange={set("jabatan")} placeholder="Pemilik, Direktur…" />
            </div>
            <div>
              <label htmlFor="f-angkatan" className="mb-1 block font-semibold">Angkatan</label>
              <input {...a11y("angkatan")} inputMode="numeric" maxLength={4} className="input" value={f.angkatan} onChange={set("angkatan")} placeholder="2009" />
              {Salah("angkatan")}
            </div>
            <div>
              <label htmlFor="f-jurusan" className="mb-1 block font-semibold">Jurusan</label>
              <select {...a11y("jurusan")} className="input" value={f.jurusan} onChange={set("jurusan")}>
                <option value="">Pilih jurusan…</option>
                {JURUSAN.map((j) => <option key={j}>{j}</option>)}
              </select>
              {Salah("jurusan")}
            </div>
          </div>
          <div>
            <label htmlFor="f-wa" className="mb-1 block font-semibold">Nomor WhatsApp</label>
            <input {...a11y("wa")} type="tel" className="input" value={f.wa} onChange={set("wa")} placeholder="0812 3456 7890" autoComplete="tel" />
            {Salah("wa")}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-ink !min-h-14 w-full text-lg sm:w-auto">Kirim untuk diverifikasi</button>
      </div>

      <aside className="lg:sticky lg:top-40 lg:self-start" aria-label="Pratinjau kartu">
        <p className="kicker mb-3">Pratinjau kartu usahamu</p>
        <article className="index-card no-grow overflow-hidden">
          <div className="relative aspect-[16/10] border-b border-ink/15 bg-paper2">
            {foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={foto} alt="Pratinjau foto usaha" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center bg-ink text-paper/80"><span className="font-display text-xl">Foto usaha</span></div>
            )}
            <span className="absolute right-3 top-3 bg-ink px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-paper">Baru</span>
          </div>
          <div className="p-4 pt-5">
            <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-mute">{f.grup}</p>
            <h3 className="font-display mt-1 text-[1.4rem] font-semibold leading-tight">{f.judul || "Judul penawaran"}</h3>
            <p className="mt-0.5 font-medium text-ink2">{f.usaha || "Nama usaha"}</p>
            <p className="mt-2 line-clamp-3 text-[0.95rem] text-ink2">{f.deskripsi || "Deskripsi singkat akan tampil di sini."}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.9rem] text-ink2">
              <span className="flex items-center gap-1.5"><Icon name="pin" size={16} />{f.kota || "Kota"}</span>
              <span className="flex items-center gap-1.5"><Icon name="book" size={16} />{f.jurusan || "Jurusan"}</span>
              {Number(f.angkatan) >= 1980 && <span className="stamp !text-[0.72rem] !py-0">Angk. <b>{f.angkatan}</b></span>}
            </p>
          </div>
        </article>
        <p className="mt-3 text-[0.9rem] text-mute">Kartu ini berubah saat Anda mengetik, supaya terlihat seperti apa usahamu nanti di marketplace.</p>
      </aside>
    </form>
  );
}
