/**
 * `CardContent` and `Teaser` below are legacy shapes kept only because
 * `lib/content/benefits.ts` and `lib/content/home.ts` still use them.
 * Both are removed (and `Teaser` reshaped to carry `image: Img`) in Task 11,
 * which rewrites their last consumers.
 */
export type CardContent = {
  image: string;
  title: string;
  body: string;
  /** Tailwind aspect ratio for the image well. Defaults to 4/3. */
  imageAspect?: string;
  /** Artwork with baked-in text or a cut-out subject needs `contain`. */
  imageFit?: "cover" | "contain";
};

export type Teaser = {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
};

/** An image plus the alt text a screen reader will announce. */
export type Img = {
  src: string;
  alt: string;
  /** Diagrams whose meaning is carried by adjacent prose. Announced as nothing. */
  decorative?: boolean;
  /** Artwork with a cut-out subject or baked-in text must not be cropped. */
  contain?: boolean;
};

/** One column of the document's recurring three-column blocks. */
export type Panel = {
  title?: string;
  image?: Img;
  paragraphs?: string[];
  items?: { term: string; text: string }[];
};

/** A Smart Pulser frequency zone. */
export type Zone = {
  range: string;
  name: string;
  body: string;
};
