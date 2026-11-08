# SRR Events — Wedding & Event Decorators

Website for **SRR Events** (Ganesh Billa · Kathlapur, Vemulawada Road, Telangana · +91 94417 01754).

Built with Next.js 15, Tailwind CSS and Framer Motion.

## Sections
1. **Hero**: full-bleed mandapam slideshow, glass pill navbar, scrolling gold ticker
2. **Six Celebrations**: gopuram-arch windows that filter the gallery
3. **Build the Décor**: drag carousel of 8 real setups with an "In this setup" panel
4. **Pick a Theme**: fanned, tilting colour cards; tap + to add a theme to your plan
5. **Gallery on the string**: polaroids on a fairy-light string with filters and a lightbox
6. **The Film**: drone film of the venue in a gold frame between scrolling photo columns
7. **Reels**: 3D arc of event clips, tap to watch full screen with sound
8. **Wedding Collection**: arch-topped curved carousel of mandapams
9. **How we work**: four steps with a silk ribbon that draws on scroll
10. **Contact**: enquiry form that opens WhatsApp prefilled, plus call card and map

"My event plan" (the clipboard icon) collects setups, themes and photos the visitor likes and sends them to WhatsApp in one message. `/gallery` is a full masonry gallery; old links (`/mandapam`, `/gates`, …) redirect there.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Editing content
- Business details, setups, themes, reels and wedding names: `lib/data.ts`
- Photos: `public/media/<category>-NN.webp` (+ `-sm.webp` thumbnail), listed in `lib/photos.json`
- Optional env: `NEXT_PUBLIC_SITE_URL` (used for SEO / sitemap)

Designed & Developed by Prashanth Billa.
