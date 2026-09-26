"use client";

import { useSyncExternalStore } from "react";

export type Ukuran = "md" | "lg" | "xl";
type State = { size: Ukuran; favs: number[] };

const KEY = "ika-pnup-prefs-v1";
const DEFAULT: State = { size: "md", favs: [] };
let state: State = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state = {
        size: p.size === "lg" || p.size === "xl" ? p.size : "md",
        favs: Array.isArray(p.favs) ? p.favs.filter((n: unknown) => typeof n === "number") : [],
      };
    }
  } catch {}
}

function set(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePrefs() {
  const s = useSyncExternalStore(
    subscribe,
    () => {
      load();
      return state;
    },
    () => DEFAULT,
  );
  return {
    size: s.size,
    favs: s.favs,
    setSize: (size: Ukuran) => set({ ...state, size }),
    toggleFav: (id: number) =>
      set({ ...state, favs: state.favs.includes(id) ? state.favs.filter((f) => f !== id) : [...state.favs, id] }),
  };
}

export function toast(pesan: string) {
  window.dispatchEvent(new CustomEvent("ika-toast", { detail: pesan }));
}
