import Image from "next/image";
import type { Vendor } from "@/data/vendors";
import { inisial } from "@/data/vendors";

export function Photo({ v, sizes, priority = false }: { v: Pick<Vendor, "foto" | "fit" | "usaha" | "judul" | "id">; sizes: string; priority?: boolean }) {
  if (!v.foto) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-forest text-paper" role="img" aria-label={`Foto ${v.usaha} belum tersedia`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,.5) 14px 15px)" }} />
        <span className="font-display relative text-7xl font-semibold italic">{inisial(v.usaha)}</span>
      </div>
    );
  }
  return (
    <>
      {v.fit === "contain" && <Image src={v.foto} alt="" fill sizes="120px" className="scale-125 object-cover opacity-50 blur-2xl" aria-hidden />}
      <Image
        src={v.foto}
        alt={`${v.judul}, ${v.usaha}`}
        fill
        sizes={sizes}
        priority={priority}
        className={v.fit === "cover" ? "object-cover" : "object-contain p-4"}
      />
    </>
  );
}
