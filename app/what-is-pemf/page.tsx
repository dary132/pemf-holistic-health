import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { VideoEmbed } from "@/components/VideoEmbed";
import { pageMetadata } from "@/lib/seo";
import { pemfFaqs, videos } from "@/lib/content";

export const metadata = pageMetadata({
  title: "What is PEMF?",
  description:
    "How Pulsed Electro Magnetic Field technology mimics Earth's natural magnetic field energy, and why that field matters for everyday wellness.",
  path: "/what-is-pemf",
});

export default function WhatIsPemfPage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "What is PEMF", path: "/what-is-pemf" },
        ]}
      />

      <Section
        id="pemf"
        eyebrow="PEMF for a Healthy Lifestyle"
        title="What is PEMF?"
        titleAs="h1"
        intro="PEMF stands for Pulsed Electro Magnetic Field. Air, food, water, sunshine, and Earth's magnetic field energy are natural essentials for human health. But Earth's magnetic field is weakening and electro-smog is increasing. PEMF mimics Earth's natural magnetic field energy for general health and wellness."
      >
        <Image
          src="/images/essentials-strip.png"
          alt="The natural essentials for health: air, food, water, sunshine, and Earth's magnetic field energy"
          width={1200}
          height={260}
          className="w-full rounded-xl border border-brand/10 bg-white p-3 shadow-sm"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-brand/10 bg-white shadow-sm">
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
          <figure className="overflow-hidden rounded-xl border border-brand/10 bg-white shadow-sm">
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

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-brand-dark">
              Why is Earth&apos;s Magnetic Field Vital?
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              The Earth&apos;s magnetic field creates a protective shield, the magnetosphere, that
              protects us from harmful solar and cosmic radiation. It is an essential environmental
              factor for human existence, supporting and protecting all life on Earth.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
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

        <div className="mt-14">
          <h2 className="mb-6 font-display text-2xl text-brand-dark">Watch and Learn</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((v) => (
              <VideoEmbed key={v.videoId} {...v} />
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-3xl leading-relaxed text-ink-soft">
          Once the mechanism makes sense, the useful question is what it changes day to day. Read{" "}
          <Link href="/benefits" className="text-brand underline hover:text-brand-dark">
            what PEMF supports day to day
          </Link>
          , or look at{" "}
          <Link href="/products" className="text-brand underline hover:text-brand-dark">
            the systems we work with
          </Link>
          .
        </p>
      </Section>

      <FAQ heading="Common questions about PEMF" items={pemfFaqs} />
      <CTA />
    </main>
  );
}
