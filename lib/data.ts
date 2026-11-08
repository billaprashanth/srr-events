import photosJson from "./photos.json";

export const BRAND = {
  name: "SRR Events",
  owner: "Ganesh Billa",
  phone: "+91 94417 01754",
  phoneRaw: "+919441701754",
  whatsapp: "919441701754",
  address: "Vemulawada Road, opposite the substation, Kathlapur, Telangana 505462",
  mapQuery: "Kathlapur, Vemulawada Road, Telangana 505462",
};

export const img = (id: string) => `/media/${id}.webp`;
export const thumb = (id: string) => `/media/${id}-sm.webp`;

export type CategoryKey = "mandapam" | "reception" | "haldi" | "entry" | "birthday" | "cradle" | "jada";

export const CATEGORIES: { key: CategoryKey; label: string; short: string; line: string }[] = [
  { key: "mandapam", label: "Wedding Mandapam", short: "Mandapam", line: "Temple-grade stages for the sacred moment" },
  { key: "reception", label: "Reception Stages", short: "Reception", line: "Rose walls, royal seats and stage light" },
  { key: "haldi", label: "Haldi & Mangalasnanam", short: "Haldi", line: "Marigold, brass and turmeric gold" },
  { key: "entry", label: "Grand Entrances", short: "Entrances", line: "Arches and walkways that announce the day" },
  { key: "birthday", label: "Birthdays & Balloons", short: "Birthdays", line: "Balloon worlds built around one name" },
  { key: "cradle", label: "Cradle & Naming", short: "Cradle", line: "Soft florals for baby's first ceremony" },
  { key: "jada", label: "Jada & Garlands", short: "Jada & Garlands", line: "Poola jada and varamala, strung fresh" },
];

export type Photo = { id: string; w: number; h: number; cat: CategoryKey; n: number };
const raw = photosJson as Record<CategoryKey, [string, number, number][]>;
export const PHOTOS: Photo[] = (Object.keys(raw) as CategoryKey[]).flatMap((cat) =>
  raw[cat].map(([id, w, h], i) => ({ id, w, h, cat, n: i + 1 }))
);
export const catLabel = (k: CategoryKey) => CATEGORIES.find((c) => c.key === k)!.label;
export const catShort = (k: CategoryKey) => CATEGORIES.find((c) => c.key === k)!.short;
export const photoTitle = (p: Photo) => `${catShort(p.cat)} · Look ${String(p.n).padStart(2, "0")}`;

export const HERO_SLIDES = ["mandapam-01", "mandapam-08", "mandapam-05"];

export const TICKER = [
  ["Mandapam", "Temple-grade stages for the sacred moment"],
  ["Haldi", "Marigold, brass and turmeric gold"],
  ["Entrances", "Arches and walkways that announce the day"],
  ["Reception", "Rose walls, royal seats and stage light"],
  ["Birthdays", "Balloon worlds built around one name"],
  ["Cradle", "Soft florals for baby's first ceremony"],
  ["Jada", "Poola jada and varamala, strung fresh"],
];

export const ARCHES: { cat: CategoryKey; label: string; image: string; pos?: string }[] = [
  { cat: "mandapam", label: "Wedding Mandapam", image: "mandapam-02", pos: "50% 45%" },
  { cat: "reception", label: "Reception Stages", image: "reception-20", pos: "50% 50%" },
  { cat: "haldi", label: "Haldi & Mangalasnanam", image: "haldi-14", pos: "50% 60%" },
  { cat: "entry", label: "Grand Entrances", image: "entry-09", pos: "50% 50%" },
  { cat: "birthday", label: "Birthdays & Balloons", image: "birthday-19", pos: "50% 50%" },
  { cat: "cradle", label: "Cradle & Naming", image: "cradle-02", pos: "50% 50%" },
];

export type Element = { name: string; note: string; icon: string };
export type Setup = { id: string; title: string; cat: CategoryKey; image: string; pos?: string; elements: Element[] };

