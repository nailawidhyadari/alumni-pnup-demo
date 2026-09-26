import type { Metadata } from "next";
import { AlumniDirectory } from "@/components/AlumniDirectory";
import { ALUMNI } from "@/data/alumni";

export const metadata: Metadata = { title: "Direktori Alumni", description: "Cari sesama alumni PNUP berdasarkan nama, jurusan, tahun lulus, dan kota." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Buku induk alumni</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Direktori alumni</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">
        Temukan teman seangkatan, kakak tingkat, atau rekan sejurusan. Saat ini tercatat {ALUMNI.length} alumni di halaman contoh ini.
      </p>
      <p className="mt-4 max-w-2xl rounded-sm border border-dashed border-ink/40 bg-card p-3 text-[0.92rem] text-ink2">
        Catatan demo: kecuali pemilik usaha di marketplace, nama alumni di sini fiktif. Di situs sebenarnya, kontak pribadi tidak ditampilkan dan hanya bisa dihubungi lewat pengurus.
      </p>
      <div className="mt-10"><AlumniDirectory /></div>
    </div>
  );
}
