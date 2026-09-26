import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/Actions";
import { Icon } from "@/components/Icon";
import { BERITA } from "@/data/site";

export const generateStaticParams = () => BERITA.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = BERITA.find((x) => x.slug === slug);
  return b ? { title: b.judul, description: b.ringkas } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = BERITA.find((x) => x.slug === slug);
  if (!b) notFound();
  const lain = BERITA.filter((x) => x.slug !== b.slug);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <Link href="/berita" className="inline-flex items-center gap-2 font-semibold hover:underline"><Icon name="arrowleft" size={18} /> Semua berita</Link>
      <p className="kicker mt-6">{b.kategori} · {b.tanggal}</p>
      <h1 className="font-display mt-2 text-4xl font-semibold leading-[1.1] md:text-5xl">{b.judul}</h1>
      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-sm border border-ink shadow-[0_12px_28px_-16px_rgba(19,36,65,0.45)]">
        <Image src={b.foto} alt="" fill sizes="48rem" className="object-cover" priority />
      </div>
      <div className="mt-8 space-y-5 text-[1.15rem] leading-[1.75]">
        {b.isi.map((p, i) => (
          <p key={i} className={i === 0 ? "first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85]" : ""}>
            {p}
          </p>
        ))}
      </div>
      <div className="mt-8"><ShareButton judul={b.judul} path={`/berita/${b.slug}`} /></div>
      <hr className="my-12 border-ink/30" />
      <h2 className="font-display text-2xl font-semibold">Berita lainnya</h2>
      <ul className="mt-4 space-y-3">
        {lain.map((x) => (
          <li key={x.slug}>
            <Link href={`/berita/${x.slug}`} className="flex items-center justify-between gap-4 border-b border-ink/25 py-3 text-lg hover:text-forest">
              <span className="font-display font-semibold">{x.judul}</span>
              <Icon name="arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
