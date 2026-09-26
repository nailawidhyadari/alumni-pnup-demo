"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { usePrefs, type Ukuran } from "@/lib/prefs";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/alumni", label: "Direktori" },
  { href: "/karier", label: "Karier" },
  { href: "/agenda", label: "Agenda" },
  { href: "/berita", label: "Berita" },
  { href: "/tentang", label: "Tentang" },
];

const UKURAN: { v: Ukuran; label: string; cls: string }[] = [
  { v: "md", label: "Huruf normal", cls: "text-[0.85rem]" },
  { v: "lg", label: "Huruf besar", cls: "text-[1.05rem]" },
  { v: "xl", label: "Huruf sangat besar", cls: "text-[1.3rem]" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { size, setSize, favs } = usePrefs();

  useEffect(() => {
    document.documentElement.dataset.size = size;
  }, [size]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const aktif = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
    <div className="bg-ink px-4 py-1.5 text-center text-[0.78rem] text-paper/85">
      Demo konsep desain. Isi diambil dari{" "}
      <a href="https://ikapoltek.id/?page=vendor" className="underline decoration-gold underline-offset-2" target="_blank" rel="noreferrer">
        ikapoltek.id
      </a>
      , bukan situs resmi.
    </div>
    <header className="sticky top-0 z-[1100] border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/img/logo-ika.png" alt="" width={48} height={48} className="h-11 w-11 rounded-full" priority />
          <span className="leading-tight">
            <span className="font-display block text-xl font-semibold tracking-tight">IKA PNUP</span>
            <span className="hidden text-[0.72rem] font-medium text-mute sm:block">Ikatan Alumni Politeknik Negeri Ujung Pandang</span>
          </span>
        </Link>

        <nav aria-label="Menu utama" className="ml-6 hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={aktif(n.href) ? "page" : undefined}
              className={`border-b-2 px-3 py-2 text-[0.95rem] font-semibold transition-colors hover:border-ink/40 ${
                aktif(n.href) ? "border-ink" : "border-transparent"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div role="group" aria-label="Ukuran huruf" className="hidden items-center rounded-sm border border-ink/70 p-0.5 sm:flex">
            {UKURAN.map((u) => (
              <button
                key={u.v}
                type="button"
                aria-label={u.label}
                aria-pressed={size === u.v}
                onClick={() => setSize(u.v)}
                className={`font-display grid h-9 w-9 place-items-center rounded-sm font-bold leading-none ${u.cls} ${
                  size === u.v ? "bg-ink text-paper" : "hover:bg-ink/10"
                }`}
              >
                A
              </button>
            ))}
          </div>
          <Link
            href="/marketplace?simpanan=1"
            aria-label={`Usaha tersimpan, ${favs.length} usaha`}
            className="relative grid h-11 w-11 place-items-center rounded-sm border border-ink/70 hover:bg-ink/8"
          >
            <Icon name="heart" />
            {favs.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-stamp px-1 text-[0.7rem] font-bold text-white">
                {favs.length}
              </span>
            )}
          </Link>
          <Link href="/daftar-usaha" className="btn btn-ink btn-sm hidden whitespace-nowrap lg:inline-flex">
            Daftarkan usaha
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-sm border border-ink xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="absolute inset-x-0 top-full h-[calc(100dvh-4.75rem)] overflow-y-auto border-t-2 border-ink bg-paper px-5 pb-10 pt-4 xl:hidden">
          <nav aria-label="Menu seluler" className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={aktif(n.href) ? "page" : undefined}
                className={`font-display flex items-center justify-between border-b border-ink/20 py-4 text-2xl font-semibold ${aktif(n.href) ? "text-stamp" : ""}`}
              >
                {n.label}
                <Icon name="arrow" />
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <p className="kicker mb-2">Ukuran huruf</p>
            <div className="flex gap-2">
              {UKURAN.map((u) => (
                <button key={u.v} type="button" aria-pressed={size === u.v} onClick={() => setSize(u.v)} className="chip flex-1 justify-center !min-h-12">
                  <span className={`font-display font-bold ${u.cls}`}>A</span>
                  <span className="text-sm">{u.v === "md" ? "Normal" : u.v === "lg" ? "Besar" : "Sangat besar"}</span>
                </button>
              ))}
            </div>
          </div>
          <Link href="/daftar-usaha" onClick={() => setOpen(false)} className="btn btn-ink mt-6 w-full">
            Daftarkan usaha
          </Link>
        </div>
      )}
    </header>
    </>
  );
}
