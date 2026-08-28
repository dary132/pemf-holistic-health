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

export default function Home() {
  return (
    <main id="main">
      {/* The Clinical direction, chosen by the client on 2026-08-26 from the
          three comps at /designs. Two-column hero: everything a visitor reads
          on the left, the photograph in a bordered plate on the right. No
          bleed anywhere in this direction -- consistent margins are the point.

          This supersedes the stacked hero the client asked for earlier (wordmark,
          expansion, then a full-width photograph band, then the question and the
          buttons). That order was an explicit request and it is being overridden
          deliberately, not forgotten: the client picked this composition seeing
          it side by side with the other two. If they want the full-width
          photograph band back, it is the Photographic comp's hero, not this one. */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[3fr_5fr] lg:gap-x-6 lg:py-24">
          <div>
            {/* No alignment class needed: .u-wordmark is display:inline-block and sets
                no text-align of its own -- the previous hero centred it via a parent
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
            {/* The second button is the visit ask, not "What is PEMF?". The hero
                already tells a visitor what to do -- "Try adding a holistic
                approach by laying on the PEMF body mat" -- and the only other way
                to act on it is to phone. /contact is where the map, the address
                and the WeChat QR already live, so it is the page that answers
                "where do I go". /pemf is not orphaned by this: it is in the header
                nav, the footer nav, and the first Explore card below. */}
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
          {/* Deliberately no caption: the document contains no sentence describing
              this photograph, and the FDA-exposure copy rule forbids inventing one.
              images.heroMatFireplace.alt already carries the description for screen
              readers. The source file is the document's own 721px banner, so at this
              width it is upscaled roughly 2x on a high-density screen -- swap in a
              higher-resolution original from the client the moment one exists. The
              declared width/height are the file's real dimensions so the browser
              reserves the right box and does not reflow on load. */}
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
        {/* Same 55/45 image-favouring split as SplitBand (2026-08-28, larger
            images) -- this is the one image/text band not built on that shell. */}
        <div className="grid items-center gap-10 md:grid-cols-[11fr_9fr]">
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
