"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ClipboardList, Heart, Menu, X } from "lucide-react";
import { Logo } from "./ui";
import { usePlan } from "@/lib/plan";

const LINKS = [
  ["Home", "home"],
  ["Celebrations", "celebrations"],
  ["Build the Décor", "decor"],
  ["Themes", "themes"],
  ["Gallery", "gallery"],
  ["Film", "film"],
  ["Weddings", "weddings"],
] as const;

export default function Nav({ base = "" }: { base?: string }) {
  const { items, liked, setOpen } = usePlan();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 sm:pl-8 ${
            scrolled
              ? "border-gold/50 bg-maroon-900/85 shadow-[0_18px_50px_-20px_rgba(36,5,9,.8)]"
              : "border-gold/40 bg-maroon-950/35"
          }`}
        >
          <a href={`${base}#home`} aria-label="SRR Events home" className="shrink-0">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {LINKS.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`${base}#${id}`}
                  className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    active === id && !base ? "bg-gradient-to-b from-gold-300 to-gold-500 text-maroon-950 shadow-inner" : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="relative hidden h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold sm:grid" aria-label="Saved favourites">
              <Heart className="h-[18px] w-[18px]" />
              {liked.length > 0 && <Badge n={liked.length} />}
            </button>
            <button onClick={() => setOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold" aria-label="Open my event plan">
              <ClipboardList className="h-[18px] w-[18px]" />
              {items.length > 0 && <Badge n={items.length} />}
            </button>
            <a href={`${base}#contact`} className="hidden items-center gap-3 rounded-full bg-maroon-700 py-1.5 pl-5 pr-1.5 font-semibold text-white shadow-[inset_0_0_0_1.5px_rgba(230,198,119,.8)] transition hover:bg-maroon-600 md:flex">
              Book a Visit
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-maroon-700">
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>
            <button onClick={() => setMenu(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-maroon-800 xl:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-maroon-950/95 px-6 pb-10 pt-6 backdrop-blur-xl xl:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-maroon-800" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-1">
              {[...LINKS, ["Contact", "contact"] as const].map(([label, id], i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a onClick={() => setMenu(false)} href={`${base}#${id}`} className="flex items-baseline gap-4 border-b border-white/10 py-3.5 text-3xl font-semibold tracking-tight text-white">
                    <span className="font-serif text-sm italic text-gold-300">0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={`${base}#contact`} onClick={() => setMenu(false)} className="btn-maroon mt-auto justify-between self-stretch !py-2.5">
              Book a Visit
              <span className="btn-dot bg-white text-maroon-700"><ArrowRight className="h-4 w-4" /></span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-300 px-1 text-[11px] font-bold text-maroon-950">
      {n}
    </span>
  );
}
