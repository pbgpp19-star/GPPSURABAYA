import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { getSiteData } from "@/lib/site";
export const dynamic = "force-dynamic";
export default async function MemberPage() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <div className="btn-gradient text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">MEMBER PB.GPP</h1>
        <p className="text-sm text-white/90">Kenalan dengan anggota komunitas kami.</p>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {d.members.map((m) => (
          <div key={m.id} className="rounded-xl border p-4 text-center card-shadow bg-white">
            <SmartImage src={m.foto} alt={m.nama} className="h-36 w-full object-cover rounded-lg" />
            <div className="mt-2 font-extrabold text-sm">{m.nama}</div>
            <div className="text-xs text-teal-700 font-bold">{m.level}</div>
          </div>
        ))}
      </div>
      <Footer s={d.settings} />
    </main>
  );
}
