/** @type {import('next').NextConfig} */
const old = ["mandapam", "reception", "birthday", "gates", "mangalashnanam", "smallkids"];
const map = { gates: "entry", mangalashnanam: "haldi", smallkids: "cradle" };
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    // keep links from the previous website working
    return old.map((o) => ({ source: `/${o}`, destination: `/gallery?c=${map[o] || o}`, permanent: true }));
  },
  async headers() {
    return [{ source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
};
export default nextConfig;
