"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Heart } from "lucide-react";
import { WEDDINGS, img, thumb } from "@/lib/data";
import { usePlan } from "@/lib/plan";
import { Kicker } from "./ui";

export default function Weddings() {
  const [c, setC] = useState(4);
  const n = WEDDINGS.length;
  const plan = usePlan();
  const go = (d: number) => setC((x) => (x + d + n) % n);
  const w = WEDDINGS[c];
  const pid = `wedding-${w.id}`;
  const added = plan.has(pid);

  return (
    <section id="weddings" className="relative overflow-hidden bg-white pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="shell text-center">
        <Kicker center>For the muhurtham and every vow after</Kicker>
        <h2 className="h-display mt-4 text-[clamp(2.6rem,6.5vw,5.6rem)]">
          The Wedding <span className="text-maroon-700">Collection</span>
        </h2>
      </div>

      <motion.div
        className="relative mt-10 h-[420px] sm:h-[520px]"
        style={{ touchAction: "pan-y" }}
        onPanEnd={(_, i) => (i.offset.x < -40 ? go(1) : i.offset.x > 40 ? go(-1) : null)}
      >
        {WEDDINGS.map((x, k) => {
          let o = k - c;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const a = Math.abs(o);
          return (
            <motion.button
              key={x.id}
              onClick={() => setC(k)}
              className="absolute left-1/2 top-0 aspect-[3/4.1] w-[62vw] max-w-[330px] origin-bottom sm:w-[330px]"
              initial={false}
              animate={{
                x: `calc(-50% + ${o * 74}%)`,
                y: a * a * 9 + a * 26,
                rotate: o * 9,
                scale: a === 0 ? 1 : 0.86 - a * 0.04,
                opacity: a > 3 ? 0 : a === 0 ? 1 : 1 - a * 0.22,
                zIndex: 20 - a,
              }}
              transition={{ type: "spring", stiffness: 110, damping: 19 }}
              style={{ pointerEvents: a > 3 ? "none" : "auto" }}
              aria-label={x.name}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-b-[14px] rounded-t-[999px] bg-gold-50 transition-shadow duration-500 ${
                  a === 0 ? "shadow-[0_0_0_3px_#E6C677,0_30px_60px_-20px_rgba(201,154,62,.65)]" : "shadow-[0_24px_40px_-24px_rgba(23,16,14,.5)]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a === 0 ? img(x.id) : thumb(x.id)} alt={x.name} draggable={false} className="h-full w-full object-cover" style={{ objectPosition: x.pos || "50% 50%" }} />
                {a > 0 && <div className="absolute inset-0 bg-white/10" />}
                {x.tag && (
                  <span className="absolute right-0 top-[22%] rounded-l-md bg-maroon-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">{x.tag}</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="shell relative z-30 -mt-2 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-tight">{w.name}</h3>
            <p className="mt-1 text-ink/55">{w.note}</p>
            <p className="mt-2 text-xl font-semibold text-gold-500">Custom quote</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={() => go(-1)} className="icon-btn !h-12 !w-12" aria-label="Previous mandapam">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => (added ? plan.remove(pid) : plan.add({ id: pid, title: `${w.name} mandapam`, kind: "Wedding", image: w.id }))}
            className={`flex min-w-[220px] items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[17px] font-semibold text-white shadow-[inset_0_0_0_1.5px_rgba(230,198,119,.7)] transition ${
              added ? "bg-ink" : "bg-maroon-700 hover:bg-maroon-800"
            }`}
          >
            {added && <Check className="h-4 w-4" />}
            {added ? "In your plan" : "Add to my plan"}
          </button>
          <button onClick={() => plan.toggleLike(pid)} className="icon-btn !h-12 !w-12 text-maroon-700" aria-label="Save">
            <Heart className="h-5 w-5" fill={plan.isLiked(pid) ? "currentColor" : "none"} />
          </button>
          <button onClick={() => go(1)} className="icon-btn !h-12 !w-12" aria-label="Next mandapam">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
