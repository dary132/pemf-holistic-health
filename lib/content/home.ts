/** Home page copy. Source: "Website Exiga Jasmin 2026.docx", page 1.
 *  Verbatim. Do not reword — the client cites FDA exposure. */
import type { Band, Panel, Teaser } from "./types";
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

/* "PEMF - Holistic Approach". Source: "Edit PEMF for Holistic Health
   Page.docx" (2026-09-04), the client's revision of this section into two
   blocks -- the flower diagram beside the three paragraphs, then the same
   copy as three picture cards. It was built as /holistic-health first, then
   the site owner had that page removed and its content moved here, between
   "PEMF for Health and Wellness" and "Holistic Anatomy" (2026-09-04). The
   heading is rendered once, centred over the cards; the flower band goes
   unheaded. Card two's first sentence and "balance and" in its second are
   new to the edit -- see docs/edit-holistic-health-2026-09.txt. */
/* The removed page's own title, now the h2 over the flower band -- the site
   owner asked for "a header right above the holistic section labeled PEMF
   for Holistic Health" on 2026-09-04, the same request that removed the
   "PEMF for Health and Wellness" block. hero.title and hero.paragraphs above
   are no longer rendered on this page; they stay for the /designs comps and
   the meta description. */
export const holisticHealth = { title: "PEMF for Holistic Health" };

export const approach = { title: "PEMF - Holistic Approach" };

/* Block one: the flower beside the three paragraphs in their original
   wording. The picture is the site owner's colour version of the document's
   flower -- see images.holisticHealthFlower. */
export const approachBand: Band = {
  image: images.holisticHealthFlower,
  paragraphs: [
    "A holistic approach to health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being.",
    "This perspective recognizes that imbalances in one area can affect others. PEMF is a holistic approach to promote a state of total wellness.",
    "Holistic health using PEMF, aims to achieve overall well-being by addressing interconnected aspects of life, such as mental health, emotional health, intellectual health, physical health, social health and spiritual health.",
  ],
};

/* Block two: three cards, each with its own picture above one paragraph,
   "to make it colorful on cellphone". */
export const approachPanels: Panel[] = [
  {
    image: images.holisticMindBodySpirit,
    paragraphs: [
      "A holistic approach to health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being.",
    ],
  },
  {
    image: images.holisticBalanceStones,
    paragraphs: [
      "A holistic perspective is a way of viewing a person as a complete and interconnected whole.",
      "This perspective recognizes that imbalances in one area can affect others. PEMF is a holistic approach to promote a state of balance and total wellness.",
    ],
  },
  {
    image: images.holisticSixDimensionsWheel,
    paragraphs: [
      "Holistic health using PEMF, aims to achieve overall well-being by addressing interconnected aspects of life, such as mental health, emotional health, intellectual health, physical health, social health and spiritual health.",
    ],
  },
];

/* The pre-2026-09-04 shape of the section -- title plus the three
   paragraphs -- kept for the /designs comps (clinical, editorial,
   photographic), which are review tooling that still renders it as text
   plates. Derived, not duplicated: the strings are approachBand's. */
export const holisticApproach = {
  title: approach.title,
  paragraphs: approachBand.paragraphs,
};

export const holisticAnatomy = {
  title: "Holistic Anatomy",
  paragraphs: [
    "A holistic approach recognizes that your physical, mental, emotional, and spiritual well-being are deeply intertwined. When one area is out of balance, it directly impacts the others, meaning true harmony comes from nurturing the whole person. PEMF assists the body's natural drive to maintain optimal balance across several physiological systems.",
  ],
};

/** Link cards to the other pages (eight since /holistic-health was folded
 *  into this page on 2026-09-04). Titles and bodies are the document's own
 *  page headings and sentences — no marketing copy is invented here, with one
 *  registered exception: the /mental-health card says "Wellness" where the
 *  document says "Mental Health", matching that page's own H1. See ALLOWED_EDITS
 *  in scripts/verify-copy.mjs. */
export const teasers: Teaser[] = [
  {
    title: "PEMF for Healthy Lifestyle",
    body: "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
    href: "/pemf",
    image: images.earthFieldAurora,
  },
  {
    /* Follows the page it links to, and moved with it twice on 2026-08-31 --
       "Mental Health" -> "Brain Health" -> "Wellness". A card whose title
       differs from the heading of the page it opens is the kind of mismatch a
       visitor reads as a broken link, so this tracks
       lib/content/mental-health.ts rather than being decided separately. The
       body sentence below is untouched and still verbatim. */
    title: "PEMF Improves Wellness",
    body: "Brainwave Entrainment is a holistic experience for the brain, also known as Spa for the Mind, reduces stress, resulting in relaxation, calmness and ease.",
    href: "/mental-health",
    image: images.exagonBrainBanner,
  },
  {
    title: "PEMF Increases Your Energy",
    body: "Try this holistic approach using PEMF system to enhance your energy, stamina, and power and you will feel the difference.",
    href: "/energy",
    image: images.energeticVsTired,
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
