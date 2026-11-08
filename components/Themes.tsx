"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Heart, Plus } from "lucide-react";
import { THEMES, thumb } from "@/lib/data";
import { usePlan } from "@/lib/plan";

export default function Themes() {
  const [c, setC] = useState(4);
  const n = THEMES.length;
  const go = (d: number) => setC((x) => (x + d + n) % n);

  return (
    <section id="themes" className="relative overflow-hidden bg-white pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="shell flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="h-display text-[clamp(2.8rem,7vw,6rem)]">
          Pick a <span className="text-maroon-700">Theme</span>
        </h2>
        <p className="max-w-[38ch] text-lg text-ink/65 md:text-right">
          Tilt a card, press it, drag the row. Hit{" "}
          <span className="inline-grid h-6 w-6 translate-y-1 place-items-center rounded-full bg-ink text-white">
            <Plus className="h-3.5 w-3.5" />
          </span>{" "}
          to drop a theme into your event plan.
        </p>
      </div>

      <motion.div
        className="relative mt-10 h-[470px] sm:mt-14 sm:h-[540px]"
        style={{ perspective: 1400, touchAction: "pan-y" }}
        onPanEnd={(_, i) => (i.offset.x < -40 ? go(1) : i.offset.x > 40 ? go(-1) : null)}
      >
        {THEMES.map((t, k) => {
          let o = k - c;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          return <ThemeCard key={t.id} t={t} o={o} onFocus={() => setC(k)} />;
        })}
      </motion.div>

      <div className="shell mt-2 flex items-center justify-center gap-3">
        <button onClick={() => go(-1)} className="icon-btn" aria-label="Previous theme">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="min-w-[160px] text-center text-sm text-ink/60">
          {c + 1} / {n} · <span className="text-ink">{THEMES[c].title}</span>
        </span>
        <button onClick={() => go(1)} className="icon-btn" aria-label="Next theme">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function ThemeCard({ t, o, onFocus }: { t: (typeof THEMES)[number]; o: number; onFocus: () => void }) {
  const plan = usePlan();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });
  const a = Math.abs(o);
  const added = plan.has(t.id);
  const words = t.title.toUpperCase().split(" ");

  return (
    <motion.div
      className="absolute left-1/2 top-6 w-[250px] sm:w-[290px]"
      initial={false}
      animate={{
        x: `calc(-50% + ${o * 104}%)`,
        y: o * o * 14,
        rotate: o * 5.5,
        opacity: a > 3 ? 0 : 1,
        zIndex: 20 - a,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{ pointerEvents: a > 3 ? "none" : "auto" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        onClick={onFocus}
        whileTap={{ scale: 0.95 }}
        style={{ rotateX: rx, rotateY: ry, background: t.color, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4.25] cursor-pointer overflow-hidden rounded-[22px] shadow-[0_30px_50px_-25px_rgba(23,16,14,.6)]"
      >
        <div className="pointer-events-none absolute inset-3 rounded-[14px] border border-dashed" style={{ borderColor: `${t.ink}55` }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.55), transparent 60%)" }}
        />
        <h3
          className="relative px-5 pt-6 text-center font-condensed uppercase leading-[0.86]"
          style={{ color: t.ink, fontSize: words.some((w) => w.length > 7) ? 54 : 62, transform: "translateZ(20px)" }}
        >
          {words.map((w) => (
            <span key={w} className="block">
              {w}
            </span>
          ))}
        </h3>
        <div
          className="absolute inset-x-6 bottom-16 top-[38%] overflow-hidden rounded-2xl shadow-[0_24px_30px_-14px_rgba(0,0,0,.65)] ring-2 ring-white/70"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb(t.image)} alt={t.title} draggable={false} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: t.pos }} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            plan.toggleLike(t.id);
          }}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-maroon-700 shadow"
          aria-label="Save theme"
        >
          <Heart className="h-4 w-4" fill={plan.isLiked(t.id) ? "currentColor" : "none"} />
        </button>
        <p className="absolute bottom-5 left-5 text-[13px] font-bold tracking-wide" style={{ color: t.ink }}>
          {t.kind}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            added ? plan.remove(t.id) : plan.add({ id: t.id, title: `${t.title} theme`, kind: t.kind, image: t.image });
          }}
          className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full bg-ink text-white ring-[3px] ring-white transition hover:scale-110"
          aria-label={added ? "Remove theme from plan" : "Add theme to plan"}
        >
          {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
      </motion.div>
    </motion.div>
  );
}