export const SETUPS: Setup[] = [
  {
    id: "swarna", title: "Swarna Mandapam", cat: "mandapam", image: "mandapam-01", pos: "50% 40%",
    elements: [
      { name: "Carved gold mandapam frame", note: "Temple crown · gilded panels", icon: "crown" },
      { name: "Flower-string pillars", note: "Fresh jasmine & rose strings", icon: "flower" },
      { name: "Kalasham & deepam set", note: "Brass lamps for the muhurtham", icon: "lamp" },
      { name: "Stage light & uplights", note: "Warm gold wash, coloured accents", icon: "light" },
      { name: "Couple seating", note: "Low peetalu with cushions", icon: "seat" },
      { name: "Green carpet & planters", note: "Front-of-stage greenery", icon: "sprout" },
    ],
  },
  {
    id: "marigold", title: "Marigold Haldi", cat: "haldi", image: "haldi-21", pos: "50% 55%",
    elements: [
      { name: "Hamsa haldi seat", note: "Carved swan-wing backrest", icon: "seat" },
      { name: "Marigold grid backdrop", note: "Orange, yellow and pink blocks", icon: "flower" },
      { name: "Brass urli & bowls", note: "For turmeric, water and petals", icon: "lamp" },
      { name: "Flower rangoli floor", note: "Petal patterns around the seat", icon: "sparkles" },
      { name: "Daylight-friendly setup", note: "Built for open-air mornings", icon: "light" },
    ],
  },
  {
    id: "entrance", title: "Golden Walkway", cat: "entry", image: "entry-08", pos: "50% 50%",
    elements: [
      { name: "Arch tunnel frames", note: "Repeating gold arches", icon: "crown" },
      { name: "Red carpet walkway", note: "Gate to stage, end to end", icon: "sprout" },
      { name: "Fairy & uplighting", note: "Glow from the floor up", icon: "light" },
      { name: "Drapes & florals", note: "Swagged fabric with fresh flowers", icon: "flower" },
      { name: "Welcome board", note: "Couple names at the gate", icon: "sparkles" },
    ],
  },
  {
    id: "rosewall", title: "Rose Wall Reception", cat: "reception", image: "reception-20", pos: "50% 55%",
    elements: [
      { name: "Rose-wall backdrop", note: "Full-height red rose panel", icon: "flower" },
      { name: "Royal white sofa", note: "Carved couple seat", icon: "seat" },
      { name: "Peacock & swan props", note: "Stage-side accents", icon: "crown" },
      { name: "Stage lighting", note: "Front wash for photos", icon: "light" },
      { name: "Floral standees", note: "Vases along the stage edge", icon: "sprout" },
    ],
  },
  {
    id: "wonderland", title: "Birthday Wonderland", cat: "birthday", image: "birthday-03", pos: "50% 50%",
    elements: [
      { name: "Balloon arches & walls", note: "Colours matched to the theme", icon: "sparkles" },
      { name: "Giant name letters", note: "Your child's name, lit up", icon: "crown" },
      { name: "Theme backdrop", note: "Photo panel with the birthday star", icon: "camera" },
      { name: "Kids' throne", note: "Seat for the cake moment", icon: "seat" },
      { name: "Party lighting", note: "Coloured wash for evening parties", icon: "light" },
    ],
  },
  {
    id: "cradle", title: "Flower Cradle", cat: "cradle", image: "cradle-02", pos: "50% 50%",
    elements: [
      { name: "Flower-decked cradle", note: "Uyyala dressed in fresh blooms", icon: "flower" },
      { name: "Floral pillars", note: "Four-post frame around the cradle", icon: "crown" },
      { name: "Soft drapes", note: "Pastel fabric canopy", icon: "sparkles" },
      { name: "Mood lighting", note: "Gentle colour wash", icon: "light" },
    ],
  },
  {
    id: "palace", title: "Night Palace", cat: "mandapam", image: "mandapam-10", pos: "50% 50%",
    elements: [
      { name: "Palace façade set", note: "Domes, jharokhas and arches", icon: "crown" },
      { name: "Golden uplighting", note: "Lit from below after sunset", icon: "light" },
      { name: "Open-air stage", note: "Built for lawns and grounds", icon: "sprout" },
      { name: "Lamps & diyas", note: "Warm points of light", icon: "lamp" },
    ],
  },
  {
    id: "jada", title: "Bridal Jada & Garlands", cat: "jada", image: "jada-08", pos: "50% 30%",
    elements: [
      { name: "Bridal poola jada", note: "Full-length flower braid", icon: "flower" },
      { name: "Varamala pair", note: "Rose & jasmine wedding garlands", icon: "sparkles" },
      { name: "Jada billalu", note: "Flower discs for the braid", icon: "crown" },
      { name: "Door & pooja garlands", note: "For the home and the mandapam", icon: "sprout" },
    ],
  },
];

