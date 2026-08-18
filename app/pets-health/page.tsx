import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
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
      <Section id="pets-health" title="PEMF for Pets Health" titleAs="h1" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
