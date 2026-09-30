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
    metadataBase: new URL("https://pb-gppsurabaya.site"),
    title: d.settings.seo_title || "PB.GPP Surabaya",
    description: d.settings.seo_description || "PB.GPP adalah komunitas badminton di Surabaya.",
    icons: { icon: logo },
    verification: { google: "DOno0MvFIUHnFIDDOJXQcDKczJ0TB1RilFQ2Kg4p1ZY" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://pb-gppsurabaya.site",
      siteName: "PB.GPP Surabaya",
      title: d.settings.seo_title || "PB.GPP Surabaya",
      description: d.settings.seo_description || "PB.GPP adalah komunitas badminton di Surabaya.",
      images: [{ url: logo, alt: "PB.GPP Surabaya" }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.settings.seo_title || "PB.GPP Surabaya",
      description: d.settings.seo_description || "PB.GPP adalah komunitas badminton di Surabaya.",
      images: [logo],
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${montserrat.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
