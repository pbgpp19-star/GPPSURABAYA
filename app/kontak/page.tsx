import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/site";
import { waLink } from "@/lib/defaults";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gabung Mabar Badminton Surabaya | Kontak PB.GPP",
  description:
    "Ingin gabung mabar badminton di Surabaya? Hubungi admin PB.GPP via WhatsApp untuk info jadwal dan pendaftaran member.",
};
export default async function KontakPage() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <div className="btn-gradient text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">KONTAK</h1>
        <p className="text-sm text-white/90">Hubungi kami untuk gabung & info jadwal.</p>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-6 card-shadow">
          <h2 className="font-display font-black text-xl">Hubungi Admin</h2>
          <p className="mt-2 text-sm text-slate-600">📍 {d.settings.alamat}</p>
          <p className="mt-1 text-sm text-slate-600">📱 WA: {d.settings.wa_number}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={waLink(d.settings.wa_number, d.settings.wa_text)} target="_blank" className="btn-gradient text-white px-5 py-2.5 rounded-lg text-sm font-bold">Chat WhatsApp</a>
            <a href={d.settings.instagram} target="_blank" className="border px-5 py-2.5 rounded-lg text-sm font-bold">Instagram</a>
            <a href={d.settings.youtube} target="_blank" className="border px-5 py-2.5 rounded-lg text-sm font-bold">YouTube</a>
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="font-display font-black text-xl">Formulir Minat Gabung</h2>
          <form action={waLink(d.settings.wa_number, d.settings.wa_text)} className="mt-3 flex flex-col gap-3">
            <input required placeholder="Nama" className="border rounded-lg px-3 py-2 text-sm" />
            <input placeholder="No. WA" className="border rounded-lg px-3 py-2 text-sm" />
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Beginner</option><option>Intermediate</option><option>Advance</option>
            </select>
            <button className="btn-gradient text-white rounded-lg px-4 py-2.5 text-sm font-bold">Kirim via WhatsApp</button>
            <p className="text-xs text-slate-500">* Tombol membuka WhatsApp admin dengan pesan otomatis.</p>
          </form>
        </div>
      </div>
      <Footer s={d.settings} />
    </main>
  );
}
