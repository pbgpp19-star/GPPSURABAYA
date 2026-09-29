import Link from "next/link";
import SmartImage from "./SmartImage";
import { CalendarIcon, LocationPinIcon } from "./icons";

export type ScheduleItem = {
  id: number;
  hari: string;
  jam: string;
  tempat: string;
  image: string;
};

export default function ScheduleSection({ items }: { items: ScheduleItem[] }) {
  return (
    <section id="jadwal" className="relative bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black">
              <span className="text-[#0aa5a0]">JADWAL</span>
              <br />
              MABAR RUTIN
            </h2>
            <p className="mt-2 max-w-xs text-sm text-slate-600">
              Ayo, bermain rutin dan jaga silaturahmi!
            </p>
          </div>
          <Link
            href="/jadwal"
            className="rounded-lg border border-teal-600 px-4 py-2 text-[12px] font-bold text-teal-700 hover:bg-teal-600 hover:text-white"
          >
            LIHAT JADWAL LENGKAP →
          </Link>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {items.map((j) => (
            <div key={j.id} className="relative overflow-hidden rounded-xl card-shadow min-h-[180px] flex">
              <SmartImage
                src={j.image}
                alt={j.hari}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06263f]/95 via-[#06263f]/70 to-transparent" />
              <div className="relative p-6 flex gap-3 items-start text-white">
                <div className="flex flex-col items-center gap-3 pt-1">
                  <CalendarIcon className="h-7 w-7 text-white" />
                  <LocationPinIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-xl font-black text-amber-400">{j.hari}</div>
                  <div className="font-bold">{j.jam}</div>
                  <div className="mt-1 text-sm text-slate-200">{j.tempat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
