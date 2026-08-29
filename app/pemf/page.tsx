import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { PanelGrid } from "@/components/TriPanel";
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

export default function PemfPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "PEMF", path: "/pemf" },
        ]}
      />
      <Section id="pemf" title={intro.title} titleAs="h1" intro={intro.paragraphs[0]}>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-5">
          {essentials.map(({ label, image }) => (
            <li key={image.src} className="rounded-3xl border border-rule bg-white p-4">
              <figure>
                {/* The five photos have different aspect ratios (roughly 1:1 to
                    5:4), so each sits whole inside a fixed 4:3 slot; otherwise
                    the row's tiles end up at five different heights. */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-contain"
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

      <PanelGrid
        heading={essentialForHealth.heading}
        panels={essentialForHealth.panels}
        tone="mist"
      />

      <PanelGrid heading={importanceOfField.heading} panels={importanceOfField.panels} />

      <h2 className="sr-only">{mimicsEarth.heading}</h2>
      <SplitBand
        image={images.earthFieldAurora}
        title={mimicsEarth.title}
        paragraphs={mimicsEarth.paragraphs}
        tone="blush"
      />

      <CTA />
      <Disclaimer />
    </main>
  );
}
