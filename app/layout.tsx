import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavigationProgress from "@/components/NavigationProgress";
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
  let title = "PB.GPP Surabaya | Komunitas Badminton Surabaya – Mabar Rutin";
  let desc =
    "PB.GPP adalah komunitas badminton di Surabaya. Mabar rutin tiap Selasa & Sabtu, friendly match badminton, terbuka untuk semua level. Gabung main bareng!";
  try {
    const d = await getSiteData();
    if (d.settings.logo) logo = d.settings.logo;
    if (d.settings.seo_title) title = d.settings.seo_title;
    if (d.settings.seo_description) desc = d.settings.seo_description;
  } catch {
    // fallback ke default
  }
  return {
    metadataBase: new URL("https://pb-gppsurabaya.site"),
    title,
    description: desc,
    icons: { icon: logo },
    verification: { google: "DOno0MvFIUHnFIDDOJXQcDKczJ0TB1RilFQ2Kg4p1ZY" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://pb-gppsurabaya.site",
      siteName: "PB.GPP Surabaya",
      title,
      description: desc,
      images: [{ url: logo, alt: "PB.GPP Surabaya" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [logo],
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${montserrat.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
