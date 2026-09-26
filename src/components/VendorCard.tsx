"use client";

import Link from "next/link";
import { Icon } from "./Icon";
import { FavButton } from "./Actions";
import { Photo } from "./Photo";
import { Stamp } from "./Stamp";
import { type Vendor, waLink } from "@/data/vendors";
import { ratingSim } from "@/data/ulasan";
import { formatJarak } from "@/lib/geo";

export function VendorCard({
  v,
  jarak,
  aktif = false,
  onHover,
  priority = false,
}: {
  v: Vendor;
  jarak?: number;
  aktif?: boolean;
  onHover?: (id: number | null) => void;
  priority?: boolean;
}) {
  return (
    <article
      className="index-card tilt group flex h-full flex-col overflow-hidden"
      data-active={aktif}
      onMouseEnter={() => onHover?.(v.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink bg-paper2">
        <Photo v={v} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" priority={priority} />
        <span className="absolute left-0 top-3 border-y border-r border-ink bg-ink px-2.5 py-0.5 text-paper text-[0.72rem] font-bold uppercase tracking-wider">
          {v.grup === "Perdagangan & Distribusi" ? "Distribusi" : v.grup === "Bisnis & Profesional" ? "Profesional" : v.grup}
        </span>
        {v.baru && <span className="absolute right-3 top-3 rounded-sm bg-forest px-2.5 py-0.5 text-[0.72rem] font-bold uppercase tracking-wider text-white">Baru</span>}
        <Stamp angkatan={v.pemilik.angkatan} size={62} className="absolute -bottom-0.5 right-3 translate-y-1/3" />
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-mute">
          No. {String(v.id).padStart(3, "0")} · {v.sub}
        </p>
        <h3 className="font-display mt-1 text-[1.4rem] font-semibold leading-tight">
          <Link href={`/marketplace/${v.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-3 focus-visible:after:outline-forest">
            {v.judul}
          </Link>
        </h3>
        <p className="mt-0.5 font-medium text-ink2">{v.usaha}</p>
        {(() => {
          const r = ratingSim(v.id);
          return r.n ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-[0.9rem]" title="Rating simulasi untuk demo">
              <Icon name="star" size={16} className="fill-current text-gold" />
              <strong>{r.rata.toFixed(1).replace(".", ",")}</strong>
              <span className="text-mute">· {r.n} ulasan contoh</span>
            </p>
          ) : null;
        })()}
        <p className="mt-2 line-clamp-2 text-[0.95rem] text-ink2">{v.ringkas}</p>
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem] text-ink2">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Lokasi</dt>
            <Icon name="pin" size={16} />
            <dd>
              {v.kota}
              {jarak !== undefined && <strong className="ml-1.5 rounded bg-forest px-1.5 py-0.5 text-[0.78rem] text-white">± {formatJarak(jarak)}</strong>}
            </dd>
          </div>
          {v.pemilik.jurusan && (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Jurusan</dt>
              <Icon name="book" size={16} />
              <dd>{v.pemilik.jurusan}</dd>
            </div>
          )}
        </dl>
        <div className="relative z-10 mt-auto flex items-center gap-2 pt-4">
          <a href={waLink(v)} target="_blank" rel="noreferrer" className="btn btn-wa btn-sm flex-1">
            <Icon name="wa" size={18} /> Hubungi
          </a>
          <FavButton id={v.id} nama={v.judul} compact />
        </div>
      </div>
    </article>
  );
}
