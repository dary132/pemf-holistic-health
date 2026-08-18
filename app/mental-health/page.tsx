import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
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
      <Section id="mental-health" title="PEMF Improves Mental Health" titleAs="h1" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
