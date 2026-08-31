import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
import { images } from "@/lib/content/images";
import { definition, intro } from "@/lib/content/holistic-health";
import { pageMetadata } from "@/lib/seo";
import { blurFor } from "@/lib/content/blur";

export const metadata = pageMetadata({
  title: "Holistic Health",
  description: "PEMF is a holistic approach to promote a state of total wellness.",
  path: "/holistic-health",
});

export default function HolisticHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Holistic Health", path: "/holistic-health" },
        ]}
      />
      {/* The practices grid was the middle panel of the definition row below
          until 2026-08-30. It is a 431x473 portrait file and that row's media
          slot is 4/3, so it letterboxed to about two thirds of the width and
          the twelve practice labels came out too small to read -- the whole
          point of the picture. Its own figure under the h1 gives it roughly
          twice the width at the same aspect, and keeps it the first image on
          the page.

          Capped at 560px rather than run to the container's full 1152px:
          "full-width figure" is the brief, but a 2.7x upscale of a 431px file
          would trade the small-but-sharp labels for large blurred ones. 560
          is about a 1.3x upscale, which flat illustration takes without
          visible softening. */}
      <Section id="holistic-health" title={intro.title} titleAs="h1">
        <Image
          src={images.wellnessPractices.src}
          {...blurFor(images.wellnessPractices.src)}
          alt={images.wellnessPractices.alt}
          width={431}
          height={473}
          className="mx-auto h-auto w-full max-w-[560px]"
        />
      </Section>
      {/* Two panels, so two columns -- at the default three the row would sit
          two-thirds full with a hole where the image used to be. */}
      <PanelGrid panels={definition} columns={2} />
      <CTA />
      <Disclaimer />
    </main>
  );
}
