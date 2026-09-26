"use client";

import dynamic from "next/dynamic";

export const MapLazy = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-72 w-full place-items-center rounded-md border-[1.5px] border-ink bg-paper2 text-mute">Memuat peta…</div>
  ),
});
