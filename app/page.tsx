import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Celebrations from "@/components/Celebrations";
import BuildDecor from "@/components/BuildDecor";
import Themes from "@/components/Themes";
import GalleryString from "@/components/GalleryString";
import Film from "@/components/Film";
import Reels from "@/components/Reels";
import Weddings from "@/components/Weddings";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Celebrations />
        <BuildDecor />
        <Themes />
        <GalleryString />
        <Film />
        <Ticker />
        <Reels />
        <Weddings />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
