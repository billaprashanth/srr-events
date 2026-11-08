"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Send, Trash2, X } from "lucide-react";
import { thumb, waLink } from "@/lib/data";
import { usePlan } from "@/lib/plan";
import { buildMessage } from "./Contact";
import { WhatsAppIcon } from "./ui";

export default function PlanDrawer() {
  const { items, open, setOpen, remove, clear, toast, liked } = usePlan();
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-2xl"
              role="dialog"
              aria-label="My event plan"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/50">SRR Events</p>
                  <h3 className="text-2xl font-semibold tracking-tight">My event plan</h3>
                </div>
                <button onClick={() => setOpen(false)} className="icon-btn" aria-label="Close plan">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-ink/55">
                    <ClipboardList className="h-10 w-10 text-gold-500" />
                    <p className="mt-4 max-w-[28ch]">
                      Nothing here yet. Tap <b className="text-ink">+</b> on any setup, theme or photo to start your plan.
                    </p>
                    {liked.length > 0 && <p className="mt-3 text-sm">You've saved {liked.length} favourite{liked.length > 1 ? "s" : ""} with ♥.</p>}
                  </div>
                ) : (
                  <ul className="divide-y divide-ink/10">
                    {items.map((x) => (
                      <li key={x.id} className="flex items-center gap-4 py-3">
                        {x.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb(x.image)} alt="" className="h-14 w-14 rounded-xl object-cover" />
                        ) : (
                          <span className="h-14 w-14 rounded-xl bg-gold-50" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{x.title}</p>
                          <p className="text-[13px] text-ink/50">{x.kind}</p>
                        </div>
                        <button onClick={() => remove(x.id)} className="p-2 text-ink/40 hover:text-maroon-700" aria-label={`Remove ${x.title}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-ink/10 px-6 py-5">
                <p className="text-sm text-ink/55">We'll reply with ideas and a quote for everything in your plan.</p>
                <div className="mt-4 flex gap-3">
                  <a
                    href={waLink(buildMessage({}, items))}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full bg-[#128C4A] px-5 py-3.5 font-semibold text-white transition hover:brightness-110 ${items.length ? "" : "pointer-events-none opacity-40"}`}
                  >
                    <WhatsAppIcon /> Send plan on WhatsApp
                  </a>
                  <a href="/#contact" onClick={() => setOpen(false)} className="icon-btn !h-[52px] !w-[52px]" aria-label="Go to the enquiry form">
                    <Send className="h-4 w-4" />
                  </a>
                </div>
                {items.length > 0 && (
                  <button onClick={clear} className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45 hover:text-maroon-700">
                    Clear plan
                  </button>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.button
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[85] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-white shadow-2xl"
          >
            <ClipboardList className="h-4 w-4 text-gold-300" />
            {toast}
            <span className="font-semibold text-gold-300">View</span>
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={waLink("Hi SRR Events!")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(18,140,74,.7)] transition hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
