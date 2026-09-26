"use client";

import { Icon } from "./Icon";
import { toast, usePrefs } from "@/lib/prefs";

export function FavButton({ id, nama, compact = false }: { id: number; nama: string; compact?: boolean }) {
  const { favs, toggleFav } = usePrefs();
  const on = favs.includes(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Hapus ${nama} dari simpanan` : `Simpan ${nama}`}
      onClick={() => {
        toggleFav(id);
        toast(on ? "Dihapus dari simpanan" : "Disimpan. Lihat lewat ikon hati di atas");
      }}
      className={`${compact ? "h-11 w-11" : "btn btn-line btn-sm"} inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/70 font-semibold transition-colors ${
        on ? "!border-stamp !bg-stamp text-white" : "hover:bg-ink/8"
      }`}
    >
      <Icon name="heart" className={on ? "fill-current" : ""} />
      {!compact && (on ? "Tersimpan" : "Simpan")}
    </button>
  );
}

export function ShareButton({ judul, path, compact = false }: { judul: string; path: string; compact?: boolean }) {
  return (
    <button
      type="button"
      aria-label={`Bagikan ${judul}`}
      onClick={async () => {
        const url = new URL(path, window.location.origin).toString();
        try {
          if (navigator.share) {
            await navigator.share({ title: judul, url });
            return;
          }
          await navigator.clipboard.writeText(url);
          toast("Tautan disalin");
        } catch {
          toast("Tautan: " + url);
        }
      }}
      className={`${compact ? "h-11 w-11" : "btn btn-line btn-sm"} inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/70 font-semibold hover:bg-ink/8`}
    >
      <Icon name="share" />
      {!compact && "Bagikan"}
    </button>
  );
}
