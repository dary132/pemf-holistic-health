/** Products page copy. Source: "Website Exiga Jasmin 2026.docx", page 9. Verbatim.
 *  The frequency zones and the low-frequency paragraphs exist in the document only
 *  as pixels inside image43.png and image45.png. They are transcribed here so they
 *  can be zoomed, selected and read aloud; the transcription is committed to
 *  docs/exiga-jasmin-2026-image-text.txt and checked by scripts/verify-copy.mjs. */
import type { Panel, Zone } from "./types";
import { images } from "./images.ts";

export const intro = { title: "Products" };

export const imrsPrime = {
  title: "IMRS prime PEMF",
  paragraphs: [
    "The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing! World's only 6-dimensional PEMF wellness system!",
    "PEMF-Extremely low frequency and low intensity systems for wellness!",
  ],
};

export const applicators = [
  {
    title: "Exagon FIR",
    image: images.exagonFir,
    paragraphs: [
      "Exagon FIR represents the most advanced, holistic PEMF applicator-technology to date.",
    ],
  },
  { title: "Exagon Pad", image: images.exagonPad, paragraphs: [] },
  { title: "Exagon Spot", image: images.exagonSpot, paragraphs: [] },
  {
    title: "Split Mode",
    image: images.exagonSplitMode,
    paragraphs: [
      "iMRS prime PEMF is the world's first PEMF system allowing two stand-alone applications with only one control unit. Perfect for a couple to use at the same time.",
    ],
  },
  {
    title: "Brainwave Entrainment",
    image: images.brainwavePoolside,
    paragraphs: ["Holistic experience for the mind!"],
  },
];

export const sensors: Panel[] = [
  {
    title: "Exagon Sense",
    image: images.exagonSense,
    paragraphs: [
      "Biofeedback for wellbeing purposes sensor. Dynamic intensity adjustment during a PEMF application.",
    ],
  },
  {
    title: "Exagon Brain",
    image: images.exagonBrainGoggles,
    paragraphs: [
      "AKA The Spa for the Mind.",
      "Photic, chromatic and audible Brainwave Entrainment for deeper brain relaxation.",
    ],
  },
];

export const smartPulser = {
  title: "Smart Pulser",
  paragraphs: [
    "Total Body Optimization with Excellence! The new, affordable global benchmark PEMF for home use or abroad.",
  ],
};

export const coils = {
  title: "Inductive Fiber Coils vs Solid Copper Coils",
  paragraphs: [
    "Discover the world's first PEMF system, featuring groundbreaking “Inductive Fiber Coil Technology”",
  ],
};

export const spectrum = {
  title: "Spectrum of Vitality",
  paragraphs: [
    "SmartPulser helps you move effortlessly between rest, balance and peak performance.",
    "Within this narrow, powerful range and the circadian alignment, different frequencies support different states of well-being:",
  ],
};

/** Transcribed from image43.png. */
export const zones: Zone[] = [
  {
    range: "0.5–4 Hz",
    name: "The Deep Recovery Zone (0.5–4 Hz):",
    body: "Mirrors the Delta brainwave state. This is the frequency of deep, restorative sleep and physical regeneration. Ideal for use with the S.Bed applicator at night.",
  },
  {
    range: "4–8 Hz",
    name: "The Relaxation Zone (4–8 Hz):",
    body: "Mirrors the Theta state. Perfect for stress reduction, meditation, and finding your \"inner calm\" after a demanding day.",
  },
  {
    range: "7.83 Hz",
    name: "The Earth Resonance (7.83 Hz):",
    body: "The \"Heartbeat of the Earth.\" This frequency is the sweet spot for general balance, helping to harmonize the body's various systems.",
  },
  {
    range: "8–12 Hz",
    name: "The Active Alpha Zone (8–12 Hz):",
    body: "Supports a state of \"relaxed alertness.\" Ideal for morning sessions to bridge the gap between sleep and a productive day.",
  },
  {
    range: "12–25 Hz",
    name: "The Vitality Zone (12–25 Hz):",
    body: "Corresponds with Beta rhythms. These higher frequencies within our range support physical performance, mental clarity, and daytime energy levels.",
  },
];

export const biomimetic = {
  title: "Biomimetic Frequencies",
  paragraphs: [
    "SmartPulser utilizes extremely low frequency window to provide Biomimetic Frequencies of Earth– signals that your body recognizes and response. By mimicking these natural electromagnetic pulses, the SmartPulser helps “ground your biological system, shielding you from the chaotic high frequency ‘electro-smog” of modern life thus promoting stress reduction and relaxation.",
  ],
};

/** Transcribed from image45.png. */
export const lowFrequency = {
  title: "Why Low Frequency is High Impact",
  paragraphs: [
    "In the world of holistic PEMF, less is always more. High-frequency radiation (like Wi-Fi or cellular signals) can be stressful to the body. SmartPulser stays strictly within the risk-free Extremely Low Frequency (ELF) range.",
    "By operating between 0.5 and 25 Hz, we ensure that the energy delivered is gentle, non-invasive, and perfectly tuned to the natural \"windows\" of cellular communication. It's not about overwhelming the body with power—it's about supporting it with resonance.",
  ],
};
