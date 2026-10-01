"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  // Tampilkan bar saat link internal diklik
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || a.target === "_blank") return;
      if (href.split("?")[0] !== pathname) setBusy(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Sembunyikan sesaat setelah halaman baru tampil
  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => setBusy(false), 600);
    return () => clearTimeout(t);
  }, [pathname, busy]);

  if (!busy) return null;
  return <div className="nav-progress" aria-hidden="true" />;
}
