/** Section vertical rhythm. Chosen per section rather than applied uniformly:
 *  the same padding everywhere gives the eye no cue about what groups with what. */
export const RHYTHM = {
  compact: "py-10",
  normal: "py-16 sm:py-20",
  spacious: "py-24 sm:py-32",
  /* The leading Section of an inner page -- breadcrumb, then title, then the
     u-accent-rule, then the page. Added 2026-08-31: the client said there was
     too much space above the rule on every page outside the home page, and
     measurement agreed. On `normal` the gap from breadcrumb to h1 was 140px on
     all nine inner pages, and the gap from the rule to whatever followed ran
     143-220px where the section had no children of its own.

     Asymmetric on purpose, which is why this is a new key rather than
     `compact`: the space ABOVE a page header is already part-supplied by the
     breadcrumb sitting in it, so the top can be tight, while the bottom still
     has to separate the title from the first real band. A symmetric py- value
     cannot express that -- it either leaves the top loose or crushes the
     bottom. */
  heading: "pt-6 pb-12 sm:pt-8 sm:pb-14",
} as const;

export type Rhythm = keyof typeof RHYTHM;
