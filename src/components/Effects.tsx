"use client";

import { useEffect } from "react";

/** Efek global: bar kemajuan scroll, kartu miring mengikuti kursor, sorotan cahaya, dan paralaks ringan. */
export function Effects() {
  useEffect(() => {
    const bar = document.getElementById("progress");
    let tick = false;
    const onScroll = () => {
      if (tick || !bar) return;
      tick = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
        tick = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let cleanup = () => {};
    if (!reduce && fine) {
      const layers = () => document.querySelectorAll<HTMLElement>("[data-depth]");
      const onMove = (e: PointerEvent) => {
        const el = e.target as Element | null;
        const t = el?.closest?.<HTMLElement>(".tilt");
        if (t) {
          const r = t.getBoundingClientRect();
          t.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`);
          t.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 9}deg`);
        }
        const s = el?.closest?.<HTMLElement>(".spot");
        if (s) {
          const r = s.getBoundingClientRect();
          s.style.setProperty("--mx", `${e.clientX - r.left}px`);
          s.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers().forEach((l) => {
          const d = Number(l.dataset.depth) || 0;
          l.style.transform = `translate3d(${(-nx * d).toFixed(1)}px, ${(-ny * d).toFixed(1)}px, 0)`;
        });
      };
      const onOut = (e: PointerEvent) => {
        const t = (e.target as Element | null)?.closest?.<HTMLElement>(".tilt");
        if (t && !t.contains(e.relatedTarget as Node | null)) {
          t.style.setProperty("--rx", "0deg");
          t.style.setProperty("--ry", "0deg");
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerout", onOut);
      };
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      cleanup();
    };
  }, []);

  return <div id="progress" aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1400] h-[3px] w-full origin-left scale-x-0 bg-gold" />;
}
