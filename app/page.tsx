import Link from "next/link";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { CredentialStrip } from "@/components/CredentialStrip";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { PlateCard } from "@/components/PlateCard";
import { Section } from "@/components/Section";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";
import { HeadingText, PEMF_LETTER_TOKENS } from "@/components/PemfWord";

export default function Home() {
  return (
    <main id="main">
      {/* Stacked hero, client request 2026-08-28, revised same day: the
          wordmark and its expansion sit ABOVE the photograph and smaller than
          the comps' full-bleed wordmark (client: "needs to sit above the image
          and be smaller"), then the photograph at full content width, the two
          action buttons, then the heading and pitch copy. The size override is
          local -- an inline --step-wordmark -- so the /designs comps keep the
          full-size wordmark .u-wordmark was built for.
          The photograph is imrs-model-3 (1000px, the recorded sharper fallback)
          rather than the 721px document banner, which would upscale past 2x at
          this width -- swapped with the user's approval alongside this layout.

          Deliberately no caption: the document contains no sentence describing
          this photograph, and the FDA-exposure copy rule forbids inventing one.
          images.imrsModel3.alt carries the description for screen readers. The
          declared width/height are the file's real dimensions so the browser
          reserves the right box and does not reflow on load. No data-reveal
          anywhere in here: the photograph is the page's LCP element, and the
          text above the fold should never wait on an animation. */}
      <section className="bg-cream">
        {/* Asymmetric padding, client request 2026-08-29: the wordmark sat a
            full py-16 below the sticky header, which read as a gap rather than
            as breathing room. The top is tightened and the bottom left alone,
            so the hero still separates from the section beneath it. */}
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 text-center lg:pb-20 lg:pt-8">
          {/* Per-letter colours, client request 2026-08-28: P purple, E green,
              M red, F blue -- replacing the seven-stop gradient here (only
              here; the /designs comps keep .u-technicolor). Each letter uses
              the existing --tc-* stop of that hue because those are already
              the brightest purple/green/red/blue that clear the 7:1 AAA floor
              on cream, registered in verify-contrast.mjs; a "purer" hue fails
              the floor. aria-label carries the word whole so screen readers
              announce "PEMF" rather than four spelled-out letters. */}
          <h1
            className="u-wordmark"
            aria-label={hero.wordmark}
            style={{ ["--step-wordmark" as string]: "clamp(3rem, 8vw, 5.5rem)" }}
          >
            {hero.wordmark.split("").map((letter, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  color: `var(${PEMF_LETTER_TOKENS[i % PEMF_LETTER_TOKENS.length]})`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          {/* mx-auto is what actually centres this line: the base stylesheet
              caps every p at max-width:65ch, so without it the box sits left
              in the centred container and only the text inside it centres. */}
          <p className="mx-auto mt-3 text-lg font-bold uppercase tracking-[0.16em] text-clay sm:text-xl">
            {hero.expansion}
          </p>
          {/* No plate around the photograph, client request 2026-08-29: the
              bordered white frame and its 12px padding are gone, so the image
              sits directly on the cream ground and carries the block itself.
              Same open treatment SplitBand's frame="open" uses elsewhere. */}
          {/* Full bleed on phones, client request 2026-08-30: inset by the
              container's px-5 and rounded on all four corners, the photograph
              read as a card floating in the cream rather than as the hero.
              -mx-5 cancels that padding so it runs to both viewport edges,
              and the corners are square while it does -- a rounded corner
              against the screen edge is what made it look like a card. Both
              revert at sm, where the container is wide enough that an inset
              image reads as deliberate rather than as a gap. Widening to the
              full viewport is also the "bigger" that was asked for: the
              aspect ratio is fixed, so width is the only lever, and it buys
              about 11% at 390px. sizes="100vw" was already correct for this
              and needs no change. */}
          <div className="-mx-5 mt-8 sm:mx-0">
            <Image
              src={images.imrsModel3.src}
              alt={images.imrsModel3.alt}
              priority
              width={1000}
              height={563}
              sizes="100vw"
              className="w-full sm:rounded-2xl"
            />
          </div>
          {/* The second button is the visit ask, not "What is PEMF?". The hero
              already tells a visitor what to do -- "Try adding a holistic
              approach by laying on the PEMF body mat" -- and the only other way
              to act on it is to phone. /contact is where the map, the address
              and the WeChat QR already live, so it is the page that answers
              "where do I go". /pemf is not orphaned by this: it is in the header
              nav, the footer nav, and the first Explore card below. */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PhoneButton />
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
            >
              Visit Us
            </Link>
          </div>
          {/* The pitch keeps the page-wide left-aligned treatment: centred
              multi-line paragraphs are harder for the elderly audience this
              site is sized for, so only the display block above is centred. */}
          <div className="mx-auto mt-12 max-w-3xl text-left">
            <h2>
            <HeadingText text={hero.title} />
          </h2>
            <span className="u-accent-rule" />
            {hero.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-xl text-ink-soft">
                {p}
              </p>
            ))}
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

      <Section id="anatomy" title={holisticAnatomy.title} tone="mist">
        {/* Same 55/45 image-favouring split as SplitBand (2026-08-28, larger
            images) -- this is the one image/text band not built on that shell. */}
        <div className="grid items-center gap-10 md:grid-cols-[11fr_9fr]">
          <div className="u-plate p-3">
            <Image
              src={images.organFunctions.src}
              alt={images.organFunctions.alt}
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
