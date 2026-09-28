import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavButton, ShareButton } from "@/components/Actions";
import { Icon } from "@/components/Icon";
import { MapLazy } from "@/components/MapLazy";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { VendorCard } from "@/components/VendorCard";
import { VENDORS, inisial, vendorById, waLink } from "@/data/vendors";

export function generateStaticParams() {
  return VENDORS.map((v) => ({ id: String(v.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const v = vendorById(Number((await params).id));
  return v ? { title: `${v.judul}, ${v.usaha}`, description: v.ringkas } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const v = vendorById(Number((await params).id));
  if (!v) notFound();
  const mirip = VENDORS.filter((x) => x.id !== v.id && (x.grup === v.grup || x.kota === v.kota)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
      <nav aria-label="Jejak halaman" className="text-sm text-mute">
        <Link href="/" className="hover:underline">Beranda</Link> / <Link href="/marketplace" className="hover:underline">Marketplace</Link> / {v.grup}
      </nav>
      <Link href="/marketplace" className="mt-3 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
        <Icon name="arrowleft" size={18} /> Kembali ke daftar
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-ink">
            <Photo v={v} sizes="(min-width:1024px) 55vw, 100vw" priority />
          </div>

          <p className="kicker mt-8">
            No. {String(v.id).padStart(3, "0")} · {v.grup} · {v.sub}
          </p>
          <h1 className="font-display mt-1 text-4xl font-semibold leading-[1.08] md:text-5xl">{v.judul}</h1>
          <p className="mt-2 text-xl font-medium text-ink2">{v.usaha}</p>

          <div className="mt-6 space-y-4 text-[1.1rem] leading-relaxed">
            {v.deskripsi.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {v.layanan.length > 0 && (
            <section className="mt-9" aria-labelledby="layanan">
              <h2 id="layanan" className="font-display text-2xl font-semibold">Layanan & keunggulan</h2>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {v.layanan.map((l) => (
                  <li key={l} className="flex gap-3 rounded-sm border border-ink/20 bg-card p-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white">
                      <Icon name="check" size={14} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {v.portofolio && (
            <section className="mt-9" aria-labelledby="porto">
              <h2 id="porto" className="font-display text-2xl font-semibold">Portofolio & tautan</h2>
              <p className="mt-2 text-[1.05rem]">
                {v.portofolio.href ? (
                  <a href={v.portofolio.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-4">
                    <Icon name="link" size={18} /> {v.portofolio.teks}
                  </a>
                ) : (
                  v.portofolio.teks
                )}
              </p>
            </section>
          )}

          <Reviews vendorId={v.id} />
        </div>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          {/* kartu alumni */}
          <div className="index-card no-grow overflow-hidden">
            <div className="flex items-center justify-between bg-ink px-5 py-2.5 text-paper">
              <span className="kicker !text-gold">Kartu alumni</span>
              <span className="text-xs tracking-widest">IKA PNUP</span>
            </div>
            <div className="relative p-5">
              <div className="flex items-start gap-4">
                <div aria-hidden className="font-display grid h-20 w-20 shrink-0 place-items-center rounded-full border border-ink bg-ink text-paper text-3xl font-semibold">
                  {inisial(v.pemilik.nama)}
                </div>
                <div className="min-w-0 pt-1">
                  <p className="font-display text-2xl font-semibold leading-tight">{v.pemilik.nama}</p>
                  <p className="text-ink2">{v.pemilik.jabatan}, {v.usaha}</p>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.98rem]">
                <div>
                  <dt className="kicker">Jurusan</dt>
                  <dd className="font-semibold">{v.pemilik.jurusan ?? "—"}</dd>
                </div>
                <div>
                  <dt className="kicker">Angkatan</dt>
                  <dd className="font-semibold">{v.pemilik.angkatan ?? "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="kicker">Alamat</dt>
                  <dd className="font-semibold">{v.alamat}</dd>
                </div>
              </dl>
            </div>
            <div className="space-y-3 border-t border-ink bg-card p-5">
              <a href={waLink(v)} target="_blank" rel="noreferrer" className="btn btn-wa w-full !min-h-14 text-lg">
                <Icon name="wa" size={22} /> Pesan sekarang lewat WhatsApp
              </a>
              <div className="flex gap-2.5">
                <FavButton id={v.id} nama={v.judul} />
                <ShareButton judul={v.judul} path={`/marketplace/${v.id}`} />
              </div>
              <p className="text-[0.85rem] text-mute">Pesan pembuka sudah terisi otomatis. Nomor pribadi tidak ditampilkan di halaman.</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-display mb-2 text-xl font-semibold">Lokasi</h2>
            <div className="h-64">
              <MapLazy vendors={[v]} height="100%" />
            </div>
            <p className="mt-2 text-[0.85rem] text-mute">Titik peta menunjukkan perkiraan kawasan, bukan alamat presisi.</p>
          </div>
        </aside>
      </div>

      {mirip.length > 0 && (
        <section className="mt-20" aria-labelledby="mirip">
          <h2 id="mirip" className="font-display text-3xl font-semibold">Usaha alumni lainnya</h2>
          <ul className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {mirip.map((m) => (
              <li key={m.id}>
                <VendorCard v={m} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
