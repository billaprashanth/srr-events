import { BRAND, CATEGORIES } from "@/lib/data";
import { Logo, Lotus } from "./ui";

export default function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[.07]" style={{ backgroundImage: "radial-gradient(#E6C677 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="shell relative py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="h-display max-w-[16ch] text-[clamp(2.6rem,6.5vw,5.8rem)]">
            Decorated with heritage. <span className="font-serif font-normal italic text-gold-300">Remembered for today.</span>
          </h2>
          <Lotus className="hidden h-28 w-44 text-gold-300/70 lg:block" />
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-white/60">
              Wedding and event decoration from Kathlapur, Telangana: mandapams, receptions, haldi, entrances, birthdays and more.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">What we decorate</p>
            <ul className="mt-4 space-y-2 text-white/75">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <a href={`/gallery?c=${c.key}`} className="hover:text-white">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">Explore</p>
            <ul className="mt-4 space-y-2 text-white/75">
              {[
                ["Build the Décor", "decor"],
                ["Pick a Theme", "themes"],
                ["Gallery", "gallery"],
                ["The Film", "film"],
                ["Wedding Collection", "weddings"],
                ["How we work", "process"],
              ].map(([l, id]) => (
                <li key={id}>
                  <a href={`${base}#${id}`} className="hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">Visit us</p>
            <p className="mt-4 text-white/75">{BRAND.address}</p>
            <a href={`tel:${BRAND.phoneRaw}`} className="mt-4 block text-2xl font-semibold tracking-tight hover:text-gold-300">
              {BRAND.phone}
            </a>
            <p className="text-sm text-white/55">{BRAND.owner}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SRR Events. All rights reserved.</p>
          <p>Designed & Developed by Prashanth Billa</p>
        </div>
      </div>
    </footer>
  );
}
