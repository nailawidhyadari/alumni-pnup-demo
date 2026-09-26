export type Grup = "Produk" | "Jasa" | "Bisnis & Profesional" | "Perdagangan & Distribusi" | "Karier & Project";

export type Vendor = {
  id: number;
  judul: string;
  usaha: string;
  grup: Grup;
  sub: string;
  ringkas: string;
  deskripsi: string[];
  layanan: string[];
  portofolio?: { teks: string; href?: string };
  pemilik: { nama: string; jabatan: string; angkatan?: number; jurusan?: string; wa: string };
  kota: string;
  alamat: string;
  lat: number;
  lng: number;
  foto: string;
  fit: "cover" | "contain";
  baru?: boolean;
};

export const GRUP: { nama: Grup; ket: string }[] = [
  { nama: "Produk", ket: "Makanan, pertanian, kebutuhan sehari-hari" },
  { nama: "Jasa", ket: "Teknik, IT, perjalanan, perizinan" },
  { nama: "Bisnis & Profesional", ket: "Konsultan, praktisi, kemitraan" },
  { nama: "Perdagangan & Distribusi", ket: "Supplier, distributor, suku cadang" },
  { nama: "Karier & Project", ket: "Proyek dan peluang kerja sama" },
];

export const JURUSAN = [
  "Teknik Sipil",
  "Teknik Mesin",
  "Teknik Elektro",
  "Teknik Kimia",
  "Teknik Informatika dan Komputer",
  "Administrasi Niaga",
  "Akuntansi",
] as const;

