import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { JumpNav } from "@/components/JumpNav";
import { Section } from "@/components/Section";
import { TriPanel } from "@/components/TriPanel";
import {
  benefitsOfRelaxation,
  dimensions,
  intro,
  relaxation,
  stress,
} from "@/lib/content/mental-health";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mental Health",
  description:
    "Brainwave Entrainment is a holistic experience for the brain, also known as Spa for the Mind, reduces stress, resulting in relaxation, calmness and ease.",
  path: "/mental-health",
});

export default function MentalHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Mental Health", path: "/mental-health" },
        ]}
      />
      <Section id="mental-health" title={intro.title} titleAs="h1" />
      <JumpNav
        items={[
          { href: "#stress", label: "Stress" },
          { href: "#relaxation", label: "Relaxation" },
        ]}
      />
      <TriPanel panels={dimensions} />
      <section id="stress">
        <TriPanel heading={stress.heading} panels={stress.panels} tinted />
      </section>
      <section id="relaxation">
        <TriPanel heading={relaxation.heading} panels={relaxation.panels} />
      </section>
      <TriPanel
        heading={benefitsOfRelaxation.heading}
        panels={benefitsOfRelaxation.panels}
        tinted
      />
      <CTA />
      <Disclaimer />
    </main>
  );
}
