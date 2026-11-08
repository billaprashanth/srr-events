"use client";
import { motion } from "framer-motion";
import { ARCHES, img, thumb } from "@/lib/data";
import { ArchDefs, Kicker } from "./ui";

const ARCH_D =
  "M0,1 L0,0.42 L0.05,0.42 L0.05,0.36 L0.1,0.36 C0.14,0.24 0.3,0.18 0.42,0.08 C0.46,0.05 0.48,0.02 0.5,0 C0.52,0.02 0.54,0.05 0.58,0.08 C0.7,0.18 0.86,0.24 0.9,0.36 L0.95,0.36 L0.95,0.42 L1,0.42 L1,1 Z";

export function filterGallery(cat: string) {
  window.dispatchEvent(new CustomEvent("srr:filter", { detail: cat }));
  document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
}

export default function Celebrations() {
  return (
    <section id="celebrations" className="relative bg-white pb-16 pt-24 sm:pb-20 sm:pt-32">
      <ArchDefs />
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>The SRR Archive</Kicker>
            <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,5.2rem)]">
              Six Celebrations. <span className="grad">One Signature</span>
            </h2>
          </div>
          <p className="max-w-[34ch] text-lg leading-relaxed text-ink/60 lg:text-right">
            Decorated by hand, remembered for a lifetime. Six kinds of celebration, one crew that builds every one of them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
          {ARCHES.map((a, i) => (
            <motion.button
              key={a.cat}
              onClick={() => filterGallery(a.cat)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full max-w-[210px] transition-transform duration-500 group-hover:-translate-y-2">
                {/* finial */}
                <svg viewBox="0 0 20 30" className="mx-auto mb-1 h-6 w-4 text-gold-500" fill="currentColor" aria-hidden>
                  <circle cx="10" cy="4" r="3" />
                  <path d="M10 8c3 3 5 6 5 9H5c0-3 2-6 5-9Z" />
                  <rect x="4" y="18" width="12" height="2.5" rx="1" />
                  <rect x="9" y="20" width="2" height="10" />
                </svg>
                <div className="relative aspect-[3/4.3] drop-shadow-[0_18px_28px_rgba(122,20,38,.18)] transition-[filter] duration-500 group-hover:drop-shadow-[0_24px_40px_rgba(201,154,62,.45)]">
                  <div className="arch-clip absolute inset-0 overflow-hidden bg-gold-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb(a.image)}
                      srcSet={`${thumb(a.image)} 640w, ${img(a.image)} 1600w`}
                      sizes="220px"
                      alt={a.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: a.pos }}
                    />
                  </div>
                  <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                    <path d={ARCH_D} fill="none" stroke="#C99A3E" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
                    <path
                      d={ARCH_D}
                      transform="translate(0.06 0.045) scale(0.88 0.94)"
                      fill="none"
                      stroke="#F3E4C0"
                      strokeOpacity=".85"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
              <span className="mt-5 max-w-[16ch] text-[12px] font-semibold uppercase leading-snug tracking-[0.22em] text-ink">{a.label}</span>
              <span className="mt-1.5 text-[12px] text-maroon-700 opacity-0 transition-opacity group-hover:opacity-100">View gallery →</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
