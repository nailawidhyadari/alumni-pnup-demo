import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Explorer } from "@/components/Explorer";
import { VENDORS } from "@/data/vendors";

export const metadata: Metadata = {
  title: "Marketplace Alumni",
  description: "Cari produk, jasa, dan mitra bisnis dari sesama alumni PNUP berdasarkan angkatan, jurusan, dan lokasi terdekat.",
};

export default function Page() {
  const kota = new Set(VENDORS.map((v) => v.kota)).size;
  const angkatan = new Set(VENDORS.map((v) => v.pemilik.angkatan)).size;
  return (
    <>
      <section className="border-b-2 border-ink bg-paper2">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <nav aria-label="Jejak halaman" className="text-sm text-mute">
            <Link href="/" className="underline-offset-2 hover:underline">Beranda</Link> / Marketplace
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">Buku tahunan usaha alumni</p>
              <h1 className="font-display mt-1 text-4xl font-semibold leading-[1.05] md:text-6xl">Marketplace Alumni</h1>
              <p className="mt-3 max-w-2xl text-lg text-ink2">
                Produk, jasa, dan bisnis dari sesama alumni. Cari lewat angkatan, jurusan, atau yang paling dekat dari tempatmu.
              </p>
            </div>
            <dl className="flex gap-6 text-center">
              {[
                [VENDORS.length, "usaha"],
                [angkatan, "angkatan"],
                [kota, "kota"],
              ].map(([n, l]) => (
                <div key={l as string}>
                  <dd className="font-display text-4xl font-semibold">{n}</dd>
                  <dt className="text-sm text-mute">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-mute">Membuka marketplace…</div>}>
        <Explorer />
      </Suspense>
    </>
  );
}
