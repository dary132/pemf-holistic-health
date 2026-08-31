import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
import { images, isSvg } from "@/lib/content/images";
import { definition, intro, wellness } from "@/lib/content/holistic-health";
import { pageMetadata } from "@/lib/seo";

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
      <Section id="holistic-health" title={intro.title} titleAs="h1" />
      <PanelGrid panels={definition} tone="blush" />
      <Section id="wellness" title={wellness.heading}>
        <Image
          src={images.eightDimensions.src}
          alt={images.eightDimensions.alt}
          unoptimized={isSvg(images.eightDimensions.src)}
          width={712}
          height={455}
          /* Capped at the file's own width, not the max-w-4xl this had while
             it was an SVG: the eight descriptions are burnt in at small sizes,
             and an 896px track would upscale a 712px file and soften them. */
          className="mx-auto h-auto w-full max-w-[712px] object-contain"
        />
      </Section>
      <CTA />
      <Disclaimer />
    </main>
  );
}
