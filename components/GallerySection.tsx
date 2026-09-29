import Link from "next/link";
import SmartImage from "./SmartImage";

export default function GallerySection({
  items,
}: {
  items: { id: number; image: string; caption: string }[];
}) {
  return (
    <section id="galeri" className="bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black">
              GALERI <span className="text-[#f57c1f]">KEGIATAN</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">Momen kebersamaan PB.GPP</p>
          </div>
          <Link
            href="/galeri"
            className="rounded-lg border border-teal-600 px-4 py-2 text-[12px] font-bold text-teal-700 hover:bg-teal-600 hover:text-white"
          >
            LIHAT SEMUA FOTO →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.slice(0, 5).map((g) => (
            <div key={g.id} className="overflow-hidden rounded-lg card-shadow group">
              <SmartImage
                src={g.image}
                alt={g.caption || "Galeri PB.GPP"}
                className="h-44 w-full object-cover group-hover:scale-105 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
