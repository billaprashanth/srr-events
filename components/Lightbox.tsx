"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Heart, X } from "lucide-react";
import { Photo, catLabel, img, photoTitle, thumb, waLink } from "@/lib/data";
import { usePlan } from "@/lib/plan";
import { WhatsAppIcon } from "./ui";

export default function Lightbox({ list, index, onIndex, onClose }: { list: Photo[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const plan = usePlan();
  const p = index === null ? null : list[index];

  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % list.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [index, list.length, onClose, onIndex]);

  const pid = p ? `photo-${p.id}` : "";
  const added = p ? plan.has(pid) : false;

  return (
    <AnimatePresence>
      {p && index !== null && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-white/75 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photoTitle(p)}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="text-[12px] font-medium tracking-[0.2em] text-ink/50">
              {index + 1} / {list.length}
            </span>
            <button onClick={onClose} className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-ink/70 hover:text-ink">
              CLOSE <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onIndex((index - 1 + list.length) % list.length)}
              className="icon-btn absolute left-3 top-1/2 z-10 -translate-y-1/2 !h-12 !w-12 sm:left-8"
              aria-label="Previous photo"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={p.id}
                initial={{ opacity: 0, y: -60, rotate: -3, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="relative flex max-h-full flex-col items-center"
              >
                <Pin className="absolute -top-5 left-1/2 z-10 -translate-x-1/2" />
                <div className="bg-white p-2.5 pb-3 shadow-[0_40px_80px_-30px_rgba(23,16,14,.55)] sm:p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img(p.id)}
                    alt={`${catLabel(p.cat)} decoration by SRR Events`}
                    className="max-h-[56svh] w-auto max-w-[min(88vw,1100px)] object-contain"
                    style={{ backgroundImage: `url(${thumb(p.id)})`, backgroundSize: "cover" }}
                  />
                </div>
              </motion.figure>
            </AnimatePresence>
            <button
              onClick={() => onIndex((index + 1) % list.length)}
              className="icon-btn absolute right-3 top-1/2 z-10 -translate-y-1/2 !h-12 !w-12 sm:right-8"
              aria-label="Next photo"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center px-5 pb-8 pt-5 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-[15px] font-bold uppercase tracking-[0.2em] text-ink">{photoTitle(p)}</p>
            <p className="mt-1 text-sm text-ink/55">{catLabel(p.cat)} · SRR Events</p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => (added ? plan.remove(pid) : plan.add({ id: pid, title: photoTitle(p), kind: catLabel(p.cat), image: p.id }))}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.16em] transition ${
                  added ? "bg-ink text-white" : "bg-maroon-700 text-white hover:bg-maroon-800"
                }`}
              >
                {added ? <Check className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                {added ? "In your plan" : "I want this setup"}
              </button>
              <button onClick={() => plan.toggleLike(pid)} className="icon-btn !h-11 !w-11 text-maroon-700" aria-label="Save photo">
                <Heart className="h-[18px] w-[18px]" fill={plan.isLiked(pid) ? "currentColor" : "none"} />
              </button>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={waLink(`Hi SRR Events, I liked this setup on your website: ${photoTitle(p)} (${catLabel(p.cat)}). Can you share details?`)}
              className="mt-3 inline-flex items-center gap-1.5 border-b border-ink/40 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Ask about this on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 38" className={`h-[38px] w-4 drop-shadow ${className}`} aria-hidden>
      <rect x="2" y="0" width="12" height="38" rx="2.5" fill="#B07A44" />
      <rect x="2" y="0" width="5.5" height="38" rx="2.5" fill="#C99460" />
      <rect x="1" y="15" width="14" height="4" rx="1" fill="#8A8F96" />
      <rect x="1" y="15" width="14" height="1.4" rx=".7" fill="#C7CCD2" />
    </svg>
  );
}
