/** The ten pages of the client's 2026 document, in document order.
 *  Single source for the nav, the sitemap and scripts/verify-site.mjs. */
export type Route = { path: string; label: string; title: string };

export const routes: Route[] = [
  { path: "/", label: "Home", title: "PEMF for Health and Wellness" },
  { path: "/pemf", label: "PEMF", title: "PEMF for Healthy Lifestyle" },
  { path: "/holistic-health", label: "Holistic Health", title: "PEMF for Holistic Health" },
  // The nav label for this page has moved twice at the client's direction:
  // "Mental Health" (the document's word) -> "Brain Health" (2026-08-28) ->
  // "Wellness" (2026-08-31), the client's decision that this IS the wellness
  // page -- its panels are the dimensions of wellness (mental acuity,
  // emotional, spiritual, social, financial), and the eight-dimensions wheel
  // now opens it. The page's own H1 deliberately still reads "PEMF Improves
  // Brain Health" (lib/content/mental-health.ts, registered in verify-copy's
  // ALLOWED_EDITS): the client asked for the label only, so the heading was
  // left alone rather than changed twice in a day. The `title` below still
  // records the document's own page heading, which is what this field is for;
  // it is not rendered anywhere. The rest of the page's copy is verbatim.
  { path: "/mental-health", label: "Wellness", title: "PEMF Improves Mental Health" },
  { path: "/energy", label: "Energy", title: "PEMF Increases Your Energy" },
  { path: "/sports-health", label: "Sports Health", title: "Sports Health" },
  { path: "/sleep-health", label: "Sleep Health", title: "PEMF Promotes Good Sleep" },
  { path: "/pets-health", label: "Pets Health", title: "PEMF for Pets Health" },
  { path: "/products", label: "Products", title: "Products" },
  { path: "/contact", label: "Contact", title: "Contact" },
];

const byPath = (p: string) => routes.find((r) => r.path === p)!;

/** The nav groups the wellness pages under one disclosure so the bar stays
 *  scannable, while every page keeps a flat top-level URL.
 *
 *  "Wellness" leads the group and is /mental-health itself, not a link into a
 *  section of another page. An earlier version of this same request, on the
 *  same day, DID add a `/holistic-health#wellness` anchor as a sixth child;
 *  the client then said the Brain Health page needed to be the wellness page,
 *  which is a better answer than the anchor was -- a group whose first item
 *  jumps into the middle of a page listed separately above it is confusing,
 *  and the section that anchor pointed at has since been removed. Every child
 *  here is a whole page again. */
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
