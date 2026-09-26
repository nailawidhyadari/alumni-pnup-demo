import type { Metadata } from "next";
import { KarierList } from "@/components/KarierList";

export const metadata: Metadata = { title: "Karier & Magang", description: "Lowongan magang dan karier dari jejaring IKA PNUP." };

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
      <p className="kicker">Karier & magang</p>
      <h1 className="font-display mt-1 text-4xl font-semibold leading-tight md:text-6xl">Peluang dari jejaring alumni</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink2">Lowongan magang dan kerja yang dibuka lewat perusahaan mitra dan alumni di berbagai bidang.</p>
      <div className="mt-10">
        <KarierList />
      </div>
    </div>
  );
}
