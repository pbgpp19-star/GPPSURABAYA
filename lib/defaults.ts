export const DEFAULT_SETTINGS: Record<string, string> = {
  hero_kicker: "PB.GPP SURABAYA",
  hero_title_a: "PLAY TOGETHER",
  hero_title_b: "GROW FURTHER",
  hero_desc:
    "PB.GPP adalah komunitas badminton di Surabaya untuk bermain, berlatih, menjalin silaturahmi, dan berkembang bersama.",
  hero_image: "/images/hero-player.svg",
  logo: "/images/logo-pbgpp.svg",
  wa_number: "6281234567890",
  wa_text: "Halo PB.GPP! Saya ingin gabung main bareng.",
  about_text:
    "PB.GPP adalah komunitas badminton yang berfokus pada olahraga, silaturahmi, dan semangat untuk terus berkembang. Kami terbuka untuk semua level pemain yang ingin bermain dengan suasana yang positif, seru, dan menyenangkan.",
  about_image: "/images/about-logo.svg",
  cta_bg: "",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  alamat: "Surabaya, Jawa Timur",
  seo_title: "PB.GPP Surabaya | Komunitas Badminton Surabaya – Mabar Rutin",
  seo_description:
    "PB.GPP adalah komunitas badminton di Surabaya. Mabar rutin tiap Selasa & Sabtu, friendly match badminton, terbuka untuk semua level. Gabung main bareng!",
};

export const DEFAULT_SCHEDULES = [
  {
    id: 1,
    hari: "SELASA",
    jam: "20:00 - 23:00",
    tempat: "Lapangan Badminton (Surabaya)",
    image: "/images/jadwal-selasa.svg",
    urutan: 1,
    aktif: true,
  },
  {
    id: 2,
    hari: "SABTU",
    jam: "16:00 - 21:00",
    tempat: "Lapangan Badminton (Surabaya)",
    image: "/images/jadwal-sabtu.svg",
    urutan: 2,
    aktif: true,
  },
];

export const DEFAULT_MATCHES = [
  {
    id: 1,
    tanggal: "SABTU, 3 OKTOBER 2026",
    lawan: "PB.TOZA",
    logoLawan: "/images/club-toza.svg",
    skorKami: null,
    skorLawan: null,
    status: "AKAN_DATANG",
  },
  {
    id: 2,
    tanggal: "SABTU, 27 SEPTEMBER 2026",
    lawan: "PB.ROKA",
    logoLawan: "/images/club-roka.svg",
    skorKami: 6,
    skorLawan: 4,
    status: "MENANG",
  },
  {
    id: 3,
    tanggal: "SABTU, 20 SEPTEMBER 2026",
    lawan: "PB.LUNAS",
    logoLawan: "/images/club-lunas.svg",
    skorKami: 5,
    skorLawan: 5,
    status: "SERI",
  },
];

export const DEFAULT_GALLERY = [
  { id: 1, image: "/images/galeri-1.svg", caption: "Foto bersama member", urutan: 1 },
  { id: 2, image: "/images/galeri-2.svg", caption: "Smash!", urutan: 2 },
  { id: 3, image: "/images/galeri-3.svg", caption: "Jersey PB.GPP", urutan: 3 },
  { id: 4, image: "/images/galeri-4.svg", caption: "High five", urutan: 4 },
  { id: 5, image: "/images/galeri-5.svg", caption: "Serve", urutan: 5 },
];

export const DEFAULT_MEMBERS = [
  { id: 1, nama: "Andi Pratama", level: "Advance", foto: "/images/member-1.svg", wa: "", aktif: true },
  { id: 2, nama: "Budi Santoso", level: "Intermediate", foto: "/images/member-2.svg", wa: "", aktif: true },
  { id: 3, nama: "Citra Dewi", level: "Beginner", foto: "/images/member-3.svg", wa: "", aktif: true },
  { id: 4, nama: "Dimas Arya", level: "Intermediate", foto: "/images/member-4.svg", wa: "", aktif: true },
];

export function waLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
