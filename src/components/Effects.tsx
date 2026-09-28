"use client";

import { useEffect } from "react";

/** Satu-satunya efek global: garis tipis penanda kemajuan baca di bagian atas layar. */
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress" aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1400] h-[2px] w-full origin-left scale-x-0 bg-goldink" />;
}
