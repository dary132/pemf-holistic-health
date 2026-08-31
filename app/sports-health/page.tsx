import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
import { athletic, boosts, intro } from "@/lib/content/sports-health";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sports Health",
  description:
    "The IMRS Prime accelerates rejuvenation after physical activity, thus allowing you to train harder, perform better and compete more often.",
  path: "/sports-health",
});

export default function SportsHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Sports Health", path: "/sports-health" },
        ]}
      />
      <Section id="sports-health" title={intro.title} titleAs="h1" rhythm="heading" />
      <PanelGrid heading={athletic.heading} panels={athletic.panels} />
      <PanelGrid heading={boosts.heading} panels={boosts.panels} />
      <CTA />
      <Disclaimer />
    </main>
  );
}
