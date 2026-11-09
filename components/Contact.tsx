"use client";
import { useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import { BRAND, waLink } from "@/lib/data";
import { usePlan } from "@/lib/plan";
import { Kicker, WhatsAppIcon } from "./ui";

const EVENTS = [
  "Wedding",
  "Reception",
  "Haldi / Mangalasnanam",
  "Engagement",
  "Birthday",
  "Cradle / Naming ceremony",
  "House warming",
  "Other",
];

export function buildMessage(
  f: Record<string, string>,
  items: { title: string; kind: string }[],
) {
  const lines = [
    "Hi SRR Events! I'd like to plan an event.",
    "",
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    f.event && `Event: ${f.event}`,
    f.date && `Date: ${f.date}`,
    f.venue && `Venue: ${f.venue}`,
    f.guests && `Guests: ${f.guests}`,
    items.length > 0 && "",
    items.length > 0 && "From my plan on your website:",
    ...items.map((x) => `• ${x.title} (${x.kind})`),
    f.note && "",
    f.note && `Note: ${f.note}`,
  ];
  return lines
    .filter((l) => l !== false && l !== undefined && l !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function Contact() {
  const { items } = usePlan();
  const [f, setF] = useState<Record<string, string>>({ event: "Wedding" });
  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(buildMessage(f, items)), "_blank", "noopener");
  };

  const field =
    "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-[15px] outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-4 focus:ring-gold/15";

  return (
    <section
      id="contact"
      className="relative bg-white pb-20 pt-28 sm:pb-28 sm:pt-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Kicker>Book a visit</Kicker>
          <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,5rem)]">
            Let's plan your <span className="grad">celebration.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg text-ink/60">
            Tell us the date and the venue. The form opens WhatsApp with
            everything filled in, including anything you added to your plan.
          </p>

          <form onSubmit={submit} className="mt-9 grid gap-3.5 sm:grid-cols-2">
            <input
              required
              className={field}
              placeholder="Your name"
              value={f.name || ""}
              onChange={set("name")}
              autoComplete="name"
            />
            <input
              required
              className={field}
              placeholder="Phone number"
              inputMode="tel"
              value={f.phone || ""}
              onChange={set("phone")}
              autoComplete="tel"
            />
            <select
              className={field}
              value={f.event}
              onChange={set("event")}
              aria-label="Event type"
            >
              {EVENTS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <input
              className={field}
              type="date"
              value={f.date || ""}
              onChange={set("date")}
              aria-label="Event date"
            />
            <input
              className={field}
              placeholder="Venue / town"
              value={f.venue || ""}
              onChange={set("venue")}
            />
            <input
              className={field}
              placeholder="Approx. guests"
              inputMode="numeric"
              value={f.guests || ""}
              onChange={set("guests")}
            />
            <textarea
              className={`${field} min-h-[110px] sm:col-span-2`}
              placeholder="Anything else? Colours, flowers, a theme you liked…"
              value={f.note || ""}
              onChange={set("note")}
            />
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn-maroon !text-lg">
                Send on WhatsApp
                <span className="btn-dot bg-white text-maroon-700">
                  <Send className="h-4 w-4" />
                </span>
              </button>
              {items.length > 0 && (
                <span className="text-sm text-ink/55">
                  + {items.length} item{items.length > 1 ? "s" : ""} from your
                  plan
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="group rounded-3xl bg-maroon-800 p-6 text-white transition hover:bg-maroon-700"
            >
              <Phone className="h-6 w-6 text-gold-300" />
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/60">
                Call {BRAND.owner}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {BRAND.phone}
              </p>
            </a>
            <a
              href={waLink("Hi SRR Events!")}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl bg-[#128C4A] p-6 text-white transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-6 w-6" />
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/70">
                WhatsApp
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                Chat with us
              </p>
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-ink/10">
            <iframe
              title="SRR Events location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapQuery)}&output=embed`}
              className="h-[300px] w-full border-0 grayscale-[.3] lg:h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex items-start gap-3 bg-ivory p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-maroon-700" />
              <div>
                <p className="font-semibold">SRR Events</p>
                <p className="text-ink/60">{BRAND.address}</p>
                <a
                  className="mt-2 inline-block text-sm font-semibold text-maroon-700"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.mapQuery)}`}
                >
                  Get directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
