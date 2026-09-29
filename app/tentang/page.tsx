import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="btn-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-black">{title}</h1>
        <p className="mt-1 text-sm text-white/90">{sub}</p>
      </div>
    </div>
  );
}

export default async function Tentang() {
  const d = await getSiteData();
  return (
    <main>
      <Navbar logo={d.settings.logo} waNumber={d.settings.wa_number} waText={d.settings.wa_text} />
      <PageHead title="TENTANG PB.GPP" sub="Komunitas badminton Surabaya — Play Together, Grow Further" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-2xl font-black">Cerita Kami</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.settings.about_text}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Kami rutin mengadakan mabar setiap Selasa dan Sabtu, friendly match dengan klub lain,
            serta gathering komunitas. Semua level — pemula sampai advance — welcome!
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-sky-50 p-4 font-bold">✓ Semua level</div>
            <div className="rounded-xl bg-sky-50 p-4 font-bold">✓ Jadwal rutin mingguan</div>
            <div className="rounded-xl bg-sky-50 p-4 font-bold">✓ Event & friendly match</div>
            <div className="rounded-xl bg-sky-50 p-4 font-bold">✓ Lingkungan positif</div>
          </div>
        </div>
        <SmartImage src={d.settings.about_image} alt="Tentang" className="w-full h-80 object-cover rounded-xl card-shadow" />
      </div>
      <Footer s={d.settings} />
    </main>
  );
}
