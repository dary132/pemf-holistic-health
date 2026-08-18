import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PEMF",
  description:
    "Air, food, water, sunshine and Earth’s Magnetic Field Energy are natural essentials for human health.",
  path: "/pemf",
});

export default function PemfPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "PEMF", path: "/pemf" },
        ]}
      />
      <Section id="pemf" title="PEMF for Healthy Lifestyle" titleAs="h1" />
      <CTA />
      <Disclaimer />
    </main>
  );
}
