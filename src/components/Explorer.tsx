"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { MapLazy } from "./MapLazy";
import { VendorCard } from "./VendorCard";
import { GRUP, JURUSAN, VENDORS, type Grup } from "@/data/vendors";
import { KOTA, jarakKm, type Titik } from "@/lib/geo";
import { ratingSim } from "@/data/ulasan";
import { toast, usePrefs } from "@/lib/prefs";

const MIN_TH = 1990;
const MAX_TH = 2026;
const RADIUS = [10, 25, 50, 100, 250];
const SARAN = ["HVAC", "halal", "umrah", "traktor", "internet", "abon", "kacamata"];

type Urut = "dekat" | "baru" | "nama" | "angkatan" | "rating";

const norm = (s: string) => s.toLowerCase();

export function Explorer() {
  const sp = useSearchParams();
  const { favs } = usePrefs();

  const kotaAwal = KOTA.find((k) => k.label.toLowerCase().startsWith((sp.get("kota") ?? "\0").toLowerCase()));
  const latP = Number(sp.get("lat"));
  const lngP = Number(sp.get("lng"));
  const originAwal: Titik | null = kotaAwal ?? (sp.get("lat") && sp.get("lng") && !isNaN(latP) && !isNaN(lngP) ? { label: "Lokasi kamu", lat: latP, lng: lngP } : null);
  const grupAwal = GRUP.find((g) => g.nama === sp.get("grup"))?.nama ?? null;

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [grup, setGrup] = useState<Grup | null>(grupAwal);
  const [jurusan, setJurusan] = useState<string[]>([]);
  const angP = Number(sp.get("angkatan"));
  const angOk = angP >= MIN_TH && angP <= MAX_TH;
  const [dari, setDari] = useState(angOk ? angP : MIN_TH);
  const [sampai, setSampai] = useState(angOk ? angP : MAX_TH);
  const [origin, setOrigin] = useState<Titik | null>(originAwal);
  const [radius, setRadius] = useState<number | null>(originAwal ? Number(sp.get("radius")) || 50 : null);
  const [urut, setUrut] = useState<Urut>(originAwal ? "dekat" : "baru");
  const [simpanan, setSimpanan] = useState(sp.get("simpanan") === "1");
  const [tampil, setTampil] = useState<"kartu" | "peta">("kartu");
  const [aktif, setAktif] = useState<number | null>(null);
  const [mencari, setMencari] = useState(false);
  const [filterBuka, setFilterBuka] = useState(false);

  const jarak = useMemo(() => {
    const m = new Map<number, number>();
    if (origin) VENDORS.forEach((v) => m.set(v.id, jarakKm(origin, v)));
    return m;
  }, [origin]);

  const hasil = useMemo(() => {
    const kata = norm(q).split(/\s+/).filter(Boolean);
    const list = VENDORS.filter((v) => {
      if (grup && v.grup !== grup) return false;
      if (jurusan.length && !(v.pemilik.jurusan && jurusan.includes(v.pemilik.jurusan))) return false;
      const a = v.pemilik.angkatan;
      if ((dari > MIN_TH || sampai < MAX_TH) && (a === undefined || a < dari || a > sampai)) return false;
      if (simpanan && !favs.includes(v.id)) return false;
      if (origin && radius && (jarak.get(v.id) ?? 0) > radius) return false;
      if (kata.length) {
        const hay = norm([v.judul, v.usaha, v.ringkas, v.sub, v.grup, v.kota, v.alamat, v.pemilik.nama, v.pemilik.jurusan ?? "", ...v.layanan].join(" "));
        if (!kata.every((k) => hay.includes(k))) return false;
      }
      return true;
    });
    const cmp: Record<Urut, (a: (typeof VENDORS)[0], b: (typeof VENDORS)[0]) => number> = {
      dekat: (a, b) => (jarak.get(a.id) ?? 0) - (jarak.get(b.id) ?? 0),
      baru: (a, b) => b.id - a.id,
      nama: (a, b) => a.judul.localeCompare(b.judul, "id"),
      rating: (a, b) => ratingSim(b.id).rata - ratingSim(a.id).rata,
      angkatan: (a, b) => (a.pemilik.angkatan ?? 9999) - (b.pemilik.angkatan ?? 9999),
    };
    return list.sort(cmp[urut === "dekat" && !origin ? "baru" : urut]);
  }, [q, grup, jurusan, dari, sampai, simpanan, favs, origin, radius, jarak, urut]);

  const jumlahGrup = (g: Grup) => VENDORS.filter((v) => v.grup === g).length;
  const histo = useMemo(() => {
    const h: number[] = [];
    for (let y = MIN_TH; y <= MAX_TH; y++) h.push(VENDORS.filter((v) => v.pemilik.angkatan === y).length);
    return h;
  }, []);
  const filterAktif = jurusan.length > 0 || dari > MIN_TH || sampai < MAX_TH || simpanan || !!origin || !!grup || !!q;

  const reset = () => {
    setQ("");
    setGrup(null);
    setJurusan([]);
    setDari(MIN_TH);
    setSampai(MAX_TH);
    setOrigin(null);
    setRadius(null);
    setSimpanan(false);
    setUrut("baru");
  };

  const pilihKota = (label: string) => {
    const k = KOTA.find((x) => x.label === label) ?? null;
    setOrigin(k);
    if (k) {
      setRadius((r) => r ?? 50);
      setUrut("dekat");
    } else {
      setRadius(null);
      setUrut("baru");
    }
  };

  const lokasiSaya = () => {
    if (!navigator.geolocation) return toast("Peramban ini tidak mendukung lokasi. Pilih kota saja.");
    setMencari(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setMencari(false);
        setOrigin({ label: "Lokasi kamu", lat: p.coords.latitude, lng: p.coords.longitude });
        setRadius((r) => r ?? 50);
        setUrut("dekat");
      },
      () => {
        setMencari(false);
        toast("Lokasi tidak bisa dibaca. Silakan pilih kota di daftar.");
      },
      { timeout: 8000, maximumAge: 600000 },
    );
  };

  const terdekatDiluar = origin && radius && hasil.length === 0 ? Math.min(...VENDORS.map((v) => jarak.get(v.id) ?? Infinity)) : null;

  const Panel = (
    <div className="space-y-7">
      <fieldset>
        <legend className="kicker mb-2">Jurusan alumni</legend>
        <div className="flex flex-wrap gap-2">
          {JURUSAN.map((j) => {
            const n = VENDORS.filter((v) => v.pemilik.jurusan === j).length;
            return (
              <button
                key={j}
                type="button"
                className="chip"
                aria-pressed={jurusan.includes(j)}
                disabled={n === 0}
                onClick={() => setJurusan((s) => (s.includes(j) ? s.filter((x) => x !== j) : [...s, j]))}
              >
                {j} <span className="text-[0.8rem] opacity-70">{n}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="kicker mb-1">Angkatan</legend>
        <p className="mb-1 text-[0.95rem] font-semibold" aria-live="polite">
          {dari === MIN_TH && sampai === MAX_TH ? "Semua angkatan" : `${dari} sampai ${sampai}`}
        </p>
        <div className="flex h-12 items-end gap-[2px]" aria-hidden="true">
          {histo.map((n, i) => {
            const y = MIN_TH + i;
            const dalam = y >= dari && y <= sampai;
            return <span key={y} className="flex-1 rounded-t-sm" style={{ height: n ? `${25 + n * 35}%` : "6%", background: n ? (dalam ? "var(--stamp)" : "var(--line-strong)") : "var(--line)" }} />;
          })}
        </div>
        <label className="sr-only" htmlFor="dari">Dari angkatan</label>
        <input id="dari" type="range" className="range" min={MIN_TH} max={MAX_TH} value={dari} onChange={(e) => setDari(Math.min(Number(e.target.value), sampai))} />
        <label className="sr-only" htmlFor="sampai">Sampai angkatan</label>
        <input id="sampai" type="range" className="range -mt-2" min={MIN_TH} max={MAX_TH} value={sampai} onChange={(e) => setSampai(Math.max(Number(e.target.value), dari))} />
        <div className="flex justify-between text-[0.8rem] text-mute">
          <span>{MIN_TH}</span>
          <span>{MAX_TH}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            ["1990-an", 1990, 1999],
            ["2000-an", 2000, 2009],
            ["2010-an", 2010, 2019],
          ].map(([l, a, b]) => (
            <button key={l as string} type="button" className="chip !min-h-9 !text-[0.85rem]" aria-pressed={dari === a && sampai === b} onClick={() => (setDari(a as number), setSampai(b as number))}>
              {l}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-3 text-[1rem] font-medium">
        <input type="checkbox" className="h-6 w-6 accent-[var(--ink)]" checked={simpanan} onChange={(e) => setSimpanan(e.target.checked)} />
        Hanya yang saya simpan ({favs.length})
      </label>

      {filterAktif && (
        <button type="button" className="btn btn-line btn-sm w-full" onClick={reset}>
          Hapus semua filter
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
      {/* pencarian */}
      <div className="rise mt-8">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" size={22} />
            <label htmlFor="cari" className="sr-only">Cari produk, jasa, atau nama alumni</label>
            <input
              id="cari"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari produk, jasa, nama usaha, atau alumni…"
              className="input !min-h-14 !rounded-full !border-2 !border-ink pl-12 text-[1.05rem]"
            />
          </div>
        </form>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.92rem] text-ink2">
          Coba cari:
          {SARAN.map((s) => (
            <button key={s} type="button" className="chip !min-h-8 !px-3 !text-[0.85rem]" onClick={() => setQ(s)}>
              {s}
            </button>
          ))}
        </p>
      </div>

      {/* alumni sekitarmu */}
      <section aria-labelledby="dekat" className="mt-6 rounded-md border-2 border-ink bg-forest p-5 text-paper shadow-[5px_5px_0_var(--gold)] md:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 id="dekat" className="font-display flex items-center gap-2.5 text-2xl font-bold">
              <Icon name="locate" size={26} /> Alumni sekitarmu
            </h2>
            <p className="mt-1 max-w-xl text-paper/85">Tunjukkan lokasi, dan usaha sesama alumni yang paling dekat akan muncul paling atas.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={lokasiSaya} disabled={mencari} className="btn btn-sm !border-paper !bg-paper text-ink hover:!bg-gold">
                <Icon name="locate" size={18} /> {mencari ? "Mencari lokasi…" : "Pakai lokasi saya"}
              </button>
              <span className="text-paper/70">atau</span>
              <div className="flex-1 sm:max-w-64">
                <label htmlFor="kota" className="sr-only">Pilih kota</label>
                <select id="kota" className="input !min-h-10 !border-paper/40 !bg-paper !py-1.5 text-ink" value={origin && KOTA.some((k) => k.label === origin.label) ? origin.label : ""} onChange={(e) => pilihKota(e.target.value)}>
                  <option value="">{origin?.label === "Lokasi kamu" ? "Lokasi kamu (GPS)" : "Pilih kota…"}</option>
                  {KOTA.map((k) => (
                    <option key={k.label} value={k.label}>{k.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {origin && (
            <div>
              <p className="mb-2 text-sm font-semibold">Dalam radius</p>
              <div className="flex flex-wrap gap-2">
                {RADIUS.map((r) => (
                  <button key={r} type="button" aria-pressed={radius === r} onClick={() => setRadius(r)} className="chip !border-paper/60 !text-paper hover:!bg-paper/15 aria-pressed:!bg-paper aria-pressed:!text-ink">
                    {r} km
                  </button>
                ))}
                <button type="button" aria-pressed={radius === null} onClick={() => setRadius(null)} className="chip !border-paper/60 !text-paper hover:!bg-paper/15 aria-pressed:!bg-paper aria-pressed:!text-ink">
                  Semua
                </button>
              </div>
            </div>
          )}
        </div>
        {origin && (
          <p className="mt-4 flex flex-wrap items-center gap-3 border-t border-paper/30 pt-3 text-[0.95rem]">
            <span>
              Dari <strong>{origin.label}</strong>. Jarak dihitung garis lurus, bukan rute jalan.
            </span>
            <button type="button" className="underline underline-offset-4" onClick={() => (setOrigin(null), setRadius(null), setUrut("baru"))}>
              Matikan
            </button>
          </p>
        )}
      </section>

      {/* kategori */}
      <div role="tablist" aria-label="Kategori" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0">
        <button role="tab" aria-selected={grup === null} className="chip shrink-0" onClick={() => setGrup(null)}>
          Semua <span className="opacity-70">{VENDORS.length}</span>
        </button>
        {GRUP.map((g) => {
          const n = jumlahGrup(g.nama);
          return (
            <button key={g.nama} role="tab" aria-selected={grup === g.nama} disabled={n === 0} title={n === 0 ? "Belum ada usaha di kategori ini" : g.ket} className="chip shrink-0" onClick={() => setGrup(g.nama)}>
              {g.nama} <span className="opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[17.5rem_1fr]">
        {/* filter */}
        <aside className="lg:sticky lg:top-40 lg:self-start">
          <button type="button" className="btn btn-line w-full lg:hidden" aria-expanded={filterBuka} onClick={() => setFilterBuka(!filterBuka)}>
            <Icon name="filter" /> {filterBuka ? "Tutup filter" : "Filter jurusan & angkatan"}
          </button>
          <div className={`${filterBuka ? "mt-4 block" : "hidden"} rounded-md border-[1.5px] border-ink bg-card p-5 lg:mt-0 lg:block`}>
            <h2 className="font-display mb-4 hidden text-xl font-bold lg:block">Saring</h2>
            {Panel}
          </div>
        </aside>

        {/* hasil */}
        <section aria-live="polite" aria-label="Hasil pencarian">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg">
              <strong className="font-display text-3xl">{hasil.length}</strong> usaha ditemukan
              {origin && radius ? <span className="text-mute"> dalam {radius} km</span> : null}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-[0.95rem] font-medium">
                Urutkan
                <select className="input !min-h-10 !w-auto !py-1" value={origin ? urut : urut === "dekat" ? "baru" : urut} onChange={(e) => setUrut(e.target.value as Urut)}>
                  {origin && <option value="dekat">Terdekat</option>}
                  <option value="baru">Terbaru</option>
                  <option value="rating">Rating tertinggi</option>
                  <option value="nama">Nama A–Z</option>
                  <option value="angkatan">Angkatan tertua</option>
                </select>
              </label>
              <div role="group" aria-label="Cara tampil" className="flex rounded-full border-2 border-ink p-0.5">
                {(
                  [
                    ["kartu", "list", "Kartu"],
                    ["peta", "map", "Peta"],
                  ] as const
                ).map(([k, ic, l]) => (
                  <button key={k} type="button" aria-pressed={tampil === k} onClick={() => setTampil(k)} className={`flex min-h-10 items-center gap-1.5 rounded-full px-4 font-semibold ${tampil === k ? "bg-ink text-paper" : ""}`}>
                    <Icon name={ic} size={18} /> {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasil.length === 0 ? (
            <div className="index-card p-8 text-center">
              <p className="font-display text-3xl font-bold">Belum ada yang cocok</p>
              <p className="mx-auto mt-2 max-w-md text-ink2">
                {terdekatDiluar !== null && isFinite(terdekatDiluar)
                  ? `Usaha alumni terdekat berjarak sekitar ${Math.ceil(terdekatDiluar)} km dari ${origin?.label}. Coba perluas radius.`
                  : "Coba kata kunci lain, atau kurangi filter yang aktif."}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {terdekatDiluar !== null && isFinite(terdekatDiluar) && (
                  <button type="button" className="btn btn-ink" onClick={() => setRadius(null)}>Tampilkan semua jarak</button>
                )}
                <button type="button" className="btn btn-line" onClick={reset}>Hapus semua filter</button>
              </div>
            </div>
          ) : tampil === "kartu" ? (
            <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
              {hasil.map((v, i) => (
                <li key={v.id} className="rise" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                  <VendorCard v={v} jarak={origin ? jarak.get(v.id) : undefined} priority={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
              <div className="h-[26rem] xl:sticky xl:top-40 xl:h-[36rem] xl:self-start">
                <MapLazy vendors={hasil} activeId={aktif} onSelect={setAktif} origin={origin} radiusKm={radius} height="100%" />
              </div>
              <ol className="space-y-3">
                {hasil.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => setAktif(v.id)}
                      aria-pressed={aktif === v.id}
                      className={`index-card w-full p-3.5 text-left ${aktif === v.id ? "!border-stamp" : ""}`}
                      data-active={aktif === v.id}
                    >
                      <span className="text-[0.78rem] font-bold uppercase tracking-wide text-stamp">
                        Angkatan {v.pemilik.angkatan ?? "—"} · {v.kota}
                        {origin && ` · ± ${Math.round(jarak.get(v.id) ?? 0)} km`}
                      </span>
                      <span className="font-display mt-0.5 block text-lg font-bold leading-snug">{v.judul}</span>
                      <span className="block text-[0.92rem] text-ink2">{v.usaha}</span>
                      {aktif === v.id && (
                        <span className="mt-2 flex gap-2">
                          <Link href={`/marketplace/${v.id}`} className="btn btn-ink btn-sm">Lihat profil</Link>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
