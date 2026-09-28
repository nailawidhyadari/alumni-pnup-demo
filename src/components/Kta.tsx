import Image from "next/image";

export function Kta({ nama = "Nama Lengkap", jurusan = "Teknik Elektro", angkatan = "2015", nomor = "PNUP-2015-0142" }: { nama?: string; jurusan?: string; angkatan?: string; nomor?: string }) {
  return (
    <div className="relative aspect-[1.586/1] w-full overflow-hidden rounded-sm border border-ink bg-ink p-5 text-paper">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2.5 border-b border-paper/20 pb-3">
          <Image src="/img/logo-ika.png" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-full bg-paper" />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold">Kartu Tanda Alumni</p>
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-paper/60">IKA Politeknik Negeri Ujung Pandang</p>
          </div>
        </div>
        <div className="mt-auto">
          <p className="font-display text-2xl font-medium leading-tight sm:text-[1.7rem]">{nama}</p>
          <p className="mt-1 text-sm text-paper/75">{jurusan} · Angkatan {angkatan}</p>
          <p className="mt-3 flex items-end justify-between text-[0.7rem] tracking-[0.18em] text-gold">
            <span>{nomor}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
