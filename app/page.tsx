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
      {/* Hero, stacked in the order the client asked for: the PEMF wordmark
          in technicolor, its expansion beneath it, then the IMRS Model 3
          photograph, then the opening question and the two calls to action.
          The photograph still gets its own full-width band rather than
          sitting behind the headline — the client's original request. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 pt-16 text-center">
          <h1 className="u-wordmark u-technicolor">{hero.wordmark}</h1>
          <p className="mx-auto mt-5 max-w-none text-xl font-bold uppercase tracking-[0.16em] text-clay sm:text-2xl">
            {hero.expansion}
          </p>
        </div>

        {/* Deliberately no caption: the document contains no sentence describing
            this photograph, and the FDA-exposure copy rule forbids inventing one.
            images.imrsModel3.alt already carries the description for screen readers. */}
        <Figure image={images.imrsModel3} priority />

        <div className="mx-auto max-w-6xl px-5 pb-16 text-center">
          <h2>{hero.title}</h2>
          {hero.paragraphs.map((p) => (
            <p key={p} className="mx-auto mt-6 max-w-[62ch] text-xl text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
