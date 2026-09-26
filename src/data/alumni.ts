import { VENDORS } from "./vendors";

export type Alumni = {
  id: number;
  nama: string;
  jurusan: string;
  jenjang: "D3" | "D4";
  lulus: number;
  kota: string;
  profesi: string;
  instansi: string;
  usahaId?: number;
  contoh: boolean;
};

// Nama-nama di bawah ini fiktif (data contoh) kecuali pemilik usaha yang sudah tampil di marketplace.
const CONTOH: [string, string, "D3" | "D4", number, string, string, string][] = [
  ["Andi Nurhaliza Putri", "Akuntansi", "D3", 2019, "Makassar", "Staf Akuntansi", "PT Bosowa Mitra Logistik"],
  ["Muh. Farhan Alfarizi", "Teknik Elektro", "D4", 2021, "Makassar", "Teknisi Listrik", "PT PLN (Persero) UP3 Makassar"],
  ["Sitti Aisyah Rahman", "Administrasi Niaga", "D3", 2016, "Gowa (Sungguminasa)", "Marketing Executive", "Bank Sulselbar"],
  ["Ahmad Fadli Basri", "Teknik Sipil", "D4", 2018, "Parepare", "Pelaksana Lapangan", "PT Nindya Karya"],
  ["Nurul Hikmah", "Teknik Kimia", "D3", 2015, "Makassar", "Analis Laboratorium", "PT Semen Tonasa"],
  ["Rizky Aditya Pratama", "Teknik Mesin", "D3", 2012, "Maros", "Supervisor Maintenance", "PT Bosowa Semen"],
  ["Hasriani Latief", "Akuntansi", "D4", 2022, "Makassar", "Auditor Junior", "KAP Mandiri & Rekan"],
  ["Muhammad Irfan Syam", "Teknik Elektro", "D3", 2008, "Palopo", "Kepala Teknisi", "PT Vale Indonesia"],
  ["Dewi Sartika Amir", "Administrasi Niaga", "D4", 2020, "Makassar", "Admin Proyek", "PT Wijaya Karya"],
  ["Abdul Rahman Hakim", "Teknik Sipil", "D3", 2005, "Bone (Watampone)", "Kontraktor", "CV Karya Bone Mandiri"],
  ["Nur Indah Sari", "Teknik Kimia", "D4", 2019, "Makassar", "Quality Control", "PT Kalla Inti Karya"],
  ["Yusril Mahendra", "Teknik Mesin", "D4", 2017, "Bulukumba", "Teknisi Alat Berat", "PT Hasnur Group"],
  ["Fitriani Ramli", "Akuntansi", "D3", 2010, "Makassar", "Kepala Bagian Keuangan", "RSUD Daya Makassar"],
  ["Muh. Alief Ramadhan", "Teknik Elektro", "D4", 2023, "Makassar", "Junior Engineer", "PT Telkom Indonesia"],
  ["Andi Tenri Ola", "Administrasi Niaga", "D3", 2001, "Makassar", "Pemilik Usaha", "Toko Batik Tenri"],
  ["Syamsul Bahri", "Teknik Sipil", "D3", 1996, "Makassar", "Konsultan Pengawas", "PT Yodya Karya"],
  ["Rahmawati Dg. Ngai", "Teknik Kimia", "D3", 2003, "Pangkep", "Staf Produksi", "PT Semen Tonasa"],
  ["Ilham Kurniawan", "Teknik Mesin", "D3", 1999, "Makassar", "Pemilik Bengkel", "Bengkel Kurnia Motor"],
  ["Sri Wahyuni Tahir", "Akuntansi", "D4", 2014, "Enrekang", "Kepala Bagian Keuangan", "Pemkab Enrekang"],
  ["Muh. Zulkifli Nur", "Teknik Elektro", "D3", 1993, "Makassar", "Manajer Operasional", "PT PLN (Persero) Wilayah Sulselrabar"],
  ["Andi Rezky Amalia", "Administrasi Niaga", "D4", 2024, "Makassar", "Staf Humas", "Politeknik Negeri Ujung Pandang"],
  ["Hendra Gunawan", "Teknik Sipil", "D4", 2013, "Makassar", "Site Manager", "PT Adhi Karya"],
  ["Nurhidayah Salam", "Teknik Kimia", "D4", 2021, "Makassar", "Analis Mutu", "BBPOM Makassar"],
  ["Muh. Taufik Hidayat", "Teknik Mesin", "D4", 2009, "Parepare", "Kepala Workshop", "PT Pelindo Regional 4"],
  ["Rosdiana Yusuf", "Akuntansi", "D3", 2007, "Gowa (Sungguminasa)", "Staf Perpajakan", "KPP Pratama Makassar"],
  ["Andi Baso Mappaita", "Teknik Elektro", "D3", 1990, "Makassar", "Pensiunan PLN", "PT PLN (Persero)"],
  ["Wahyu Setiawan", "Administrasi Niaga", "D3", 2011, "Makassar", "Manajer Toko", "Alfamart Sulsel"],
  ["Nur Azizah Mursalim", "Teknik Sipil", "D3", 2016, "Maros", "Drafter", "CV Konsultan Bumi Maros"],
  ["Muh. Ridwan Aksa", "Teknik Elektro", "D4", 2016, "Makassar", "Network Engineer", "PT Indosat Ooredoo Hutchison"],
  ["Ika Purnamasari", "Teknik Kimia", "D3", 2000, "Makassar", "Wirausaha Kuliner", "Dapur Ika"],
  ["Jufri Tandiayuk", "Teknik Mesin", "D3", 2004, "Palopo", "Mekanik Senior", "PT Vale Indonesia"],
  ["Nirmala Dewi Lestari", "Akuntansi", "D4", 2018, "Makassar", "Akuntan Pajak", "PT Kalla Toyota"],
  ["Sulaiman Daeng Rani", "Teknik Sipil", "D3", 1998, "Bulukumba", "Kepala Dinas PU", "Pemkab Bulukumba"],
  ["Aulia Rahmadani", "Administrasi Niaga", "D4", 2023, "Makassar", "Customer Service", "PT Astra Daihatsu Makassar"],
  ["Muh. Ilyas Bakri", "Teknik Elektro", "D3", 2002, "Barru", "Teknisi Pembangkit", "PLTU Barru"],
  ["Nur Fadilah Nurdin", "Teknik Kimia", "D3", 2015, "Makassar", "Staf Laboratorium", "Balai Besar Industri Hasil Perkebunan"],
  ["Ryan Saputra Malik", "Teknik Mesin", "D4", 2020, "Makassar", "Engineer Manufaktur", "PT Bosowa Berlian Motor"],
  ["Hj. Sumarni Palla", "Administrasi Niaga", "D3", 1995, "Makassar", "Pensiunan ASN", "Pemprov Sulawesi Selatan"],
  ["Andi Cahyadi Malla", "Akuntansi", "D3", 2013, "Pangkep", "Staf Keuangan", "Pemkab Pangkep"],
  ["Rahmat Hidayat Ali", "Teknik Sipil", "D4", 2022, "Makassar", "Quantity Surveyor", "PT Waskita Karya"],
  ["Sartika Ainun", "Teknik Elektro", "D3", 2014, "Enrekang", "Guru SMK", "SMKN 1 Enrekang"],
  ["Fajar Nugraha Latif", "Teknik Mesin", "D3", 2006, "Makassar", "Supervisor Produksi", "PT Charoen Pokphand Makassar"],
  ["Melda Anggraeni", "Administrasi Niaga", "D3", 2017, "Bone (Watampone)", "Pemilik Usaha", "Kue Kering Melda"],
];

const pemilik = VENDORS.filter((v) => v.pemilik.angkatan && v.pemilik.jurusan).map((v) => ({
  nama: v.pemilik.nama
    .toLowerCase()
    .replace(/(^|[\s.])([a-z])/g, (_, a, b) => a + b.toUpperCase()),
  jurusan: v.pemilik.jurusan!,
  jenjang: "D3" as const,
  lulus: v.pemilik.angkatan!,
  kota: v.kota,
  profesi: v.pemilik.jabatan,
  instansi: v.usaha,
  usahaId: v.id,
  contoh: false,
}));

const gabung = [
  ...pemilik,
  ...CONTOH.map(([nama, jurusan, jenjang, lulus, kota, profesi, instansi]) => ({ nama, jurusan, jenjang, lulus, kota, profesi, instansi, usahaId: undefined, contoh: true })),
];

const seen = new Set<string>();
export const ALUMNI: Alumni[] = gabung
  .filter((a) => (seen.has(a.nama) ? false : (seen.add(a.nama), true)))
  .sort((a, b) => a.nama.localeCompare(b.nama, "id"))
  .map((a, i) => ({ id: i + 1, ...a }));
