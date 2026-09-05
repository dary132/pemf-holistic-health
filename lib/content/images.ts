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
  /* The three pictures from "Edit PEMF for Holistic Health Page.docx"
     (word/media image2-4), client-supplied 2026-09-04 for the three
     "PEMF - Holistic Approach" cards on /holistic-health -- "added image to
     make it colorful on cellphone", in the document's own words. None of
     them is in the Exiga Jasmin 2026 document. The two diagrams have their
     labels burnt in on a white ground, so `contain`; the stones photograph
     has no text and is 3:2, so it is left to `cover` the 4/3 slot rather
     than sit in bars, losing a sliver of sky and sea at either side. It is
     also only 257px wide, which the card slot upscales about 1.4x; a larger
     copy has been requested from the client. */
  /* The six-petal flower for the top block of /holistic-health. The client's
     2026-09-04 edit document carries the Exiga Jasmin document's flat teal
     flower (word/media image2, the file holistic-flower.svg above once
     redrew); the site owner supplied this colour version of the same
     diagram on 2026-09-04 to stand in for it -- one colour per petal, same
     six labels, same icons. 1024px square on a #FEFEFE ground with the
     labels and centre title burnt in, so `contain`, and shown inside a white
     plate so the ground has no visible edge. */
  holisticHealthFlower: {
    src: "/images/holistic-health-flower.png",
    alt: "Flower diagram of the six aspects of holistic health, one colour per petal: physical, mental, social, spiritual, intellectual and emotional",
    contain: true,
  },
  holisticMindBodySpirit: {
    src: "/images/holistic-mind-body-spirit.png",
    alt: "Mind, body and spirit joined by circling arrows, captioned: Holistic Health = Total Wellbeing",
    contain: true,
  },
  holisticBalanceStones: {
    src: "/images/holistic-balance-stones.png",
    alt: "A stack of stones balanced on a beach, with the sea and sky behind",
  },
  holisticSixDimensionsWheel: {
    src: "/images/holistic-six-dimensions-wheel.png",
    alt: "Six-segment colour wheel of the dimensions of holistic health: emotional, intellectual, social, spiritual, environmental and physical",
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
  /* Client-supplied 2026-08-31, replacing the 540x356 copy extracted from the
     document (word/media image13, see scripts/extract-images.py). Same chart,
     2048x1397 -- 3.8x the linear resolution, which matters more here than on
     almost any other image on the site: this one is dense burnt-in text and
     hairline arrows, and at 540px the device labels around the arc were
     unreadable at the size the panel renders them.

     The filename differs from the old one deliberately. /_next/image caches
     per SOURCE URL, so replacing the bytes at the same path serves the old
     pixels straight back -- the trap that cost real time on stress-meter.png.
     A new path is the fix; the old file is deleted rather than orphaned.

     contain:true is kept rather than switching to the padded-to-4/3 + cover
     treatment most panel art uses, because the panel beside it (magnetPoles)
     is also contained white-ground art. Padding only this one would give the
     row two different fits. */
  radiationSources: {
    src: "/images/sources-of-radiation-hires.jpg",
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
  /* Unplaced since 2026-09-04, when the client's edit document replaced the
     whole of /holistic-health. Kept like eightDimensions below: the client's
     own artwork, and this entry is the record of it. */
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
  /* The wheel alone, cut from eight-dimensions.png for the home page's
     /holistic-health teaser card on 2026-08-30. That card had been showing
     wellnessPractices, which is portrait and letterboxed against --sand in a
     4/3 card slot -- the same mismatch that moved it to its own figure on the
     page itself.

     Built rather than cropped by CSS because neither fit works on the full
     diagram: `cover` slices 105px off the sides and leaves the outer
     descriptions cut mid-word, `contain` letterboxes. The wheel is a circle,
     so it is pasted through a circular mask -- its bounding square's corners
     hold whatever sits behind it, which is the nearest label text -- onto a
     4/3 canvas filled with the diagram's own #FAF8F1 ground. The result fills
     the slot edge to edge with no bars and no cut words, and the eight
     descriptions it drops were unreadable at card size anyway. */
  eightDimensionsWheel: {
    src: "/images/eight-dimensions-wheel.png",
    alt: "Wheel of the eight dimensions of wellness: environmental, spiritual, social, physical, intellectual, vocational, emotional and financial",
  },
  /* Unplaced since 2026-08-31. It was the "PEMF for Wellness" section on
     /holistic-health, moved to the top of /mental-health when that became the
     Wellness page, then removed at the client's request the same day. Kept
     rather than deleted, like heroMatFireplace and imrsFaunaHorses: it is the
     client's own artwork and the entry is the record of it. Note that its
     original section on /holistic-health no longer exists, so replacing it
     means choosing a home. */
  eightDimensions: {
    src: "/images/eight-dimensions.png",
    alt: "Wheel of the eight dimensions of wellness, each with a description: environmental, spiritual, social, physical, intellectual, vocational, emotional and financial",
    contain: true,
  },
  exagonBrainBanner: {
    src: "/images/exagon-brain-banner.png",
    alt: "A woman reclining while wearing the Exagon Brain brainwave entrainment goggles",
  },
  /* The document's own file (word/media/image19), put on the /mental-health
     "PEMF Helps Manage Stress" panel on 2026-08-30 at the client's request,
     over the stress-meter.svg redraw that stood in for it.

     The extracted file carries a two-pixel column of solid red down its right
     edge -- a sliver of something else in the document's layout, not part of
     the illustration. It rendered as a hairline down the panel and is cropped
     off here; found on screen, since no checker looks at pixels. The file is
     renamed rather than corrected in place for the reason essentialWater
     records above: /_next/image caches optimised variants per source URL, and
     reusing stress-meter.png served the uncropped copy -- red hairline and all
     -- straight back after the fix.

     That leaves 584x433, a hair wider than the 4/3 media slot, padded to
     584x438 by repeating the first and last rows rather than cropping the
     1.5% that `cover` would take off the sides -- the potted plant sits about
     1% in from the left edge. Row replication rather than a flat fill because
     the two edges are not the same colour: the top is the illustration's
     white field, the bottom carries the grey ground and the black blob. */
  stressMeter: {
    src: "/images/stress-gauge.png",
    alt: "A person pushing the needle of a large stress gauge down from red through orange towards green, with the word STRESS across the dial",
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
  /* Client-supplied 2026-08-30 for the /pets-health "Show Animals" panel,
     over the animal-show photograph that was there. Unlike everything else
     restored today this is not a document file: it is artwork the client had
     generated, standing in for the document's own cartoon zoo collage, whose
     "PEMF is good 4 us" caption it reproduces.

     Supplied at 1024x1024 with most of that white margin. Trimmed to the
     artwork's own bounding box (920x593) and then padded back to 920x690, so
     the 4/3 slot spends its height on the animals rather than on the
     generator's padding. Ends at an exact 4/3, which is what lets it fit on
     `cover` with nothing cropped -- and nothing may be cropped here, because
     the caption is burnt into the picture. */
  showAnimals: {
    src: "/images/show-animals.png",
    alt: "A group of cartoon animals -- an arctic fox, platypus, chameleon, badger, okapi, ostrich, deer, penguin, meerkat, monkey, flamingo and boar -- holding a sign reading: PEMF is Good 4 US",
  },
  pemfDogPad: {
    src: "/images/pemf-dog-pad.png",
    alt: "A dog lying on a PEMF pad",
  },
  /* word/media/image29, put on the /pets-health "Pets" panel on 2026-08-30 at
     the client's request, over the stock retriever-and-budgie photograph that
     was there. The original is 355x281 on a pure white studio ground; padded
     to 375x281 with that same white so it meets the 4/3 media slot exactly.
     Flat white is safe here where the energetic-vs-tired cartoon needed its
     edge columns repeated -- this ground is a uniform #FFFFFF, not a
     gradient. Without the pad it either letterboxes against --sand or, on
     `cover`, crops about 15px off the height, which is where the paws and the
     ferret sit. Deliberately NOT `contain` once padded: TriPanel insets a
     contained image by p-1, which drew a thin sand frame around this panel
     that the two cover-fitted photographs beside it do not have. At an exact
     4/3 the two fits are the same picture, so `cover` is the one that matches
     its neighbours. */
  petsGroup: {
    src: "/images/pets-group.png",
    alt: "A group of pets photographed together: a great dane, a macaw, a ferret, a tabby cat, a black rabbit, two kittens and a bird",
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
  exagonPad: {
    src: "/images/exagon-pad.png",
    alt: "The Exagon Pad applicator",
    contain: true,
  },
  exagonSpot: {
    src: "/images/exagon-spot.png",
    alt: "The Exagon Spot applicator",
    contain: true,
  },
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
  wechatQr: {
    src: "/images/wechat-qr.png",
    alt: "WeChat QR code",
    contain: true,
  },
} satisfies Record<string, Img>;
