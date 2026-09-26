import type { Metadata } from "next";
import { DaftarAlumniForm } from "@/components/DaftarAlumniForm";

export const metadata: Metadata = { title: "Daftar Alumni", description: "Daftarkan diri sebagai anggota IKA PNUP dan dapatkan Kartu Tanda Alumni." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Keanggotaan</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Pendaftaran alumni</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">Bergabunglah dengan keluarga besar alumni PNUP. Data Anda membantu pengurus menyusun database alumni dan menerbitkan Kartu Tanda Alumni.</p>
      <div className="mt-10"><DaftarAlumniForm /></div>
    </div>
  );
}
