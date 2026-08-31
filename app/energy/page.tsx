import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
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
      {/* No heading prop: this TriPanel sits directly under the page's h1
          with nothing at h2, so its own panel titles must render as h2 to
          avoid an h1 -> h3 skip (spec fix-wave item I-7). */}
      <PanelGrid panels={benefits} panelTitleAs="h2" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
