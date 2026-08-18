import Link from "next/link";
import { Card } from "@/components/Card";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Figure } from "@/components/Figure";
import { PhoneButton } from "@/components/PhoneButton";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export default function Home() {
  return (
    <main id="main">
      {/* Text-first hero. The document's only hero image is the IMRS Model 3
          photograph, which the client asked to be shown in its own section
          rather than behind the headline — see the Figure directly below. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-base font-bold uppercase tracking-[0.14em] text-clay">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[18ch] text-4xl sm:text-5xl">{hero.title}</h1>
          {hero.paragraphs.map((p) => (
            <p key={p} className="mt-6 max-w-[62ch] text-xl text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-4">
            <PhoneButton />
            <Link
              href="/pemf"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-sage px-8 text-lg font-bold text-sage no-underline hover:bg-sand"
            >
              What is PEMF?
            </Link>
          </div>
        </div>
      </section>

      {/* Deliberately no caption: the document contains no sentence describing
          this photograph, and the FDA-exposure copy rule forbids inventing one.
          images.imrsModel3.alt already carries the description for screen readers. */}
      <Figure image={images.imrsModel3} tinted />

      <SplitBand
        image={images.holisticFlower}
        title={holisticApproach.title}
        paragraphs={holisticApproach.paragraphs}
      />

      <SplitBand
        image={images.holisticAnatomy}
        title={holisticAnatomy.title}
        paragraphs={holisticAnatomy.paragraphs}
        reverse
        tinted
      />

      <Section id="explore" title="Explore">
        <div className="grid gap-8 md:grid-cols-2">
          {teasers.map((t) => (
            <Card
              key={t.href}
              image={t.image.src}
              alt={t.image.alt}
              title={t.title}
              body={t.body}
              href={t.href}
              imageAspect="aspect-[16/9]"
              imageFit={t.image.contain ? "contain" : "cover"}
            />
          ))}
        </div>
      </Section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
