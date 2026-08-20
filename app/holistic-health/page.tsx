import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { TriPanel } from "@/components/TriPanel";
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
      <TriPanel panels={definition} tinted />
      <Section id="wellness" title={wellness.heading}>
        <Image
          src={images.eightDimensions.src}
          alt={images.eightDimensions.alt}
          unoptimized={isSvg(images.eightDimensions.src)}
          width={1200}
          height={780}
          className="mx-auto h-auto w-full max-w-4xl object-contain"
        />
      </Section>
      <CTA />
      <Disclaimer />
    </main>
  );
}
