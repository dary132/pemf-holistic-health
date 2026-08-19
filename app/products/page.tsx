import { FrequencyCard } from "@/components/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { JumpNav } from "@/components/JumpNav";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { TriPanel } from "@/components/TriPanel";
import { pageMetadata, productSchema } from "@/lib/seo";
import {
  applicators,
  biomimetic,
  coils,
  imrsPrime,
  intro,
  lowFrequency,
  sensors,
  smartPulser,
  spectrum,
  zones,
} from "@/lib/content/products";
import { images } from "@/lib/content/images";

export const metadata = pageMetadata({
  title: "PEMF Systems: iMRS Prime & Smart Pulser",
  description:
    "The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing!",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />

      <Section id="products" title={intro.title} titleAs="h1" />
      <JumpNav
        items={[
          { href: "#imrs-prime", label: "IMRS prime" },
          { href: "#smart-pulser", label: "Smart Pulser" },
        ]}
      />

      <section id="imrs-prime">
        <SplitBand
          image={images.imrsPrimeModes}
          title={imrsPrime.title}
          paragraphs={imrsPrime.paragraphs}
          tinted
        />
        {applicators.map((a, i) => (
          <SplitBand
            key={a.title}
            image={a.image}
            title={a.title}
            paragraphs={a.paragraphs}
            reverse={i % 2 === 1}
          />
        ))}
        <TriPanel panels={sensors} tinted />
      </section>

      <section id="smart-pulser">
        <SplitBand
          image={images.smartPulserSet}
          title={smartPulser.title}
          paragraphs={smartPulser.paragraphs}
        />
        <SplitBand
          image={images.coils}
          title={coils.title}
          paragraphs={coils.paragraphs}
          reverse
          tinted
        />

        <Section id="spectrum" title={spectrum.title} intro={spectrum.paragraphs[0]}>
          <p className="mb-8 max-w-[62ch] text-ink-soft">{spectrum.paragraphs[1]}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <FrequencyCard
                key={zone.name}
                range={zone.range}
                name={zone.name}
                body={zone.body}
              />
            ))}
          </div>
        </Section>

        <SplitBand
          image={images.biomimeticEarth}
          title={biomimetic.title}
          paragraphs={biomimetic.paragraphs}
          tinted
        />

        <Section id="low-frequency" title={lowFrequency.title}>
          {lowFrequency.paragraphs.map((p) => (
            <p key={p} className="mt-4 max-w-[62ch] text-ink-soft">
              {p}
            </p>
          ))}
        </Section>
      </section>

      <CTA />
      <Disclaimer />

      <JsonLd
        data={[
          productSchema({
            name: "IMRS prime PEMF",
            description: imrsPrime.paragraphs[0],
            image: images.imrsPrimeModes.src,
          }),
          productSchema({
            name: "Smart Pulser",
            description: smartPulser.paragraphs[0],
            image: images.smartPulserSet.src,
          }),
        ]}
      />
    </main>
  );
}
