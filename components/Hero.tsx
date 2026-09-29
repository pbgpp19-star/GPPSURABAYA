import Link from "next/link";
import SmartImage from "./SmartImage";
import { WhatsAppIcon, CalendarIcon } from "./icons";
import { waLink } from "@/lib/defaults";

export default function Hero({ s }: { s: Record<string, string> }) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* dekorasi gelombang */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-teal-100/60 blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-72 bg-orange-200/60 blur-2xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-center py-10 lg:py-14">
        <div>
          <div className="flex items-center gap-3">
            <SmartImage src={s.logo} alt="Logo PB.GPP" className="h-40 sm:h-48 w-auto max-w-[320px] object-contain object-left" />
          </div>
          <p className="mt-4 text-[13px] font-black tracking-[0.35em] text-black">
            {s.hero_kicker}
          </p>
          <h1 className="hero-title mt-2 text-5xl sm:text-6xl">
            <span className="text-[#0aa5a0]">PLAY</span>{" "}
            <span className="text-slate-900">TOGETHER</span>
            <br />
            <span className="text-[#f57c1f]">GROW</span>{" "}
            <span className="text-slate-900">FURTHER</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
            {s.hero_desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink(s.wa_number, s.wa_text)}
              target="_blank"
              className="btn-gradient text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="h-5 w-5" /> GABUNG PB.GPP
            </a>
            <Link
              href="/jadwal"
              className="font-bold text-sm px-6 py-3 rounded-xl border border-slate-800 inline-flex items-center gap-2 hover:bg-slate-900 hover:text-white transition"
            >
              <CalendarIcon className="h-5 w-5" /> LIHAT JADWAL
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent_0,black_22%),linear-gradient(to_top,transparent_0,black_18%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]">
          <div className="absolute inset-0">
            <svg viewBox="0 0 500 300" className="h-full w-full" preserveAspectRatio="none">
              <path d="M0,200 C120,160 180,80 300,90 C420,100 460,40 500,30 L500,300 L0,300 Z" fill="#0aa5a0" opacity="0.9" />
              <path d="M0,230 C130,190 220,140 350,150 C430,156 470,110 500,100 L500,300 L0,300 Z" fill="#f57c1f" opacity="0.95" />
            </svg>
          </div>
          <SmartImage
            src={s.hero_image}
            alt="Atlet PB.GPP"
            className="relative z-10 h-[340px] sm:h-[420px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
