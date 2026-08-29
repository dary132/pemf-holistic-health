/** Products page copy. Two verbatim sources, checked by scripts/verify-copy.mjs:
 *  - "Website Exiga Jasmin 2026.docx", page 9 (docs/exiga-jasmin-2026.txt, with
 *    image text transcribed in docs/exiga-jasmin-2026-image-text.txt).
 *  - The Swiss Bionic iMRS prime page (docs/imrs-prime-swissbionic.txt), added
 *    2026-08-29 with the site owner's approval for the component, software-tool
 *    and accessory sections the client document does not cover. */
import type { Panel, Zone } from "./types";
import { images } from "./images.ts";

export const intro = { title: "Products" };

export const imrsPrime = {
  title: "IMRS prime PEMF",
  paragraphs: [
    "The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing! World’s only 6-dimensional PEMF wellness system!",
    "PEMF-Extremely low frequency and low intensity systems for wellness!",
  ],
};

export const controlPanel = {
  title: "iMRS prime Control Panel",
  paragraphs: [
    "10.2“ capacitive touch screen LCD-Display.",
    "Housing and pedestal in brushed aluminum, ROHS/REACH/IP20.",
    "2 built-in speakers.",
    "2 USB jacks.",
    "NFC sensor.",
  ],
};

export const connectorBox = {
  title: "iMRS prime Connector Box",
  paragraphs: [
    "Designed as the gateway between the iMRS prime control unit and the applicators/accessories.",
    "6 applicator jacks.",
    "2 integrated D/A-Converter allowing for two separate, individual applications with only 1 control unit.",
    "Brushed aluminum housing for effective heat dissipation, ROHS/REACH/IP20.",
  ],
};

export const applicatorsIntro = {
  title: "The Applicators",
  paragraphs: [
    "Experience “Exagon Series” – the latest generation of our high-end applicators. Every PEMF applicator serves as the conductor of the exposed signal patterns to the receiver and is therefore the most critical component. The brand new Exagon Series applicator family combines all vital properties of applied PEMF technology in one solution.",
  ],
};

/** The six Exagon applicators, in the manufacturer page's order. */
export const applicators = [
  {
    title: "Exagon Mat",
    image: images.exagonMat,
    paragraphs: [
      "The whole body applicator for the “holistic” PEMF experience!",
      "6 built-in, rock-solid copper coils, divided in three pairs with different amount of windings to control the applied field intensity over the entire surface.",
      "Triple Sawtooth waveform for highest efficiency of low-pulsed PEMF.",
    ],
  },
  {
    title: "Exagon Pad",
    image: images.exagonPad,
    paragraphs: [
      "The local applicator to stimulate specific body areas!",
      "2 built-in, rock-solid copper coils to evenly control the applied field intensity over the entire surface.",
      "Square Wave for highest efficiency of locally applied PEMF.",
    ],
  },
  {
    title: "Exagon Spot",
    image: images.exagonSpot,
    paragraphs: [
      "The punctual applicator to stimulate specific body areas!",
      "Newly designed and flexible applicator for punctual usage and to utilize the so-called “Helmholtz-Effect”!",
      "Square Wave for highest efficiency of locally applied PEMF with Helmholtz-Effect.",
    ],
  },
  {
    title: "Exagon FIR",
    image: images.exagonFir,
    paragraphs: [
      "The world’s first and only flexible hybrid applicator!",
      "Exagon FIR represents the most advanced, holistic PEMF applicator-technology to date.",
      "It literally feels like floating on a raft on a calm lake!",
    ],
  },
  {
    title: "Exagon Brain",
    image: images.exagonBrainGoggles,
    paragraphs: [
      "Brainwave Entrainment – Holistic experience for the mind!",
      "Newly designed Goggles with 12 built-in LEDS on each side. Housing is completely darkened for optimal performance.",
      "Photic, chromatic and audible BrainWave Entrainment combined in one single system.",
    ],
  },
  {
    title: "Exagon Sense",
    image: images.exagonSense,
    paragraphs: [
      "Biofeedback technology for wellness purposes",
      "Designed to detect blood volume changes in the microvascular bed of tissue.",
      "SpO2 and HRV evaluation.",
      "Dynamic intensity adjustment during a PEMF application.",
    ],
  },
];

export const fastStart = {
  heading: "Software Tools",
  title: "Fast Start Programs (standard in all bundles)",
  paragraphs: [
    "The iMRS prime gets you going right away! All Fast Start Programs are designed for ease of use making holistic applications very simple and highly effective on a daily basis. All Fast Start Programs are automatically aligned and synchronized with the Exagon Brain, while connected and activated!",
  ],
  /** Program names, transcribed from the page's fast_start_*.png tiles. */
  programs: [
    "Activate",
    "Balance",
    "Performance",
    "Regeneration",
    "Relaxation",
    "Sleep",
    "Solfeggio",
  ],
};

export const modes: Panel[] = [
  {
    title: "Manual Mode",
    paragraphs: [
      "The basic application mode. Set all necessary parameters manually, based on the recommendation of your assigned Swissbionic LifeStyle Consultant!",
    ],
  },
  {
    title: "Program Mode",
    paragraphs: [
      "The iMRS prime allows you to preprogram multiple users with all parameters and applicators and save them to the Control Panel storage drive.",
      "Whenever the dedicated user wants to run an application, simply choose the dedicated applicator and the system will provide the default parameters!!",
    ],
  },
  {
    title: "Split Mode",
    paragraphs: [
      "Two PEMF-Systems in ONE!",
      "iMRS prime is the world’s first PEMF-System allowing two stand-alone applications with only ONE control unit! The connector box of the iMRS prime provides 6 applicator plugs (3 on each side) and contains 2, equally powered D/A converters. The Split Mode divides the touchscreen into two operating surfaces allowing to set independent parameters and applicators for each session.",
    ],
  },
];

export const accessoriesHeading = "iMRS prime Accessories";

export const accessories: Panel[] = [
  {
    title: "iMRS prime Organizer Bag Control Unit",
    paragraphs: ["Small bag for the control unit, power plug and other accessories."],
  },
  {
    title: "Exagon Applicator Travel Bag",
    paragraphs: [
      "Travel bag for all Exagon Applicators (Exagon Mat/FIR, Exagon Pad, Exagon Spot).",
    ],
  },
  {
    title: "iMRS prime Carefree plus",
    items: [
      {
        term: "iMRS prime Carefree plus 12 months",
        text: "iMRS prime Warranty extension 12 months, including an unrestricted exchange program in the event of a technical defect within the selected Guarantee periods.",
      },
      {
        term: "iMRS prime Carefree plus 24 months",
        text: "iMRS prime Warranty extension 24 months, including an unrestricted exchange program in the event of a technical defect within the selected Guarantee periods.",
      },
    ],
  },
  {
    title: "Prime Full-Service Package",
    paragraphs: [
      "An initial Onboarding-Call once the iMRS prime has been shipped and received by the customer, where a personal installation and activation session will be conducted via ZOOM with one of our trained Prime Tech!",
      "12 months troubleshooting with the assigned Prime Tech via direct email access!",
      "12 months warranty extension for the iMRS prime system!",
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
    "Discover the world’s first PEMF system, featuring groundbreaking “Inductive Fiber Coil Technology”",
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
