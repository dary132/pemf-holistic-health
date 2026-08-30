/** PEMF page copy. Source: "Website Exiga Jasmin 2026.docx", page 2. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = {
  title: "PEMF for Healthy Lifestyle",
  paragraphs: [
    "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
  ],
};

// Labels are the five nouns of the intro sentence above, byte-for-byte as the
// document spells them (three are lowercase there), so verify:copy still sees
// verbatim text. The page capitalises them with CSS for display only.
export const essentials = [
  { label: "Air", image: images.essentialAir },
  { label: "food", image: images.essentialFood },
  { label: "water", image: images.essentialWater },
  { label: "sunshine", image: images.essentialSunshine },
  { label: "Earth’s Magnetic Field Energy", image: images.essentialEarthField },
];

export const essentialForHealth: { heading: string; panels: Panel[] } = {
  heading: "Magnetic Field Energy is Essential for Health",
  panels: [
    {
      title: "Our Earth’s Magnetic Field",
      image: images.earthShield,
      paragraphs: [
        "Shields us from radiation.",
        "This Is How Earth's Magnetic Field Protects Us From Solar Wind And Radiation",
      ],
    },
    {
      title: "What is Vital for Health?",
      paragraphs: [
        "You need air, food, water, and sunshine. You also need the Earth’s natural magnetic field. That field is growing weaker, while man-made electrical noise keeps growing. PEMF copies the Earth’s magnetic field to support your health and wellness.",
      ],
    },
    {
      title: "Magnetic Field Weakening",
      image: images.fieldWeakening,
      paragraphs: [
        "Impacts Life on Earth.",
        "Earth's magnetic field has been weakening at an accelerating rate, and 2025 satellite data reveals concerning changes in our planet's invisible protective shield.",
      ],
    },
  ],
};

export const importanceOfField: { heading: string; panels: Panel[] } = {
  heading: "Importance of Earth’s Magnetic Field",
  panels: [
    { title: "Sources of Radiation", image: images.radiationSources },
    {
      title: "Protection from Radiation",
      paragraphs: [
        "The Earth’s magnetic field works like a shield around the planet. Scientists call that shield the magnetosphere. It guards us from harmful radiation from the sun and from space. Life on Earth depends on it.",
      ],
    },
    { title: "Principle of Magnet", image: images.magnetPoles },
  ],
};

export const mimicsEarth = {
  heading: "PEMF Mimics Earth’s Magnetic Field Energy",
  title: "PEMF Technology for Wellness Use",
  paragraphs: [
    "Magnetic energy is the engine that drives our Earth. It is a natural source of energy, and it supports how well you feel. PEMF copies that natural energy. Our system is the most advanced PEMF wellness technology in the world.",
  ],
};
