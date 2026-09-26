export const ORG = {
  nama: "IKA PNUP",
  lengkap: "Ikatan Alumni Politeknik Negeri Ujung Pandang",
  slogan: "Terhubung. Berkarya. Berkontribusi. Untuk Almamater, Untuk Negeri.",
  email: "info@ikapoltek.id",
  web: "www.ikapoltek.id",
  kota: "Makassar, Sulawesi Selatan",
  instagram: "https://www.instagram.com/ika_pnup/",
  periode: "2025 – 2028",
};

export type Berita = { slug: string; judul: string; tanggal: string; iso: string; kategori: string; foto: string; ringkas: string; isi: string[] };

export const BERITA: Berita[] = [
  {
    slug: "ketua-umum-ika-pnup-serahkan-kartu-tanda-alumni",
    judul: "Ketua Umum IKA PNUP Serahkan Kartu Tanda Alumni",
    tanggal: "20 September 2026",
    iso: "2026-09-20",
    kategori: "Wisuda",
    foto: "/img/news/kta.jpg",
    ringkas: "Penyerahan KTA menjadi langkah membangun database alumni yang lebih tertata dan mempererat komunikasi antarlulusan.",
    isi: [
      "MAKASSAR — Ketua Umum Ikatan Alumni Politeknik Negeri Ujung Pandang (IKA PNUP), Ir. A. Rais Petta Paladeng, menyerahkan Kartu Tanda Alumni (KTA) IKA PNUP sebagai bagian dari upaya memperkuat identitas, silaturahmi, dan jejaring keluarga besar alumni PNUP.",
      "Penyerahan KTA ini menjadi salah satu langkah IKA PNUP dalam membangun database alumni yang lebih tertata sekaligus mempererat komunikasi antarlulusan Politeknik Negeri Ujung Pandang.",
      "Ir. A. Rais Petta Paladeng menyampaikan bahwa keberadaan KTA diharapkan tidak hanya menjadi identitas bagi para alumni, tetapi juga menjadi simbol kebersamaan dan bagian dari penguatan organisasi IKA PNUP.",
      "“KTA ini merupakan bagian dari upaya kita memperkuat ikatan dan kebersamaan seluruh alumni PNUP. Kami berharap alumni dapat terus menjaga silaturahmi, membangun kolaborasi, dan memberikan kontribusi positif bagi almamater serta masyarakat,” ujarnya.",
      "Menurutnya, jaringan alumni merupakan potensi besar yang perlu terus dikembangkan melalui komunikasi, kolaborasi, dan berbagai kegiatan yang memberikan manfaat bagi alumni maupun almamater.",
      "IKA PNUP akan terus mendorong pendataan dan penerbitan KTA bagi alumni sebagai bagian dari penguatan organisasi serta membangun jejaring alumni yang semakin solid dan produktif.",
    ],
  },
  {
    slug: "bidang-media-luncurkan-website-resmi",
    judul: "Bidang Media IKA PNUP Luncurkan Website Resmi, Perkuat Pusat Informasi Digital Alumni",
    tanggal: "19 September 2026",
    iso: "2026-09-19",
    kategori: "Proker",
    foto: "/img/news/web.png",
    ringkas: "Website resmi hadir sebagai pusat informasi kegiatan, agenda, berita, dan publikasi bagi seluruh keluarga besar alumni.",
    isi: [
      "MAKASSAR — Ikatan Keluarga Alumni Politeknik Negeri Ujung Pandang (IKA PNUP) melalui Bidang Media meluncurkan website resmi IKA PNUP sebagai bagian dari upaya memperkuat komunikasi, publikasi, dan penyebaran informasi bagi seluruh keluarga besar alumni.",
      "Peluncuran website ini menjadi langkah strategis IKA PNUP dalam menghadirkan pusat informasi digital yang dapat menjadi wadah bagi alumni untuk memperoleh berbagai informasi terkait kegiatan organisasi, program kerja, agenda alumni, berita, publikasi, serta berbagai aktivitas IKA PNUP.",
      "Koordinator Bidang Media IKA PNUP, Asrul Amiruddin, mengatakan kehadiran website tersebut merupakan bagian dari komitmen Bidang Media dalam mengembangkan sistem komunikasi organisasi yang lebih efektif dan adaptif terhadap perkembangan teknologi digital.",
      "Menurutnya, website IKA PNUP tidak hanya berfungsi sebagai media penyampaian informasi, tetapi juga diharapkan menjadi ruang bersama bagi alumni untuk membangun komunikasi, memperkuat jejaring, serta mendokumentasikan berbagai kontribusi dan kegiatan keluarga besar alumni.",
    ],
  },
  {
    slug: "kartu-keanggotaan-alumni-terbaru",
    judul: "IKA PNUP Luncurkan Kartu Keanggotaan Alumni Terbaru, Diserahkan Perdana pada Wisuda Pertama 2026",
    tanggal: "17 September 2026",
    iso: "2026-09-17",
    kategori: "Inovasi",
    foto: "/img/news/kartu.png",
    ringkas: "Kartu keanggotaan menjadi sarana yang menghubungkan alumni dengan organisasi, sekaligus mendukung pendataan alumni.",
    isi: [
      "MAKASSAR — Pengurus Ikatan Alumni Politeknik Negeri Ujung Pandang (IKA PNUP) meluncurkan Kartu Keanggotaan IKA PNUP terbaru sebagai bagian dari upaya memperkuat identitas dan jejaring alumni Politeknik Negeri Ujung Pandang.",
      "Peluncuran kartu keanggotaan ini merupakan inisiatif Pengurus IKA PNUP Periode 2025–2028 yang dikoordinasikan oleh Sekretaris Jenderal IKA PNUP, Pabbenteng, S.T., M.Ling., bersama Direktur Politeknik Negeri Ujung Pandang, Prof. Rusdi Nur, S.ST., M.T., Ph.D.",
      "Kartu keanggotaan IKA PNUP nantinya menjadi salah satu sarana yang menghubungkan alumni dengan organisasi alumni. Kehadiran kartu ini juga diharapkan dapat mendukung pendataan serta membangun jejaring alumni yang semakin terhubung dengan almamater.",
      "Kartu akan diserahkan secara simbolis kepada wisudawan oleh Ketua IKA PNUP, Ir. A. Rais Petta Paladeng, pada Wisuda Pertama Tahun 2026 yang berlangsung Sabtu, 19 September 2026, di Kampus 2 Politeknik Negeri Ujung Pandang.",
    ],
  },
];

