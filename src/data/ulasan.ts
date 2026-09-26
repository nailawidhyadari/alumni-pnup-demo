export type UlasanSim = { nama: string; bintang: number; teks: string; tgl: string };

// Ulasan simulasi untuk keperluan demo tampilan. Nama reviewer fiktif, bukan testimoni asli.
export const ULASAN_SIM: Record<number, UlasanSim[]> = {
  13: [
    { nama: "Bu Ratna (contoh)", bintang: 5, teks: "Penjelasan teknisnya runtut dan mudah dipahami. Jadwal pemasangan sesuai janji.", tgl: "12 September 2026" },
    { nama: "Pak Darwis (contoh)", bintang: 4, teks: "Respons cepat saat konsultasi awal. Penawaran dirinci per item sehingga mudah dibandingkan.", tgl: "28 Agustus 2026" },
  ],
  12: [
    { nama: "Kak Nita (contoh)", bintang: 5, teks: "Dibantu dari nol sampai NIB terbit. Pendamping sabar menjelaskan berkas yang perlu disiapkan.", tgl: "20 September 2026" },
    { nama: "Pak Ahmad (contoh)", bintang: 5, teks: "Proses sertifikat halal untuk usaha kecil kami jadi jauh lebih jelas.", tgl: "5 September 2026" },
    { nama: "Ibu Sari (contoh)", bintang: 4, teks: "Balasan WhatsApp cepat. Sebaiknya ada panduan tertulis di awal.", tgl: "1 September 2026" },
  ],
  11: [
    { nama: "Andi (contoh)", bintang: 5, teks: "Rendangnya empuk, bumbunya pas. Cocok untuk makan siang keluarga.", tgl: "18 September 2026" },
    { nama: "Kak Ilma (contoh)", bintang: 4, teks: "Porsi banyak, pesanan untuk acara kantor diantar tepat waktu.", tgl: "9 September 2026" },
  ],
  10: [
    { nama: "Pak Hamid (contoh)", bintang: 5, teks: "Pemeriksaan matanya teliti, kacamata jadi dalam dua hari. Pelayanannya ramah untuk orang tua.", tgl: "21 September 2026" },
    { nama: "Bu Yanti (contoh)", bintang: 4, teks: "Pilihan frame lumayan banyak dan harganya jelas.", tgl: "10 September 2026" },
  ],
  9: [
    { nama: "Kak Rudi (contoh)", bintang: 5, teks: "Tempatnya adem di tepi tambak, pas untuk singgah setelah perjalanan jauh.", tgl: "14 September 2026" },
    { nama: "Bu Halimah (contoh)", bintang: 4, teks: "Ikan bakarnya segar. Saat akhir pekan agak ramai, datang lebih awal.", tgl: "30 Agustus 2026" },
  ],
  8: [
    { nama: "Pak Yusuf (contoh)", bintang: 5, teks: "Suku cadang sesuai nomor part yang diminta, pengiriman antar pulau aman.", tgl: "16 September 2026" },
    { nama: "Pak Bambang (contoh)", bintang: 4, teks: "Stok cukup lengkap. Harga bisa dinegosiasi untuk pembelian banyak.", tgl: "2 September 2026" },
  ],
  7: [
    { nama: "Bu Lisa (contoh)", bintang: 4, teks: "Instalasi rapi dan tim teknis mudah dihubungi ketika ada gangguan.", tgl: "19 September 2026" },
    { nama: "Pak Anwar (contoh)", bintang: 5, teks: "Kualitas koneksi stabil untuk kebutuhan kantor kami.", tgl: "3 September 2026" },
  ],
  6: [
    { nama: "Ibu Hasna (contoh)", bintang: 5, teks: "Manasik dijelaskan pelan-pelan, cocok untuk jamaah lansia.", tgl: "11 September 2026" },
    { nama: "Pak Rahmat (contoh)", bintang: 4, teks: "Jadwal keberangkatan jelas sejak awal. Berkas dibantu sampai selesai.", tgl: "24 Agustus 2026" },
  ],
  5: [
    { nama: "Pak Mansur (contoh)", bintang: 4, teks: "Dipakai di sawah kami satu musim, daun tampak lebih hijau. Sosialisasi caranya membantu.", tgl: "8 September 2026" },
  ],
  4: [
    { nama: "Pak Haji Sakka (contoh)", bintang: 5, teks: "Unit tersedia, layanan servis dan suku cadang ada di dekat lokasi kami.", tgl: "15 September 2026" },
    { nama: "Kelompok Tani Maju (contoh)", bintang: 4, teks: "Skema kredit dijelaskan detail. Demo unit di lapangan sangat membantu.", tgl: "1 September 2026" },
  ],
  2: [
    { nama: "Kak Dian (contoh)", bintang: 5, teks: "Abonnya gurih, seratnya lembut, tidak terlalu berminyak. Dijadikan oleh-oleh.", tgl: "17 September 2026" },
    { nama: "Bu Wati (contoh)", bintang: 5, teks: "Anak-anak suka. Kemasannya rapi dan tahan lama.", tgl: "6 September 2026" },
    { nama: "Pak Irwan (contoh)", bintang: 4, teks: "Rasa enak. Semoga ada ukuran kemasan lebih kecil.", tgl: "27 Agustus 2026" },
  ],
  1: [
    { nama: "Bu Fitri (contoh)", bintang: 5, teks: "Sistem administrasi kami dibuatkan sesuai alur kerja, bukan sekadar template.", tgl: "13 September 2026" },
    { nama: "Pak Anton (contoh)", bintang: 4, teks: "Komunikasi tim jelas dan progres dilaporkan berkala.", tgl: "29 Agustus 2026" },
  ],
};

export function ratingSim(id: number) {
  const l = ULASAN_SIM[id] ?? [];
  return { n: l.length, rata: l.length ? l.reduce((a, b) => a + b.bintang, 0) / l.length : 0 };
}
