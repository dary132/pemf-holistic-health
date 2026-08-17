/**
 * Content for the landing hub.
 *
 * Teaser copy is deliberately original. It must never repeat sentences used on
 * the destination pages, or the hub and the detail page compete for the same query.
 */
import type { Teaser } from "./types";

export const teasers: Teaser[] = [
  {
    title: "What is PEMF?",
    body: "Life evolved inside the Earth's magnetic field, and that field is measurably weakening while electro-smog rises. PEMF brings a gentle, low-frequency version of that natural signal back within reach.",
    href: "/what-is-pemf",
    cta: "How PEMF works",
    image: "/images/em-spectrum.jpg",
  },
  {
    title: "What PEMF Supports",
    body: "Rest that actually restores, a clearer head, steadier energy through the afternoon, quicker turnaround after training, and calmer animals. One approach across the things that tend to slip at once.",
    href: "/benefits",
    cta: "Explore the benefits",
    image: "/images/pemf-mat-session.jpg",
  },
  {
    title: "The Systems",
    body: "Two Swiss-engineered options: the six-dimensional iMRS Prime with its full Exagon applicator range, and the Smart Pulser for a lighter footprint at home or while travelling.",
    href: "/products",
    cta: "Compare the systems",
    image: "/images/imrs-prime-modes.jpg",
  },
  {
    title: "Book a Session",
    body: "Sessions run from the Lake Forest office, and home visits are available across Orange County. A certified consultant walks you through your first session and answers questions as they come up.",
    href: "/contact",
    cta: "Get in touch",
    image: "/images/imrs-consultation.jpg",
  },
];
