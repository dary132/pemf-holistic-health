/** PEMF page copy. Source: "Website Exiga Jasmin 2026.docx", page 2. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = {
  title: "PEMF for Healthy Lifestyle",
  paragraphs: [
    "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
  ],
};

export const essentials = [
  { image: images.essentialAir },
  { image: images.essentialFood },
  { image: images.essentialWater },
  { image: images.essentialSunshine },
  { image: images.essentialEarthField },
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
        "In addition to air, food, water and sunshine, our Earth’s natural Magnetic Field energy is also essential for health. But our Earth’s Magnetic Field is weakening and electro-smog is increasing. PEMF mimics Earth’s magnetic field energy for general health and wellness.",
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
        "The Earth's magnetic field is vital for human health because it creates a protective shield (the magnetosphere) to protect the Earth from harmful solar and cosmic radiation. Earth's magnetic field is essential for supporting and protecting life on Earth. Magnetic field is an essential environmental factor for human existence.",
      ],
    },
    { title: "Principle of Magnet", image: images.magnetPoles },
  ],
};

export const mimicsEarth = {
  heading: "PEMF Mimics Earth’s Magnetic Field Energy",
  title: "PEMF Technology for Wellness Use",
  paragraphs: [
    "Electromagnetic force is the fundamental power train of our Earth - an inevitable source of energy and vitality for our sense of wellness! PEMF mimics the earth’s natural magnetic field energy. Utilize the electromagnetic spectrum, retain our overall well-being with the most advanced and comprehensive PEMF technology for wellness use in the world.",
  ],
};
