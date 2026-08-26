import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { ScrimHero } from "@/components/designs/photographic/ScrimHero";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Photographic() {
  return (
    <main id="main">
      <ScrimHero
        image={images.heroMatFireplace}
        wordmark={hero.wordmark}
        expansion={hero.expansion}
      />

      {/* Opening copy in a narrow centred column beneath the hero. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-24">
          <h2>{hero.title}</h2>
          <span className="u-accent-rule mx-auto" />
          {hero.paragraphs.map((p) => (
            <p key={p} className="mt-6 text-xl leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PhoneButton />
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* Alternating full-bleed image band with the text block overlapping up
          into it. The negative margin is the direction's signature.
          holisticFlower is a square (640x640) diagram with labelled points,
          and images.holisticFlower.contain === true: at this band's ~4.3:1
          aspect, object-cover would zoom in ~2.25x and slice labels mid-word.
          object-contain honours the flag and keeps the band full-bleed; the
          bg-sand fill on the band itself (not the whole section, so the
          cream/sand alternation with the section below is unaffected) is the
          same "sensible background behind a contained image" treatment
          u-plate-media already uses for teaser cards below. */}
      <section>
        <div className="h-[22rem] w-full bg-sand">
          <Image
            src={images.holisticFlower.src}
            alt={images.holisticFlower.alt}
            width={640}
            height={640}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mx-auto -mt-20 max-w-4xl px-5">
          <div className="u-plate p-8 sm:p-12">
            <h2>{holisticApproach.title}</h2>
            <span className="u-accent-rule" />
            {holisticApproach.paragraphs.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src={images.holisticAnatomy.src}
              alt={images.holisticAnatomy.alt}
              width={800}
              height={600}
              className="w-full rounded-3xl"
            />
            <div>
              <h2>{holisticAnatomy.title}</h2>
              <span className="u-accent-rule" />
              {holisticAnatomy.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Large images, generous radius, text below, two columns. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center">Explore</h2>
          <span className="u-accent-rule mx-auto" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {teasers.map((t) => (
              <article key={t.href}>
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  width={800}
                  height={500}
                  className={`aspect-[8/5] w-full rounded-3xl ${
                    t.image.contain ? "object-contain" : "object-cover"
                  }`}
                />
                <h3 className="mt-6 text-2xl">
                  <Link href={t.href}>{t.title}</Link>
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
