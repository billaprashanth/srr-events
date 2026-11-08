import { ArrowUpRight, Armchair, Camera, Crown, Flower2, Lamp, Lightbulb, Sparkles, Sprout } from "lucide-react";

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M24 3c4 5 5 11 0 19-5-8-4-14 0-19Z" />
      <path d="M24 22c2-7 7-11 13-12-1 7-6 11-13 12Z" />
      <path d="M24 22c-2-7-7-11-13-12 1 7 6 11 13 12Z" />
      <path d="M24 22c5-3 11-4 18-2-5 4-11 5-18 2Z" />
      <path d="M24 22c-5-3-11-4-18-2 5 4 11 5 18 2Z" />
      <path d="M8 27h32" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`flex flex-col items-center leading-none ${light ? "text-white" : "text-maroon-800"}`}>
      <Lotus className="mb-0.5 h-4 w-7 text-gold-300" />
      <span className="font-serif text-[19px] font-medium tracking-[0.2em] sm:text-[21px]">SRR&nbsp;EVENTS</span>
      {!compact && <span className="mt-1 text-[7.5px] font-semibold tracking-[0.42em] text-gold-300">DÉCOR · WEDDINGS</span>}
    </span>
  );
}

export function Kicker({ children, center = false, light = false }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return <p className={`kicker ${center ? "justify-center" : ""} ${light ? "!text-white/75" : ""}`}>{children}</p>;
}

export function Dot({ tone = "white" }: { tone?: "white" | "maroon" | "gold" }) {
  const cls = tone === "white" ? "bg-white text-maroon-700" : tone === "gold" ? "bg-gold-100 text-maroon-700" : "bg-maroon-700 text-white";
  return (
    <span className={`btn-dot ${cls}`}>
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
    </span>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
}

export function ElementIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const p = { className, strokeWidth: 1.6 };
  switch (name) {
    case "crown": return <Crown {...p} />;
    case "flower": return <Flower2 {...p} />;
    case "lamp": return <Lamp {...p} />;
    case "light": return <Lightbulb {...p} />;
    case "seat": return <Armchair {...p} />;
    case "sprout": return <Sprout {...p} />;
    case "camera": return <Camera {...p} />;
    default: return <Sparkles {...p} />;
  }
}

/** Gopuram arch shape, objectBoundingBox units, used by .arch-clip */
export function ArchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <clipPath id="gopuram" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.42 L0.05,0.42 L0.05,0.36 L0.1,0.36 C0.14,0.24 0.3,0.18 0.42,0.08 C0.46,0.05 0.48,0.02 0.5,0 C0.52,0.02 0.54,0.05 0.58,0.08 C0.7,0.18 0.86,0.24 0.9,0.36 L0.95,0.36 L0.95,0.42 L1,0.42 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
