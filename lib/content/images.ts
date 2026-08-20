/** Every image on the site, with its alt text, in one place.
 *  Source: "Website Exiga Jasmin 2026.docx" plus the client's IMRS Model 3 photo.
 *  Diagrams marked `decorative` have their meaning carried by adjacent prose,
 *  so announcing them again would only make a screen reader repeat itself. */
import type { Img } from "./types.ts";

/** next/image refuses to send SVG through its optimizer unless the global
 *  `dangerouslyAllowSVG` config flag is set. That flag also loosens handling
 *  for every remote source, which is a wider blast radius than this needs:
 *  the only SVGs here are our own committed diagrams. Serving just those
 *  unoptimized gets the same result without flipping a security flag. */
export function isSvg(src: string) {
  return src.endsWith(".svg");
}

export const images = {
  imrsModel3: {
    src: "/images/imrs-model-3.png",
    alt: "A woman lying on the IMRS prime whole-body mat at home, with the tablet control unit beside her",
  },
  holisticFlower: {
    src: "/images/holistic-flower.svg",
    alt: "Flower diagram of the six aspects of holistic health: physical, mental, emotional, intellectual, social and spiritual",
    contain: true,
  },
  holisticAnatomy: {
    src: "/images/holistic-anatomy.svg",
    alt: "A figure with brain, lungs, heart, muscles, bones and joints marked as connected parts of one body",
    contain: true,
  },
  essentialAir: {
    src: "/images/essential-air.svg",
    alt: "Currents of moving air",
    contain: true,
  },
  essentialFood: { src: "/images/essential-food.svg", alt: "A bowl of food", contain: true },
  essentialWater: { src: "/images/essential-water.svg", alt: "A drop of water", contain: true },
  essentialSunshine: {
    src: "/images/essential-sunshine.svg",
    alt: "The sun shining over open ground",
    contain: true,
  },
  essentialEarthField: {
    src: "/images/essential-earth-field.svg",
    alt: "Diagram of Earth's magnetic field lines running between the magnetic north and south poles",
    contain: true,
  },
  earthShield: {
    src: "/images/earth-shield.svg",
    alt: "",
    decorative: true,
    contain: true,
  },
  fieldWeakening: {
    src: "/images/field-weakening.svg",
    alt: "",
    decorative: true,
    contain: true,
  },
  radiationSources: {
    src: "/images/sources-of-radiation.svg",
    alt: "The radiation spectrum from low-energy radio waves through to high-energy gamma rays, with the ionizing threshold marked after visible light",
    contain: true,
  },
  magnetPoles: {
    src: "/images/magnet-poles.svg",
    alt: "Diagram of a magnet's north and south poles and its field lines",
    contain: true,
  },
  mimicsEarthField: {
    src: "/images/mimics-earth-field.svg",
    alt: "Earth's magnetic field beside a PEMF mat producing the same field shape",
    contain: true,
  },
  wellnessPractices: {
    src: "/images/wellness-practices.png",
    alt: "Illustration of physical, mental, and emotional wellness practices, including restorative sleep, nourishing foods, hydration, exercise, gratitude, meaningful connections, time in nature, mindfulness, supportive relationships, rest, personal growth, and reflection",
    contain: true,
  },
  eightDimensions: {
    src: "/images/eight-dimensions.svg",
    alt: "Wheel of eight dimensions of wellness: environmental, financial, emotional, vocational, spiritual, social, physical, and intellectual",
    contain: true,
  },
  exagonBrainBanner: {
    src: "/images/exagon-brain-banner.png",
    alt: "A woman reclining while wearing the Exagon Brain brainwave entrainment goggles",
  },
  stressMeter: {
    src: "/images/stress-meter.png",
    alt: "A gauge showing stress levels rising from low to high",
    contain: true,
  },
  relaxPoolside: {
    src: "/images/relax-poolside.jpg",
    alt: "A woman relaxing on a lounger beside a pool",
  },
  energyBattery: {
    src: "/images/energy-battery.png",
    alt: "A battery filling with charge, representing energy levels",
    contain: true,
  },
  brainwaveEntrainment: {
    src: "/images/brainwave-entrainment.png",
    alt: "A person wearing brainwave entrainment goggles",
    contain: true,
  },
  passiveWarmup: {
    src: "/images/passive-warmup.png",
    alt: "Icon representing passive warm-up",
    contain: true,
  },
  rejuvenation: {
    src: "/images/rejuvenation.png",
    alt: "Icon representing rejuvenation after physical activity",
    contain: true,
  },
  performance: {
    src: "/images/performance.png",
    alt: "Icon representing enhanced athletic performance",
    contain: true,
  },
  sleepMatTablet: {
    src: "/images/sleep-mat-tablet.png",
    alt: "A person asleep on the PEMF mat with the tablet control unit beside the bed",
  },
  showAnimals: {
    src: "/images/show-animals.png",
    alt: "Cartoon collage of animals including a giraffe, panda, elephant, zebra, rhino and lion, captioned 'PEMF is good 4 us.'",
  },
  pemfDogPad: {
    src: "/images/pemf-dog-pad.png",
    alt: "A dog lying on a PEMF pad",
  },
  petsGroup: { src: "/images/pets-group.png", alt: "A group of pets together" },
  imrsFaunaHorses: {
    src: "/images/imrs-fauna-horses.png",
    alt: "The IMRS fauna system shown with horses",
    contain: true,
  },
  horseAreaApplicator: {
    src: "/images/horse-area-applicator.png",
    alt: "A horse wearing the PEMF area applicator across its back",
  },
  horseLegApplicator: {
    src: "/images/horse-leg-applicator-2026.png",
    alt: "The PEMF leg applicator wrapped around a horse's leg",
  },
  imrsPrimeModes: {
    src: "/images/imrs-prime-modes.jpg",
    alt: "The IMRS prime system with its mat, pad, spot applicator and control unit",
  },
  exagonFir: {
    src: "/images/exagon-fir.png",
    alt: "The Exagon FIR far-infrared applicator mat",
    contain: true,
  },
  exagonPad: { src: "/images/exagon-pad.png", alt: "The Exagon Pad applicator", contain: true },
  exagonSpot: { src: "/images/exagon-spot.png", alt: "The Exagon Spot applicator", contain: true },
  exagonSplitMode: {
    src: "/images/exagon-split-mode.png",
    alt: "Two people using one iMRS prime control unit at the same time in split mode",
    contain: true,
  },
  brainwavePoolside: {
    src: "/images/brainwave-poolside.png",
    alt: "A person using brainwave entrainment goggles on a lounger beside a pool",
  },
  exagonSense: {
    src: "/images/exagon-sense.png",
    alt: "The Exagon Sense biofeedback sensor",
    contain: true,
  },
  exagonBrainGoggles: {
    src: "/images/exagon-brain-goggles.png",
    alt: "The Exagon Brain goggles and headphones",
    contain: true,
  },
  smartPulserSet: {
    src: "/images/smart-pulser-set.png",
    alt: "The Smart Pulser system with its applicators and control unit",
    contain: true,
  },
  coils: {
    src: "/images/coils-fiber-vs-copper.png",
    alt: "Comparison of inductive fiber coils against solid copper coils",
    contain: true,
  },
  biomimeticEarth: {
    src: "/images/biomimetic-earth.svg",
    alt: "Earth emitting its natural electromagnetic pulses outward",
  },
  wechatQr: { src: "/images/wechat-qr.png", alt: "WeChat QR code", contain: true },
} satisfies Record<string, Img>;
