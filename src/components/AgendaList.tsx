"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";
import { ShareButton } from "./Actions";
import { AGENDA, type Agenda } from "@/data/site";
import { toast } from "@/lib/prefs";

const subscribe = () => () => {};
const hariIni = () => new Date().toISOString().slice(0, 10);

function ics(a: Agenda) {
  const mulai = a.tanggal.replace(/-/g, "") + "T" + a.jam.replace(":", "") + "00";
  const [h, m] = a.jam.split(":").map(Number);
  const akhir = a.tanggal.replace(/-/g, "") + "T" + String(Math.min(h + 2, 23)).padStart(2, "0") + String(m).padStart(2, "0") + "00";
  const teks = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IKA PNUP//Agenda//ID",
    "BEGIN:VEVENT",
    `UID:agenda-${a.id}@ikapoltek.id`,
    `DTSTART;TZID=Asia/Makassar:${mulai}`,
    `DTEND;TZID=Asia/Makassar:${akhir}`,
    `SUMMARY:${a.judul}`,
    `LOCATION:${a.tempat}`,
    `DESCRIPTION:${a.ringkas}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([teks], { type: "text/calendar" }));
  const el = document.createElement("a");
  el.href = url;
  el.download = `${a.judul.replace(/\W+/g, "-").toLowerCase()}.ics`;
  el.click();
  URL.revokeObjectURL(url);
  toast("Agenda diunduh. Buka file untuk menambahkannya ke kalender");
}

export function AgendaList() {
  const today = useSyncExternalStore(subscribe, hariIni, () => "");
  const sisa = (iso: string) => {
    if (!today) return null;
    const d = Math.round((new Date(iso).getTime() - new Date(today).getTime()) / 86400000);
    return d;
  };

  return (
    <ol className="space-y-10">
      {AGENDA.map((a, i) => {
        const d = new Date(a.tanggal + "T00:00:00");
        const s = sisa(a.tanggal);
        return (
          <li key={a.id} id={`a${a.id}`} className="index-card no-grow scroll-mt-40 overflow-hidden md:grid md:grid-cols-[1fr_1.15fr]">
            <div className={`relative aspect-[16/10] border-b border-ink md:aspect-auto md:border-b-0 md:border-r ${i % 2 ? "md:order-2 md:border-l md:border-r-0" : ""}`}>
              <Image src={a.foto} alt={a.judul} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
              <div className="absolute left-4 top-4 w-20 overflow-hidden rounded-sm border border-ink bg-card text-center shadow-[0_12px_28px_-16px_rgba(19,36,65,0.45)]">
                <div className="bg-ink py-0.5 text-xs font-bold uppercase tracking-widest text-white">{d.toLocaleDateString("id-ID", { month: "short" })}</div>
                <div className="font-display text-4xl font-semibold leading-tight">{d.getDate()}</div>
                <div className="pb-1 text-xs font-semibold">{d.getFullYear()}</div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="kicker">{a.bidang}</p>
              <h2 className="font-display mt-1 text-3xl font-semibold leading-tight">{a.judul}</h2>
              <p className="font-display mt-2 text-lg italic text-forest">{a.tagline}</p>
              <ul className="mt-4 space-y-1.5 text-[1.02rem]">
                <li className="flex items-center gap-2"><Icon name="calendar" size={18} />{d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</li>
                <li className="flex items-center gap-2"><Icon name="clock" size={18} />{a.jam} WITA</li>
                <li className="flex items-center gap-2"><Icon name="pin" size={18} />{a.tempat}</li>
              </ul>
              {s !== null && s > 0 && (
                <p className="mt-4 inline-block rounded-sm border border-ink px-3 py-1 text-[0.9rem] font-semibold">{s} hari lagi</p>
              )}
              <div className="mt-4 space-y-3 text-ink2">
                {a.isi.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button type="button" className="btn btn-ink btn-sm" onClick={() => ics(a)}>
                  <Icon name="download" size={18} /> Tambah ke kalender
                </button>
                <ShareButton judul={a.judul} path={`/agenda#a${a.id}`} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
