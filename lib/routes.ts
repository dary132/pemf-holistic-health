/** The ten pages of the client's 2026 document, in document order.
 *  Single source for the nav, the sitemap and scripts/verify-site.mjs. */
export type Route = { path: string; label: string; title: string };

export const routes: Route[] = [
  { path: "/", label: "Home", title: "PEMF for Health and Wellness" },
  { path: "/pemf", label: "PEMF", title: "PEMF for Healthy Lifestyle" },
  { path: "/holistic-health", label: "Holistic Health", title: "PEMF for Holistic Health" },
  // label "Brain Health" is the client's wording for the nav (2026-08-28);
  // the page itself keeps the document's "Mental Health" title and copy.
  { path: "/mental-health", label: "Brain Health", title: "PEMF Improves Mental Health" },
  { path: "/energy", label: "Energy", title: "PEMF Increases Your Energy" },
  { path: "/sports-health", label: "Sports Health", title: "Sports Health" },
  { path: "/sleep-health", label: "Sleep Health", title: "PEMF Promotes Good Sleep" },
  { path: "/pets-health", label: "Pets Health", title: "PEMF for Pets Health" },
  { path: "/products", label: "Products", title: "Products" },
  { path: "/contact", label: "Contact", title: "Contact" },
];

const byPath = (p: string) => routes.find((r) => r.path === p)!;

/** The nav groups five wellness pages under one disclosure so the bar stays
 *  scannable, while every page keeps a flat top-level URL. */
export const navGroups = [
  { kind: "link", route: byPath("/") },
  { kind: "link", route: byPath("/pemf") },
  { kind: "link", route: byPath("/holistic-health") },
  {
    kind: "group",
    label: "Wellness",
    children: [
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
