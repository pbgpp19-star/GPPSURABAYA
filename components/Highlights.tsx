import {
  CommunityIcon,
  ShuttlecockIcon,
  ChartIcon,
  HandshakeIcon,
  TrophyIcon,
} from "./icons";

const ITEMS = [
  { Icon: CommunityIcon, title: "KOMUNITAS", sub: "SOLID" },
  { Icon: ShuttlecockIcon, title: "BERMAIN", sub: "RUTIN" },
  { Icon: ChartIcon, title: "TERUS", sub: "BERKEMBANG" },
  { Icon: HandshakeIcon, title: "SILATURAHMI", sub: "LEBIH LUAS" },
  { Icon: TrophyIcon, title: "SPORTIF", sub: "DAN KOMPAK" },
];

export default function Highlights() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
        {ITEMS.map(({ Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center gap-1">
            <div>
              <Icon className="h-12 w-12" />
            </div>
            <div className="text-[12px] font-extrabold tracking-wide text-slate-900">{title}</div>
            <div className="text-[12px] font-extrabold tracking-wide text-slate-900">{sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
