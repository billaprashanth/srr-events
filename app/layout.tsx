import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource/anton";
import "@fontsource/noto-sans-telugu/600.css";
import "./globals.css";
import { PlanProvider } from "@/lib/plan";
import PlanDrawer from "@/components/PlanDrawer";
import { BRAND } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://srr-events.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "SRR Events · Wedding & Event Decorators in Kathlapur, Telangana",
  description:
    "SRR Events designs and builds wedding mandapams, reception stages, haldi décor, grand entrances, birthday balloon décor and cradle ceremonies across Telangana. Call Ganesh Billa on +91 94417 01754.",
  keywords: ["wedding decorators Telangana", "mandapam decoration", "haldi decoration", "event planner Vemulawada", "Kathlapur", "SRR Events", "birthday balloon decoration", "reception stage"],
  openGraph: {
    title: "SRR Events · Crafted for your Muhurtham",
    description: "Temple mandapams, marigold haldis, glowing entrances and birthday wonderlands from Kathlapur, Telangana.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#5C0E1C", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND.name,
  description: "Wedding and event decoration: mandapams, receptions, haldi, entrances, birthdays and cradle ceremonies.",
  telephone: BRAND.phoneRaw,
  image: `${SITE}/og.jpg`,
  url: SITE,
  address: { "@type": "PostalAddress", streetAddress: "Vemulawada Road, opposite the substation", addressLocality: "Kathlapur", addressRegion: "Telangana", postalCode: "505462", addressCountry: "IN" },
  founder: BRAND.owner,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <PlanProvider>
          {children}
          <PlanDrawer />
        </PlanProvider>
      </body>
    </html>
  );
}
