import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { TriPanel } from "@/components/TriPanel";
import { benefits, intro } from "@/lib/content/energy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Energy",
  description:
    "Try this holistic approach using PEMF system to enhance your energy, stamina, and power and you will feel the difference.",
  path: "/energy",
});

export default function EnergyPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Energy", path: "/energy" },
        ]}
      />
      <Section id="energy" title={intro.title} titleAs="h1" />
      <TriPanel panels={benefits} tinted />
      <CTA />
      <Disclaimer />
    </main>
  );
}
