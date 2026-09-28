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
      {msg && <div className="rise pointer-events-auto rounded-sm border border-ink bg-ink px-5 py-3 text-[0.95rem] font-semibold text-paper shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)]">{msg}</div>}
    </div>
  );
}