// Data diambil dari Marketplace IKA PNUP (ikapoltek.id). Koordinat memakai titik kota/kawasan, bukan alamat presisi.
export const VENDORS: Vendor[] = [
  {
    id: 13,
    judul: "Kontraktor HVAC",
    usaha: "PT Adhitama Persada Indonesia",
    grup: "Jasa",
    sub: "Teknik & Engineering",
    ringkas: "Solusi HVAC dan konstruksi, pengalaman 15+ tahun melayani perusahaan besar. Konsultasi gratis.",
    deskripsi: [
      "Solusi HVAC dan konstruksi terpercaya untuk kemajuan bisnis Anda. Dengan pengalaman 15+ tahun melayani perusahaan terkemuka, teknologi berkualitas internasional, dan komitmen garansi jangka panjang.",
      "Investasi yang tepat untuk efisiensi operasional dan nilai properti yang berkelanjutan. Konsultasi gratis tersedia.",
    ],
    layanan: ["Maintenance", "HVAC", "Pengadaan MEP"],
    portofolio: { teks: "adhitama.id", href: "https://adhitama.id/" },
    pemilik: { nama: "Rafiulnur Arsa", jabatan: "Komisaris Utama", angkatan: 2009, jurusan: "Teknik Elektro", wa: "6285242906166" },
    kota: "Makassar",
    alamat: "Jl. Taman Gosyen Raya, Kel. Minasaupa, Kec. Rappocini, Sulawesi Selatan",
    lat: -5.1712,
    lng: 119.4335,
    foto: "/img/vendor/13.png",
    fit: "contain",
    baru: true,
  },
  {
    id: 12,
    judul: "Jasa Pembuatan NIB dan Sertifikat Halal",
    usaha: "Ridwan Pendamping Halal",
    grup: "Jasa",
    sub: "Lainnya",
    ringkas: "Pendampingan pembuatan NIB (Nomor Induk Berusaha) dan sertifikat halal untuk pelaku usaha.",
    deskripsi: [
      "Melayani pembuatan NIB (Nomor Induk Berusaha) dan sertifikat halal, didampingi langsung oleh pendamping proses produk halal.",
    ],
    layanan: ["Pembuatan NIB", "Sertifikat halal", "Pendampingan UMKM"],
    portofolio: { teks: "Instagram @ridwanpendampinghalal", href: "https://www.instagram.com/ridwanpendampinghalal/" },
    pemilik: { nama: "Ridwan Syaifullah", jabatan: "Pendamping", angkatan: 2013, jurusan: "Teknik Mesin", wa: "6282191605768" },
    kota: "Makassar",
    alamat: "Makassar, Sulawesi Selatan",
    lat: -5.1477,
    lng: 119.4327,
    foto: "/img/vendor/12.png",
    fit: "cover",
    baru: true,
  },
  {
    id: 11,
    judul: "Nasi Padang",
    usaha: "Rumah Makan Pagaruyung",
    grup: "Produk",
    sub: "Makanan & Minuman",
    ringkas: "Masakan khas Minang dengan bumbu rempah yang terasa. Bisa pesan sesuai permintaan.",
    deskripsi: [
      "Menjual masakan khas Sumatra Barat (Minang): nasi padang dengan rasa khas dan bumbu rempah yang kuat.",
    ],
    layanan: ["Bisa pesan orderan sesuai permintaan"],
    pemilik: { nama: "M. Arif", jabatan: "Owner", angkatan: 2007, jurusan: "Teknik Mesin", wa: "6282333555543" },
    kota: "Pangkep",
    alamat: "Jl. Poros Pangkep–Parepare, depan RSUD Batara Siang",
    lat: -4.8331,
    lng: 119.5537,
    foto: "",
    fit: "cover",
  },
  {
    id: 10,
    judul: "Pembuatan Kacamata Ukuran",
    usaha: "Yuni Optikal",
    grup: "Produk",
    sub: "Lainnya",
    ringkas: "Kacamata semua ukuran, diperiksa tenaga refraksi profesional. Menerima resep dokter dan BPJS Kesehatan.",
    deskripsi: [
      "Melayani pembuatan kacamata semua ukuran, diperiksa oleh tenaga refraksi profesional dan berpengalaman. Menerima resep dokter dan bekerja sama dengan BPJS Kesehatan.",
    ],
    layanan: ["Konsultasi kesehatan mata", "Berbagai jenis frame", "Pelayanan ramah dan berpengalaman"],
    pemilik: { nama: "Laode Muh. Andrianto", jabatan: "Direktur", angkatan: 2009, jurusan: "Teknik Elektro", wa: "6285299055111" },
    kota: "Bulukumba",
    alamat: "Jl. Bung Tomo No. 32, samping SMA 1 Bulukumba",
    lat: -5.5571,
    lng: 120.1932,
    foto: "/img/vendor/10.jpg",
    fit: "contain",
  },
  {
    id: 9,
    judul: "Rumah Makan & Rest Area",
    usaha: "Rumah Empangku",
    grup: "Produk",
    sub: "Makanan & Minuman",
    ringkas: "Rumah makan di tepi tambak untuk singgah, beristirahat, dan bersantai di Palanro, Barru.",
    deskripsi: ["Rumah makan di Kabupaten Barru, Kelurahan Palanro. Tempat singgah untuk beristirahat dan bersantai di tengah perjalanan."],
    layanan: ["Makanan & minuman"],
    portofolio: { teks: "TikTok @empangku5", href: "https://www.tiktok.com/@empangku5" },
    pemilik: { nama: "Syukur Aditya S", jabatan: "Pengelola", angkatan: 2007, jurusan: "Teknik Mesin", wa: "6285397898885" },
    kota: "Barru",
    alamat: "Palanro, Kabupaten Barru",
    lat: -4.4001,
    lng: 119.6233,
    foto: "/img/vendor/9.jpg",
    fit: "cover",
  },
  {
    id: 8,
    judul: "Spare Part Dump Truck Shacman",
    usaha: "CV Sahabat Jaya Barakka",
    grup: "Perdagangan & Distribusi",
    sub: "Supplier & Distributor",
    ringkas: "Suku cadang dump truck Shacman: original, harga kompetitif, stok lengkap, kirim ke seluruh Indonesia.",
    deskripsi: [
      "Perusahaan yang bergerak di bidang perdagangan besar mesin industri dan suku cadang mesin. Solusi tepat untuk menjaga performa dump truck Anda.",
    ],
    layanan: ["Original", "Harga kompetitif", "Stok lengkap", "Melayani pelanggan di seluruh Indonesia"],
    pemilik: { nama: "Wardiansyah", jabatan: "Direktur", angkatan: 2005, jurusan: "Teknik Mesin", wa: "6285299281359" },
    kota: "Makassar",
    alamat: "Jl. Biring Romang Blok 1, Perumnas Antang",
    lat: -5.1566,
    lng: 119.4892,
    foto: "/img/vendor/8.jpg",
    fit: "contain",
  },
  {
    id: 7,
    judul: "ISP (Internet Service Provider)",
    usaha: "PT Mandiri Global Data",
    grup: "Jasa",
    sub: "IT & Digital",
    ringkas: "Layanan internet dan managed service untuk kantor dan instansi. Vendor PT Aplikanusa Lintasarta.",
    deskripsi: ["Melayani kebutuhan internet perusahaan dan instansi, dengan layanan managed service."],
    layanan: ["Managed service"],
    portofolio: { teks: "Melayani kebutuhan internet Kantor Kejaksaan Negeri Gowa. Salah satu vendor di PT Aplikanusa Lintasarta." },
    pemilik: { nama: "Muh Amin", jabatan: "Manager Presales", angkatan: 1991, jurusan: "Teknik Elektro", wa: "6281341325040" },
    kota: "Makassar",
    alamat: "Bumi Tamalanrea Permai Blok M No. 343, Makassar",
    lat: -5.1298,
    lng: 119.4869,
    foto: "/img/vendor/7.jpg",
    fit: "contain",
  },
  {
    id: 6,
    judul: "Umrah Murah Start Makassar",
    usaha: "PT Amarina Tour & Travel",
    grup: "Jasa",
    sub: "Lainnya",
    ringkas: "Paket umrah reguler bulanan 12 hari, paket akhir/awal tahun, dan paket Ramadhan. Ada tour Turki.",
    deskripsi: ["Menuju Haramain dengan penuh hikmah. Berangkat dari Makassar dengan beberapa pilihan jadwal."],
    layanan: ["Paket reguler bulanan 12 hari", "Paket akhir dan awal tahun", "Paket Ramadhan (awal dan akhir)", "Paket tour Turki tanpa umrah"],
    portofolio: { teks: "Instagram @amarina_hikmah", href: "https://www.instagram.com/amarina_hikmah/" },
    pemilik: { nama: "Akbar Muhammadiah", jabatan: "Marketing Manager", angkatan: 2000, jurusan: "Teknik Elektro", wa: "62811448944" },
    kota: "Makassar",
    alamat: "Jl. Sultan Alauddin, Ruko Plaza Alauddin Soho No. 3, belakang McD",
    lat: -5.1839,
    lng: 119.4103,
    foto: "/img/vendor/6.jpg",
    fit: "contain",
  },
  {
    id: 5,
    judul: "Pupuk Organik Paten",
    usaha: "PT Renner Inti Internasional",
    grup: "Produk",
    sub: "Pertanian & Perkebunan",
    ringkas: "Pupuk organik teknologi nano, tiga varian: tanaman jangka panjang, jangka pendek, dan tambak/ternak.",
    deskripsi: ["Pupuk organik teknologi nano, tersedia dalam 3 varian sesuai kebutuhan lahan."],
    layanan: ["Untuk tanaman jangka panjang", "Untuk tanaman jangka pendek", "Untuk tambak dan ternak", "Edukasi & sosialisasi"],
    portofolio: { teks: "Testimoni produk tersedia di YouTube" },
    pemilik: { nama: "Akbar Muhammadiah", jabatan: "Distributor", angkatan: 2000, jurusan: "Teknik Elektro", wa: "62811448944" },
    kota: "Makassar",
    alamat: "Jl. Topaz Raya, Makassar",
    lat: -5.1668,
    lng: 119.4514,
    foto: "/img/vendor/5.jpg",
    fit: "contain",
  },
  {
    id: 4,
    judul: "Agriculture Machinery Total Solutions",
    usaha: "PT Kotrack Machinery Indonesia – Lovol Agriculture",
    grup: "Produk",
    sub: "Pertanian & Perkebunan",
    ringkas: "Combine harvester, traktor, dan excavator Lovol & Kotrack. Ada sales, servis, dan suku cadang.",
    deskripsi: [
      "Siap bekerja sama untuk kebutuhan penjualan: mesin panen padi Combine Harvester 100HP, traktor 4 roda (50–240 HP), traktor rotavator crawler (Lovol), serta mini excavator, medium excavator, dan breaker excavator (Kotrack).",
      "Pembelian bisa tunai maupun kredit bank/leasing. Unit sudah banyak terjual di Sulawesi Selatan (Sidrap, Pinrang, Bone, Wajo, dan lainnya).",
    ],
    layanan: ["Sales", "Service", "Spare parts", "Agri solutions"],
    pemilik: { nama: "Erman Wisesa", jabatan: "Branch Manager", angkatan: 2005, jurusan: "Teknik Mesin", wa: "6281343093787" },
    kota: "Makassar",
    alamat: "Jl. Perintis Kemerdekaan Km 15, Makassar",
    lat: -5.1103,
    lng: 119.5008,
    foto: "/img/vendor/4.jpg",
    fit: "contain",
  },
  {
    id: 2,
    judul: "Abon Ikan Marlin",
    usaha: "Kedai Airumi",
    grup: "Produk",
    sub: "Makanan & Minuman",
    ringkas: "Abon ikan marlin premium khas Enrekang: gurih, tinggi protein dan omega-3, tanpa pengawet kimia.",
    deskripsi: [
      "Usaha pengolahan pangan bernilai ekonomis tinggi yang mengubah daging ikan marlin berserat kokoh menjadi makanan siap saji yang gurih, bergizi, dan tahan lama.",
      "Kedai Airumi Enrekang adalah UMKM kuliner lokal dari Kabupaten Enrekang yang memproduksi abon premium berbahan lokal, memadukan resep tradisional dengan proses modern yang higienis.",
    ],
    layanan: [
      "Bahan baku ikan marlin segar pilihan, serat lembut dan tidak mudah hancur",
      "Kaya protein hewani, asam lemak baik, dan omega-3",
      "Bumbu rempah tradisional: bawang, ketumbar, lengkuas",
      "Diproses dikukus, direndam bumbu, digoreng, dan ditiriskan (spinner), awet tanpa pengawet kimia",
    ],
    pemilik: { nama: "Muh Anwar", jabatan: "Pemilik", angkatan: 2003, jurusan: "Teknik Elektro", wa: "6282187255225" },
    kota: "Enrekang",
    alamat: "Jl. HOS Cokroaminoto, Enrekang",
    lat: -3.5631,
    lng: 119.7686,
    foto: "/img/vendor/2.jpg",
    fit: "cover",
  },
  {
    id: 1,
    judul: "Pengembang Software & Sistem",
    usaha: "PT Nexa Data Insight",
    grup: "Jasa",
    sub: "IT & Digital",
    ringkas: "Pembuatan website, aplikasi mobile, sistem informasi, ERP/POS, dan integrasi API.",
    deskripsi: [
      "Perusahaan pengembang sistem dan solusi digital yang menyediakan layanan pengembangan aplikasi, sistem informasi, website, serta solusi teknologi berbasis kebutuhan bisnis dan organisasi.",
    ],
    layanan: [
      "Pembuatan website",
      "Pembuatan aplikasi mobile",
      "Pengembangan sistem informasi",
      "Software development",
      "Sistem ERP/POS",
      "Aplikasi custom",
      "Integrasi sistem/API",
      "Maintenance & pengembangan sistem",
    ],
    pemilik: { nama: "Asrul Amiruddin", jabatan: "Direktur", angkatan: 2003, jurusan: "Administrasi Niaga", wa: "6282151975177" },
    kota: "Makassar",
    alamat: "Makassar, Sulawesi Selatan",
    lat: -5.1401,
    lng: 119.4139,
    foto: "/img/vendor/1.jpg",
    fit: "cover",
  },
];

export const vendorById = (id: number) => VENDORS.find((v) => v.id === id);

export const waLink = (v: Vendor) =>
  `https://wa.me/${v.pemilik.wa}?text=${encodeURIComponent(
    `Halo ${v.pemilik.nama}, saya tertarik dengan "${v.judul}" di Marketplace IKA PNUP.`,
  )}`;

export const inisial = (nama: string) =>
  nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