export type Lowongan = {
  id: number;
  posisi: string;
  perusahaan: string;
  kota: string;
  tipe: string;
  logo: string;
  prodi: string[];
  pendidikan: string[];
  ringkas: string;
  deskripsi: string;
  skill: string[];
  posted: string;
};

export const LOWONGAN: Lowongan[] = [
  {
    id: 1,
    posisi: "IT Support (Bagian Jaringan dan CCTV)",
    perusahaan: "Rumah Sakit Umum Pusat Makassar",
    kota: "Makassar",
    tipe: "Magang",
    logo: "/img/rs-makassar.png",
    prodi: ["Teknologi Informasi", "Ilmu Komputer", "Sistem Informasi", "Teknik Komputer dan Jaringan", "Manajemen Informatika"],
    pendidikan: ["Sarjana", "Diploma"],
    ringkas: "Mendukung pengelolaan jaringan komputer dan sistem CCTV rumah sakit.",
    deskripsi:
      "Mendukung pengelolaan dan pemeliharaan jaringan komputer serta sistem CCTV rumah sakit, termasuk monitoring, troubleshooting, pemeliharaan perangkat, dan dokumentasi permasalahan teknis. 5 hari kerja per minggu.",
    skill: [
      "Arsitektur jaringan & topologi RS",
      "Instalasi perangkat jaringan (LAN)",
      "Setup & konfigurasi CCTV/NVR",
      "Troubleshooting konektivitas",
      "Pemantauan traffic & keamanan",
      "Evaluasi komprehensif",
    ],
    posted: "1 minggu lalu",
  },
  {
    id: 2,
    posisi: "Teknisi Mesin",
    perusahaan: "RSUP Dr. Tadjuddin Chalid Makassar",
    kota: "Makassar",
    tipe: "Magang",
    logo: "/img/rs-tadjuddin.png",
    prodi: ["Pemeliharaan Mesin"],
    pendidikan: ["Diploma"],
    ringkas: "Perbaikan dan pemeliharaan mesin-mesin utilitas rumah sakit.",
    deskripsi: "Melakukan perbaikan dan pemeliharaan mesin-mesin fasilitas rumah sakit. 5 hari kerja per minggu.",
    skill: [
      "Sistem HVAC medis & ruang isolasi (tekanan negatif/positif)",
      "Utilitas kritis: boiler & distribusi uap medis",
      "Sistem pipa gas medis & vakum (GAVAM)",
      "Genset darurat & sistem mekanikal pompa air",
      "Manajemen pemeliharaan fasilitas & akreditasi rumah sakit",
      "Kalibrasi & troubleshooting sistem otomasi gedung (BAS)",
    ],
    posted: "1 minggu lalu",
  },
  {
    id: 3,
    posisi: "Drafter CAD (Keteknikan Bangunan Gedung), Revit Designer",
    perusahaan: "Balai Pengembangan Kompetensi PU Wilayah VIII Makassar",
    kota: "Makassar",
    tipe: "Magang",
    logo: "/img/bkp-pu.png",
    prodi: ["Administrasi", "Arsitektur", "Teknik Sipil"],
    pendidikan: ["Sarjana", "Diploma"],
    ringkas: "Menghitung RAB, menggambar dengan AutoCAD dan Revit, serta ikut pengawasan gedung.",
    deskripsi:
      "Melakukan penghitungan RAB, menggambar dengan CAD, serta pengawasan gedung. Menguasai AutoCAD (2D/3D) dan Autodesk Revit (Architecture/Structure), memahami prinsip dasar struktur bangunan gedung, arsitektur, atau MEP, mampu membaca shop drawing dan as-built drawing, dan memiliki portofolio tugas akhir atau kerja praktik. 5 hari kerja per minggu.",
    skill: ["AutoCAD 2D/3D", "Autodesk Revit (Architecture/Structure)", "Penghitungan RAB", "Membaca shop drawing dan as-built drawing", "Pengawasan gedung"],
    posted: "1 minggu lalu",
  },
];

