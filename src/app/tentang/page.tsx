import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PengurusList } from "@/components/PengurusList";
import { ORG, PENGURUS_INTI } from "@/data/site";

export const metadata: Metadata = { title: "Tentang & Pengurus", description: "Visi, misi, nilai, dan susunan pengurus IKA PNUP periode 2025–2028." };

const NILAI = ["Integritas", "Kolaborasi", "Kontribusi", "Inovasi", "Kebersamaan"];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker">Tentang kami</p>
          <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Satu almamater, satu keluarga besar</h1>
          <p className="mt-5 max-w-2xl text-xl text-ink2">
            {ORG.lengkap} adalah wadah silaturahmi dan kolaborasi alumni lintas angkatan yang berkomitmen mendukung almamater, memberi kontribusi bagi masyarakat, dan membangun masa depan yang lebih baik.
          </p>
        </div>
        <Image src="/img/logo-ika.png" alt="Lambang IKA Politeknik Negeri Ujung Pandang" width={220} height={220} className="mx-auto h-44 w-44 rounded-full md:h-56 md:w-56" />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <section className="index-card p-7">
          <p className="kicker">Visi</p>
          <p className="font-display mt-2 text-2xl font-semibold leading-snug">Menjadi wadah alumni yang unggul, solid, dan berdampak bagi almamater, masyarakat, dan bangsa.</p>
        </section>
        <section className="index-card p-7">
          <p className="kicker">Misi</p>
          <p className="font-display mt-2 text-2xl font-semibold leading-snug">Memperkuat jejaring, mendorong kolaborasi, serta menciptakan peluang untuk pengembangan alumni dan almamater.</p>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="nilai">
        <h2 id="nilai" className="font-display text-3xl font-semibold">Lima nilai kami</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {NILAI.map((n, i) => (
            <li key={n} className="rounded-sm border border-ink bg-gold/30 p-4">
              <span className="font-display text-3xl font-semibold italic text-stamp">{i + 1}</span>
              <p className="font-display text-xl font-semibold">{n}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="inti">
        <p className="kicker">Periode {ORG.periode}</p>
        <h2 id="inti" className="font-display mt-1 text-3xl font-semibold md:text-4xl">Pengurus inti</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PENGURUS_INTI.map((p) => (
            <li key={p.nama} className="index-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-stamp">{p.jabatan}</p>
              <p className="font-display mt-1 text-2xl font-semibold leading-tight">{p.nama}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="bidang">
        <h2 id="bidang" className="font-display text-3xl font-semibold md:text-4xl">Bidang-bidang</h2>
        <p className="mt-2 text-lg text-ink2">Ketuk sebuah bidang untuk melihat koordinator dan anggotanya.</p>
        <div className="mt-6"><PengurusList /></div>
      </section>

      <div className="mt-16 rounded-sm border border-ink bg-ink p-8 text-paper md:p-10">
        <p className="font-display text-3xl font-semibold italic">Ingin ikut berkontribusi?</p>
        <p className="mt-2 max-w-xl text-paper/80">Perkenalkan usahamu ke keluarga besar alumni, atau kabari kami lewat {ORG.email}.</p>
        <Link href="/daftar-usaha" className="btn mt-5 !border-paper !bg-paper text-ink hover:!bg-gold">Daftarkan usaha</Link>
      </div>
    </div>
  );
}
