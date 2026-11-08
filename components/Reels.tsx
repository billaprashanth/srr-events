"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { REELS } from "@/lib/data";
import { Kicker } from "./ui";

const SPAN = 5;

export default function Reels() {
  const [c, setC] = useState(0);
  const [auto, setAuto] = useState(true);
  const [full, setFull] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const sec = useRef<HTMLElement>(null);
  const n = REELS.length;
  const go = (d: number) => setC((x) => x + d);
  const idx = (k: number) => ((k % n) + n) % n;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (sec.current) io.observe(sec.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || full !== null || !inView) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [c, auto, full, inView]);

  return (
    <section ref={sec} id="reels" className="relative overflow-hidden bg-white pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="shell flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <Kicker>The SRR Reels</Kicker>
          <h2 className="h-display mt-4 text-[clamp(2.8rem,7vw,6rem)]">
            Moments, <span className="text-gold-500">in</span> <span className="text-maroon-700">motion.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          <p className="max-w-[44ch] text-lg text-ink/60 lg:text-right">
            Short clips straight from our events: a sangeet stage, a mandapam walk-through, a haldi corner and the venue from the air. Tap the centre reel to watch it full screen, with sound.
          </p>
          <div className="flex gap-2.5">
            <button onClick={() => go(-1)} className="icon-btn !h-14 !w-14" aria-label="Previous reel">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setAuto((a) => !a)} className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white" aria-label={auto ? "Pause autoplay" : "Resume autoplay"}>
              {auto ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={() => go(1)} className="icon-btn !h-14 !w-14" aria-label="Next reel">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="relative mt-10 h-[460px] sm:h-[560px]"
        style={{ perspective: 1600, touchAction: "pan-y" }}
        onPanEnd={(_, i) => (i.offset.x < -40 ? go(1) : i.offset.x > 40 ? go(-1) : null)}
      >
        {Array.from({ length: SPAN * 2 + 1 }, (_, j) => j - SPAN).map((o) => {
          const k = c + o;
          const r = REELS[idx(k)];
          const a = Math.abs(o);
          const center = o === 0;
          return (
            <motion.div
              key={k}
              className="absolute left-1/2 top-1/2 aspect-[9/16] w-[220px] sm:w-[250px]"
              initial={false}
              animate={{
                x: `calc(-50% + ${o * 118 - Math.sign(o) * a * a * 4}%)`,
                y: "-50%",
                rotateY: o * -16,
                z: -a * a * 26,
                scale: center ? 1 : 1 - a * 0.1,
                opacity: a > 4 ? 0 : 1,
                zIndex: 20 - a,
              }}
              transition={{ type: "spring", stiffness: 110, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                onClick={() => (center ? setFull(idx(k)) : go(o))}
                className={`group relative h-full w-full overflow-hidden rounded-[20px] bg-ink text-left shadow-[0_30px_50px_-24px_rgba(23,16,14,.7)] ${center ? "ring-2 ring-gold-300/70" : ""}`}
                aria-label={center ? `Play ${r.title} full screen` : `Show ${r.title}`}
              >
                {center ? (
                  <video
                    key={r.src}
                    src={`/media/${r.src}.mp4`}
                    poster={`/media/${r.src}-poster.jpg`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/media/${r.src}-poster.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
                <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-white backdrop-blur">
                    <span className={`h-1.5 w-1.5 rounded-full ${center ? "bg-red-500" : "bg-gold-300"}`} /> REEL 0{idx(k) + 1}
                  </span>
                  <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{r.dur}</span>
                </div>
                {center && (
                  <span className="absolute left-1/2 top-[42%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                  </span>
                )}
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">{r.tag}</p>
                  <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight">{r.title}</p>
                  <p className="mt-2 text-[13px] text-white/75">{r.place}</p>
                  {center && (
                    <div className="mt-3 h-[3px] w-full overflow-hidden rounded bg-white/25">
                      <div className="h-full bg-gold-300" style={{ width: `${progress * 100}%` }} />
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {full !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFull(null)}
          >
            <button onClick={() => setFull(null)} className="absolute right-5 top-5 flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-white/80">
              CLOSE <X className="h-4 w-4" />
            </button>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <video src={`/media/${REELS[full].src}.mp4`} autoPlay controls playsInline className="max-h-[80svh] w-full rounded-2xl bg-black" />
              <p className="mt-4 text-center text-white">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">{REELS[full].tag}</span>
                <span className="ml-3 text-xl font-semibold">{REELS[full].title}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
