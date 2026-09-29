import Link from "next/link";
import SmartImage from "./SmartImage";
import { StripedCircleIcon, FilledStarIcon, MiniBarsIcon } from "./icons";

const POINTS = [
  { Icon: StripedCircleIcon, title: "KOMUNITAS", desc: "UNTUK SEMUA LEVEL" },
  { Icon: FilledStarIcon, title: "JADWAL RUTIN", desc: "SETIAP MINGGU" },
  { Icon: StripedCircleIcon, title: "BANYAK EVENT", desc: "MABAR & FRIENDLY MATCH" },
  { Icon: MiniBarsIcon, title: "LINGKUNGAN POSITIF", desc: "DAN MENYENANGKAN" },
];

export default function About({ s }: { s: Record<string, string> }) {
  return (
    <section id="tentang" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_1.2fr_0.9fr] gap-8 items-center">
        <div>
          <p className="text-[13px] font-bold tracking-[0.3em]">TENTANG</p>
          <h2 className="font-display text-3xl font-black">
            <span className="text-[#0aa5a0]">PB.GPP</span> SURABAYA
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{s.about_text}</p>
          <Link
            href="/tentang"
            className="btn-gradient mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-bold text-white"
          >
            SELENGKAPNYA <span>→</span>
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl card-shadow">
          <SmartImage src={s.about_image} alt="Tentang PB.GPP" className="h-64 w-full object-cover" />
        </div>
        <div className="rounded-xl bg-sky-50 p-5 flex flex-col gap-5">
          {POINTS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="shrink-0">
                <Icon className="h-9 w-9" />
              </div>
              <div>
                <div className="text-[12px] font-extrabold">{title}</div>
                <div className="text-[12px] text-slate-600">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
