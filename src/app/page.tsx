import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { Icon } from "@/components/Icon";
import { Kta } from "@/components/Kta";
import { MapLazy } from "@/components/MapLazy";
import { CountUp, Reveal } from "@/components/Motion";
import { VendorCard } from "@/components/VendorCard";
import { AGENDA, BERITA, GALERI, LOWONGAN, ORG, PENGURUS_INTI, TOTAL_PENGURUS } from "@/data/site";
import { GRUP, VENDORS } from "@/data/vendors";

const ROMAWI = ["I", "II", "III", "IV", "V"];

const tgl = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return { hari: d.toLocaleDateString("id-ID", { day: "2-digit" }), bulan: d.toLocaleDateString("id-ID", { month: "short" }).toUpperCase(), tahun: d.getFullYear() };
};

function Judul({ kicker, judul, href, label }: { kicker: string; judul: string; href?: string; label?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="font-display mt-1 text-3xl font-semibold leading-tight md:text-4xl">{judul}</h2>
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-2 font-semibold underline decoration-goldink decoration-2 underline-offset-4 hover:text-goldink">
          {label} <Icon name="arrow" size={18} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const kota = [...VENDORS.reduce((m, v) => m.set(v.kota, (m.get(v.kota) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]);
  const angkatan = [...VENDORS.reduce((m, v) => (v.pemilik.angkatan ? m.set(v.pemilik.angkatan, (m.get(v.pemilik.angkatan) ?? 0) + 1) : m), new Map<number, number>())].sort((a, b) => a[0] - b[0]);
  const baru = VENDORS.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[34rem] items-center overflow-hidden border-b border-ink lg:min-h-[38rem]">
        <div className="absolute inset-0">
          <Image src="/img/news/foto-bersama.jpg" alt="" fill priority sizes="100vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,30,.82)_0%,rgba(23,25,30,.72)_45%,rgba(23,25,30,.88)_100%)]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="kicker rise !text-gold">Marketplace resmi keluarga besar alumni</p>
            <h1 className="rise font-display mt-3 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-paper md:text-6xl" style={{ animationDelay: "80ms" }}>
              Beli, pesan, dan bermitra dengan sesama alumni PNUP.
            </h1>
            <p className="rise mt-5 max-w-xl text-lg text-paper/85 md:text-xl" style={{ animationDelay: "160ms" }}>
              Dari kontraktor sampai abon ikan, dari layanan internet sampai paket umrah. Semua dijalankan lulusan kampus yang sama. Kenali usahanya, lihat angkatannya, lalu hubungi langsung.
            </p>
            <div className="rise mt-8 max-w-xl" style={{ animationDelay: "240ms" }}>
              <HeroSearch />
            </div>
          </div>

          <dl className="rise hidden shrink-0 grid-cols-2 gap-x-8 gap-y-6 border border-ink bg-card px-7 py-6 lg:grid" style={{ animationDelay: "300ms" }} aria-label="Ringkasan marketplace">
            {[
              [VENDORS.length, "usaha alumni"],
              [angkatan.length, "angkatan tercatat"],
              [kota.length, "kota & kabupaten"],
              [TOTAL_PENGURUS, "pengurus periode ini"],
            ].map(([n, l]) => (
              <div key={l as string}>
                <dd className="font-display text-4xl font-semibold text-ink"><CountUp to={n as number} /></dd>
                <dt className="mt-1 text-[0.85rem] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ANGKA (hp & tablet; di layar besar sudah tampil di dalam hero) */}
      <section className="border-b border-ink border-t-2 border-t-goldink bg-ink text-paper lg:hidden" aria-label="Ringkasan">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 text-center md:grid-cols-4 lg:px-8">
          {[
            [VENDORS.length, "usaha alumni"],
            [angkatan.length, "angkatan tercatat"],
            [kota.length, "kota & kabupaten"],
            [TOTAL_PENGURUS, "pengurus periode ini"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <dd className="font-display text-5xl font-semibold"><CountUp to={n as number} /></dd>
              <dt className="mt-1 text-paper/75">{l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* KATEGORI */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-20 lg:px-8" aria-labelledby="kat">
        <Judul kicker="Daftar isi" judul="Cari menurut kebutuhan" href="/marketplace" label="Lihat semua usaha" />
        <h2 id="kat" className="sr-only">Kategori</h2>
        <ul className="st grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {GRUP.map((g, i) => {
            const n = VENDORS.filter((v) => v.grup === g.nama).length;
            return (
              <li key={g.nama}>
                <Link
                  href={n ? `/marketplace?grup=${encodeURIComponent(g.nama)}` : "/marketplace"}
                  className="index-card flex h-full flex-col p-5"
                  aria-label={`${g.nama}, ${n} usaha`}
                >
                  <span className="font-display text-4xl font-semibold text-goldink">{ROMAWI[i]}.</span>
                  <span className="font-display mt-3 text-xl font-semibold leading-tight">{g.nama}</span>
                  <span className="mt-1 text-[0.92rem] text-ink2">{g.ket}</span>
                  <span className="mt-auto pt-5 text-sm font-bold uppercase tracking-wider text-ink2">{n ? `${n} usaha` : "Segera hadir"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      </Reveal>

      {/* USAHA TERBARU */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-label="Usaha terbaru">
        <Judul kicker="Halaman terbaru" judul="Baru bergabung di marketplace" href="/marketplace" label="Buka marketplace" />
        <ul className="st grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {baru.map((v) => (
            <li key={v.id}>
              <VendorCard v={v} />
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      {/* PETA */}
      <Reveal>
      <section className="mt-24 border-y border-ink bg-paper2" aria-labelledby="peta">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="kicker">Peta jejaring</p>
            <h2 id="peta" className="font-display mt-1 text-3xl font-semibold leading-tight md:text-4xl">Alumni membuka usaha di seluruh Sulawesi Selatan</h2>
            <p className="mt-4 text-lg text-ink2">
              Angka di tiap pin adalah dua digit terakhir tahun angkatan pemiliknya. Klik pin untuk membaca ringkasannya, atau buka marketplace untuk mencari yang paling dekat denganmu.
            </p>
            <ul className="mt-6 space-y-2">
              {kota.map(([k, n]) => (
                <li key={k}>
                  <Link href={`/marketplace?kota=${encodeURIComponent(k)}&radius=25`} className="group flex items-center justify-between gap-3 border-b border-ink/25 py-2 text-lg hover:border-ink">
                    <span className="flex items-center gap-2.5"><Icon name="pin" size={18} className="text-goldink" />{k}</span>
                    <span className="flex items-center gap-2 font-bold">{n} usaha <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[28rem] lg:h-auto lg:min-h-[32rem]">
            <MapLazy vendors={VENDORS} height="100%" />
          </div>
        </div>
      </section>
      </Reveal>

      {/* LINTAS ANGKATAN */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="angkatan">
        <Judul kicker="Buku induk" judul="Lintas angkatan, satu almamater" />
        <h2 id="angkatan" className="sr-only">Angkatan</h2>
        <ul className="st flex flex-wrap gap-3">
          {angkatan.map(([a, n]) => (
            <li key={a}>
              <Link href={`/marketplace?angkatan=${a}`} className="group flex items-baseline gap-2 border border-ink px-4 py-2.5 hover:bg-ink hover:text-paper" aria-label={`Angkatan ${a}, ${n} usaha`}>
                <span className="font-display text-xl font-semibold">{a}</span>
                <span className="text-sm text-mute group-hover:text-paper/70">{n} usaha</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      {/* CARA KERJA */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="cara">
        <Judul kicker="Mudah untuk semua usia" judul="Tiga langkah, tanpa aplikasi tambahan" />
        <h2 id="cara" className="sr-only">Cara memakai</h2>
        <ol className="st grid gap-8 md:grid-cols-3">
          {[
            ["Cari", "Ketik kebutuhan, atau saring menurut jurusan, angkatan, dan kota. Ukuran huruf bisa diperbesar dari pojok kanan atas."],
            ["Kenali", "Baca profil usaha, lihat kartu alumni pemiliknya, dan cek lokasinya di peta sebelum menghubungi."],
            ["Hubungi", "Sekali ketuk, WhatsApp terbuka dengan pesan pembuka yang sudah terisi. Tinggal kirim."],
          ].map(([j, t], i) => (
            <li key={j} className="flex gap-5">
              <span className="font-display text-6xl font-semibold leading-none text-goldink">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold">{j}</h3>
                <p className="mt-1.5 text-lg text-ink2">{t}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      </Reveal>

      {/* KTA */}
      <Reveal>
      <section className="mx-auto mt-24 max-w-7xl px-4 lg:px-8" aria-labelledby="kta">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker">Keanggotaan</p>
            <h2 id="kta" className="font-display mt-1 text-3xl font-semibold leading-tight md:text-5xl">Satu kartu untuk seluruh keluarga alumni</h2>
            <p className="mt-4 text-lg text-ink2">
              Kartu Tanda Alumni menjadi identitas dan simbol kebersamaan, sekaligus dasar pendataan alumni yang lebih tertata. Kartu diserahkan perdana kepada wisudawan pada wisuda pertama 2026.
            </p>
            <ul className="mt-5 space-y-2 text-lg">
              {["Identitas resmi alumni PNUP", "Terhubung dengan database dan jejaring lintas angkatan", "Diserahkan langsung pada momen wisuda"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white"><Icon name="check" size={14} /></span>{t}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/daftar-alumni" className="btn btn-ink">Daftar alumni <Icon name="arrow" size={18} /></Link>
              <Link href="/berita/kartu-keanggotaan-alumni-terbaru" className="btn btn-line">Baca beritanya</Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md"><Kta nama="Nama Alumni" /></div>
        </div>
      </section>
      </Reveal>

      {/* AGENDA + KARIER */}
      <Reveal>
      <section className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-14 px-4 lg:grid-cols-2 lg:px-8">
        <div aria-labelledby="ag">
          <Judul kicker="Kalender alumni" judul="Agenda mendatang" href="/agenda" label="Semua agenda" />
          <h2 id="ag" className="sr-only">Agenda</h2>
          <ul className="st space-y-4">
            {AGENDA.map((a) => {
              const t = tgl(a.tanggal);
              return (
                <li key={a.id}>
                  <Link href={`/agenda#a${a.id}`} className="index-card flex items-stretch gap-4 p-3">
                    <div className="grid w-20 shrink-0 place-items-center rounded-sm bg-ink py-2 text-center text-paper">
                      <div>
                        <div className="font-display text-3xl font-semibold leading-none">{t.hari}</div>
                        <div className="text-xs font-bold tracking-widest text-gold">{t.bulan} {t.tahun}</div>
                      </div>
                    </div>
                    <div className="py-1">
                      <p className="font-display text-xl font-semibold leading-tight">{a.judul}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[0.92rem] text-ink2"><Icon name="clock" size={16} /> {a.jam} WITA · {a.tempat}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div aria-labelledby="kr">
          <Judul kicker="Karier & magang" judul="Lowongan dari jejaring alumni" href="/karier" label="Semua lowongan" />
          <h2 id="kr" className="sr-only">Lowongan</h2>
          <ul className="st space-y-4">
            {LOWONGAN.map((l) => (
              <li key={l.id}>
                <Link href={`/karier#l${l.id}`} className="index-card flex items-center gap-4 p-3">
                  <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-sm border border-ink/20 bg-white">
                    <Image src={l.logo} alt="" width={64} height={64} className="h-full w-full object-contain p-1" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-lg font-semibold leading-tight">{l.posisi}</span>
                    <span className="block truncate text-[0.92rem] text-ink2">{l.perusahaan}</span>
                    <span className="mt-1 inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-wide text-ink2"><Icon name="briefcase" size={14} /> {l.tipe} · {l.kota}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      {/* BERITA */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="br">
        <Judul kicker="Kabar almamater" judul="Berita terbaru" href="/berita" label="Semua berita" />
        <h2 id="br" className="sr-only">Berita</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Link href={`/berita/${BERITA[0].slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden border border-ink">
              <Image src={BERITA[0].foto} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <p className="kicker mt-4">{BERITA[0].kategori} · {BERITA[0].tanggal}</p>
            <h3 className="font-display mt-1 text-3xl font-semibold leading-tight group-hover:underline">{BERITA[0].judul}</h3>
            <p className="mt-2 text-lg text-ink2">{BERITA[0].ringkas}</p>
          </Link>
          <ul className="st space-y-6">
            {BERITA.slice(1).map((b) => (
              <li key={b.slug}>
                <Link href={`/berita/${b.slug}`} className="group flex gap-4">
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden border border-ink sm:h-28 sm:w-40">
                    <Image src={b.foto} alt="" fill sizes="10rem" className="object-cover" />
                  </div>
                  <div>
                    <p className="kicker">{b.kategori} · {b.tanggal}</p>
                    <h3 className="font-display mt-0.5 text-xl font-semibold leading-snug group-hover:underline">{b.judul}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      {/* PENGURUS + KUTIPAN */}
      <Reveal>
      <section className="mt-24 bg-ink text-paper" aria-labelledby="pg">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="kicker !text-gold">Pengurus periode {ORG.periode}</p>
              <blockquote className="font-display mt-3 text-4xl font-semibold italic leading-tight md:text-5xl">
                “Alumni bukan sekadar masa lalu, tetapi kekuatan untuk masa depan.”
              </blockquote>
              <p className="mt-4 text-paper/70">IKA Poltek</p>
              <Link href="/tentang" className="btn mt-8 !border-paper !bg-paper text-ink hover:!bg-gold">Kenali pengurus</Link>
            </div>
            <div>
              <h2 id="pg" className="sr-only">Pengurus inti</h2>
              <ul className="st grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {PENGURUS_INTI.map((p) => (
                  <li key={p.nama} className="border-t border-paper/30 pt-3">
                    <p className="text-sm font-bold uppercase tracking-wider text-gold">{p.jabatan}</p>
                    <p className="font-display text-xl font-semibold">{p.nama}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* GALERI */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-20 lg:px-8" aria-labelledby="gl">
        <Judul kicker="Dokumentasi" judul="Galeri kegiatan" href="/galeri" label="Semua foto" />
        <h2 id="gl" className="sr-only">Galeri</h2>
        <ul className="st grid gap-5 md:grid-cols-3">
          {GALERI.slice(0, 3).map((g) => (
            <li key={g.src}>
              <figure className="index-card overflow-hidden p-2 pb-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={g.src} alt={g.cap} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="font-display mt-2.5 px-1 italic">{g.cap}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden border border-ink border-t-2 border-t-goldink bg-ink text-paper lg:grid-cols-[1.3fr_1fr]">
          <div className="p-8 md:p-14">
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">Punya usaha? Perkenalkan ke keluarga besar alumni.</h2>
            <p className="mt-3 text-lg text-paper/85">Isi formulir singkat, lihat pratinjau kartu usahamu langsung, lalu kirim untuk diverifikasi pengurus.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/daftar-usaha" className="btn !border-paper !bg-paper text-ink hover:!bg-gold">Daftarkan usaha saya <Icon name="arrow" size={18} /></Link><Link href="/daftar-alumni" className="btn !border-paper text-paper hover:!bg-paper hover:text-ink">Daftar sebagai alumni</Link></div>
          </div>
          <div className="relative min-h-64 border-t border-paper/15 lg:min-h-0 lg:border-l lg:border-t-0">
            <Image src="/img/vendor/12.png" alt="" fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      </Reveal>
    </>
  );
}
