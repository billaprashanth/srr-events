import { Suspense } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery · SRR Events",
  description: "Real wedding mandapams, reception stages, haldi setups, entrances, birthday and cradle ceremony décor by SRR Events, Kathlapur.",
};

export default function GalleryPage() {
  return (
    <>
      <Nav base="/" />
      <main className="bg-white">
        <div className="bg-maroon-950 pb-16 pt-36 text-white sm:pt-44">
          <div className="shell">
            <p className="kicker !text-white/70">The full archive</p>
            <h1 className="h-display mt-4 text-[clamp(2.8rem,8vw,7rem)]">
              Our <span className="font-serif font-normal italic text-gold-300">Gallery.</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg text-white/75">Every photo here is a setup our crew built. Tap one to see it large and add it to your plan.</p>
          </div>
        </div>
        <Suspense>
          <GalleryGrid />
        </Suspense>
      </main>
      <Footer base="/" />
    </>
  );
}
