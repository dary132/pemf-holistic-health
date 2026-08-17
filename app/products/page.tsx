import Image from "next/image";
import Link from "next/link";
import { Banner, Card, FrequencyCard } from "@/components/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { pageMetadata, productSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  alsoAvailable,
  exagonAccessories,
  frequencyZones,
  productFaqs,
  smartPulserFeatures,
} from "@/lib/content";

export const metadata = pageMetadata({
  title: "PEMF Systems: iMRS Prime & Smart Pulser",
  description:
    "iMRS Prime with Exagon applicators and the Smart Pulser. Swiss-engineered extremely low frequency PEMF wellness systems for home and office.",
  path: "/products",
});

const learnMore = { href: site.phoneHref, label: "Learn More · Text / Call / WhatsApp" };

/** Heading that opens a product family. */
function FamilyHeading({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="mb-6 border-t border-brand/15 pt-8">
      <h2 className="font-display text-2xl text-brand-dark sm:text-3xl">{name}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{tagline}</p>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />

      <Section
        id="products"
        eyebrow="Wellness Systems"
        title="PEMF Systems for Home and Office"
        titleAs="h1"
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
            <p className="leading-relaxed text-ink-soft">
              Extremely low frequency and low intensity PEMF for wellness, with manual operation,
              fast start programs, program mode, split mode, iGUIDE, and hybrid application all
              driven from one control unit.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Most often chosen by people focused on{" "}
              <Link
                href="/benefits#sports"
                className="text-brand underline hover:text-brand-dark"
              >
                training and recovery
              </Link>{" "}
              or on{" "}
              <Link
                href="/benefits#mental-health"
                className="text-brand underline hover:text-brand-dark"
              >
                stress and mental clarity
              </Link>
              .
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
            <p className="leading-relaxed text-ink-soft">
              The Smart Pulser helps you move effortlessly between rest, balance, and peak
              performance, using the world&apos;s first Inductive Fiber Coil Technology.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              A common starting point for people whose priority is{" "}
              <Link href="/benefits#sleep" className="text-brand underline hover:text-brand-dark">
                sleep and winding down
              </Link>
              .
            </p>
            <a
              href={learnMore.href}
              className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {learnMore.label}
            </a>
          </div>
        </div>

        <h3 className="mt-12 font-display text-2xl text-brand-dark">Spectrum of Vitality</h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">
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

      <FAQ heading="Common questions about our PEMF systems" items={productFaqs} />
      <CTA />

      <JsonLd
        data={[
          productSchema({
            name: "iMRS Prime",
            description:
              "The world's only 6-dimensional PEMF wellness system, with the full Exagon applicator range including FIR, Pad, Spot, Sense and Brain.",
            image: "/images/imrs-prime-modes.jpg",
          }),
          productSchema({
            name: "Smart Pulser",
            description:
              "Affordable benchmark PEMF system for home or travel, built on Inductive Fiber Coil Technology and operating between 0.5 and 25 Hz.",
            image: "/images/smart-pulser-set.png",
          }),
        ]}
      />
    </main>
  );
}
