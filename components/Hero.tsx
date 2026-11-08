"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_SLIDES, img } from "@/lib/data";
import { Dot } from "./ui";
import Ticker from "./Ticker";

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-maroon-950">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(HERO_SLIDES[i])}
              alt="Wedding mandapam decorated by SRR Events"
              className="h-full w-full animate-kenburns object-cover"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/35 to-maroon-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
      </div>

      <div className="shell relative z-10 mt-auto pb-10 pt-40 sm:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur sm:text-[13px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
          <span className="font-telugu text-[13px] normal-case tracking-normal text-gold-300 sm:text-[15px]">శుభమస్తు</span>
          <span className="text-white/40">·</span> <span className="hidden sm:inline">Weddings · Haldi · Celebrations</span><span className="sm:hidden">Event Decorators</span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="h-display mt-6 max-w-[15ch] !tracking-[-0.018em] text-[clamp(3.1rem,9vw,8.4rem)] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,.45)]"
        >
          Crafted for your <span className="font-serif font-normal italic tracking-[-0.02em] text-gold-300">Muhurtham.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/90 sm:text-xl"
        >
          SRR Events turns function halls and open grounds into temple mandapams, marigold haldis, glowing entrances and birthday
          wonderlands, designed and built by our own crew in Kathlapur.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-9 flex flex-wrap gap-3 sm:gap-4"
        >
          <a href="#decor" className="btn-maroon !text-lg">
            Plan Your Event <Dot />
          </a>
          <a href="#gallery" className="btn-white !text-lg">
            See the Gallery <Dot tone="gold" />
          </a>
        </motion.div>

        <div className="mt-10 flex items-center gap-2">
          {HERO_SLIDES.map((s, k) => (
            <button
              key={s}
              onClick={() => setI(k)}
              aria-label={`Show slide ${k + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-gold-300" : "w-5 bg-white/35 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      <Ticker className="relative z-10 rounded-t-[28px] border-t border-gold/30" />
    </section>
  );
}
