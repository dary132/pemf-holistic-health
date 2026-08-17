/**
 * Page content, kept out of app/page.tsx so that file stays layout.
 * Source: "Website Exiga Jasmin 2026.docx" (see docs/).
 */

export const holisticAspects = [
  { title: "Physical", text: "Vibrant energy, stamina, and the body's natural balance." },
  { title: "Mental", text: "Clarity, focus, quick thinking, problem-solving, and memory." },
  { title: "Emotional", text: "Awareness and healthy management of feelings and moods." },
  { title: "Intellectual", text: "Curiosity, lifelong learning, creativity, and adaptability." },
  { title: "Social", text: "Building and maintaining healthy, effective relationships." },
  { title: "Spiritual", text: "A sense of purpose, values, and beliefs that give life meaning." },
];

export const energyBenefits = [
  {
    title: "Increased Alertness and Focus",
    text: "Feel more awake, sharp, and focused on the task at hand.",
  },
  {
    title: "Greater Motivation and Productivity",
    text: "Be more inclined to start and complete tasks, prepared to tackle anything.",
  },
  {
    title: "Improved Mood and Enthusiasm",
    text: "High energy levels correlate with feeling enthusiastic, fun-loving, and sociable.",
  },
  {
    title: "Physical Vitality",
    text: "Feel vibrant and ready to move, with more stamina and power in performance.",
  },
];

export const sportsBenefits = [
  {
    image: "/images/passive-warmup.png",
    title: "Passive Warm-Up",
    text: "Combining active and passive warm-up with PEMF offers a faster, more comprehensive approach.",
  },
  {
    image: "/images/rejuvenation.png",
    title: "Rejuvenation",
    text: "The iMRS Prime accelerates rejuvenation after physical activity, so you can train harder, perform better, and compete more often.",
  },
  {
    image: "/images/performance.png",
    title: "Enhanced Performance",
    text: "A safe, efficient, and comprehensive holistic approach towards enhanced performance and endurance.",
  },
];

/** Benefits of adequate sleep. New in the 2026 document. */
export const sleepBenefits = [
  {
    title: "Memory Consolidation",
    text: "Your brain organizes newly acquired information while you sleep, turning short-term memories into long-term ones, which aids in learning.",
  },
  {
    title: "Sharper Focus",
    text: "Enhances attention span, creativity, and problem-solving abilities, keeping you productive and safe throughout the day.",
  },
  {
    title: "Emotional Stability",
    text: "Sleep keeps the brain's emotional center from overreacting to daily stressors. Deep sleep results in calming effects.",
  },
];

/* ============================ PRODUCTS ============================ */

export type CardContent = {
  image: string;
  title: string;
  body: string;
  /** Tailwind aspect ratio for the image well. Defaults to 4/3. */
  imageAspect?: string;
  /** Artwork with baked-in text or a cut-out subject needs `contain`. */
  imageFit?: "cover" | "contain";
};

/** Exagon applicators and modules for the iMRS Prime. */
export const exagonAccessories: CardContent[] = [
  {
    image: "/images/exagon-fir.png",
    title: "Exagon FIR",
    body: "The world's first and only flexible hybrid applicator, and the most advanced holistic PEMF applicator technology to date.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-pad.png",
    title: "Exagon Pad",
    body: "The local applicator, for stimulating specific areas of the body.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-spot.png",
    title: "Exagon Spot",
    body: "The punctual applicator, for stimulating one precise spot.",
    imageAspect: "aspect-[16/5]",
    imageFit: "contain",
  },
  {
    image: "/images/exagon-split-mode.png",
    title: "Split Mode",
    body: "The world's first PEMF system allowing two stand-alone applications from a single control unit. Perfect for a couple to use at the same time.",
  },
  {
    image: "/images/exagon-sense.png",
    title: "Exagon Sense",
    body: "A biofeedback sensor for wellbeing purposes, giving dynamic intensity adjustment during a PEMF application.",
  },
  {
    image: "/images/exagon-brain-goggles.png",
    title: "Exagon Brain",
    body: "Also known as the Spa for the Mind. Photic, chromatic, and audible Brainwave Entrainment for deeper brain relaxation.",
  },
];

/**
 * Smart Pulser frequency zones, transcribed from the Spectrum of Vitality
 * graphic rather than shipped as an image so the text stays readable and searchable.
 */
