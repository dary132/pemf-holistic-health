import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Figure } from "@/components/Figure";
import { Section } from "@/components/Section";
import { TriPanel } from "@/components/TriPanel";
import { images } from "@/lib/content/images";
import { animals, intro, racehorses } from "@/lib/content/pets-health";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pets Health",
  description:
    "Benefits of racehorses using hands free Intelligent Magnetic Resonance Stimulation PEMF",
  path: "/pets-health",
});

export default function PetsHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Pets Health", path: "/pets-health" },
        ]}
      />
      <Section id="pets-health" title={intro.title} titleAs="h1" />
      <TriPanel panels={animals} tinted />
      <Figure image={images.imrsFaunaHorses} />
      <TriPanel heading={racehorses.heading} panels={racehorses.panels} />
      <CTA />
      <Disclaimer />
    </main>
  );
}
