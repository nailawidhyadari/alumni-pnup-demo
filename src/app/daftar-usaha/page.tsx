import type { Metadata } from "next";
import { DaftarForm } from "@/components/DaftarForm";

export const metadata: Metadata = { title: "Daftarkan Usaha", description: "Perkenalkan usaha Anda ke keluarga besar alumni PNUP." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Untuk alumni</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Daftarkan usahamu</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">Isi dua bagian singkat. Kartu usaha di sisi kanan akan berubah saat Anda mengetik. Pengurus akan memverifikasi sebelum tampil.</p>
      <div className="mt-10"><DaftarForm /></div>
    </div>
  );
}
