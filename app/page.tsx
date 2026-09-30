import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import ScheduleSection from "@/components/ScheduleSection";
import MatchSection from "@/components/MatchSection";
import GallerySection from "@/components/GallerySection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getSiteData();
  return (
    <main>
      <Navbar logo={data.settings.logo} waNumber={data.settings.wa_number} waText={data.settings.wa_text} />
      <Reveal>
        <Hero s={data.settings} />
      </Reveal>
      <Reveal delay={100}>
        <Highlights />
      </Reveal>
      <Reveal delay={100}>
        <About s={data.settings} />
      </Reveal>
      <Reveal delay={100}>
        <ScheduleSection items={data.schedules} />
      </Reveal>
      <Reveal delay={100}>
        <MatchSection items={data.matches} logoPbgpp={data.settings.logo} />
      </Reveal>
      <Reveal delay={100}>
        <GallerySection items={data.gallery} />
      </Reveal>
      <Reveal delay={100}>
        <CTA s={data.settings} />
      </Reveal>
      <Footer s={data.settings} />
    </main>
  );
}
