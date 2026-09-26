"use client";

import { useEffect, useState } from "react";

export function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 3200);
    };
    window.addEventListener("ika-toast", on);
    return () => {
      window.removeEventListener("ika-toast", on);
      clearTimeout(t);
    };
  }, []);
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-5 z-[1200] flex justify-center px-4">
      {msg && <div className="rise pointer-events-auto rounded-sm border border-ink bg-card px-5 py-3 text-[0.95rem] font-semibold shadow-[0_12px_28px_-16px_rgba(15, 47, 43,0.45)]">{msg}</div>}
    </div>
  );
}
