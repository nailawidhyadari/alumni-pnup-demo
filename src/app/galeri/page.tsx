import type { Metadata } from "next";
import { GaleriGrid } from "@/components/GaleriGrid";

export const metadata: Metadata = { title: "Galeri Kegiatan", description: "Dokumentasi kegiatan IKA PNUP." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Dokumentasi</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Galeri kegiatan</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">Momen pelantikan, wisuda, dan program-program IKA PNUP. Klik foto untuk memperbesar, lalu geser dengan panah keyboard.</p>
      <div className="mt-10"><GaleriGrid /></div>
    </div>
  );
}
