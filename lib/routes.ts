/** The ten pages of the client's 2026 document, in document order.
 *  Single source for the nav, the sitemap and scripts/verify-site.mjs. */
export type Route = { path: string; label: string; title: string };

export const routes: Route[] = [
  { path: "/", label: "Home", title: "PEMF for Health and Wellness" },
  { path: "/pemf", label: "PEMF", title: "PEMF for Healthy Lifestyle" },
  { path: "/holistic-health", label: "Holistic Health", title: "PEMF for Holistic Health" },
  // label "Brain Health" is the client's wording for the nav (2026-08-28), and
  // since 2026-08-31 the page's H1 says it too (lib/content/mental-health.ts,
  // registered in verify-copy's ALLOWED_EDITS). The `title` below still records
  // the document's own page heading, which is what this field is for; it is not
  // rendered anywhere. The rest of the page's copy remains verbatim.
  { path: "/mental-health", label: "Brain Health", title: "PEMF Improves Mental Health" },
  { path: "/energy", label: "Energy", title: "PEMF Increases Your Energy" },
  { path: "/sports-health", label: "Sports Health", title: "Sports Health" },
  { path: "/sleep-health", label: "Sleep Health", title: "PEMF Promotes Good Sleep" },
  { path: "/pets-health", label: "Pets Health", title: "PEMF for Pets Health" },
  { path: "/products", label: "Products", title: "Products" },
  { path: "/contact", label: "Contact", title: "Contact" },
];

const byPath = (p: string) => routes.find((r) => r.path === p)!;

/** A section anchor, not a page. It is deliberately NOT in `routes` above:
 *  that array is the ten pages of the client's document and drives the
 *  sitemap and scripts/verify-site.mjs, so putting a #fragment in it would
 *  add a non-page to the sitemap and break the length assertion those two
 *  share. Shaped like a Route because components/Header.tsx reads `path` and
 *  `label` off every child and does not care which kind it got.
 *
 *  The target section already exists (app/holistic-health/page.tsx renders
 *  `<Section id="wellness">`), and globals.css gives every `section[id]` a
 *  7rem scroll-margin-top so the anchor clears the sticky header. */
const wellnessSection = {
  path: "/holistic-health#wellness",
  label: "PEMF for Wellness",
  title: "PEMF for Wellness",
};

/** The nav groups the wellness material under one disclosure so the bar stays
 *  scannable, while every page keeps a flat top-level URL.
 *
 *  "PEMF for Wellness" leads the group, client request 2026-08-31: it is the
 *  general statement and the five below it are the specific applications, so
 *  it reads as the heading of the set rather than a sixth sibling. It is a
 *  link into /holistic-health rather than a page of its own -- the section is
 *  a single figure on a page that already sits in the top-level nav, and
 *  promoting it to a route would duplicate that page's content at a second
 *  URL. */
export const navGroups = [
  { kind: "link", route: byPath("/") },
  { kind: "link", route: byPath("/pemf") },
  { kind: "link", route: byPath("/holistic-health") },
  {
    kind: "group",
    label: "Wellness",
    children: [
      wellnessSection,
      byPath("/mental-health"),
      byPath("/energy"),
      byPath("/sports-health"),
      byPath("/sleep-health"),
      byPath("/pets-health"),
    ],
  },
  { kind: "link", route: byPath("/products") },
  { kind: "link", route: byPath("/contact") },
] as const;
