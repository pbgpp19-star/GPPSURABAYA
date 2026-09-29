import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import ScheduleSection from "@/components/ScheduleSection";
import MatchSection from "@/components/MatchSection";
import GallerySection from "@/components/GallerySection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getSiteData();
  return (
    <main>
      <Navbar logo={data.settings.logo} waNumber={data.settings.wa_number} waText={data.settings.wa_text} />
      <Hero s={data.settings} />
      <Highlights />
      <About s={data.settings} />
      <ScheduleSection items={data.schedules} />
      <MatchSection items={data.matches} logoPbgpp={data.settings.logo} />
      <GallerySection items={data.gallery} />
      <CTA s={data.settings} />
      <Footer s={data.settings} />
    </main>
  );
}
