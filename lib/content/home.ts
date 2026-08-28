/** Home page copy. Source: "Website Exiga Jasmin 2026.docx", page 1.
 *  Verbatim. Do not reword — the client cites FDA exposure. */
import type { Teaser } from "./types";
// Explicit .ts extension: `scripts/verify-copy.mjs` dynamically imports content
// modules with Node's native ESM loader (no bundler), which requires a fully
// specified relative specifier. `allowImportingTsExtensions` in tsconfig.json
// permits this under "bundler" moduleResolution. home.ts is the first content
// module to value-import a sibling module, so this is a new requirement, not
// a style choice — the next content module to import `images` will need it too.
import { images } from "./images.ts";

export const hero = {
  // The document's "PEMF Pulsed Electro Magnetic Field" line, split so the
  // abbreviation can be set as the wordmark and its expansion beneath it.
  wordmark: "PEMF",
  expansion: "Pulsed Electro Magnetic Field",
  title: "PEMF for Health and Wellness",
  paragraphs: [
    "Are you still feeling stressed out?   Low energy?    Not sleeping well? Nothing else seems to work anymore? Try adding a holistic approach by laying on the PEMF body mat.",
  ],
};

export const holisticApproach = {
  title: "PEMF - Holistic Approach",
  paragraphs: [
    "A holistic approach to health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being.",
    "This perspective recognizes that imbalances in one area can affect others. PEMF is a holistic approach to promote a state of total wellness.",
    "Holistic health using PEMF, aims to achieve overall well-being by addressing interconnected aspects of life, such as mental health, emotional health, intellectual health, physical health, social health and spiritual health.",
  ],
};

export const holisticAnatomy = {
  title: "Holistic Anatomy",
  paragraphs: [
    "A holistic approach recognizes that your physical, mental, emotional, and spiritual well-being are deeply intertwined. When one area is out of balance, it directly impacts the others, meaning true harmony comes from nurturing the whole person. PEMF assists the body's natural drive to maintain optimal balance across several physiological systems.",
  ],
};

/** Link cards to the other nine pages. Titles and bodies are the document's own
 *  page headings and sentences — no marketing copy is invented here. */
export const teasers: Teaser[] = [
  {
    title: "PEMF for Healthy Lifestyle",
    body: "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
    href: "/pemf",
    image: images.earthFieldAurora,
  },
  {
    title: "PEMF for Holistic Health",
    body: "PEMF is a holistic approach to promote a state of total wellness.",
    href: "/holistic-health",
    image: images.wellnessPractices,
  },
  {
    title: "PEMF Improves Mental Health",
    body: "Brainwave Entrainment is a holistic experience for the brain, also known as Spa for the Mind, reduces stress, resulting in relaxation, calmness and ease.",
    href: "/mental-health",
    image: images.exagonBrainBanner,
  },
  {
    title: "PEMF Increases Your Energy",
    body: "Try this holistic approach using PEMF system to enhance your energy, stamina, and power and you will feel the difference.",
    href: "/energy",
    image: images.energyBattery,
  },
  {
    title: "PEMF Enhances Athletic Performance",
    body: "PEMF with Brain Wave Entrainment enhances visualization and mindfulness to build mental resilience, improve focus, enhance thinking process and reaction times, better sleep and management of stress.",
    href: "/sports-health",
    image: images.performance,
  },
  {
    title: "PEMF Promotes Good Sleep",
    body: "PEMF is a non-invasive, non-addictive, drug-free approach for promoting better sleep.",
    href: "/sleep-health",
    image: images.sleepMatTablet,
  },
  {
    title: "PEMF for Pets Health",
    body: "Pets appreciate PEMF.",
    href: "/pets-health",
    image: images.pemfDogPad,
  },
  {
    title: "Products",
    body: "The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing!",
    href: "/products",
    image: images.imrsPrimeModes,
  },
];
