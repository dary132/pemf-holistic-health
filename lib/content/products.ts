/** Content for /products. Source: "Website Exiga Jasmin 2026.docx". */
import type { CardContent } from "./types";

/** Exagon applicators and modules for the iMRS Prime. */
export const exagonAccessories: CardContent[] = [
  {
    image: "/images/exagon-fir.png",
    title: "Exagon FIR",
    body: "The world's first and only flexible hybrid applicator, and the most advanced holistic PEMF applicator technology to date.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-pad.png",
    title: "Exagon Pad",
    body: "The local applicator, for stimulating specific areas of the body.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-spot.png",
    title: "Exagon Spot",
    body: "The punctual applicator, for stimulating one precise spot.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-split-mode.png",
    title: "Split Mode",
    body: "The world's first PEMF system allowing two stand-alone applications from a single control unit. Perfect for a couple to use at the same time.",
  },
  {
    image: "/images/exagon-sense.png",
    title: "Exagon Sense",
    body: "A biofeedback sensor for wellbeing purposes, giving dynamic intensity adjustment during a PEMF application.",
  },
  {
    image: "/images/exagon-brain-goggles.png",
    title: "Exagon Brain",
    body: "Also known as the Spa for the Mind. Photic, chromatic, and audible Brainwave Entrainment for deeper brain relaxation.",
  },
];

/**
 * Smart Pulser frequency zones, transcribed from the Spectrum of Vitality
 * graphic rather than shipped as an image so the text stays readable and searchable.
 */
export const frequencyZones = [
  {
    range: "0.5–4 Hz",
    name: "Deep Recovery Zone",
    body: "Mirrors the Delta brainwave state: the frequency of deep, restorative sleep and physical regeneration. Ideal for use at night.",
  },
  {
    range: "4–8 Hz",
    name: "Relaxation Zone",
    body: "Mirrors the Theta state. Perfect for stress reduction, meditation, and finding your inner calm after a demanding day.",
  },
  {
    range: "7.83 Hz",
    name: "Earth Resonance",
    body: "The heartbeat of the Earth. This frequency is the sweet spot for general balance, helping harmonize the body's various systems.",
  },
  {
    range: "8–12 Hz",
    name: "Active Alpha Zone",
    body: "Supports a state of relaxed alertness. Ideal for morning sessions, to bridge the gap between sleep and a productive day.",
  },
  {
    range: "12–25 Hz",
    name: "Vitality Zone",
    body: "Corresponds with Beta rhythms. These higher frequencies support physical performance, mental clarity, and daytime energy levels.",
  },
];

/** Smart Pulser technology cards. */
export const smartPulserFeatures: CardContent[] = [
  {
    image: "/images/coils-fiber-vs-copper.png",
    title: "Inductive Fiber Coils",
    body: "Discover the world's first PEMF system featuring groundbreaking Inductive Fiber Coil Technology, a step beyond conventional solid copper coils.",
    // Side-by-side comparison: cropping to 4/3 would cut off one of the coils.
    imageAspect: "aspect-[16/9]",
    imageFit: "contain",
  },
  {
    image: "/images/biomimetic-earth.jpg",
    title: "Biomimetic Frequencies",
    body: "The Smart Pulser uses an extremely low frequency window to deliver Biomimetic Frequencies of Earth: signals your body recognizes and responds to. Mimicking these natural electromagnetic pulses helps ground your biological system against the chaotic high-frequency electro-smog of modern life, promoting stress reduction and relaxation.",
  },
];

/** Products the 2026 document no longer lists, kept available on the page. */
export const alsoAvailable: CardContent[] = [
  {
    image: "/images/omnium-on-the-go.jpg",
    title: "PEMF on the Go",
    body: "A full-size PEMF wellness system on the go. Enjoy whole-body sessions at home, in the office, or outdoors.",
  },
  {
    image: "/images/imrs-consultation.jpg",
    title: "Swiss Bionic Solutions",
    body: "Premium Swiss-engineered PEMF systems for home use, backed by certified consultation and personal support.",
  },
];
