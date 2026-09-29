import Link from "next/link";
import SmartImage from "./SmartImage";

export type MatchItem = {
  id: number;
  tanggal: string;
  lawan: string;
  logoLawan: string;
  skorKami: number | null;
  skorLawan: number | null;
  status: string;
};

function badge(status: string) {
  if (status === "MENANG") return <span className="rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white">MENANG</span>;
  if (status === "KALAH") return <span className="rounded-md bg-red-500 px-3 py-1 text-[11px] font-bold text-white">KALAH</span>;
  if (status === "SERI") return <span className="rounded-md bg-neutral-400 px-3 py-1 text-[11px] font-bold text-white">SERI</span>;
  return <span className="rounded-md bg-neutral-200 px-3 py-1 text-[11px] font-bold text-neutral-600">AKAN DATANG</span>;
}

export default function MatchSection({ items, logoPbgpp }: { items: MatchItem[]; logoPbgpp: string }) {
  return (
    <section id="match" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black text-[#0b2a4a]">
              FRIENDLY <span className="text-[#f57c1f]">MATCH</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">Tetap semangat dalam setiap pertandingan.</p>
          </div>
          <Link
            href="/match"
            className="rounded-lg border border-teal-600 px-4 py-2 text-[12px] font-bold text-teal-700 hover:bg-teal-600 hover:text-white"
          >
            LIHAT SEMUA MATCH →
          </Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {items.slice(0, 3).map((m) => (
            <div key={m.id} className="rounded-xl border border-slate-100 p-5 text-center card-shadow bg-white">
              <div className="text-[11px] font-bold tracking-wide text-slate-700">{m.tanggal}</div>
              <div className="mt-3 flex items-center justify-around">
                <div className="flex flex-col items-center gap-1">
                  <SmartImage src={logoPbgpp} alt="PB.GPP" className="h-14 w-14 object-contain" />
                  <div className="text-[12px] font-extrabold">PB.GPP</div>
                </div>
                <div className="font-display font-black">VS</div>
                <div className="flex flex-col items-center gap-1">
                  <SmartImage src={m.logoLawan} alt={m.lawan} className="h-14 w-14 object-contain bg-black rounded" />
                  <div className="text-[12px] font-extrabold">{m.lawan}</div>
                </div>
              </div>
              <div className="mt-2 font-display text-xl font-black">
                {m.skorKami !== null ? `${m.skorKami} - ${m.skorLawan}` : "-"}
              </div>
              <div className="mt-2">{badge(m.status)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