export const ALUR_LAMAR = [
  { judul: "Submit lamaran", isi: "Isi kuesioner dan konfirmasi persyaratan lamaran." },
  { judul: "Seleksi lamaran", isi: "Penyelenggara menyeleksi dan memverifikasi lamaranmu." },
  { judul: "Interview", isi: "Wawancara dengan perusahaan." },
  { judul: "Onboarding", isi: "Lengkapi dokumen dan persiapan magang." },
  { judul: "Mulai magang", isi: "Program magang berjalan." },
];

export type Agenda = {
  id: number;
  judul: string;
  tanggal: string; // ISO
  jam: string;
  tempat: string;
  bidang: string;
  foto: string;
  ringkas: string;
  isi: string[];
  tagline: string;
};

export const AGENDA: Agenda[] = [
  {
    id: 2,
    judul: "Fasilitasi Magang Series #1",
    tanggal: "2026-12-08",
    jam: "19:00",
    tempat: "Makassar, Sulawesi Selatan",
    bidang: "Bidang Organisasi, Kemitraan & Kelembagaan",
    foto: "/img/event/magang.png",
    ringkas: "Membuka peluang, memperluas pengalaman, dan membangun jejaring profesional.",
    tagline: "Dari alumni, untuk alumni. Bersama membangun masa depan profesional.",
    isi: [
      "Program Fasilitasi Magang untuk Alumni mempertemukan alumni PNUP dengan dunia kerja melalui kesempatan magang di perusahaan dan berbagai sektor usaha yang relevan dengan kompetensi alumni.",
      "Melalui program ini, alumni dapat memperoleh pengalaman kerja nyata, meningkatkan keterampilan, memperluas jaringan profesional, serta membuka peluang karier melalui pengalaman langsung di dunia industri.",
    ],
  },
  {
    id: 4,
    judul: "IKA Skill & Career Academy",
    tanggal: "2027-02-18",
    jam: "15:25",
    tempat: "Makassar, Sulawesi Selatan",
    bidang: "Bidang Pengembangan Diri, Kajian & Keilmuan",
    foto: "/img/event/academy.png",
    ringkas: "Pelatihan, seminar, dan workshop untuk membekali alumni dengan keterampilan praktis.",
    tagline: "Tingkatkan skill. Perluas peluang. Siap menghadapi masa depan.",
    isi: [
      "Program pengembangan kompetensi alumni melalui pelatihan, seminar, dan workshop yang membekali alumni dengan keterampilan praktis, wawasan dunia kerja, serta kemampuan teknologi yang relevan dengan kebutuhan industri.",
    ],
  },
  {
    id: 5,
    judul: "IKA Business Networking",
    tanggal: "2027-03-19",
    jam: "15:30",
    tempat: "Makassar, Sulawesi Selatan",
    bidang: "Bidang Entrepreneur",
    foto: "/img/event/networking.png",
    ringkas: "Forum silaturahmi dan jejaring bisnis alumni untuk membuka peluang kolaborasi usaha.",
    tagline: "Terhubung • Berkolaborasi • Bertumbuh",
    isi: [
      "Forum silaturahmi dan jejaring bisnis alumni yang menjadi ruang untuk bertemu, berbagi pengalaman, memperluas koneksi, dan membuka peluang kolaborasi usaha.",
      "Melalui kegiatan ini, alumni dapat saling mengenal potensi bisnis, membangun kemitraan, serta mengembangkan jejaring profesional yang memberikan manfaat bagi sesama alumni dan masyarakat.",
    ],
  },
];

