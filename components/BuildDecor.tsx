"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Heart, Plus } from "lucide-react";
import { SETUPS, catShort, img, thumb } from "@/lib/data";
import { usePlan } from "@/lib/plan";
import { ElementIcon, Kicker } from "./ui";

export default function BuildDecor() {
  const [i, setI] = useState(2);
  const n = SETUPS.length;
  const s = SETUPS[i];
  const plan = usePlan();
  const wheelLock = useRef(0);
  const go = useCallback((d: number) => setI((x) => Math.min(n - 1, Math.max(0, x + d))), [n]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const el = document.getElementById("decor");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight * 0.5 || r.bottom < innerHeight * 0.5) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [go]);

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    const now = Date.now();
    if (now - wheelLock.current < 450) return;
    wheelLock.current = now;
    go(e.deltaX > 0 ? 1 : -1);
  };

  const elementItems = s.elements.map((el, k) => ({ id: `${s.id}-${k}`, title: el.name, kind: s.title, image: s.image }));
  const allAdded = elementItems.every((x) => plan.has(x.id));

  return (
    <section id="decor" className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-[1fr_440px]">
        {/* stage */}
        <div className="relative overflow-hidden pb-6 pt-24 sm:pt-28 lg:pb-10 lg:pt-32">
          <div className="shell lg:!pr-6">
            <Kicker>Styled end to end</Kicker>
            <h2 className="h-display mt-4 text-[clamp(2.8rem,7vw,6rem)]">
              Build the <span className="text-maroon-700">Décor.</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg text-ink/60 sm:text-xl">
              Eight real setups we've built. Pick one to see every piece that goes into it.
            </p>
          </div>

          <motion.div
            className="relative mt-6 h-[400px] select-none sm:h-[500px] lg:h-[540px]"
            onWheel={onWheel}
            style={{ touchAction: "pan-y" }}
            onPanEnd={(_, info) => (info.offset.x < -50 ? go(1) : info.offset.x > 50 ? go(-1) : null)}
          >
            {SETUPS.map((x, k) => {
              const o = k - i;
              const a = Math.abs(o);
              if (a > 3) return null;
              return (
                <motion.button
                  key={x.id}
                  onClick={() => setI(k)}
                  aria-label={x.title}
                  className="absolute left-1/2 top-1/2 aspect-[3/4] w-[54vw] max-w-[330px] overflow-hidden rounded-[26px] bg-gold-50 shadow-[0_40px_60px_-30px_rgba(23,16,14,.55)] sm:w-[300px] lg:w-[330px]"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${o * (a === 1 ? 74 : 66)}%)`,
                    y: "-50%",
                    scale: a === 0 ? 1 : a === 1 ? 0.8 : a === 2 ? 0.64 : 0.52,
                    opacity: a === 0 ? 1 : a === 1 ? 0.85 : a === 2 ? 0.55 : 0,
                    filter: `blur(${a === 0 ? 0 : a === 1 ? 2.5 : 6}px)`,
                    zIndex: 10 - a,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                  style={{ originY: 0.5 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a === 0 ? img(x.image) : thumb(x.image)}
                    alt={x.title}
                    draggable={false}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: x.pos }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-left text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300">{catShort(x.cat)}</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">{x.title}</p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="shell mt-2 flex items-center gap-4 text-sm text-ink/60 lg:!pr-6">
            <button onClick={() => go(-1)} disabled={i === 0} className="icon-btn disabled:opacity-30" aria-label="Previous setup">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <div className="h-[2px] w-full max-w-[320px] rounded bg-ink/10">
                <div className="h-full rounded bg-maroon-700 transition-all duration-500" style={{ width: `${((i + 1) / n) * 100}%` }} />
              </div>
              <p className="mt-2">
                {i + 1} of {n} · <span className="text-ink">{s.title}</span>
              </p>
            </div>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Swipe, scroll or drag
            </span>
            <button onClick={() => go(1)} disabled={i === n - 1} className="icon-btn disabled:opacity-30" aria-label="Next setup">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* panel */}
        <aside className="border-t border-ink/10 bg-white px-4 pb-12 pt-8 sm:px-8 lg:border-l lg:border-t-0 lg:px-7 lg:pt-32">
          <p className="text-[15px] text-ink/60">In this setup</p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-4 divide-y divide-ink/10 border-y border-ink/10"
            >
              {s.elements.map((el, k) => {
                const id = `${s.id}-${k}`;
                const added = plan.has(id);
                return (
                  <li key={id} className="flex items-center gap-4 py-3.5">
                    <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 text-maroon-700">
                      <ElementIcon name={el.icon} className="h-6 w-6" />
                      <span className="absolute right-1 top-0.5 text-[10px] text-ink/50">{k + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">SRR · {catShort(s.cat)}</p>
                      <p className="mt-0.5 font-medium leading-snug text-ink">{el.name}</p>
                      <p className="text-[13px] text-ink/55">{el.note}</p>
                    </div>
                    <button onClick={() => plan.toggleLike(id)} aria-label="Save" className="p-1.5 text-maroon-700">
                      <Heart className="h-[18px] w-[18px]" fill={plan.isLiked(id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => (added ? plan.remove(id) : plan.add({ id, title: el.name, kind: s.title, image: s.image }))}
                      aria-label={added ? "Remove from plan" : "Add to plan"}
                      className={`grid h-8 w-8 place-items-center rounded-full transition ${added ? "bg-maroon-700 text-white" : "text-ink/40 hover:bg-ink/5 hover:text-ink"}`}
                    >
                      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] text-ink">Complete the setup</p>
              <p className="text-[13px] text-ink/50">All {s.elements.length} pieces · one quote</p>
            </div>
            <p className="text-right text-[13px] leading-tight text-ink/50">
              Price on
              <br />
              <span className="text-lg font-semibold text-maroon-700">request</span>
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => plan.add([{ id: `setup-${s.id}`, title: `${s.title} (full setup)`, kind: catShort(s.cat), image: s.image }])}
              className="btn-maroon flex-1 justify-between !py-2.5 !text-[17px]"
            >
              {plan.has(`setup-${s.id}`) || allAdded ? "Added to plan" : "Add full setup to plan"}
              <span className="btn-dot bg-white text-maroon-700">
                <ClipboardList className="h-4 w-4" />
              </span>
            </button>
            <button onClick={() => plan.toggleLike(`setup-${s.id}`)} className="icon-btn !h-14 !w-14 text-maroon-700" aria-label="Save setup">
              <Heart className="h-5 w-5" fill={plan.isLiked(`setup-${s.id}`) ? "currentColor" : "none"} />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
