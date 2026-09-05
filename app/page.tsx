import Link from "next/link";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { CredentialStrip } from "@/components/CredentialStrip";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { PlateCard } from "@/components/PlateCard";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { PanelGrid } from "@/components/TriPanel";
import { images } from "@/lib/content/images";
import {
  approach,
  approachBand,
  approachPanels,
  hero,
  holisticAnatomy,
  holisticHealth,
  teasers,
} from "@/lib/content/home";
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

               Then twice more the same day, ending here: the client asked
               for PEMF to be the SAME size as the Pulsed Electro Magnetic
               Field line under it, so the two now read as a single lockup
               rather than as a heading with a caption. 27.5px on desktop,
               23.6px on a phone -- the full arc today was 121 -> 71.5 -> 60.8
               -> 27.5.

               Then "slightly bigger" the same day, so the wordmark is now
               *1.3 of that shared step -- 36px against the expansion's 27.5px
               on desktop, 31px against 23.6px on a phone. Still expressed
               against --step-hero-lockup (globals.css) rather than as its own
               literal: the two are meant to stay in a fixed relationship, and
               a hardcoded pair would drift the first time either is nudged.
               1.3 is the only number, and it says what the relationship is.

               Worth knowing if this is ever revisited: the h1 is now smaller
               than every other heading on the site, h3 included, and only
               fractionally above body copy. That is a deliberate choice about
               this one lockup, not an oversight -- but it does mean the hero
               no longer has a large element, which is why the photograph
               beneath it carries the page. The two faces differ (Lora serif
               here, Nunito sans there), so equal font-size does not give
               identical cap heights; matching the SIZE is what was asked for
               and what this does.

               Still a local override, so the /designs comps keep the full-size
               --step-wordmark that .u-wordmark was built for. */
            style={{
              ["--step-wordmark" as string]:
                "calc(var(--step-hero-lockup) * 1.3)",
            }}
          >
            {hero.wordmark.split("").map((letter, i) => (
              <span
                key={i}
                aria-hidden="true"
                /* notranslate: same reason as in PemfWord.tsx -- with a
                   language cookie set, Google's widget respaced these four
                   spans as "P E M F" and, in Chinese, replaced them with a
                   transliteration in the first span's colour. */
                className="notranslate"
                translate="no"
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
          {/* leading-tight, 2026-08-31: this line inherits line-height 1.75
              from body copy, which is right for paragraphs and far too loose
              for the second line of a two-line display lockup. Measured, the
              leading was holding a 43px gap between the wordmark and this line
              -- nearly the 52px above the whole lockup -- so the two read as
              separate elements rather than as one unit. 1.25 closes that. It
              also tightens the wrap on phones, where this line breaks in two. */}
          {/* mt-0, client request 2026-09-02: "too much spacing" between the
              wordmark and this line. The mt-3 (16.5px) is gone; what remains
              is the ~7px of line-box slack the inline-block wordmark leaves
              beneath itself, which is enough to keep the descenders clear.
              Measured 23px box-to-box before, 7px after, at 1440 and 390. */}
          {/* Mixed case, client request 2026-09-02: this line was set in
              capitals from the start, and the client wants it written as the
              document writes it, "Pulsed Electro Magnetic Field". The
              0.16em tracking went with the capitals -- wide letter-spacing is
              a small-caps convention and reads as gappy on lower-case -- so
              it steps down to 0.04em, still a touch open so the line keeps
              its lockup feel beside the tracked wordmark. */}
          <p className="mx-auto mt-0 text-[length:var(--step-hero-lockup)] font-bold leading-tight tracking-[0.04em] text-clay">
            {hero.expansion}
          </p>
        </div>
        {/* No plate around the photograph, client request 2026-08-29: the
              bordered white frame and its 12px padding are gone, so the image
              sits directly on the cream ground and carries the block itself.
              Same open treatment SplitBand's frame="open" uses elsewhere. */}
        {/* 12px gutters at every width since 2026-09-04 (owner, after the
            desktop change below: "do the same for the mobile view"). Before
            that the photograph was full bleed -- client request 2026-08-31,
            extending the 2026-08-30 phone-only version -- running to both
            viewport edges with no margin either side. The
            corners are square at every width for the same reason they were
            square on phones -- a rounded corner against the screen edge is
            what made it read as a card floating in the cream rather than as
            the hero -- so the old sm:rounded-2xl is gone rather than kept for
            desktop.

            sm to lg: no crop, no height cap. The photograph is shown whole
            at its natural 16:9. It shipped earlier on 2026-08-31 with
            lg:h-[60vh] and object-cover, the client saw it live and asked for
            the whole frame back.

            lg and up: the photograph runs to 12px short of each viewport
            edge (as it now does at every width), with its height from the
            aspect ratio -- uncropped. Three owner requests on 2026-09-04 got here.
            First, "make it fully fit on the page when the user lands": full
            bleed was 810px tall at 1440 and 1081px at 1920, three scrolls to
            pass, so the photograph was capped to the viewport less the chrome
            above it. Seen live, that was small on shorter screens, and the
            follow-up was "expand it to the width of the page and scale it
            25% larger", which put it in the content container (27.5px
            gutters at 1440, capped at 1529px wide). Then "scale it a bit
            larger so there's minimal margin visible between the image and
            the ends of the page", which is this: a fixed 12px gutter, no
            width cap, so the gutter stays minimal on wide monitors too
            rather than growing past 1584px. Measured: 1416x797 at 1440,
            1896x1067 at 1920 -- within 2% of full bleed, so the "three
            scrolls" consequence is back on large monitors, by the owner's
            choice. Neither is the 2026-08-31 object-cover cap the client
            rejected: nothing is cropped. The upscale of the 1000px file is
            1.42x at 1440 and 1.9x at 1920, so the softness described below
            stands.

            Below sm: h-[32vh] with object-cover, client request 2026-08-31.
            Width was already 100vw on a phone (100vw less 24px since the
            gutters), so "bigger" has only one lever
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
        {/* mt-1. The client asked for the expansion line to sit almost
            touching the photograph, 2026-08-31 -- reversing the mt-8 -> mt-10
            widening made earlier the same day, once leading-tight had pulled
            the lockup together and the relationship read differently.

            The measured gap does not equal this margin: an inline line box
            carries descender space below the cap line, so mt-1 (5.5px) renders
            as roughly 13px of visible air. That is why this is mt-1 rather
            than mt-0 -- zero margin would still not touch, and going negative
            to close the last few pixels would clip the descenders on a font
            that has none here today but would the moment the copy changed. */}
        <div className="mt-1 px-[12px]">
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
          {/* The "PEMF for Health and Wellness" h2 and its pitch paragraph
              stood here until 2026-09-04, when the site owner had them
              removed; the hero now runs lockup, photograph, buttons, and the
              page's first section heading is "PEMF for Holistic Health" over
              the flower band below. The copy stays in lib/content/home.ts
              (hero.title, hero.paragraphs) for the /designs comps and for
              app/layout.tsx's meta description. */}
        </div>
      </section>

      <CredentialStrip />

      {/* The Holistic Approach content, moved here from /holistic-health at
          the site owner's request on 2026-09-04 when that page was removed:
          under the hero and the CredentialStrip (chrome, keeps its place) and
          above Holistic Anatomy, headed "PEMF for Holistic Health" -- the
          removed page's own title -- since the "PEMF for Health and
          Wellness" block above it went the same day. Until then this was three text-only plates of the
          same paragraphs. No heading on the flower band; the one h2 sits
          centred over the cards, as it did on the page. Plate frame on the
          flower: its ground is near-white, and inside the white plate it has
          no visible edge on either band ground. */}
      <SplitBand
        heading={holisticHealth.title}
        image={approachBand.image}
        paragraphs={approachBand.paragraphs}
      />
      <PanelGrid
        heading={approach.title}
        headingAlign="center"
        panels={approachPanels}
      />

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
