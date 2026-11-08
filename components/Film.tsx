"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { thumb } from "@/lib/data";
import { Dot, Kicker } from "./ui";

const LEFT = ["haldi-12", "mandapam-09", "birthday-04", "entry-03", "cradle-03", "reception-11", "haldi-05"];
const RIGHT = ["entry-16", "reception-08", "mandapam-14", "jada-04", "birthday-12", "haldi-16", "mandapam-24"];

function Column({ ids, dir }: { ids: string[]; dir: "up" | "down" }) {
  const list = [...ids, ...ids];
  return (
    <div className="fade-y absolute inset-0 overflow-hidden">
      <div className={`flex flex-col gap-5 ${dir === "up" ? "animate-up" : "animate-down"}`}>
        {list.map((id, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={k} src={thumb(id)} alt="" loading="lazy" className={`w-full rounded-2xl object-cover shadow-lg ${k % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3.4]"}`} />
        ))}
      </div>
    </div>
  );
}

export default function Film() {
  const v = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="film" className="relative overflow-hidden bg-white pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-4 sm:px-8 lg:h-[820px] lg:grid-cols-[230px_1fr_230px]">
        <div className="relative hidden lg:block">
          <Column ids={LEFT} dir="up" />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <Kicker center>The SRR Film</Kicker>
          <h2 className="h-display mt-3 text-[clamp(2.6rem,6vw,5.4rem)]">
            Feel the <span className="grad">celebration</span>
          </h2>
          <div className="relative mt-8 w-full max-w-[880px] p-3 sm:p-4">
            {/* gold frame + corner brackets */}
            <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-gold/50 shadow-[0_40px_80px_-40px_rgba(122,20,38,.45)]" />
            {["left-[-10px] top-[-10px] border-l border-t", "right-[-10px] top-[-10px] border-r border-t", "left-[-10px] bottom-[-10px] border-l border-b", "right-[-10px] bottom-[-10px] border-r border-b"].map((c) => (
              <span key={c} className={`pointer-events-none absolute h-6 w-6 border-gold ${c}`} />
            ))}
            <div className="relative overflow-hidden rounded-[14px] bg-ink">
              <video
                ref={v}
                src="/media/film-venue.mp4"
                poster="/media/film-venue-poster.jpg"
                muted={muted}
                loop
                playsInline
                preload="none"
                className="aspect-video w-full object-cover"
              />
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:bg-black/60"
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                {muted ? "Sound off" : "Sound on"}
              </button>
              <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                ● From above · the venue
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-[52ch] text-ink/60">A glimpse of the grand venue from the sky: halls, lawns and space for every guest.</p>
          <a href="#contact" className="btn-maroon mt-6 !text-lg">
            Plan Your Event <Dot />
          </a>
        </div>

        <div className="relative hidden lg:block">
          <Column ids={RIGHT} dir="down" />
        </div>
      </div>
    </section>
  );
}
