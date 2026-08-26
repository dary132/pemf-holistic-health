import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { NumberedSection } from "@/components/designs/editorial/NumberedSection";
import { PullQuote } from "@/components/designs/editorial/PullQuote";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Editorial() {
  return (
    <main id="main">
      {/* Hero: wordmark hard left at display size, photograph bleeding off the
          right edge of the viewport. The asymmetry is the direction's whole
          signature -- do not centre this while "tidying". */}
      <section className="bg-cream">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="mx-auto w-full max-w-3xl px-5 pt-16 lg:pl-[max(1.25rem,calc((100vw-72rem)/2))] lg:pt-24">
            {/* No alignment class needed: .u-wordmark is display:inline-block and sets
                no text-align of its own -- the live hero centres it via a parent
                `text-center`, and this parent has none, so it sits left. */}
            <h1 className="u-wordmark u-technicolor">{hero.wordmark}</h1>
            <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-clay sm:text-2xl">
              {hero.expansion}
            </p>
            <h2 className="mt-10">{hero.title}</h2>
            <span className="u-accent-rule" />
            {hero.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-xl text-ink-soft">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4 pb-16">
              <PhoneButton />
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
              >
                Visit Us
              </Link>
            </div>
          </div>
          {/* Bleeds right: no max-width, no rounded right corner, and --
              unlike Clinical's bordered u-plate on the right, which is
              padded and centred inside a max-w-6xl container -- nothing
              boxes this photograph in. It is sized at its own 721x338
              aspect ratio (the actual source dimensions) rather than forced
              to fill the row's full height: the row's height is set by the
              text column, and stretching a wide, short photo to match a
              ~700px-tall cell forced object-cover to zoom in ~2x and crop
              the frame down to a headless torso. Letting the image keep its
              own proportions shows the whole photograph, vertically
              centred by the grid's `items-center`, next to the text. */}
          <div>
            <Image
              src={images.heroMatFireplace.src}
              alt={images.heroMatFireplace.alt}
              priority
              width={721}
              height={338}
              className="w-full rounded-l-3xl"
            />
          </div>
        </div>
      </section>

      <NumberedSection n="01" id="approach" title={holisticApproach.title}>
        {/* Editorial's own idiom for a diagram: borderless, a hairline rule
            underneath rather than Clinical's bordered u-plate, and sized by
            object-contain since images.holisticFlower.contain === true --
            it is a square diagram with labelled points, and cropping it
            would slice a label. */}
        <div className="grid gap-10 sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-start">
          <div>
            <Image
              src={images.holisticFlower.src}
              alt={images.holisticFlower.alt}
              width={640}
              height={640}
              className="w-full object-contain"
            />
            <span className="mt-5 block h-px w-full bg-rule" />
          </div>
          <div>
            {holisticApproach.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </NumberedSection>

      <PullQuote text="PEMF is a holistic approach to promote a state of total wellness." />

      <NumberedSection n="02" id="anatomy" title={holisticAnatomy.title}>
        <div className="grid gap-10 sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-start">
          <div>
            <Image
              src={images.holisticAnatomy.src}
              alt={images.holisticAnatomy.alt}
              width={700}
              height={460}
              className="w-full object-contain"
            />
            <span className="mt-5 block h-px w-full bg-rule" />
          </div>
          <div>
            {holisticAnatomy.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </NumberedSection>

      {/* Borderless cards: image, hairline rule, title, body. Two columns,
          wide gutters. No plate, no shadow -- the rule does the work. */}
      <NumberedSection n="03" id="explore" title="Explore">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {teasers.map((t) => (
            <article key={t.href}>
              <Image
                src={t.image.src}
                alt={t.image.alt}
                width={800}
                height={450}
                className={`aspect-[16/9] w-full rounded-2xl ${
                  t.image.contain ? "object-contain" : "object-cover"
                }`}
              />
              <span className="mt-5 block h-px w-full bg-rule" />
              <h3 className="mt-5 text-xl">
                <Link href={t.href}>{t.title}</Link>
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{t.body}</p>
            </article>
          ))}
        </div>
      </NumberedSection>

      <CTA />
      <Disclaimer />
    </main>
  );
}
