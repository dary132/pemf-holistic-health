import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
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
      <Section id="pets-health" title={intro.title} titleAs="h1" rhythm="heading" />
      {/* No heading prop: this TriPanel sits directly under the page's h1
          with nothing at h2, so its own panel titles must render as h2 to
          avoid an h1 -> h3 skip (spec fix-wave item I-7). */}
      <PanelGrid panels={animals} panelTitleAs="h2" />
      <PanelGrid heading={racehorses.heading} panels={racehorses.panels} />
      <CTA />
      <Disclaimer />
    </main>
  );
}
