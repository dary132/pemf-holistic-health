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

/**
 * Legacy card shape. `lib/content/home.ts` moved off this in Task 11 (its
 * `Teaser` now carries `image: Img`, see below), but `lib/content/products.ts`
 * — a stale 2025-era module still rendered by `app/products/page.tsx` until a
 * later page task rewrites it — still uses `CardContent` in three exported
 * arrays. Deleting it now would break that page's typecheck and build, so it
 * stays until that task removes its last consumer.
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

/** A link card to another page, driving both its image and destination. */
export type Teaser = {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: Img;
};
