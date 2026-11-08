"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CATEGORIES, CategoryKey, PHOTOS, catLabel, photoTitle, thumb } from "@/lib/data";
import Lightbox, { Pin } from "./Lightbox";
import { Kicker } from "./ui";

type F = "all" | CategoryKey;
const GAP = 64;

export default function GalleryString() {
  const [f, setF] = useState<F>("all");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const list = useMemo(() => (f === "all" ? interleave() : PHOTOS.filter((p) => p.cat === f)), [f]);

  useEffect(() => {
    const h = (e: Event) => {
      setF((e as CustomEvent).detail as F);
      track.current?.scrollTo({ left: 0 });
    };
    window.addEventListener("srr:filter", h);
    return () => window.removeEventListener("srr:filter", h);
  }, []);

  const hovered = hover ? PHOTOS.find((p) => p.id === hover) : null;
  const scrollBy = (d: number) => track.current?.scrollBy({ left: d * Math.min(900, window.innerWidth * 0.8), behavior: "smooth" });

  return (
    <section id="gallery" className="relative overflow-hidden bg-white pb-10 pt-28 sm:pt-32">
      <div className="shell text-center">
        <Kicker center>The Collection</Kicker>
        <h2 className="h-display mt-4 text-[clamp(2.6rem,6.5vw,5.6rem)]">
          Every celebration, <span className="grad-rev">on the string.</span>
        </h2>
      </div>

      <div className="no-scrollbar mt-9 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:justify-center sm:px-8">
        {(["all", ...CATEGORIES.map((c) => c.key)] as F[]).map((k) => {
          const count = k === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === k).length;
          const on = f === k;
          return (
            <button
              key={k}
              onClick={() => {
                setF(k);
                track.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              className={`chip shrink-0 !py-2.5 !text-[15px] ${on ? "!border-maroon-700 !bg-maroon-700 !text-white shadow-[0_0_0_3px_#fff,0_0_0_4px_rgba(122,20,38,.35)]" : ""}`}
            >
              {k === "all" ? "All pieces" : CATEGORIES.find((c) => c.key === k)!.short}
              <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] font-bold ${on ? "bg-white text-maroon-700" : "bg-gold-50 text-maroon-700"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-8">
        <div
          ref={track}
          className="no-scrollbar fade-x relative flex cursor-grab overflow-x-auto px-[6vw] pb-16 pt-4 active:cursor-grabbing"
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            drag.current = { down: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d.down) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 5) d.moved = true;
            track.current!.scrollLeft = d.left - dx;
          }}
          onPointerUp={() => (drag.current.down = false)}
          onPointerLeave={() => (drag.current.down = false)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, k) => {
              const land = p.w >= p.h;
              const w = land ? 290 : 220;
              const tilt = ((k * 37) % 7) - 3;
              return (
                <motion.div
                  key={`${f}-${p.id}`}
                  layout
                  initial={{ opacity: 0, y: -70 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: Math.min(k, 10) * 0.04, type: "spring", stiffness: 120, damping: 16 } }}
                  exit={{ opacity: 0, y: -60, transition: { duration: 0.2 } }}
                  className="relative shrink-0"
                  style={{ width: w + GAP }}
                >
                  <StringSeg w={w + GAP} k={k} />
                  <button
                    onClick={() => !drag.current.moved && setOpen(k)}
                    onMouseEnter={() => setHover(p.id)}
                    onMouseLeave={() => setHover(null)}
                    className="group relative mx-auto mt-[12px] block origin-top animate-sway"
                    style={{ width: w, animationDelay: `${-(k % 6) * 0.8}s`, animationDuration: `${5 + (k % 3)}s` }}
                    aria-label={`Open ${photoTitle(p)}`}
                  >
                    <Pin className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transition-transform duration-300 group-hover:-translate-y-1" />
                    <div
                      className="bg-white p-2 pb-9 shadow-[0_22px_34px_-18px_rgba(23,16,14,.55)] transition-all duration-500 group-hover:scale-[1.07] group-hover:shadow-[0_34px_50px_-20px_rgba(23,16,14,.6)]"
                      style={{ transform: `rotate(${tilt}deg)` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb(p.id)}
                        alt={`${catLabel(p.cat)} by SRR Events`}
                        loading="lazy"
                        draggable={false}
                        className={`w-full bg-gold-50 object-cover ${land ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                      />
                      <span className="absolute bottom-2.5 left-0 right-0 text-center font-serif text-[15px] italic text-ink/70">{photoTitle(p)}</span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-6 lg:flex">
          <button onClick={() => scrollBy(-1)} className="icon-btn pointer-events-auto !h-12 !w-12 shadow-md" aria-label="Scroll left">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scrollBy(1)} className="icon-btn pointer-events-auto !h-12 !w-12 shadow-md" aria-label="Scroll right">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="h-5 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-ink/60">
        {hovered ? `${photoTitle(hovered)}  ·  ${catLabel(hovered.cat)}` : "Hover a photo · click to lift it off the string"}
      </p>
      <div className="shell mt-8 flex flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-ink/50 sm:flex-row">
        <span>Explore the archive · {list.length} pieces</span>
        <a href="/gallery" className="border-b border-maroon-700/40 pb-0.5 font-semibold text-maroon-700">
          Open the full gallery →
        </a>
        <span>Real SRR Events setups</span>
      </div>

      <Lightbox list={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}

function StringSeg({ w, k }: { w: number; k: number }) {
  const sag = 7;
  const y = (x: number) => 6 + 4 * sag * (x / w) * (1 - x / w);
  const d = `M0,6 Q${w / 2},${6 + sag * 2} ${w},6`;
  const colors = ["#FFC861", "#FF9E8A", "#FFE08A", "#F7B6D2"];
  const bulbs = [GAP * 0.25, w - GAP * 0.25];
  return (
    <svg width={w} height={40} className="pointer-events-none absolute left-0 top-0 z-10 overflow-visible" aria-hidden>
      <path d={d} fill="none" stroke="#6f5d4b" strokeWidth="1.4" />
      {bulbs.map((x, j) => {
        const c = colors[(k * 2 + j) % colors.length];
        const yy = y(x);
        return (
          <g key={j} className="animate-twinkle" style={{ animationDelay: `${((k + j) % 5) * 0.45}s` }}>
            <circle cx={x} cy={yy + 10} r="13" fill={c} opacity=".22" />
            <rect x={x - 2} y={yy - 1} width="4" height="5" rx="1" fill="#5a4a3a" />
            <ellipse cx={x} cy={yy + 10} rx="4.2" ry="6" fill={c} />
            <ellipse cx={x - 1.3} cy={yy + 8} rx="1.2" ry="2" fill="#fff" opacity=".7" />
          </g>
        );
      })}
    </svg>
  );
}

function interleave() {
  // mix categories so "All" reads like a varied archive
  const by = CATEGORIES.map((c) => PHOTOS.filter((p) => p.cat === c.key));
  const out = [];
  for (let r = 0; out.length < PHOTOS.length; r++) for (const b of by) if (b[r]) out.push(b[r]);
  return out;
}
