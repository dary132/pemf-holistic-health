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
  // The document's own page-1 banner (word/media/image1). Restored at the
  // client's request on 2026-08-24 in place of imrsModel3 below: same shoot,
  // same room, wider framing, and it is the image the document actually
  // leads with. Note it is only 721px wide — see the Figure on app/page.tsx.
  heroMatFireplace: {
    src: "/images/hero-mat-fireplace.png",
    alt: "A woman lying on the IMRS whole-body mat on a marble floor beside a stone fireplace, with the tablet control unit on the floor beside her",
  },
  // The client's own IMRS Model 3 photograph. A tighter, higher-resolution
  // frame of the same shoot; kept because the client supplied it directly and
  // it is the fallback if the document's banner proves too soft in print or
  // on a high-density screen. Not currently placed on any page.
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
  // The five "essentials" and the two magnetic-field images below are the
  // document's own files (word/media image6-12), restored at the client's
  // request on 2026-08-20 in place of the SVG redraws. See git history
  // (1dc86f1, 0179c8c) for why the redraws existed: third-party watermarks
  // on image6/image11 and identifiable people in image6.
  essentialAir: {
    src: "/images/essential-air.png",
    alt: "Five people taking a deep breath, captioned: People need air to live and survive",
    contain: true,
  },
  essentialFood: {
    src: "/images/essential-food.png",
    alt: "A bowl of rice, vegetables, chickpeas, boiled egg and chicken",
    contain: true,
  },
  essentialWater: { src: "/images/essential-water.png", alt: "A glass of water", contain: true },
  essentialSunshine: {
    src: "/images/essential-sunshine.png",
    alt: "A figure with arms raised to the sun, captioned: The Sunshine Vitamin, why sunlight is crucial to your health",
    contain: true,
  },
  essentialEarthField: {
    src: "/images/essential-earth-field.jpeg",
    alt: "Diagram of Earth's magnetic field lines running between the magnetic north and south poles",
    contain: true,
  },
  earthShield: {
    src: "/images/earth-magnetic-field-shield.png",
    alt: "",
    decorative: true,
    contain: true,
  },
  fieldWeakening: {
    src: "/images/magnetic-field-weakening.png",
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
  /** Dusk meadow under a magenta aurora -- Earth's field made visible.
   *  Replaced the mimics-earth-field.svg diagram on 2026-08-27: /pemf already
   *  carries three globe-and-field-lines diagrams above this band, so a fourth
   *  read as repetition. A photograph does not. */
  earthFieldAurora: {
    src: "/images/earth-field-aurora.jpg",
    alt: "A magenta aurora arcing over a meadow and a winding stream at dusk",
  },
  wellnessPractices: {
    src: "/images/wellness-practices.svg",
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
    src: "/images/stress-meter.svg",
    alt: "A gauge showing stress levels rising from low to high",
    contain: true,
  },
  relaxPoolside: {
    src: "/images/relax-poolside.jpg",
    alt: "A woman relaxing on a lounger beside a pool",
  },
  energyBattery: {
    src: "/images/energy-battery.svg",
    alt: "A nearly empty battery beside a full one, representing energy levels rising",
    contain: true,
  },
  brainwaveEntrainment: {
    src: "/images/brainwave-entrainment.svg",
    alt: "A head in profile with a brainwave passing through it",
    contain: true,
  },
  passiveWarmup: {
    src: "/images/passive-warmup.svg",
    alt: "A figure beside a rising column, representing passive warm-up",
    contain: true,
  },
  rejuvenation: {
    src: "/images/rejuvenation.svg",
    alt: "A figure within a circular arrow, representing rejuvenation after physical activity",
    contain: true,
  },
  performance: {
    src: "/images/performance.svg",
    alt: "A figure beside a rising series of bars, representing enhanced athletic performance",
    contain: true,
  },
  sleepMatTablet: {
    src: "/images/sleep-mat-tablet.png",
    alt: "A person asleep on the PEMF mat with the tablet control unit beside the bed",
  },
  showAnimals: {
    src: "/images/show-animals.jpg",
    alt: "Handlers showing dogs on a red carpet at an animal show, with cats on display beside rosettes and trophies",
  },
  pemfDogPad: {
    src: "/images/pemf-dog-pad.png",
    alt: "A dog lying on a PEMF pad",
  },
  petsGroup: {
    src: "/images/pets-group.jpg",
    alt: "A golden retriever, a tabby cat and a budgie resting together on a rug in a sunlit living room",
  },
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