export const THEMES: { id: string; title: string; color: string; ink: string; image: string; pos?: string; kind: string }[] = [
  { id: "t-gold", title: "Golden Palace", color: "#D9A21B", ink: "#3A2004", image: "mandapam-11", kind: "Wedding · Night" },
  { id: "t-blue", title: "Blue Balloon", color: "#2F5BD3", ink: "#F7F2E6", image: "birthday-01", kind: "Birthday" },
  { id: "t-royal", title: "Royal Mandapam", color: "#8E1B2E", ink: "#FBEBD0", image: "mandapam-05", kind: "Wedding" },
  { id: "t-marigold", title: "Marigold Haldi", color: "#F09A2A", ink: "#3D1A02", image: "haldi-10", kind: "Haldi · Day" },
  { id: "t-rose", title: "Rose Stage", color: "#C2185B", ink: "#FFF1F5", image: "reception-16", kind: "Reception" },
  { id: "t-neon", title: "Neon Entry", color: "#6A2BD6", ink: "#F3ECFF", image: "entry-19", kind: "Entrance · Night" },
  { id: "t-pastel", title: "Pastel Cradle", color: "#E68AB0", ink: "#3A0A1E", image: "cradle-05", kind: "Naming ceremony" },
  { id: "t-jasmine", title: "Jasmine Jada", color: "#1F8A4C", ink: "#EFFFF4", image: "jada-07", kind: "Bridal" },
  { id: "t-crescent", title: "White Crescent", color: "#0F7C7A", ink: "#E9FFFD", image: "reception-03", kind: "Reception" },
];

export const REELS = [
  { id: "r1", src: "reel-sangeet", title: "Sangeet Night", tag: "Evening stage", place: "Garden arches · live dance", dur: "0:25" },
  { id: "r2", src: "reel-mandapam", title: "Temple Mandapam", tag: "Wedding stage", place: "Jasmine jhalar · walk-through", dur: "0:12" },
  { id: "r3", src: "reel-aerial-1", title: "The Venue", tag: "From above", place: "Drone pass over the grounds", dur: "0:12" },
  { id: "r4", src: "reel-haldi", title: "Pellikuthuru", tag: "Haldi setup", place: "Yellow drapes · flower rangoli", dur: "0:05" },
  { id: "r5", src: "reel-aerial-2", title: "Arrival", tag: "From above", place: "Halls, lawns and parking", dur: "0:12" },
];

export const WEDDINGS: { id: string; name: string; note: string; tag?: string; pos?: string }[] = [
  { id: "mandapam-02", name: "Malle Poola Pandiri", note: "Jasmine dome · Ganapati welcome" },
  { id: "mandapam-12", name: "Chandelier Vedika", note: "Jasmine chandelier · rose drapes", tag: "Indoor" },
  { id: "mandapam-16", name: "Hamsa Throne", note: "Swan arms · royal couple seat" },
  { id: "mandapam-05", name: "Gopuram Gold", note: "Temple crown · carved pillars" },
  { id: "mandapam-01", name: "Swarna Mandapam", note: "Carved gold frame · flower-string pillars", tag: "Signature" },
  { id: "mandapam-10", name: "Night Palace", note: "Lit palace façade · gold uplights", tag: "Night" },
  { id: "mandapam-13", name: "Lotus Pavilion", note: "Pink-violet wash · floral dome" },
  { id: "mandapam-19", name: "Gajaraju Mandapam", note: "Ivory tusks · white floral canopy" },
  { id: "mandapam-29", name: "Nemali Vedika", note: "Peacock pillars · flower crown", tag: "Outdoor" },
];

export const PROCESS = [
  { n: "01", title: "Visit & brief", text: "Call or WhatsApp us. We visit the venue, take measurements and listen to what the family wants." },
  { n: "02", title: "Design the look", text: "We pick a theme, colours, flowers and lighting, and show you real setups we've built before." },
  { n: "03", title: "Build on site", text: "Our crew sets up the stage, entrance and florals at the venue, on time for the muhurtham." },
  { n: "04", title: "Celebrate", text: "You enjoy the day. We stay through the event and take everything down after." },
];

export const waLink = (text: string) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
