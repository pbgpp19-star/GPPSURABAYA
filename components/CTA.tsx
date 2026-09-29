import SmartImage from "./SmartImage";
import { WhatsAppIcon } from "./icons";
import { waLink } from "@/lib/defaults";

export default function CTA({ s }: { s: Record<string, string> }) {
  return (
    <section className="relative overflow-hidden">
      {s.cta_bg ? (
        <>
          <SmartImage
            src={s.cta_bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06263f]/85 via-[#06263f]/55 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 btn-gradient" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center text-white">
        <div className="flex gap-4 items-center">
          <div>
            <h2 className="font-display text-3xl font-black tracking-wide">GABUNG PB.GPP</h2>
            <p className="mt-1 max-w-md text-sm text-white/90">
              Terbuka untuk semua yang ingin bermain, berlatih dan menjadi bagian dari komunitas
              kami.
            </p>
          </div>
        </div>
        <a
          href={waLink(s.wa_number, s.wa_text)}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-emerald-700 shadow hover:scale-[1.02] transition justify-self-start lg:justify-self-end"
        >
          <WhatsAppIcon className="h-5 w-5" bubble="#00A19D" handset="#fff" /> HUBUNGI VIA WHATSAPP
        </a>
      </div>
      {!s.cta_bg && (
        <div className="pointer-events-none absolute right-10 top-0 hidden lg:block opacity-30">
          <SmartImage src={s.hero_image} alt="" className="h-36 w-auto object-cover" />
        </div>
      )}
    </section>
  );
}
