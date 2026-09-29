import Link from "next/link";
import SmartImage from "./SmartImage";
import { InstagramIcon, YoutubeIcon } from "./icons";

export default function Footer({ s }: { s: Record<string, string> }) {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
        <SmartImage src={s.logo} alt="PB.GPP" className="h-14 w-auto object-contain" />
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-slate-700">
          <Link href="/">BERANDA</Link>
          <Link href="/tentang">TENTANG</Link>
          <Link href="/jadwal">JADWAL</Link>
          <Link href="/match">MATCH</Link>
          <Link href="/galeri">GALERI</Link>
          <Link href="/member">MEMBER</Link>
          <Link href="/kontak">KONTAK</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href={s.instagram} target="_blank" aria-label="Instagram" className="text-slate-800 hover:text-teal-600 transition">
            <InstagramIcon className="h-6 w-6" />
          </a>
          <a href={s.youtube} target="_blank" aria-label="YouTube" className="text-slate-800 hover:text-teal-600 transition">
            <YoutubeIcon className="h-6 w-6" />
          </a>
          <div className="border-l pl-4 text-[12px] leading-tight">
            <div className="font-extrabold">PB.GPP</div>
            <div className="text-slate-500">Badminton Community</div>
            <div className="text-slate-500">Surabaya</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
