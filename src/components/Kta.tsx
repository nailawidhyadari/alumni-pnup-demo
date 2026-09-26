import Image from "next/image";

export function Kta({ nama = "Nama Lengkap", jurusan = "Teknik Elektro", angkatan = "2015", nomor = "PNUP-2015-0142" }: { nama?: string; jurusan?: string; angkatan?: string; nomor?: string }) {
  return (
    <div className="relative aspect-[1.586/1] w-full overflow-hidden rounded-lg bg-ink p-5 text-paper shadow-[0_24px_40px_-24px_rgba(15, 47, 43,0.7)] transition-transform duration-500 hover:[transform:perspective(900px)_rotateX(4deg)_rotateY(-6deg)_scale(1.03)]">
      <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 14px)" }} />
      <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-gold/60" />
      <div aria-hidden className="absolute -right-4 -top-4 h-44 w-44 rounded-full border border-gold/30" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2.5">
          <Image src="/img/logo-ika.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-paper" />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold">Kartu Tanda Alumni</p>
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold">IKA Politeknik Negeri Ujung Pandang</p>
          </div>
        </div>
        <div className="mt-auto">
          <p className="font-display text-2xl font-medium leading-tight sm:text-[1.7rem]">{nama}</p>
          <p className="mt-1 text-sm text-paper/80">{jurusan} · Angkatan {angkatan}</p>
          <p className="mt-3 text-[0.7rem] tracking-[0.2em] text-gold">{nomor}</p>
        </div>
      </div>
    </div>
  );
}