export const frequencyZones = [
  {
    range: "0.5–4 Hz",
    name: "Deep Recovery Zone",
    body: "Mirrors the Delta brainwave state: the frequency of deep, restorative sleep and physical regeneration. Ideal for use at night.",
  },
  {
    range: "4–8 Hz",
    name: "Relaxation Zone",
    body: "Mirrors the Theta state. Perfect for stress reduction, meditation, and finding your inner calm after a demanding day.",
  },
  {
    range: "7.83 Hz",
    name: "Earth Resonance",
    body: "The heartbeat of the Earth. This frequency is the sweet spot for general balance, helping harmonize the body's various systems.",
  },
  {
    range: "8–12 Hz",
    name: "Active Alpha Zone",
    body: "Supports a state of relaxed alertness. Ideal for morning sessions, to bridge the gap between sleep and a productive day.",
  },
  {
    range: "12–25 Hz",
    name: "Vitality Zone",
    body: "Corresponds with Beta rhythms. These higher frequencies support physical performance, mental clarity, and daytime energy levels.",
  },
];

/** Smart Pulser technology cards. */
export const smartPulserFeatures: CardContent[] = [
  {
    image: "/images/coils-fiber-vs-copper.png",
    title: "Inductive Fiber Coils",
    body: "Discover the world's first PEMF system featuring groundbreaking Inductive Fiber Coil Technology, a step beyond conventional solid copper coils.",
    // Side-by-side comparison: cropping to 4/3 would cut off one of the coils.
    imageAspect: "aspect-[16/9]",
    imageFit: "contain",
  },
  {
    image: "/images/biomimetic-earth.jpg",
    title: "Biomimetic Frequencies",
    body: "The Smart Pulser uses an extremely low frequency window to deliver Biomimetic Frequencies of Earth: signals your body recognizes and responds to. Mimicking these natural electromagnetic pulses helps ground your biological system against the chaotic high-frequency electro-smog of modern life, promoting stress reduction and relaxation.",
  },
];

/** Products the 2026 document no longer lists, kept available on the page. */
export const alsoAvailable: CardContent[] = [
  {
    image: "/images/omnium-on-the-go.jpg",
    title: "PEMF on the Go",
    body: "A full-size PEMF wellness system on the go. Enjoy whole-body sessions at home, in the office, or outdoors.",
  },
  {
    image: "/images/imrs-consultation.jpg",
    title: "Swiss Bionic Solutions",
    body: "Premium Swiss-engineered PEMF systems for home use, backed by certified consultation and personal support.",
  },
];

/* ============================ ANIMALS ============================ */

export const animalCards: CardContent[] = [
  {
    image: "/images/pemf-dog-pad.png",
    title: "PEMF in Progress",
    body: "Dog knows PEMF is good for his health and wellness, and settles onto the applicator on his own.",
  },
  {
    // Cut-out group on white: contain keeps the whole line-up in frame.
    image: "/images/pets-group.png",
    title: "Pets",
    body: "Pets appreciate PEMF. They love to be on the mat for relaxation, and look forward to the next session.",
    imageFit: "contain",
  },
  {
    image: "/images/show-animals.png",
    title: "Show Animals",
    body: "Non-invasive and soothing for show and sanctuary animals alike, promoting a general sense of calm.",
    imageFit: "contain",
  },
];

export const racehorseCards: CardContent[] = [
  {
    image: "/images/horse-area-applicator.png",
    title: "Area Applicator",
    body: "Hands-free coils position around the horse without restraint, covering large areas of the body at once.",
  },
  {
    image: "/images/horse-leg-applicator-2026.png",
    title: "Leg Applicator",
    body: "Targeted coils wrap the legs, the hardest-working part of a racehorse in training.",
  },
];

/** Benefits of the hands-free technique, from the 2026 racehorse page. */
export const racehorseBenefits = [
  "Achieve optimal health",
  "Warm-up exercise",
  "Performance enhancement",
  "Excellent endurance",
];

export const videos = [
  { videoId: "WyqVIM6O3II", title: "What is PEMF?", credit: "Bryant Meyers" },
  { videoId: "Et8VJ3psSF8", title: "Why Do We Need PEMF?", credit: "Swiss Bionic Solutions" },
  { videoId: "2_O_3D4P4Bg", title: "Dr. Oz & Pain Specialist Dr. Dillard Talk on PEMF", credit: "Dr. Oz" },
];
