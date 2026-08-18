import Image from "next/image";
import Link from "next/link";
import { Banner, Card } from "@/components/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import {
  animalCards,
  energyBenefits,
  racehorseBenefits,
  racehorseCards,
  sleepBenefits,
  sportsBenefits,
} from "@/lib/content";

export const metadata = pageMetadata({
  title: "PEMF Benefits: Sleep, Stress, Energy, Sports & Pets",
  description:
    "How PEMF supports sleep, mental clarity, energy, athletic recovery, and pets. A holistic, non-invasive approach for home or office.",
  path: "/benefits",
});

export default function BenefitsPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Benefits", path: "/benefits" },
        ]}
      />

      <Section
        id="overview"
        eyebrow="Whole-Person Wellness"
        title="The Benefits of PEMF"
        titleAs="h1"
        intro="Holistic health treats the physical, mental, emotional, social, and spiritual as interconnected, because an imbalance in one shows up in the others. These are the areas people most often come to us about."
      >
        <p className="max-w-3xl leading-relaxed text-ink-soft">
          If you want the mechanism first, start with{" "}
          <Link href="/what-is-pemf" className="text-brand underline hover:text-brand-dark">
            how PEMF works
          </Link>
          .
        </p>
      </Section>

      {/* ============ SLEEP ============ */}
      <Section
        id="sleep"
        eyebrow="Rest & Recharge"
        title="PEMF for Better Sleep"
        intro="PEMF is a non-invasive, non-addictive, drug-free approach for promoting better sleep. Sleep allows your body and mind to recharge, leaving you refreshed and alert when you wake up."
        tinted
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/sleep-mat-tablet.png"
            alt="Restful PEMF mat session guided from the control unit"
            width={800}
            height={520}
            className="w-full rounded-xl object-cover shadow-sm"
          />
          <div>
            <p className="leading-relaxed text-ink-soft">
              PEMF helps you relax, unwind, and put your mind at rest. Fall asleep faster and enjoy
              better quality and quantity of sleep. Wake up less often during the night.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
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
        title="PEMF for Mental Health, Stress and Relaxation"
        intro="Brain health is a vital component of overall well-being. Intelligent Magnetic Resonance Stimulation PEMF with Brainwave Entrainment is a safe, non-invasive, non-addictive, affordable application to improve mental acuity and learning ability."
      >
        <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/exagon-brain.jpg"
            alt="Brainwave entrainment session with light and sound headset"
            width={800}
            height={520}
            className="w-full rounded-xl object-cover shadow-sm"
          />
          <div>
            <h3 className="font-display text-2xl text-brand-dark">Brainwave Entrainment</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              A holistic experience for the brain, also known as a Spa for the Mind. Brainwave
              Entrainment reduces stress, resulting in relaxation, calmness, and ease. It supports
              clear thinking, coping with stress, and achieving your goals. It is delivered through
              the{" "}
              <Link href="/products" className="text-brand underline hover:text-brand-dark">
                Exagon Brain module on the iMRS Prime
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/images/stress-meter.png"
                alt="Stress level illustration"
                width={72}
                height={72}
                className="rounded-lg"
              />
              <h3 className="font-display text-xl text-brand-dark">PEMF Helps Manage Stress</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Stress is a natural response to perceived or real challenges. Choose a holistic
              approach using PEMF as your healthy coping mechanism. It is safe, effective,
              non-invasive, and non-addictive. Use it anytime in the comfort of your own home or
              office.
            </p>
          </div>
          <div className="rounded-2xl border border-brand/10 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/images/relax-poolside.jpg"
                alt="Relaxing poolside PEMF session"
                width={72}
                height={72}
                className="h-[72px] rounded-lg object-cover"
              />
              <h3 className="font-display text-xl text-brand-dark">PEMF for Relaxation</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Relaxation is the state of being calm, comfortable, and free from stress. PEMF can be
              effective for relaxation within minutes, aiding your body in returning to a calm and
              balanced state, improving sleep, mood, focus, and emotional well-being.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ ENERGY ============ */}
      <Section
        id="energy"
        eyebrow="Vitality"
        title="PEMF for Energy and Vitality"
        intro="Try this holistic approach using the PEMF system to enhance your energy, stamina, and power, and you will feel the difference."
        tinted
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {energyBenefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-brand/10 bg-white p-5 shadow-sm"
              >
                <p className="font-medium text-brand-dark">{b.title}</p>
                <p className="mt-1.5 text-base leading-relaxed text-ink-soft">{b.text}</p>
              </div>
            ))}
          </div>
          <Image
            src="/images/energy-battery.png"
            alt="Illustration of low energy recharged to full energy"
            width={640}
            height={480}
            className="mx-auto w-full max-w-md rounded-xl"
          />
        </div>
      </Section>

      {/* ============ SPORTS ============ */}
      <Section
        id="sports"
        eyebrow="Performance & Endurance"
        title="PEMF for Sports Performance and Recovery"
        intro="Within elite and mass sports, iMRS Prime PEMF is an effective tool to promote holistic wellness for performance and endurance enhancement for anyone who works out or is in training. Combined with Brainwave Entrainment, it enhances visualization, mindfulness, focus, and reaction times."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {sportsBenefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-brand/10 bg-white p-7 text-center shadow-sm"
            >
              <Image
                src={b.image}
                alt={b.title}
                width={96}
                height={96}
                className="mx-auto rounded-xl"
              />
              <h3 className="mt-4 font-display text-xl text-brand-dark">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{b.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl leading-relaxed text-ink-soft">
          Athletes generally work with{" "}
          <Link href="/products" className="text-brand underline hover:text-brand-dark">
            the iMRS Prime and its Exagon applicators
          </Link>
          , which target specific areas after training.
        </p>
      </Section>

      {/* ============ PETS ============ */}
      <Section
        id="pets"
        eyebrow="For Every Companion"
        title="PEMF for Pets and Animals"
        intro="iMRS Fauna PEMF for animals is a non-invasive tool shown to promote well-being in various animal species. Many animals experience PEMF as soothing, promoting a sense of calm, and tolerate the stress-free technique well."
        tinted
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
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
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

      <CTA />
    </main>
  );
}
