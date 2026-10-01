import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { getSiteData } from "@/lib/site";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri Foto Mabar Badminton Surabaya | PB.GPP",
  description:
    "Foto-foto keseruan mabar rutin dan friendly match komunitas badminton PB.GPP Surabaya.",
};
export default async function GaleriPage() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <div className="btn-gradient text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">GALERI KEGIATAN</h1>
        <p className="text-sm text-white/90">Momen kebersamaan PB.GPP.</p>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {d.gallery.map((g) => (
          <div key={g.id} className="overflow-hidden rounded-lg card-shadow">
            <SmartImage src={g.image} alt={g.caption} className="h-52 w-full object-cover hover:scale-105 transition" />
            {g.caption && <div className="p-2 text-xs font-semibold">{g.caption}</div>}
          </div>
        ))}
      </div>
      <Footer s={d.settings} />
    </main>
  );
}
