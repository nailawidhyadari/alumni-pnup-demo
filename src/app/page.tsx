import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { Icon } from "@/components/Icon";
import { MapLazy } from "@/components/MapLazy";
import { Photo } from "@/components/Photo";
import { Stamp } from "@/components/Stamp";
import { VendorCard } from "@/components/VendorCard";
import { AGENDA, BERITA, GALERI, LOWONGAN, ORG, PENGURUS_INTI } from "@/data/site";
import { GRUP, VENDORS, vendorById } from "@/data/vendors";

const ROMAWI = ["I", "II", "III", "IV", "V"];

const tgl = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return { hari: d.toLocaleDateString("id-ID", { day: "2-digit" }), bulan: d.toLocaleDateString("id-ID", { month: "short" }).toUpperCase(), tahun: d.getFullYear() };
};

function Judul({ kicker, judul, href, label }: { kicker: string; judul: string; href?: string; label?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="font-display mt-1 text-3xl font-bold leading-tight md:text-4xl">{judul}</h2>
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-2 font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:text-forest">
          {label} <Icon name="arrow" size={18} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const hero = [vendorById(1)!, vendorById(2)!, vendorById(12)!];
  const kota = [...VENDORS.reduce((m, v) => m.set(v.kota, (m.get(v.kota) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]);
  const angkatan = [...VENDORS.reduce((m, v) => (v.pemilik.angkatan ? m.set(v.pemilik.angkatan, (m.get(v.pemilik.angkatan) ?? 0) + 1) : m), new Map<number, number>())].sort((a, b) => a[0] - b[0]);
  const baru = VENDORS.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:py-20">
          <div className="rise">
            <p className="kicker">Marketplace resmi keluarga besar alumni</p>
            <h1 className="font-display mt-3 text-[2.7rem] font-bold leading-[1.02] tracking-tight md:text-7xl">
              Beli, pesan, dan bermitra dengan <em className="text-stamp">sesama alumni</em> PNUP.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink2 md:text-xl">
              Dari kontraktor sampai abon ikan, dari layanan internet sampai paket umrah. Semua dijalankan lulusan kampus yang sama. Kenali usahanya, lihat angkatannya, lalu hubungi langsung.
            </p>
            <div className="mt-8 max-w-xl">
              <HeroSearch />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-xl md:block lg:max-w-none" aria-label="Contoh usaha alumni">
            <div className="relative mx-auto h-[40rem] w-full max-w-[34rem]">
              {hero.map((v, i) => {
                const pos = ["left-0 top-0 rotate-[-4deg] w-[60%]", "right-0 top-44 rotate-[3.5deg] w-[54%] z-10", "left-[12%] bottom-0 rotate-[-1.5deg] w-[60%] z-20"][i];
                return (
                  <Link key={v.id} href={`/marketplace/${v.id}`} className={`index-card group absolute block overflow-hidden ${pos} hover:!rotate-0 hover:z-30`}>
                    <div className="relative aspect-[16/10] border-b-[1.5px] border-ink bg-paper2">
                      <Photo v={v} sizes="22rem" priority={i === 0} />
                      <Stamp angkatan={v.pemilik.angkatan} size={54} className="absolute bottom-1 right-2 translate-y-1/3" />
                    </div>
                    <div className="p-3.5 pt-4">
                      <p className="text-[0.72rem] font-bold uppercase tracking-wide text-mute">{v.kota} · {v.pemilik.jurusan}</p>
                      <p className="font-display text-lg font-bold leading-tight">{v.judul}</p>
                    </div>
                  </Link>
                );
              })}
              <div aria-hidden className="absolute -right-2 bottom-6 z-0 h-40 w-40 rounded-full border-2 border-dashed border-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* ANGKA */}
      <section className="border-b-2 border-ink bg-ink text-paper" aria-label="Ringkasan">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 text-center md:grid-cols-4 lg:px-8">
          {[
            [VENDORS.length, "usaha alumni"],
            [angkatan.length, "angkatan tercatat"],
            [kota.length, "kota & kabupaten"],
            [GRUP.length, "kategori"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <dd className="font-display text-5xl font-bold text-gold">{n}</dd>
              <dt className="mt-1 text-paper/80">{l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* KATEGORI */}
      <section className="mx-auto max-w-7xl px-4 pt-20 lg:px-8" aria-labelledby="kat">
        <Judul kicker="Daftar isi" judul="Cari menurut kebutuhan" href="/marketplace" label="Lihat semua usaha" />
        <h2 id="kat" className="sr-only">Kategori</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {GRUP.map((g, i) => {
            const n = VENDORS.filter((v) => v.grup === g.nama).length;
            return (
              <li key={g.nama}>
                <Link
                  href={n ? `/marketplace?grup=${encodeURIComponent(g.nama)}` : "/marketplace"}
                  className="index-card flex h-full flex-col p-5"
                  aria-label={`${g.nama}, ${n} usaha`}
                >
                  <span className="font-display text-4xl font-bold italic text-goldink">{ROMAWI[i]}.</span>
                  <span className="font-display mt-3 text-xl font-bold leading-tight">{g.nama}</span>
                  <span className="mt-1 text-[0.92rem] text-ink2">{g.ket}</span>
                  <span className="mt-auto pt-5 text-sm font-bold uppercase tracking-wider text-stamp">{n ? `${n} usaha` : "Segera hadir"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* USAHA TERBARU */}
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-label="Usaha terbaru">
        <Judul kicker="Halaman terbaru" judul="Baru bergabung di marketplace" href="/marketplace" label="Buka marketplace" />
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {baru.map((v) => (
            <li key={v.id}>
              <VendorCard v={v} />
            </li>
          ))}
        </ul>
      </section>

      {/* PETA */}
      <section className="mt-24 border-y-2 border-ink bg-paper2" aria-labelledby="peta">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="kicker">Peta jejaring</p>
            <h2 id="peta" className="font-display mt-1 text-3xl font-bold leading-tight md:text-4xl">Alumni membuka usaha di seluruh Sulawesi Selatan</h2>
            <p className="mt-4 text-lg text-ink2">
              Angka di tiap pin adalah dua digit terakhir tahun angkatan pemiliknya. Klik pin untuk membaca ringkasannya, atau buka marketplace untuk mencari yang paling dekat denganmu.
            </p>
            <ul className="mt-6 space-y-2">
              {kota.map(([k, n]) => (
                <li key={k}>
                  <Link href={`/marketplace?kota=${encodeURIComponent(k)}&radius=25`} className="group flex items-center justify-between gap-3 border-b border-ink/25 py-2 text-lg hover:border-ink">
                    <span className="flex items-center gap-2.5"><Icon name="pin" size={18} className="text-stamp" />{k}</span>
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

      {/* LINTAS ANGKATAN */}
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="angkatan">
        <Judul kicker="Buku tahunan" judul="Lintas angkatan, satu almamater" />
        <h2 id="angkatan" className="sr-only">Angkatan</h2>
        <ul className="flex flex-wrap items-start justify-center gap-x-10 gap-y-10 md:justify-between">
          {angkatan.map(([a, n], i) => (
            <li key={a} style={{ transform: `translateY(${i % 2 ? 14 : 0}px)` }}>
              <Link href={`/marketplace?angkatan=${a}`} className="group flex flex-col items-center gap-3" aria-label={`Angkatan ${a}, ${n} usaha`}>
                <Stamp angkatan={a} size={104} className="transition-transform group-hover:!rotate-0 group-hover:scale-105" />
                <span className="text-sm font-semibold text-ink2">{n} usaha</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CARA KERJA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="cara">
        <Judul kicker="Mudah untuk semua usia" judul="Tiga langkah, tanpa aplikasi tambahan" />
        <h2 id="cara" className="sr-only">Cara memakai</h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {[
            ["Cari", "Ketik kebutuhan, atau saring menurut jurusan, angkatan, dan kota. Ukuran huruf bisa diperbesar dari pojok kanan atas."],
            ["Kenali", "Baca profil usaha, lihat kartu alumni pemiliknya, dan cek lokasinya di peta sebelum menghubungi."],
            ["Hubungi", "Sekali ketuk, WhatsApp terbuka dengan pesan pembuka yang sudah terisi. Tinggal kirim."],
          ].map(([j, t], i) => (
            <li key={j} className="flex gap-5">
              <span className="font-display text-7xl font-bold leading-none text-gold">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-bold">{j}</h3>
                <p className="mt-1.5 text-lg text-ink2">{t}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* AGENDA + KARIER */}
      <section className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-14 px-4 lg:grid-cols-2 lg:px-8">
        <div aria-labelledby="ag">
          <Judul kicker="Kalender alumni" judul="Agenda mendatang" href="/agenda" label="Semua agenda" />
          <h2 id="ag" className="sr-only">Agenda</h2>
          <ul className="space-y-4">
            {AGENDA.map((a) => {
              const t = tgl(a.tanggal);
              return (
                <li key={a.id}>
                  <Link href={`/agenda#a${a.id}`} className="index-card flex items-stretch gap-4 p-3">
                    <div className="grid w-20 shrink-0 place-items-center rounded-sm bg-ink py-2 text-center text-paper">
                      <div>
                        <div className="font-display text-3xl font-bold leading-none">{t.hari}</div>
                        <div className="text-xs font-bold tracking-widest text-gold">{t.bulan} {t.tahun}</div>
                      </div>
                    </div>
                    <div className="py-1">
                      <p className="font-display text-xl font-bold leading-tight">{a.judul}</p>
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
          <ul className="space-y-4">
            {LOWONGAN.map((l) => (
              <li key={l.id}>
                <Link href={`/karier#l${l.id}`} className="index-card flex items-center gap-4 p-3">
                  <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-sm border border-ink/20 bg-white">
                    <Image src={l.logo} alt="" width={64} height={64} className="h-full w-full object-contain p-1" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-lg font-bold leading-tight">{l.posisi}</span>
                    <span className="block truncate text-[0.92rem] text-ink2">{l.perusahaan}</span>
                    <span className="mt-1 inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-wide text-forest"><Icon name="briefcase" size={14} /> {l.tipe} · {l.kota}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BERITA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8" aria-labelledby="br">
        <Judul kicker="Kabar almamater" judul="Berita terbaru" href="/berita" label="Semua berita" />
        <h2 id="br" className="sr-only">Berita</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Link href={`/berita/${BERITA[0].slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border-2 border-ink">
              <Image src={BERITA[0].foto} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <p className="kicker mt-4">{BERITA[0].kategori} · {BERITA[0].tanggal}</p>
            <h3 className="font-display mt-1 text-3xl font-bold leading-tight group-hover:underline">{BERITA[0].judul}</h3>
            <p className="mt-2 text-lg text-ink2">{BERITA[0].ringkas}</p>
          </Link>
          <ul className="space-y-6">
            {BERITA.slice(1).map((b) => (
              <li key={b.slug}>
                <Link href={`/berita/${b.slug}`} className="group flex gap-4">
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded border-[1.5px] border-ink sm:h-28 sm:w-40">
                    <Image src={b.foto} alt="" fill sizes="10rem" className="object-cover" />
                  </div>
                  <div>
                    <p className="kicker">{b.kategori} · {b.tanggal}</p>
                    <h3 className="font-display mt-0.5 text-xl font-bold leading-snug group-hover:underline">{b.judul}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PENGURUS + KUTIPAN */}
      <section className="mt-24 bg-ink text-paper" aria-labelledby="pg">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="kicker !text-gold">Pengurus periode {ORG.periode}</p>
              <blockquote className="font-display mt-3 text-4xl font-bold italic leading-tight md:text-5xl">
                “Alumni bukan sekadar masa lalu, tetapi kekuatan untuk masa depan.”
              </blockquote>
              <p className="mt-4 text-paper/70">IKA Poltek</p>
              <Link href="/tentang" className="btn mt-8 !border-paper !bg-paper text-ink hover:!bg-gold">Kenali pengurus</Link>
            </div>
            <div>
              <h2 id="pg" className="sr-only">Pengurus inti</h2>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
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

      {/* GALERI */}
      <section className="mx-auto max-w-7xl px-4 pt-20 lg:px-8" aria-labelledby="gl">
        <Judul kicker="Dokumentasi" judul="Galeri kegiatan" />
        <h2 id="gl" className="sr-only">Galeri</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {GALERI.map((g, i) => (
            <li key={g.src} className={i % 2 ? "md:mt-8" : ""}>
              <figure className="index-card overflow-hidden p-2 pb-3" style={{ transform: `rotate(${[-1.2, 1, -0.6][i]}deg)` }}>
                <div className="relative aspect-[4/3]">
                  <Image src={g.src} alt={g.cap} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="font-display mt-2.5 px-1 italic">{g.cap}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-24 lg:px-8">
        <div className="relative overflow-hidden rounded-md border-2 border-ink bg-gold p-8 shadow-[8px_8px_0_var(--ink)] md:p-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Punya usaha? Perkenalkan ke keluarga besar alumni.</h2>
            <p className="mt-3 text-lg">Isi formulir singkat, lihat pratinjau kartu usahamu langsung, lalu kirim untuk diverifikasi pengurus.</p>
            <Link href="/daftar-usaha" className="btn btn-ink mt-7">Daftarkan usaha saya <Icon name="arrow" size={18} /></Link>
          </div>
          <Stamp angkatan={2026} size={150} className="absolute -right-4 -top-4 hidden opacity-70 md:grid" />
        </div>
      </section>
    </>
  );
}