export const PENGURUS_INTI = [
  { nama: "Ir. A. Rais Petta Paladeng", jabatan: "Ketua Umum" },
  { nama: "Abadi Gunawan, S.T.", jabatan: "Ketua Harian" },
  { nama: "Pabbenteng, S.T., M.Ling.", jabatan: "Sekretaris Jenderal" },
  { nama: "Dasri, S.Kom., M.Kom.", jabatan: "Wakil Sekretaris" },
  { nama: "Mardiyanah Mattawape, S.T.", jabatan: "Bendahara Umum" },
  { nama: "Zainuddin Soadiq", jabatan: "Wakil Bendahara" },
];

export const BIDANG: { nama: string; koordinator: string; anggota: string[] }[] = [
  {
    nama: "Organisasi, Kemitraan & Kelembagaan",
    koordinator: "Andi Walitakhri, SE., M.Ak., MH.",
    anggota: ["Syarifuddin, S.T.", "A. Immar Zulkifli, S.ST", "Hasnawati, A.Md.", "Muh Amin, A.Md"],
  },
  {
    nama: "Humas, Silaturahmi & Kekeluargaan",
    koordinator: "Lusiana R, A.Md.",
    anggota: ["An-Nisa Virginia Ainul, S.Tr.Ak", "Muh Faisal Julianto Putra, S.Tr.T."],
  },
  {
    nama: "Pengembangan Diri, Kajian & Keilmuan",
    koordinator: "Dr. Ir. A. Muhammad Syafar, A.Md., S.T., M.T., IPM",
    anggota: ["Hj. Lendrawaty, S.Sos., M.AP.", "Burhanuddin, A.Md", "Muhammad Khaidir, A.Md., S.T., M.T.", "Ir. Syahrul Mustafa, A.Md., S.T., M.T"],
  },
  {
    nama: "Entrepreneur",
    koordinator: "Ir. Agusnawan, S.T",
    anggota: ["Handoko Untung, S.T", "Ir. Fadli Azis, S.ST", "Ashari Assaad", "Erlinawati Arifin, A.Md", "Hamka F. Djalle, S.T", "Usriady Syam, S.ST.", "Hidayat, S.T., M.Sc."],
  },
  {
    nama: "Seni Budaya & Olah Raga",
    koordinator: "Rosmila Mustamin, A.Md.",
    anggota: ["Vera Febrianti, S.Tr.T", "Darma Aryani Rustam, S.T.", "Ahmad Rury, A.Md."],
  },
  {
    nama: "Kesekretariatan, Data Informasi & Media",
    koordinator: "Asrul Amiruddin, A.Md",
    anggota: ["Rezky Januar Saputra, S.ST", "Munandir Said, A.Md.", "Irvan Baravely, S.ST., M.Acc", "A. Mutia, A.Md.Ak", "Jupriadi, A.Md Kom"],
  },
  {
    nama: "Advokasi & Bantuan Hukum",
    koordinator: "Ardiansyah, SH",
    anggota: ["Arkam, SH.", "Muh. Lutfi Kadir, S.Tr.A.B.", "Muslim Amin, A.Md.A.B"],
  },
];

export const GALERI = [
  { src: "/img/news/pelantikan.jpg", cap: "Penandatanganan pelantikan pengurus" },
  { src: "/img/news/foto-bersama.jpg", cap: "Foto bersama pengurus dan alumni" },
  { src: "/img/news/kta.jpg", cap: "Penyerahan Kartu Tanda Alumni saat wisuda" },
];
