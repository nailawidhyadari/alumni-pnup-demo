import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BERITA } from "@/data/site";

export const metadata: Metadata = { title: "Berita", description: "Kabar terbaru dari IKA PNUP." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Kabar almamater</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Berita & informasi</h1>
      <Link href="/galeri" className="mt-3 inline-block font-semibold underline decoration-gold decoration-2 underline-offset-4">Lihat galeri kegiatan →</Link>
      <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BERITA.map((b) => (
          <li key={b.slug}>
            <Link href={`/berita/${b.slug}`} className="index-card group block h-full overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/15">
                <Image src={b.foto} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="kicker">{b.kategori} · {b.tanggal}</p>
                <h2 className="font-display mt-1 text-2xl font-semibold leading-tight group-hover:underline">{b.judul}</h2>
                <p className="mt-2 text-ink2">{b.ringkas}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
