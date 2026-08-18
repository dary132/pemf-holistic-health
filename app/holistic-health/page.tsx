import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
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
      <Section id="holistic-health" title="PEMF for Holistic Health" titleAs="h1" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
