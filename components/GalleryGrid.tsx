"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES, CategoryKey, PHOTOS, catLabel, photoTitle, thumb } from "@/lib/data";
import Lightbox from "./Lightbox";

type F = "all" | CategoryKey;

export default function GalleryGrid() {
  const sp = useSearchParams();
  const router = useRouter();
  const initial = (sp.get("c") as F) || "all";
  const [f, setF] = useState<F>(CATEGORIES.some((c) => c.key === initial) ? initial : "all");
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const c = sp.get("c") as F;
    if (c && CATEGORIES.some((x) => x.key === c)) setF(c);
  }, [sp]);
  const list = useMemo(() => (f === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === f)), [f]);

  const pick = (k: F) => {
    setF(k);
    router.replace(k === "all" ? "/gallery" : `/gallery?c=${k}`, { scroll: false });
  };

  return (
    <section className="shell py-12">
      <div className="no-scrollbar sticky top-[88px] z-30 -mx-4 flex gap-2.5 overflow-x-auto bg-white/90 px-4 py-3 backdrop-blur sm:top-[100px] sm:mx-0 sm:flex-wrap sm:px-0">
        {(["all", ...CATEGORIES.map((c) => c.key)] as F[]).map((k) => {
          const on = f === k;
          const count = k === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === k).length;
          return (
            <button key={k} onClick={() => pick(k)} className={`chip shrink-0 ${on ? "!border-maroon-700 !bg-maroon-700 !text-white" : ""}`}>
              {k === "all" ? "All" : CATEGORIES.find((c) => c.key === k)!.label}
              <span className={`rounded-full px-1.5 text-[11px] font-bold ${on ? "bg-white text-maroon-700" : "bg-gold-50 text-maroon-700"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {list.map((p, k) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(k)}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-gold-50 sm:mb-4"
            aria-label={`Open ${photoTitle(p)}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(p.id)} alt={`${catLabel(p.cat)} by SRR Events`} loading="lazy" width={p.w} height={p.h} className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">
              {photoTitle(p)}
            </span>
          </motion.button>
        ))}
      </div>
      <Lightbox list={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
