import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  let logo = "/images/logo-pbgpp.svg";
  try {
    const d = await getSiteData();
    if (d.settings.logo) logo = d.settings.logo;
  } catch {
    // fallback ke logo default
  }
  return {
    title: "PB.GPP Surabaya — Play Together, Grow Further",
    description:
      "PB.GPP adalah komunitas badminton di Surabaya untuk bermain, berlatih, menjalin silaturahmi, dan berkembang bersama.",
    icons: { icon: logo },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${montserrat.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
