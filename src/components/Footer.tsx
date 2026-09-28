import Image from "next/image";
import Link from "next/link";
import { ORG } from "@/data/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/img/logo-ika.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full bg-paper" />
            <p className="font-display text-2xl font-semibold">{ORG.nama}</p>
          </div>
          <p className="mt-4 max-w-md text-paper/80">{ORG.lengkap}. {ORG.slogan}</p>
          <p className="mt-6 max-w-md rounded-lg border border-paper/25 p-3 text-sm text-paper/70">
            Halaman ini adalah demo konsep desain marketplace alumni. Data usaha, berita, dan pengurus disalin dari{" "}
            <a className="underline" href="https://ikapoltek.id" target="_blank" rel="noreferrer">ikapoltek.id</a> untuk contoh. Ulasan dan form hanya tersimpan di peramban Anda.
          </p>
        </div>
        <div>
          <p className="kicker !text-gold">Jelajahi</p>
          <ul className="mt-4 space-y-2.5 text-lg">
            {[
              ["/marketplace", "Marketplace alumni"],
              ["/alumni", "Direktori alumni"],
              ["/karier", "Karier & magang"],
              ["/agenda", "Agenda kegiatan"],
              ["/berita", "Berita"],
              ["/galeri", "Galeri kegiatan"],
              ["/daftar-alumni", "Daftar alumni"],
              ["/tentang", "Tentang & pengurus"],
              ["/daftar-usaha", "Daftarkan usaha"],
            ].map(([h, l]) => (
              <li key={h}>
                <Link href={h} className="hover:text-gold hover:underline">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker !text-gold">Kontak</p>
          <ul className="mt-4 space-y-3 text-lg">
            <li className="flex gap-2.5"><Icon name="pin" className="mt-1.5" />{ORG.kota}</li>
            <li className="flex gap-2.5"><Icon name="mail" className="mt-1.5" />{ORG.email}</li>
            <li className="flex gap-2.5"><Icon name="link" className="mt-1.5" />{ORG.web}</li>
            <li>
              <a href={ORG.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline decoration-gold underline-offset-4 hover:text-gold">
                Instagram @ika_pnup
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20 px-4 py-5 text-center text-sm text-paper/60">
        © 2026 {ORG.lengkap}. Konsep desain oleh Naila.
      </div>
    </footer>
  );
}
