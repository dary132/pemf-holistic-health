import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sleep Health",
  description:
    "PEMF is a non-invasive, non-addictive, drug-free approach for promoting better sleep.",
  path: "/sleep-health",
});

export default function SleepHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Sleep Health", path: "/sleep-health" },
        ]}
      />
      <Section id="sleep-health" title="PEMF Promotes Good Sleep" titleAs="h1" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
