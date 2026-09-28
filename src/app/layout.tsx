import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToastHost } from "@/components/Toast";
import "./globals.css";

const display = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"], weight: ["500", "600", "700"] });
const sans = Public_Sans({ variable: "--font-public", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Marketplace Alumni IKA PNUP", template: "%s · IKA PNUP" },
  description:
    "Temukan produk, jasa, dan mitra bisnis dari alumni Politeknik Negeri Ujung Pandang. Cari berdasarkan angkatan, jurusan, dan lokasi terdekat. Demo konsep desain.",
  robots: { index: false },
};

export const viewport: Viewport = { themeColor: "#1c1a17", width: "device-width", initialScale: 1 };

const initSize = `try{var p=JSON.parse(localStorage.getItem("ika-pnup-prefs-v1")||"{}");if(p.size)document.documentElement.dataset.size=p.size}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initSize }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#isi" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Lompat ke isi halaman
        </a>
        <Effects />
        <Header />
        <main id="isi">{children}</main>
        <Footer />
        <ToastHost />
      </body>
    </html>
  );
}
