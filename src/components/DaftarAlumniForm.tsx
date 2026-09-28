"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { JURUSAN } from "@/data/vendors";
import { toast } from "@/lib/prefs";

const F0 = { nama: "", email: "", angkatan: "", jurusan: "", kerja: "Belum Bekerja", tempat: "", jabatan: "", kota: "", telepon: "" };

export function DaftarAlumniForm() {
  const [f, setF] = useState(F0);
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const set = (k: keyof typeof F0) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const a11y = (k: string) => ({ id: `d-${k}`, "aria-invalid": !!err[k], "aria-describedby": err[k] ? `de-${k}` : undefined });
  const salah = (k: string) => (err[k] ? <p id={`de-${k}`} role="alert" className="mt-1 font-semibold text-stamp">{err[k]}</p> : null);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!f.nama.trim()) x.nama = "Isi nama lengkap.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Isi alamat email yang benar.";
    const a = Number(f.angkatan);
    if (!(a >= 1985 && a <= 2026)) x.angkatan = "Isi tahun lulus, misalnya 2015.";
    if (!f.jurusan) x.jurusan = "Pilih jurusan.";
    setErr(x);
    if (Object.keys(x).length) return document.getElementById(`d-${Object.keys(x)[0]}`)?.focus();
    setOk(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Pendaftaran contoh berhasil");
  };

  const nomor = f.angkatan && f.jurusan ? `PNUP-${f.angkatan}-${String(f.nama.length * 137 + 1000).slice(-4)}` : "PNUP-0000-0000";

  const Kartu = (
    <div aria-label="Pratinjau Kartu Tanda Alumni" className="relative aspect-[1.586/1] w-full overflow-hidden rounded-sm border border-ink bg-ink p-5 text-paper">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2.5 border-b border-paper/20 pb-3">
          <Image src="/img/logo-ika.png" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-full bg-paper" />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold">Kartu Tanda Alumni</p>
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-paper/60">IKA Politeknik Negeri Ujung Pandang</p>
          </div>
        </div>
        <div className="mt-auto">
          <p className="font-display text-2xl font-medium leading-tight sm:text-[1.7rem]">{f.nama || "Nama Lengkap"}</p>
          <p className="mt-1 text-sm text-paper/75">{f.jurusan || "Jurusan"} · Angkatan {f.angkatan || "----"}</p>
          <p className="mt-3 flex items-end justify-between text-[0.7rem] tracking-[0.18em] text-gold">
            <span>{nomor}</span>
            <span className="text-paper/60">{f.kota || "Kota"}</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (ok) {
    return (
      <div role="status" className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-white"><Icon name="check" size={32} /></span>
        <h2 className="font-display mt-5 text-3xl font-semibold">Selamat datang, {f.nama.split(" ")[0]}.</h2>
        <p className="mt-2 text-lg text-ink2">Pendaftaran Anda tercatat. Kartu Tanda Alumni akan diterbitkan setelah data diverifikasi pengurus.</p>
        <div className="mx-auto mt-8 max-w-md">{Kartu}</div>
        <p className="mt-5 rounded-sm bg-gold/25 p-3 text-sm">Ini demo: data tidak dikirim ke mana pun.</p>
        <button type="button" className="btn btn-line mt-6" onClick={() => (setF(F0), setOk(false))}>Daftarkan alumni lain</button>
      </div>
    );
  }

  return (
    <form onSubmit={kirim} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="d-nama" className="mb-1 block font-semibold">Nama lengkap</label>
            <input {...a11y("nama")} className="input" value={f.nama} onChange={set("nama")} autoComplete="name" />
            {salah("nama")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="d-email" className="mb-1 block font-semibold">Email</label>
            <input {...a11y("email")} type="email" className="input" value={f.email} onChange={set("email")} autoComplete="email" />
            {salah("email")}
          </div>
          <div>
            <label htmlFor="d-angkatan" className="mb-1 block font-semibold">Tahun lulus / angkatan</label>
            <input {...a11y("angkatan")} inputMode="numeric" maxLength={4} className="input" value={f.angkatan} onChange={set("angkatan")} placeholder="2015" />
            {salah("angkatan")}
          </div>
          <div>
            <label htmlFor="d-jurusan" className="mb-1 block font-semibold">Jurusan</label>
            <select {...a11y("jurusan")} className="input" value={f.jurusan} onChange={set("jurusan")}>
              <option value="">Pilih jurusan…</option>
              {JURUSAN.map((j) => <option key={j}>{j}</option>)}
            </select>
            {salah("jurusan")}
          </div>
          <div>
            <label htmlFor="d-kerja" className="mb-1 block font-semibold">Status pekerjaan</label>
            <select {...a11y("kerja")} className="input" value={f.kerja} onChange={set("kerja")}>
              <option>Belum Bekerja</option>
              <option>Sudah Bekerja</option>
            </select>
          </div>
          <div>
            <label htmlFor="d-kota" className="mb-1 block font-semibold">Kota domisili</label>
            <input {...a11y("kota")} className="input" value={f.kota} onChange={set("kota")} autoComplete="address-level2" />
          </div>
          {f.kerja === "Sudah Bekerja" && (
            <>
              <div>
                <label htmlFor="d-tempat" className="mb-1 block font-semibold">Tempat bekerja</label>
                <input {...a11y("tempat")} className="input" value={f.tempat} onChange={set("tempat")} />
              </div>
              <div>
                <label htmlFor="d-jabatan" className="mb-1 block font-semibold">Jabatan <span className="font-normal text-mute">(opsional)</span></label>
                <input {...a11y("jabatan")} className="input" value={f.jabatan} onChange={set("jabatan")} />
              </div>
            </>
          )}
          <div className="sm:col-span-2">
            <label htmlFor="d-telepon" className="mb-1 block font-semibold">No. telepon / WhatsApp <span className="font-normal text-mute">(opsional)</span></label>
            <input {...a11y("telepon")} type="tel" className="input" value={f.telepon} onChange={set("telepon")} autoComplete="tel" />
          </div>
        </div>
        <p className="text-[0.9rem] text-mute">Di situs sebenarnya, Anda juga membuat kata sandi. Kolom itu sengaja tidak ada di demo.</p>
        <button type="submit" className="btn btn-ink !min-h-14 w-full text-lg sm:w-auto">Daftar sekarang</button>
      </div>
      <aside className="lg:sticky lg:top-40 lg:self-start">
        <p className="kicker mb-3">Pratinjau kartu Anda</p>
        {Kartu}
        <p className="mt-3 text-[0.9rem] text-mute">Kartu berubah saat Anda mengetik.</p>
      </aside>
    </form>
  );
}
