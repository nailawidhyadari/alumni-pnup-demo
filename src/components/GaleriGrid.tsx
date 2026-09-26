"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { GALERI } from "@/data/site";

export function GaleriGrid() {
  const [i, setI] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const n = GALERI.length;

  const tutup = useCallback(() => {
    setI(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (i === null) return;
    closeRef.current?.focus();
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowRight") setI((x) => (x === null ? x : (x + 1) % n));
      if (e.key === "ArrowLeft") setI((x) => (x === null ? x : (x - 1 + n) % n));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", on);
    return () => {
      window.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [i, n, tutup]);

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {GALERI.map((g, k) => (
          <li key={g.src} className="break-inside-avoid">
            <button
              type="button"
              className="index-card group block w-full overflow-hidden text-left"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setI(k);
              }}
              aria-label={`Perbesar foto: ${g.cap}`}
            >
              <span className="relative block overflow-hidden">
                <Image src={g.src} alt={g.cap} width={900} height={640} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-paper opacity-0 transition group-hover:bg-ink/35 group-hover:opacity-100">
                  <Icon name="search" size={34} />
                </span>
              </span>
              <span className="font-display block px-4 py-3 text-lg font-medium">{g.cap}</span>
            </button>
          </li>
        ))}
      </ul>

      {i !== null && (
        <div role="dialog" aria-modal="true" aria-label={GALERI[i].cap} className="fixed inset-0 z-[1300] grid place-items-center bg-ink/92 p-4" onClick={tutup}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] max-h-[72vh] w-full">
              <Image key={GALERI[i].src} src={GALERI[i].src} alt={GALERI[i].cap} fill sizes="90vw" className="rise object-contain" priority />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 text-paper">
              <div>
                <p className="font-display text-2xl font-medium">{GALERI[i].cap}</p>
                <p className="mt-1 text-paper/75">{GALERI[i].ket}</p>
              </div>
              <p className="shrink-0 pt-1 text-sm tabular-nums text-paper/70">{i + 1} / {n}</p>
            </div>
            <button ref={closeRef} type="button" onClick={tutup} aria-label="Tutup" className="absolute -top-3 right-0 grid h-11 w-11 place-items-center rounded-sm bg-paper text-ink hover:bg-gold sm:-right-3">
              <Icon name="close" />
            </button>
            <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Foto sebelumnya" className="absolute left-0 top-[36%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-sm bg-paper/90 text-ink hover:bg-gold sm:-left-6">
              <Icon name="arrowleft" />
            </button>
            <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Foto berikutnya" className="absolute right-0 top-[36%] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-sm bg-paper/90 text-ink hover:bg-gold sm:-right-6">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
