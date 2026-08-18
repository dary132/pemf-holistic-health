import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { TriPanel } from "@/components/TriPanel";
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
          {essentials.map(({ image }) => (
            <li key={image.src} className="rounded-3xl border border-rule bg-white p-4">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={360}
                className="h-auto w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </Section>

      <TriPanel
        heading={essentialForHealth.heading}
        panels={essentialForHealth.panels}
        tinted
      />

      <TriPanel heading={importanceOfField.heading} panels={importanceOfField.panels} />

      <h2 className="sr-only">{mimicsEarth.heading}</h2>
      <SplitBand
        image={images.mimicsEarthField}
        title={mimicsEarth.title}
        paragraphs={mimicsEarth.paragraphs}
        tinted
      />

      <CTA />
      <Disclaimer />
    </main>
  );
}
