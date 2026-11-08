import { TICKER } from "@/lib/data";

export default function Ticker({ className = "" }: { className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {TICKER.map(([k, v]) => (
        <span key={k} className="flex items-center whitespace-nowrap px-4 text-[15px] sm:text-[17px]">
          <span className="mr-4 text-[11px] text-gold-300">◆</span>
          <b className="mr-2.5 font-bold uppercase tracking-[0.14em] text-gold-300">{k}</b>
          <span className="text-white/90">{v}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative overflow-hidden bg-maroon-950 py-3 ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
