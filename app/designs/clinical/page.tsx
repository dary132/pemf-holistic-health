import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { Section } from "@/components/Section";
import { CredentialStrip } from "@/components/CredentialStrip";
import { PlateCard } from "@/components/PlateCard";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Clinical() {
  return (
    <main id="main">
      {/* Two-column hero: everything a visitor reads on the left, the
          photograph in a bordered plate on the right. No bleed anywhere in
          this direction -- consistent margins are the point. */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[3fr_5fr] lg:gap-x-6 lg:py-24">
          <div>
            {/* No alignment class needed: .u-wordmark is display:inline-block and sets
                no text-align of its own -- the live hero centres it via a parent
                `text-center`, and this parent has none, so it sits left. */}
            <h1 className="u-wordmark u-technicolor">{hero.wordmark}</h1>
            <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-clay sm:text-2xl">
              {hero.expansion}
            </p>
            <h2 className="mt-8">{hero.title}</h2>
            <span className="u-accent-rule" />
            {hero.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-xl text-ink-soft">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <PhoneButton />
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
              >
                Visit Us
              </Link>
            </div>
          </div>
          <div className="u-plate p-3">
            <Image
              src={images.heroMatFireplace.src}
              alt={images.heroMatFireplace.alt}
              priority
              width={721}
              height={338}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <CredentialStrip />

      <Section id="approach" title={holisticApproach.title}>
        <div className="grid gap-8 md:grid-cols-3">
          {holisticApproach.paragraphs.map((p) => (
            <p key={p} className="u-plate p-6 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section id="anatomy" title={holisticAnatomy.title} tinted>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="u-plate p-3">
            <Image
              src={images.holisticAnatomy.src}
              alt={images.holisticAnatomy.alt}
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            {holisticAnatomy.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="explore" title="Explore">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teasers.map((t) => (
            <PlateCard
              key={t.href}
              image={t.image}
              title={t.title}
              body={t.body}
              href={t.href}
            />
          ))}
        </div>
      </Section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
