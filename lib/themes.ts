/** The palettes offered on /themes.
 *
 *  Deliberately in lib/ and not lib/content/: everything under lib/content is
 *  copy from the client's document and scripts/verify-copy.mjs holds it to
 *  that document word for word. Theme names are ours, not the client's, so
 *  filing them there would fail the build for being invented prose -- which
 *  is the check doing its job, not a false positive.
 *
 *  `id` is the value written to <html data-theme>; the empty id is the
 *  default palette, which lives in the bare :root block and needs no
 *  attribute. Every other id must match a :root[data-theme="..."] block in
 *  app/globals.css.
 *
 *  `swatch` is for the picker only. It repeats hexes that globals.css already
 *  owns, because a swatch has to paint before the theme is applied -- reading
 *  the live custom property would show every card in the *current* theme and
 *  make the picker useless. scripts/verify-themes.mjs fails the build if a
 *  swatch drifts from the stylesheet.
 */
export type Theme = {
  id: string;
  name: string;
  tagline: string;
  /** [ground, primary, accent] — the three that carry a palette's character. */
  swatch: [string, string, string];
};

export const themes: Theme[] = [
  {
    id: "",
    name: "Magenta & Clay",
    tagline: "The site as it stands today: warm cream grounds, deep magenta, rust.",
    swatch: ["#FAF6EF", "#96005A", "#763A1D"],
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    tagline: "Cool grounds with deep teal and indigo, lifted by a burnt-coral accent.",
    swatch: ["#F7FAFC", "#0E4A5A", "#8C2412"],
  },
  {
    id: "sunrise",
    name: "Sunrise Warmth",
    tagline: "Peach grounds, deep plum headings and terracotta accents.",
    swatch: ["#FDF7F0", "#4A1F3D", "#832E0E"],
  },
  {
    id: "spectrum",
    name: "Vital Spectrum",
    tagline: "Near-neutral grounds so the seven wordmark colours carry the page.",
    swatch: ["#FBFBFC", "#232634", "#7A1F5C"],
  },
];

/** localStorage key. Read by the no-flash script inlined in app/layout.tsx,
 *  which cannot import from here -- it is stringified into the document head
 *  and runs before any bundle loads. Keep the two spellings in step. */
export const THEME_STORAGE_KEY = "pemf-theme";

export const themeIds = themes.map((t) => t.id);
