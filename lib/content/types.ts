/** An image plus the alt text a screen reader will announce. */
export type Img = {
  src: string;
  alt: string;
  /** Diagrams whose meaning is carried by adjacent prose. Announced as nothing. */
  decorative?: boolean;
  /** Artwork with a cut-out subject or baked-in text must not be cropped. */
  contain?: boolean;
  /** Artwork with an opaque near-black ground: the media slot paints itself
   *  to match (`u-plate-media-dark`), so the letterboxing disappears and the
   *  image reads edge-to-edge. Handled by PanelGrid only. */
  dark?: boolean;
};

/** One column of the document's recurring three-column blocks. */
export type Panel = {
  title?: string;
  image?: Img;
  paragraphs?: string[];
  /** Parallel one-line claims -- component specs, applicator features -- as
   *  against `paragraphs`, which is multi-sentence prose. Rendered as a
   *  marked list, so the reader can see at a glance how many there are and
   *  scan down them. A block is one or the other, never both. */
  bullets?: string[];
  items?: { term: string; text: string }[];
};

/** One full-width image-and-text band. The document's three-column blocks
 *  collapse to this on /sports-health: a Panel is a column in a row of three,
 *  a Band is a row of its own with the image at ~55% of the content width.
 *  Same fields, different container -- which is the whole change, since the
 *  copy is verbatim either way. */
export type Band = {
  title?: string;
  image: Img;
  paragraphs: string[];
};

/** A Smart Pulser frequency zone. */
export type Zone = {
  range: string;
  name: string;
  body: string;
};

/** A link card to another page, driving both its image and destination. */
export type Teaser = {
  title: string;
  body: string;
  href: string;
  image: Img;
};
