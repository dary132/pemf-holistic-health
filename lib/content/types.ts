export type CardContent = {
  image: string;
  title: string;
  body: string;
  /** Tailwind aspect ratio for the image well. Defaults to 4/3. */
  imageAspect?: string;
  /** Artwork with baked-in text or a cut-out subject needs `contain`. */
  imageFit?: "cover" | "contain";
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Teaser = {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
};
