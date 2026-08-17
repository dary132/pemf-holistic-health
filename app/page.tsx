import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/components/Section";
import { Banner, Card, FrequencyCard } from "@/components/Card";
import { VideoEmbed } from "@/components/VideoEmbed";
import { site } from "@/lib/site";
import {
  alsoAvailable,
  animalCards,
  energyBenefits,
  exagonAccessories,
  frequencyZones,
  holisticAspects,
  racehorseBenefits,
  racehorseCards,
  sleepBenefits,
  smartPulserFeatures,
  sportsBenefits,
  videos,
} from "@/lib/content";

const learnMore = { href: site.phoneHref, label: "Learn More · Text / Call / WhatsApp" };

/** Heading that opens a product family inside the Products section. */
function FamilyHeading({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="mb-6 border-t border-brand/15 pt-8">
      <h3 className="font-display text-2xl text-brand-dark sm:text-3xl">{name}</h3>
      <p className="mt-2 max-w-2xl text-ink-soft leading-relaxed">{tagline}</p>
    </div>
  );
}

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
              src="/images/sleep-mat-tablet.png"
              alt="Restful PEMF mat session guided from the control unit"
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

          <h3 className="mt-14 mb-6 font-display text-2xl text-brand-dark">
            Benefits of Adequate Sleep
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {sleepBenefits.map((b) => (
              <Card key={b.title} title={b.title} body={b.text} />
            ))}
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
                Entrainment reduces stress, resulting in relaxation, calmness, and ease. It supports
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
          title="PEMF for Pets and Animals"
          intro="iMRS Fauna PEMF for animals is a non-invasive tool shown to promote well-being in various animal species. Many animals experience PEMF as soothing, promoting a sense of calm, and tolerate the stress-free technique well."
        >
          <Banner
            image="/images/imrs-fauna-horses.png"
            alt="Horses on open range under the iMRS Fauna banner"
            aspect="aspect-[2/1] sm:aspect-[4/1]"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {animalCards.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>

          <h3 className="mt-14 mb-6 font-display text-2xl text-brand-dark">PEMF for Racehorses</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Card {...racehorseCards[0]} />
            <div className="flex flex-col justify-center rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
              <h4 className="font-display text-xl text-brand-dark">Stress-Free Technique</h4>
              <p className="mt-2 text-base text-ink-soft leading-relaxed">
                Benefits of racehorses using hands-free Intelligent Magnetic Resonance Stimulation
                PEMF:
              </p>
              <ul className="mt-4 space-y-2">
                {racehorseBenefits.map((b) => (
                  <li key={b} className="flex gap-2.5 text-base text-ink-soft">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Card {...racehorseCards[1]} />
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
                Extremely low frequency and low intensity PEMF for wellness, with manual operation,
                fast start programs, program mode, split mode, iGUIDE, and hybrid application all
                driven from one control unit.
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
                The Smart Pulser helps you move effortlessly between rest, balance, and peak
                performance, using the world&apos;s first Inductive Fiber Coil Technology.
              </p>
              <a
                href={learnMore.href}
                className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
              >
                {learnMore.label}
              </a>
            </div>
          </div>

          <h4 className="mt-12 font-display text-2xl text-brand-dark">Spectrum of Vitality</h4>
          <p className="mt-2 max-w-3xl text-ink-soft leading-relaxed">
            Within this narrow, powerful range and its circadian alignment, different frequencies
            support different states of well-being.
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
                In the world of holistic PEMF, less is always more. High-frequency radiation, like
                Wi-Fi or cellular signals, can be stressful to the body. The Smart Pulser stays
                strictly within the risk-free Extremely Low Frequency (ELF) range.
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                By operating between 0.5 and 25 Hz, the energy delivered is gentle, non-invasive, and
                tuned to the natural windows of cellular communication. It is not about overwhelming
                the body with power, but supporting it with resonance.
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
              <Card key={p.title} image={p.image} title={p.title} body={p.body} cta={learnMore} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
