"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { Kicker } from "./ui";

const RIBBON = "M-40,170 C120,40 260,40 380,150 S640,280 760,150 S1000,20 1120,140 S1380,260 1480,120";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const len = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-hidden bg-ivory pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>How we work</Kicker>
            <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,5.2rem)]">
              Four steps, <span className="grad">one celebration.</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-lg text-ink/60 lg:text-right">From the first phone call to the last flower taken down, one team handles all of it.</p>
        </div>
      </div>

      <div ref={ref} className="relative mt-12">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 hidden h-[300px] w-full lg:block" aria-hidden>
          <defs>
            <linearGradient id="silk" x1="0" x2="1">
              <stop offset="0" stopColor="#7A1426" />
              <stop offset=".45" stopColor="#C2185B" />
              <stop offset=".7" stopColor="#D8AE55" />
              <stop offset="1" stopColor="#F09A2A" />
            </linearGradient>
          </defs>
          <path d={RIBBON} fill="none" stroke="#E6C677" strokeOpacity=".25" strokeWidth="26" strokeLinecap="round" />
          <motion.path d={RIBBON} fill="none" stroke="url(#silk)" strokeWidth="20" strokeLinecap="round" style={{ pathLength: len }} />
          <motion.path d={RIBBON} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" transform="translate(0 -5)" style={{ pathLength: len }} />
        </svg>

        <div className="shell relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pt-[230px]">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-3xl border border-gold/25 bg-white p-7 shadow-[0_24px_50px_-34px_rgba(122,20,38,.45)]"
            >
              <span className="font-serif text-5xl italic text-gold-500">{p.n}</span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/60">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
