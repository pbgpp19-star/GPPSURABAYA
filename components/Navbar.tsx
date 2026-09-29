"use client";
import Link from "next/link";
import { useState } from "react";
import SmartImage from "./SmartImage";
import { WhatsAppIcon } from "./icons";
import { waLink } from "@/lib/defaults";

const MENUS = [
  { label: "BERANDA", href: "/" },
  { label: "TENTANG", href: "/tentang" },
  { label: "JADWAL", href: "/jadwal" },
  { label: "MATCH", href: "/match" },
  { label: "GALERI", href: "/galeri" },
  { label: "MEMBER", href: "/member" },
  { label: "KONTAK", href: "/kontak" },
];

export default function Navbar({
  logo,
  waNumber,
  waText,
}: {
  logo: string;
  waNumber: string;
  waText: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <SmartImage src={logo} alt="PB.GPP" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold tracking-wide">
          {MENUS.map((m, i) => (
            <Link
              key={m.label}
              href={m.href}
              className={
                i === 0
                  ? "text-teal-600 border-b-2 border-teal-500 pb-1"
                  : "text-slate-800 hover:text-teal-600"
              }
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href={waLink(waNumber, waText)}
            target="_blank"
            className="btn-gradient text-white text-[12px] font-bold px-5 py-2.5 rounded-full inline-flex items-center gap-2"
          >
            <span><WhatsAppIcon className="h-4 w-4" /></span> GABUNG SEKARANG
          </a>
        </div>
        <button
          className="lg:hidden text-2xl px-2"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white px-4 py-3 flex flex-col gap-3 text-sm font-bold">
          {MENUS.map((m) => (
            <Link key={m.label} href={m.href} onClick={() => setOpen(false)}>
              {m.label}
            </Link>
          ))}
          <a
            href={waLink(waNumber, waText)}
            target="_blank"
            className="btn-gradient text-white px-5 py-2.5 rounded-full text-center"
          >
            GABUNG SEKARANG
          </a>
        </div>
      )}
    </header>
  );
}
