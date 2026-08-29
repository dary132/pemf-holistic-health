import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { images } from "@/lib/content/images";
import {
  essentialForHealth,
  essentials,
  importanceOfField,
  intro,
  mimicsEarth,
} from "@/lib/content/pemf";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PEMF",
  description:
    "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
  path: "/pemf",
});

/* 2026-08-29, at the client's request: the three-panel card grids became
 * open-frame SplitBands (larger images, no plate chrome) with each grid's
 * text-only panel nested into the neighbouring band's text column, and the
 * five essentials tiles lost their card borders. */
export default function PemfPage() {
  const [earthField, vitalForHealth, fieldWeakening] = essentialForHealth.panels;
  const [radiationSources, protection, magnetPoles] = importanceOfField.panels;
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "PEMF", path: "/pemf" },
        ]}
      />
      <Section id="pemf" title={intro.title} titleAs="h1" intro={intro.paragraphs[0]}>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {essentials.map(({ label, image }) => (
            <li key={image.src}>
              <figure>
                {/* The five photos have different aspect ratios (roughly 1:1 to
                    5:4), so each sits whole inside a fixed 4:3 slot; otherwise
                    the row's tiles end up at five different heights. */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full rounded-2xl object-contain"
                />
                {/* `capitalize` is display-only: the stored label keeps the
                    document's own casing so verify:copy matches verbatim. */}
                <figcaption className="mt-3 text-center font-bold capitalize text-ink">
                  {label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <SplitBand
        heading={essentialForHealth.heading}
        image={earthField.image!}
        title={earthField.title}
        titleAs="h3"
        paragraphs={earthField.paragraphs}
        frame="open"
        tone="mist"
      >
        <h3 className="mt-10 text-3xl">{vitalForHealth.title}</h3>
        <span className="u-accent-rule" />
        {vitalForHealth.paragraphs?.map((p) => (
          <p key={p} className="mt-6 max-w-[62ch] text-ink-soft">
            {p}
          </p>
        ))}
      </SplitBand>
      <SplitBand
        image={fieldWeakening.image!}
        title={fieldWeakening.title}
        titleAs="h3"
        paragraphs={fieldWeakening.paragraphs}
        frame="open"
        tone="mist"
      />

      <SplitBand
        heading={importanceOfField.heading}
        image={radiationSources.image!}
        title={radiationSources.title}
        titleAs="h3"
        paragraphs={radiationSources.paragraphs}
        frame="open"
      >
        <h3 className="mt-10 text-3xl">{protection.title}</h3>
        <span className="u-accent-rule" />
        {protection.paragraphs?.map((p) => (
          <p key={p} className="mt-6 max-w-[62ch] text-ink-soft">
            {p}
          </p>
        ))}
      </SplitBand>
      <SplitBand
        image={magnetPoles.image!}
        title={magnetPoles.title}
        titleAs="h3"
        paragraphs={magnetPoles.paragraphs}
        frame="open"
      />

      <h2 className="sr-only">{mimicsEarth.heading}</h2>
      <SplitBand
        image={images.earthFieldAurora}
        title={mimicsEarth.title}
        paragraphs={mimicsEarth.paragraphs}
        frame="open"
        tone="blush"
      />

      <CTA />
      <Disclaimer />
    </main>
  );
}
