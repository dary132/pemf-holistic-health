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
  items?: { term: string; text: string }[];
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
