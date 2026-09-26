import type { Metadata } from "next";
import { AgendaList } from "@/components/AgendaList";

export const metadata: Metadata = { title: "Agenda", description: "Agenda kegiatan IKA PNUP: magang, pelatihan, dan jejaring bisnis alumni." };

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Kalender alumni</p>
      <h1 className="font-display mt-1 text-4xl font-bold leading-tight md:text-6xl">Agenda & kegiatan</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">Pertemuan, pelatihan, dan forum bisnis yang diselenggarakan bidang-bidang IKA PNUP. Simpan ke kalender agar tidak terlewat.</p>
      <div className="mt-10">
        <AgendaList />
      </div>
    </div>
  );
}
