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
import { blurFor } from "@/lib/content/blur";

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
        {/* The hero is three siblings rather than one container, so the
            photograph between them can run to both viewport edges: it has to
            escape max-w-6xl and px-5, and no negative margin can do that at
            desktop widths the way -mx-5 did on phones. This block and the one
            below it re-establish the container on either side of it.

            Asymmetric padding, client request 2026-08-29: the wordmark sat a
            full py-16 below the sticky header, which read as a gap rather than
            as breathing room. The top is tightened and the bottom left alone,
            so the hero still separates from the section beneath it -- the
            pb-16/lg:pb-20 half of that now lives on the third block. */}
        <div className="mx-auto max-w-6xl px-5 pt-6 text-center lg:pt-8">
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
            /* Reduced from clamp(3rem, 8vw, 5.5rem) on 2026-08-31, client
               asking for it "down significantly". That computed to 121px on a
               desktop and 63px on a phone, about 1.7x the h1 on every other
               page, and it was flat from 1512px up because 8vw hit the 5.5rem
               ceiling there.

               Pointing at --step-h1 rather than restating its clamp: the
               client's chosen size IS the site's h1 scale, so naming the token
               says why the number is what it is and keeps the two from drifting
               apart if the heading scale is ever retuned again (it was raised
               across the board on 2026-08-29). Now 71px on desktop, 52px on a
               phone.

               Still a local override, so the /designs comps keep the full-size
               --step-wordmark that .u-wordmark was built for. */
            style={{ ["--step-wordmark" as string]: "var(--step-h1)" }}
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
        </div>
          {/* No plate around the photograph, client request 2026-08-29: the
              bordered white frame and its 12px padding are gone, so the image
              sits directly on the cream ground and carries the block itself.
              Same open treatment SplitBand's frame="open" uses elsewhere. */}
        {/* Full bleed at EVERY width, client request 2026-08-31, extending the
            2026-08-30 phone-only version: the photograph now runs to both
            viewport edges on desktop too, with no margin either side. The
            corners are square at every width for the same reason they were
            square on phones -- a rounded corner against the screen edge is
            what made it read as a card floating in the cream rather than as
            the hero -- so the old sm:rounded-2xl is gone rather than kept for
            desktop.

            sm and up: no crop, no height cap. The photograph is shown whole
            at its natural 16:9. It shipped earlier on 2026-08-31 with
            lg:h-[60vh] and object-cover, the client saw it live and asked for
            the whole frame back. Consequence, accepted deliberately: on a
            1920px monitor the hero is about 1081px tall, so it fills the
            screen and the buttons and the pitch sit below the fold on
            essentially every desktop. Do not reintroduce a cap here to "fix"
            that -- it is the thing that was asked for, twice.

            Below sm: h-[32vh] with object-cover, client request 2026-08-31.
            Width is already 100vw on a phone, so "bigger" has only one lever
            left, and it is height -- which necessarily crops, because the
            source is wide. 32vh is not a round number, it is the measured
            ceiling. At 390x844 it renders 270px against a natural 220px
            (1.23x) while still showing 81% of the frame's width, which keeps
            her feet at one edge and the tablet at the other. Both are the
            point of the photograph -- it is a mat with a control unit. 36vh
            already clips the tablet to a sliver and 40vh cuts the feet off
            outright; both were rendered at 390x844 and looked at before this
            number was chosen. Raise it and you lose the ends of the frame.

            NOTE, because an earlier version of this comment said the opposite
            and it is wrong: cropping does NOT help sharpness. With
            object-cover in a full-width box the scale factor is driven by
            WIDTH -- 1920/1000 = 1.92x at a 1920px viewport -- whether the
            image is cropped or not. Cropping removes rows; it changes no
            scale. Displayed width is the only lever on blur, which is why the
            crop above is free on a phone (390px wide against a 1000px file is
            a downscale even at 3x device pixel ratio) and why nothing here
            can fix the desktop softness described below.

            The resolution cost is real, was flagged before this shipped, and
            the client chose full bleed over sharpness with the tradeoff in
            front of them. imrs-model-3.png is 1000x563 and is the sharpest frame of this shot
            the client has supplied -- the document's own copy (word/media
            image1, the heroMatFireplace file) is 721x338, smaller still. Full
            bleed therefore upscales about 1.4x at 1440px and 1.9x at 1920px,
            the same territory that got the 721px banner replaced here on
            2026-08-28. A sharper original from the client is the only fix;
            nothing in code recovers detail that is not in the file.

            sizes="100vw" was already correct and needs no change. */}
        <div className="mt-8">
          <Image
            src={images.imrsModel3.src}
            {...blurFor(images.imrsModel3.src)}
            alt={images.imrsModel3.alt}
            priority
            width={1000}
            height={563}
            sizes="100vw"
            className="h-[32vh] w-full object-cover sm:h-auto"
          />
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-16 text-center lg:pb-20">
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

      <Section id="anatomy" title={holisticAnatomy.title}>
        {/* Same 55/45 image-favouring split as SplitBand (2026-08-28, larger
            images) -- this is the one image/text band not built on that shell. */}
        <div className="grid items-center gap-10 md:grid-cols-[11fr_9fr]">
          <div className="u-plate p-3">
            <Image
              src={images.organFunctions.src}
              {...blurFor(images.organFunctions.src)}
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
