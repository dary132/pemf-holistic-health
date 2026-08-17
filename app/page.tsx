import Image from "next/image";
import { Section } from "@/components/Section";
import { Banner, Card, FrequencyCard } from "@/components/Card";
import { site } from "@/lib/site";
import {
  alsoAvailable,
  exagonAccessories,
  frequencyZones,
  holisticAspects,
  smartPulserFeatures,
} from "@/lib/content";

const learnMore = {
  href: site.phoneHref,
  label: "Learn More · Text / Call / WhatsApp",
};

/** Heading that opens a product family inside the Products section. */
function FamilyHeading({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="mb-6 border-t border-brand/15 pt-8">
      <h3 className="font-display text-2xl text-brand-dark sm:text-3xl">
        {name}
      </h3>
      <p className="mt-2 max-w-2xl text-ink-soft leading-relaxed">{tagline}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main id="home">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src="/images/hero-mat-home.jpg"
          alt="Whole-body PEMF mat session at home"
          fill
          priority
          className="object-cover object-[70%_center] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/45 to-brand-dark/5"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-52 sm:py-32">
          <p className="text-accent-light tracking-widest uppercase text-sm mb-4">
            Pulsed Electro Magnetic Field
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-tight max-w-3xl">
            PEMF: A Holistic Approach to Health and Wellness
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/95 leading-relaxed">
            Still feeling stressed out? Low energy? Not sleeping well? Nothing
            else seems to work anymore? Try adding a holistic approach by laying
            on the PEMF whole-body mat.
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
              <div
                key={a.title}
                className="rounded-xl bg-white border border-brand/10 p-5 shadow-sm"
              >
                <p className="font-display text-lg text-brand-dark">
                  {a.title}
                </p>
                <p className="mt-1.5 text-base text-ink-soft leading-relaxed">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ PRODUCTS ============ */}
      <Section
        id="products"
        eyebrow="Wellness Systems"
        title="PEMF Systems for Home and Office"
        intro="The most advanced and comprehensive PEMF technology for wellness use in the world, engineered by Swiss Bionic Solutions. Two systems, each built around extremely low frequency and low intensity."
        tinted
      >
        {/* ---- iMRS Prime ---- */}
        <FamilyHeading
          name="iMRS Prime"
          tagline="The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing. The world's only 6-dimensional PEMF wellness system."
        />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image
            src="/images/imrs-prime-modes.jpg"
            alt="The iMRS Prime set: control unit, whole-body mat, applicators, and operating modes"
            width={900}
            height={500}
            className="w-full rounded-2xl border border-brand/10 bg-white shadow-sm"
          />
          <div>
            <p className="text-ink-soft leading-relaxed">
              Extremely low frequency and low intensity PEMF for wellness, with
              manual operation, fast start programs, program mode, split mode,
              iGUIDE, and hybrid application all driven from one control unit.
            </p>
            <a
              href={learnMore.href}
              className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {learnMore.label}
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Banner
            image="/images/brainwave-poolside.png"
            alt="Brainwave Entrainment session on a lounger beside a pool"
            caption="Brainwave Entrainment: a holistic experience for the mind."
            aspect="aspect-[16/9] sm:aspect-[3/1]"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exagonAccessories.map((a) => (
            <Card key={a.title} {...a} />
          ))}
        </div>

        {/* ---- Smart Pulser ---- */}
        <div className="mt-16">
          <FamilyHeading
            name="Smart Pulser"
            tagline="Total Body Optimization with Excellence. The new, affordable global benchmark PEMF for use at home or abroad."
          />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image
            src="/images/smart-pulser-set.png"
            alt="The Smart Pulser set: whole-body mat, control unit, power supply, and carry bag"
            width={900}
            height={520}
            className="w-full rounded-2xl border border-brand/10 bg-white shadow-sm"
          />
          <div>
            <p className="text-ink-soft leading-relaxed">
              The Smart Pulser helps you move effortlessly between rest,
              balance, and peak performance, using the world&apos;s first
              Inductive Fiber Coil Technology.
            </p>
            <a
              href={learnMore.href}
              className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {learnMore.label}
            </a>
          </div>
        </div>

        <h4 className="mt-12 font-display text-2xl text-brand-dark">
          Spectrum of Vitality
        </h4>
        <p className="mt-2 max-w-3xl text-ink-soft leading-relaxed">
          Within this narrow, powerful range and its circadian alignment,
          different frequencies support different states of well-being.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {frequencyZones.map((z) => (
            <FrequencyCard key={z.range} {...z} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {smartPulserFeatures.map((f) => (
            <Card key={f.title} {...f} />
          ))}
          <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm">
            <h3 className="font-display text-xl text-brand-dark">
              Why Low Frequency is High Impact
            </h3>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
              In the world of holistic PEMF, less is always more. High-frequency
              radiation, like Wi-Fi or cellular signals, can be stressful to the
              body. The Smart Pulser stays strictly within the risk-free
              Extremely Low Frequency (ELF) range.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              By operating between 0.5 and 25 Hz, the energy delivered is
              gentle, non-invasive, and tuned to the natural windows of cellular
              communication. It is not about overwhelming the body with power,
              but supporting it with resonance.
            </p>
          </div>
        </div>

        {/* ---- Also available ---- */}
        <div className="mt-16">
          <FamilyHeading
            name="Also Available"
            tagline="Additional systems and support from your certified PEMF consultant."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {alsoAvailable.map((p) => (
            <Card
              key={p.title}
              image={p.image}
              title={p.title}
              body={p.body}
              cta={learnMore}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
