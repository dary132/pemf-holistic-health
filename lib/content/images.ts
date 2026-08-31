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
  // The document's own page-1 banner (word/media/image1). Was the home hero
  // from 2026-08-24 until 2026-08-28, when the client asked for a larger
  // stacked hero: at full content width this 721px file upscales past 2x, so
  // imrsModel3 below took its place. Kept because it is the image the
  // document actually leads with; not currently placed on any page.
  heroMatFireplace: {
    src: "/images/hero-mat-fireplace.png",
    alt: "A woman lying on the IMRS whole-body mat on a marble floor beside a stone fireplace, with the tablet control unit on the floor beside her",
  },
  // The client's own IMRS Model 3 photograph. A tighter, higher-resolution
  // frame of the same shoot as heroMatFireplace. The home hero since
  // 2026-08-28: the stacked hero renders the photograph at full content
  // width, where the 721px banner would be visibly soft and this 1000px
  // frame is the sharpest file the client has supplied.
  imrsModel3: {
    src: "/images/imrs-model-3.png",
    alt: "A woman lying on the IMRS prime whole-body mat at home, with the tablet control unit beside her",
  },
  holisticFlower: {
    src: "/images/holistic-flower.svg",
    alt: "Flower diagram of the six aspects of holistic health: physical, mental, emotional, intellectual, social and spiritual",
    contain: true,
  },
  // Client-supplied 2026-08-29 for the home page's anatomy section: the
  // labelled organ-function chart the holisticAnatomy SVG below once stood
  // in for. The SVG stays for the /designs comps, which still render it.
  organFunctions: {
    src: "/images/organ-functions.webp",
    alt: "Chart of eighteen organs and their functions, from the brain controlling the body to the pituitary master gland",
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
  /* Cut out from its white studio backdrop so the glass sits directly on the
     section ground -- the four themes each tint --cream differently, and an
     opaque white plate showed as a box against every one of them. The file is
     renamed rather than replaced in place: /_next/image caches optimised
     variants per source URL across deployments, so reusing the old name can
     serve the pre-cutout copy until that cache expires. */
  essentialWater: {
    src: "/images/essential-water-cutout.webp",
    alt: "A glass of water",
    contain: true,
  },
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
    src: "/images/magnetic-field-weakening.webp",
    alt: "",
    decorative: true,
    contain: true,
  },
  /* Both of these are the document's own files (word/media image13 and
     image14), restored on 2026-08-30 at the client's request in place of the
     SVG redraws, same trade as the essentials, the sports icons and the two
     images above. Each has every word of its own labelling burnt in, so
     `contain` is required -- `cover` would crop the outer ring of the
     spectrum arc and the "opposite poles attract" caption -- and each alt
     text reproduces the burnt-in wording rather than describing the picture
     around it. Both grounds are pure white against the band's cream, which
     reads as a soft plate under the artwork rather than as a seam; that is
     why they keep frame="open" on /pemf instead of gaining a bordered one. */
  radiationSources: {
    src: "/images/sources-of-radiation.png",
    alt: "An arc of the radiation spectrum from power and telephony at the low-energy end through radio, microwaves, infra-red, visible light and UV to X-rays and gamma rays, with everyday devices placed along it, captioned: Common sources of radiation. Where do mobile phones fit?",
    contain: true,
  },
  magnetPoles: {
    src: "/images/magnet-poles.png",
    alt: "Four bar magnets with green south and red north poles, showing like poles repel and opposite poles attract",
    contain: true,
  },
  /** Dusk meadow under a magenta aurora -- Earth's field made visible.
   *  Took the mimics-earth-field.svg diagram's place in the /pemf "PEMF
   *  Technology for Wellness Use" band on 2026-08-27, on the reasoning that
   *  /pemf already carries three globe-and-field-lines diagrams above that
   *  band and a fourth read as repetition. The client reversed that on
   *  2026-08-30: the band is about PEMF mimicking Earth's field, and the
   *  document's own captioned image says so where a meadow photograph only
   *  suggests it. Still in use as the /healthy-lifestyle teaser image on the
   *  home page, which is the job it does well. */
  earthFieldAurora: {
    src: "/images/earth-field-aurora.jpg",
    alt: "A magenta aurora arcing over a meadow and a winding stream at dusk",
  },
  /* word/media/image16, restored on 2026-08-30 at the client's request over
     the wellness-practices.svg redraw. Note the shape change this brings: the
     redraw was 760x560, near the 4/3 of the media slot it sits in, while the
     original is 431x473 and portrait, so it letterboxes rather than filling
     the slot. Its ground is near-white and the slot's is --sand, so those
     bars are visible -- checked on screen in both places it renders (the
     /holistic-health definition grid and the home page teaser card) and left
     as bars: padding the file out to 4/3 would mean inventing 200px of empty
     margin, and every practice label is burnt in, so `contain` is required
     and cropping to fill is not available. */
  wellnessPractices: {
    src: "/images/wellness-practices.png",
    alt: "Twelve wellness practices in three labelled groups. Physical: restorative sleep, nourishing foods, hydration, movement and exercise. Mental: practicing gratitude, meaningful connections, time in nature, mindful presence. Emotional: supportive relationships, intentional rest, personal growth, inner reflection",
    contain: true,
  },
  /* The document's own file (word/media/image15), and the file the deleted
     mimics-earth-field.svg redraw stood in for. It carries the /pemf "PEMF
     Technology for Wellness Use" band, restored there on 2026-08-30 at the
     client's request -- see earthFieldAurora above for what it displaced and
     why. It was briefly added to the /holistic-health "PEMF for Wellness"
     section earlier the same day, from a misreading of which wellness section
     was meant; that placement is reverted, not merely superseded. The caption
     is burnt into the image, so `contain` is required and the alt text
     repeats it. */
  pemfMimicsEarthField: {
    src: "/images/pemf-mimics-earth-field.png",
    alt: "Earth in space ringed by looping magnetic field lines, captioned: PEMF Mimics Earth Magnetic Field",
    contain: true,
  },
  /* word/media/image17, restored on 2026-08-30 at the client's request over
     the eight-dimensions.svg redraw. Unlike wellnessPractices above this one
     drops in cleanly: its ground is #FAF8F1, within a shade of --cream, so it
     sits on the /holistic-health section ground with no visible edge. The
     eight descriptions are burnt in and set small, which is why the page caps
     it at its own 712px rather than letting it upscale into a wider track. */
  eightDimensions: {
    src: "/images/eight-dimensions.png",
    alt: "Wheel of the eight dimensions of wellness, each with a description: environmental, spiritual, social, physical, intellectual, vocational, emotional and financial",
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
  /* The document's own file (word/media/image21), restored at the client's
     request on 2026-08-30 in place of the energy-battery.svg redraw. The
     original is 324x256; padded to 341x256 by repeating its own edge columns
     so it fills the 4/3 media slot exactly. Without that it letterboxes
     against --sand, and its ground is an opaque teal, not a cut-out. */
  energeticVsTired: {
    src: "/images/energetic-vs-tired.png",
    alt: "A tired man trudging beneath an empty battery icon beside an energetic man leaping with his arms up beneath a full battery icon",
  },
  /* The document's own file (word/media/image22), restored at the client's
     request on 2026-08-30 in place of the brainwave-entrainment.svg redraw.
     Its ground is the same opaque #000001 as the three sports icons below,
     so `dark` paints the media slot to match and the letterboxing from its
     227x164 frame disappears. `contain` is required, not cosmetic: the
     caption is burnt into the image, and `cover` would crop it. That burnt-in
     caption is also why the alt text repeats it -- a screen reader gets
     nothing from the pixels. */
  brainwaveEntrainment: {
    src: "/images/mental-training.png",
    alt: "A glowing blue brain, captioned: Mental training (Brain Wave Entrainment)",
    contain: true,
    dark: true,
  },
  /** The three sports icons are the document's own files (word/media
   *  image23-25), restored at the client's request on 2026-08-28 in place of
   *  the SVG redraws. All three have an opaque near-black (#000001) ground,
   *  so `dark` paints the media slot to match and they read edge-to-edge. */
  passiveWarmup: {
    src: "/images/passive-warmup.png",
    alt: "A heat-map figure of a warming body beside a rising arrow, representing passive warm-up",
    contain: true,
    dark: true,
  },
  rejuvenation: {
    src: "/images/rejuvenation.png",
    alt: "A figure jumping inside a circular arrow, representing rejuvenation after physical activity",
    contain: true,
    dark: true,
  },
  performance: {
    src: "/images/performance.png",
    alt: "A figure sprinting over a speedometer, representing enhanced athletic performance",
    contain: true,
    dark: true,
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
  // Pulled off /pets-health on 2026-08-30 at the client's request. Kept here
  // rather than deleted, on the same reasoning as heroMatFireplace above: it
  // is one of the document's own images, so the entry and its file stay
  // available to be placed again. Not currently on any page.
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
  // Manufacturer product renders from the Swiss Bionic iMRS prime page,
  // captured 2026-08-29 alongside docs/imrs-prime-swissbionic.txt.
  imrsControlPanel: {
    src: "/images/imrs-control-panel.png",
    alt: "The iMRS prime control panel: a touchscreen tablet on an aluminum stand",
  },
  imrsConnectorBox: {
    src: "/images/imrs-connector-box.png",
    alt: "The hexagonal iMRS prime connector box with applicator jacks on each side",
  },
  exagonMat: {
    src: "/images/exagon-mat.png",
    alt: "The Exagon Mat whole-body applicator, foldable in three segments",
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
  // Client-supplied 2026-08-29, replacing the biomimetic-earth.svg diagram.
  // Source file is 385x172 with baked-in "PEMF" caption text, so it must not
  // be cropped.
  biomimeticEarth: {
    src: "/images/pemf-earth-field.png",
    alt: "Earth in space ringed by pulsed electromagnetic field lines, captioned PEMF: Pulsed Electro Magnetic Fields",
    contain: true,
  },
  wechatQr: { src: "/images/wechat-qr.png", alt: "WeChat QR code", contain: true },
} satisfies Record<string, Img>;
