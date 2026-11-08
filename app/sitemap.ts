import type { MetadataRoute } from "next";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://srr-events.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/gallery`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
