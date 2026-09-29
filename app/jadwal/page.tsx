import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleSection from "@/components/ScheduleSection";
import { getSiteData } from "@/lib/site";
export const dynamic = "force-dynamic";
export default async function JadwalPage() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <div className="btn-gradient text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">JADWAL MABAR RUTIN</h1>
        <p className="text-sm text-white/90">Datang, main, silaturahmi. Semua level welcome!</p>
      </div></div>
      <ScheduleSection items={d.schedules} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 text-sm text-slate-600">
        <div className="rounded-xl border p-5">📍 {d.settings.alamat} • Hubungi admin via WhatsApp untuk booking slot / tanya ketersediaan lapangan.</div>
      </div>
      <Footer s={d.settings} />
    </main>
  );
}
