import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchSection from "@/components/MatchSection";
import { getSiteData } from "@/lib/site";
export const dynamic = "force-dynamic";
export default async function MatchPage() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <div className="btn-gradient text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">FRIENDLY MATCH</h1>
        <p className="text-sm text-white/90">Rekam jejak pertandingan PB.GPP vs klub lain.</p>
      </div></div>
      <MatchSection items={d.matches} logoPbgpp={d.settings.logo} />
      <Footer s={d.settings} />
    </main>
  );
}
