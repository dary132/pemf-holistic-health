import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/components/Section";
import { VideoEmbed } from "@/components/VideoEmbed";
import { site } from "@/lib/site";

const holisticAspects = [
  { title: "Physical", text: "Vibrant energy, stamina, and the body's natural balance." },
  { title: "Mental", text: "Clarity, focus, quick thinking, problem-solving, and memory." },
  { title: "Emotional", text: "Awareness and healthy management of feelings and moods." },
  { title: "Intellectual", text: "Curiosity, lifelong learning, creativity, and adaptability." },
  { title: "Social", text: "Building and maintaining healthy, effective relationships." },
  { title: "Spiritual", text: "A sense of purpose, values, and beliefs that give life meaning." },
];

const fdaMilestones = [
  { year: "1979", label: "Bone Growth" },
  { year: "1991", label: "Post-Op Pain" },
  { year: "1998", label: "Urinary Incontinence" },
  { year: "2004", label: "Risk of Non-Cervical Fusion" },
  { year: "2006", label: "Depression" },
  { year: "2011", label: "Brain Cancer" },
];

const energyBenefits = [
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

const sportsBenefits = [
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

const products = [
  {
    image: "/images/imrs-prime-set.jpg",
    name: "iMRS Prime",
    text: "Intelligent Magnetic Resonance Stimulation, the most advanced and comprehensive PEMF technology for wellness use in the world.",
  },
  {
    image: "/images/omnium-on-the-go.jpg",
    name: "PEMF on the Go",
    text: "A full-size PEMF wellness system on the go. Enjoy whole-body sessions at home, in the office, or outdoors.",
  },
  {
    image: "/images/imrs-consultation.jpg",
    name: "Swiss Bionic Solutions",
    text: "Premium Swiss-engineered PEMF systems for home use, backed by certified consultation and personal support.",
  },
];

const videos = [
  { videoId: "WyqVIM6O3II", title: "What is PEMF?", credit: "Bryant Meyers" },
  { videoId: "Et8VJ3psSF8", title: "Why Do We Need PEMF?", credit: "Swiss Bionic Solutions" },
  { videoId: "2_O_3D4P4Bg", title: "Dr. Oz & Pain Specialist Dr. Dillard Talk on PEMF", credit: "Dr. Oz" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="home">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-brand-dark text-white">
          <Image
            src="/images/hero-mat-home.jpg"
            alt="Whole-body PEMF mat session at home"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/60 to-brand-dark/25"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
            <p className="text-accent-light tracking-widest uppercase text-sm mb-4">
              Pulsed Electro Magnetic Field
            </p>
            <h1 className="font-display text-4xl sm:text-6xl leading-tight max-w-3xl">
              PEMF: A Holistic Approach to Health and Wellness
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/95 leading-relaxed">
              Still feeling stressed out? Low energy? Not sleeping well? Nothing else seems to work
              anymore? Try adding a holistic approach by laying on the PEMF whole-body mat.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.phoneHref}
                className="rounded-full bg-accent px-8 py-3.5 font-medium text-white hover:brightness-110 transition"
              >
                Book an Appointment · {site.phone}
              </a>
              <a
                href="#pemf"
                className="rounded-full border border-white/40 px-8 py-3.5 font-medium text-white hover:bg-white/10 transition"
              >
                Learn About PEMF
              </a>
            </div>
            <p className="mt-6 text-base text-white/85">
              Office and home visits available · Lake Forest, CA
            </p>
          </div>
        </section>

        {/* ============ PEMF ============ */}
        <Section
          id="pemf"
          eyebrow="PEMF for a Healthy Lifestyle"
          title="The 5th Element of Health"
          intro="Air, food, water, sunshine, and Earth's magnetic field energy are natural essentials for human health. But Earth's magnetic field is weakening and electro-smog is increasing. PEMF mimics Earth's natural magnetic field energy for general health and wellness."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <figure className="rounded-xl overflow-hidden border border-brand/10 bg-white shadow-sm">
              <Image
                src="/images/magnetosphere.jpg"
                alt="Earth's magnetosphere shielding the planet from solar radiation"
                width={800}
                height={450}
                className="w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-base text-ink-soft">
                Our Earth&apos;s magnetic field shields us from radiation.{" "}
                <span className="text-sm">Credit: National Geographic</span>
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden border border-brand/10 bg-white shadow-sm">
              <Image
                src="/images/solar-wind.jpg"
                alt="Solar wind interacting with Earth's magnetic field"
                width={800}
                height={450}
                className="w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-base text-ink-soft">
                A weakening magnetic field impacts life on Earth.{" "}
                <span className="text-sm">Credit: Curious Minds</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h3 className="font-display text-2xl text-brand-dark">
                Why is Earth&apos;s Magnetic Field Vital?
              </h3>
              <p className="mt-3 text-ink-soft leading-relaxed">
                The Earth&apos;s magnetic field creates a protective shield, the magnetosphere, that
                protects us from harmful solar and cosmic radiation. It is an essential environmental
                factor for human existence, supporting and protecting all life on Earth.
              </p>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Electromagnetic force is the fundamental power train of our Earth and an inevitable
                source of energy and vitality for our sense of wellness. PEMF utilizes the
                electromagnetic spectrum to help retain our overall well-being.
              </p>
            </div>
            <Image
              src="/images/em-spectrum.jpg"
              alt="The electromagnetic spectrum from ionizing to non-ionizing radiation"
              width={800}
              height={420}
              className="w-full rounded-xl border border-brand/10 shadow-sm"
            />
          </div>

          {/* FDA timeline */}
          <div className="mt-14 rounded-2xl bg-brand-dark text-white p-8 sm:p-10">
            <h3 className="font-display text-2xl">FDA-Approved PEMF Applications</h3>
            <p className="mt-2 text-base text-white/85 max-w-2xl">
              PEMF technology has been FDA-approved for specific medical applications over the
              decades. In 2014, Health Canada approved iMRS PEMF for increased blood circulation and
              relief of aches and pains.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {fdaMilestones.map((m) => (
                <div key={m.year} className="border-l-2 border-accent pl-3">
                  <p className="font-display text-xl text-accent-light">{m.year}</p>
                  <p className="text-base text-white/90 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mt-14">
            <h3 className="font-display text-2xl text-brand-dark mb-6">Watch and Learn</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {videos.map((v) => (
                <VideoEmbed key={v.videoId} {...v} />
              ))}
            </div>
          </div>
        </Section>

        {/* ============ HOLISTIC HEALTH ============ */}
        <Section
          id="holistic-health"
          eyebrow="Whole-Person Wellness"
          title="PEMF for Holistic Health"
          intro="Holistic health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being. Imbalances in one area can affect the others. PEMF is a holistic approach to promote a state of total wellness."
          tinted
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <Image
              src="/images/holistic-flower.png"
              alt="Six petals of holistic health: physical, mental, emotional, intellectual, social, spiritual"
              width={640}
              height={640}
              className="w-full max-w-md mx-auto"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {holisticAspects.map((a) => (
                <div key={a.title} className="rounded-xl bg-white border border-brand/10 p-5 shadow-sm">
                  <p className="font-display text-lg text-brand-dark">{a.title}</p>
                  <p className="mt-1.5 text-base text-ink-soft leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ============ QI ENERGY ============ */}
        <Section
          id="qi-energy"
          eyebrow="Vitality"
          title="PEMF Enhances Qi Energy"
          intro="Try this holistic approach using the PEMF system to enhance your Qi energy, stamina, and power, and you will feel the difference."
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {energyBenefits.map((b) => (
                <div key={b.title} className="rounded-xl bg-white border border-brand/10 p-5 shadow-sm">
                  <p className="font-medium text-brand-dark">{b.title}</p>
                  <p className="mt-1.5 text-base text-ink-soft leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
            <Image
              src="/images/energy-battery.png"
              alt="Illustration of low energy recharged to full energy"
              width={640}
              height={480}
              className="w-full max-w-md mx-auto rounded-xl"
            />
          </div>
        </Section>

        {/* ============ SLEEP ============ */}
        <Section
          id="sleep"
          eyebrow="Rest & Recharge"
          title="PEMF Promotes Good Sleep"
          intro="PEMF is a non-invasive, non-addictive, drug-free approach for promoting better sleep. Sleep allows your body and mind to recharge, leaving you refreshed and alert when you wake up."
          tinted
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <Image
              src="/images/pemf-mat-session.jpg"
              alt="Relaxing whole-body PEMF mat session"
              width={800}
              height={520}
              className="w-full rounded-xl shadow-sm object-cover"
            />
            <div>
              <p className="text-ink-soft leading-relaxed">
                PEMF helps you relax, unwind, and put your mind at rest. Fall asleep faster and enjoy
                better quality and quantity of sleep. Wake up less often during the night.
              </p>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Deep sleep is crucial for physical and mental rejuvenation, and a foundation of
                holistic wellness.
              </p>
            </div>
          </div>
        </Section>

        {/* ============ MENTAL HEALTH ============ */}
        <Section
          id="mental-health"
          eyebrow="Spa for the Mind"
          title="PEMF Improves Mental Acuity"
          intro="Brain health is a vital component of overall well-being. Intelligent Magnetic Resonance Stimulation PEMF with Brainwave Entrainment is a safe, non-invasive, non-addictive, affordable application to improve mental acuity and learning ability, promoting brain health and wellness."
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center mb-12">
            <Image
              src="/images/exagon-brain.jpg"
              alt="Brainwave entrainment session with light and sound headset"
              width={800}
              height={520}
              className="w-full rounded-xl shadow-sm object-cover"
            />
            <div>
              <h3 className="font-display text-2xl text-brand-dark">Brainwave Entrainment</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">
                A holistic experience for the brain, also known as a Spa for the Mind. Brainwave
                Entrainment reduces stress, resulting in relaxation, calm, and ease. It supports
                clear thinking, coping with stress, and achieving your goals.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white border border-brand/10 p-7 shadow-sm">
              <div className="flex items-center gap-4">
                <Image src="/images/stress-meter.png" alt="Stress level illustration" width={72} height={72} className="rounded-lg" />
                <h3 className="font-display text-xl text-brand-dark">PEMF Helps Manage Stress</h3>
              </div>
              <p className="mt-4 text-base text-ink-soft leading-relaxed">
                Stress is a natural response to perceived or real challenges. Choose a holistic
                approach using PEMF as your healthy coping mechanism. It is safe, effective, non-invasive,
                and non-addictive. Use it anytime in the comfort of your own home or office.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-brand/10 p-7 shadow-sm">
              <div className="flex items-center gap-4">
                <Image src="/images/relax-poolside.jpg" alt="Relaxing poolside PEMF session" width={72} height={72} className="rounded-lg object-cover h-[72px]" />
                <h3 className="font-display text-xl text-brand-dark">PEMF for Relaxation</h3>
              </div>
              <p className="mt-4 text-base text-ink-soft leading-relaxed">
                Relaxation is the state of being calm, comfortable, and free from stress. PEMF can be
                effective for relaxation within minutes, aiding your body in returning to a calm and
                balanced state, improving sleep, mood, focus, and emotional well-being.
              </p>
            </div>
          </div>
        </Section>

        {/* ============ SPORTS ============ */}
        <Section
          id="sports"
          eyebrow="Performance & Endurance"
          title="PEMF Enhances Athletic Performance"
          intro="Within elite and mass sports, iMRS Prime PEMF is an effective tool to promote holistic wellness for performance and endurance enhancement for anyone who works out or is in training. Combined with Brainwave Entrainment, it enhances visualization, mindfulness, focus, and reaction times."
          tinted
        >
          <div className="grid gap-6 md:grid-cols-3">
            {sportsBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white border border-brand/10 p-7 shadow-sm text-center">
                <Image
                  src={b.image}
                  alt={b.title}
                  width={96}
                  height={96}
                  className="mx-auto rounded-xl"
                />
                <h3 className="mt-4 font-display text-xl text-brand-dark">{b.title}</h3>
                <p className="mt-2 text-base text-ink-soft leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ============ ANIMALS ============ */}
        <Section
          id="animals"
          eyebrow="For Every Companion"
          title="PEMF for Animals"
          intro="iMRS Fauna PEMF for animals is a non-invasive tool shown to promote well-being in various animal species, at home or in zoos and sanctuaries. Many animals experience PEMF as soothing, promoting a sense of calm."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <figure className="rounded-xl overflow-hidden bg-white border border-brand/10 shadow-sm">
              <Image
                src="/images/pemf-pets.jpg"
                alt="Puppy, kitten, and rabbit"
                width={640}
                height={420}
                className="w-full object-cover aspect-[4/3]"
              />
              <figcaption className="px-4 py-3 text-base text-ink-soft">
                <span className="font-medium text-brand-dark block">PEMF for Pets</span>
                Pets love to be on the PEMF mat for relaxation, and they always look forward to the
                next session.
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden bg-white border border-brand/10 shadow-sm">
              <Image
                src="/images/horse-body-applicator.jpg"
                alt="Horse with stress-free PEMF body applicator"
                width={640}
                height={420}
                className="w-full object-cover aspect-[4/3]"
              />
              <figcaption className="px-4 py-3 text-base text-ink-soft">
                <span className="font-medium text-brand-dark block">Stress-Free Body Applicator</span>
                Many animals tolerate the stress-free PEMF technique and benefit from PEMF.
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden bg-white border border-brand/10 shadow-sm">
              <Image
                src="/images/racehorses.jpg"
                alt="Racehorses in competition"
                width={640}
                height={420}
                className="w-full object-cover aspect-[4/3]"
              />
              <figcaption className="px-4 py-3 text-base text-ink-soft">
                <span className="font-medium text-brand-dark block">PEMF for Racehorses</span>
                Supports conditioning, stamina, and training, with proper warm-ups, gradual
                workloads, and sufficient rest.
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* ============ PRODUCTS ============ */}
        <Section
          id="products"
          eyebrow="Wellness Systems"
          title="Intelligent Magnetic Resonance Stimulation PEMF"
          intro="The most advanced and comprehensive PEMF technology for wellness use in the world, engineered by Swiss Bionic Solutions."
          tinted
        >
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl overflow-hidden bg-white border border-brand/10 shadow-sm flex flex-col">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={640}
                  height={420}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="p-6 flex flex-col grow">
                  <h3 className="font-display text-xl text-brand-dark">{p.name}</h3>
                  <p className="mt-2 text-base text-ink-soft leading-relaxed grow">{p.text}</p>
                  <a
                    href={site.phoneHref}
                    className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-dark transition-colors"
                  >
                    Learn More · Text / Call / WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
