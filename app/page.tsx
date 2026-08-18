import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";
import { holisticAspects, teasers } from "@/lib/content";

export const metadata: Metadata = {
  description: "Try adding a holistic approach by laying on the PEMF body mat.",
};

export default function Home() {
  return (
    <main id="main">
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
          <p className="mb-4 text-sm uppercase tracking-widest text-accent-light">
            Pulsed Electro Magnetic Field
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            PEMF: A Holistic Approach to Health and Wellness
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/95">
            Still feeling stressed out? Low energy? Not sleeping well? Nothing else seems to work
            anymore? Try adding a holistic approach by laying on the PEMF whole-body mat.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.phoneHref}
              className="rounded-full bg-accent px-8 py-3.5 font-medium text-white transition hover:brightness-110"
            >
              Book an Appointment · {site.phone}
            </a>
            <Link
              href="/what-is-pemf"
              className="rounded-full border border-white/40 px-8 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Learn About PEMF
            </Link>
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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/*
            The eight-dimensions wheel was the spec's suggestion, but its labels are
            unreadable at this size and it shows eight dimensions beside six cards.
            The flower matches the six aspects and stays legible.
          */}
          <Image
            src="/images/holistic-flower.png"
            alt="Six petals of holistic health: physical, mental, emotional, intellectual, social, spiritual"
            width={640}
            height={640}
            className="mx-auto w-full max-w-md"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {holisticAspects.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-brand/10 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-lg text-brand-dark">{a.title}</p>
                <p className="mt-1.5 text-base leading-relaxed text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ EXPLORE ============ */}
      <Section
        id="explore"
        eyebrow="Where to Start"
        title="Explore PEMF"
        intro="Whether you are trying to understand the science or work out which system fits your home, start here."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {teasers.map((t) => (
            <Card
              key={t.href}
              image={t.image}
              title={t.title}
              body={t.body}
              href={t.href}
              imageAspect="aspect-[16/9]"
            >
              <Link
                href={t.href}
                className="mt-4 inline-block font-medium text-brand hover:text-brand-dark"
              >
                {t.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
