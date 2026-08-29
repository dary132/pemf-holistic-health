import { FrequencyCard } from "@/components/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { JumpNav } from "@/components/JumpNav";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { PanelGrid } from "@/components/TriPanel";
import { pageMetadata, productSchema } from "@/lib/seo";
import {
  accessories,
  accessoriesHeading,
  applicators,
  applicatorsIntro,
  biomimetic,
  coils,
  connectorBox,
  controlPanel,
  fastStart,
  imrsPrime,
  intro,
  lowFrequency,
  modes,
  smartPulser,
  spectrum,
  zones,
} from "@/lib/content/products";
import { images } from "@/lib/content/images";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "The new benchmark of holistic, low-pulsed electro-magnetic technology for your personal wellbeing!",
  path: "/products",
});

/* Section order mirrors the manufacturer's iMRS prime page (see
 * docs/imrs-prime-swissbionic.txt): system hero, control panel, connector
 * box, the six Exagon applicators, software tools, accessories. */
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
          image={images.imrsModel3}
          title={imrsPrime.title}
          paragraphs={imrsPrime.paragraphs}
          tone="mist"
        />
        <SplitBand
          image={images.imrsControlPanel}
          title={controlPanel.title}
          paragraphs={controlPanel.paragraphs}
          reverse
        />
        <SplitBand
          image={images.imrsConnectorBox}
          title={connectorBox.title}
          paragraphs={connectorBox.paragraphs}
        />

        <Section
          id="applicators"
          title={applicatorsIntro.title}
          intro={applicatorsIntro.paragraphs[0]}
          tone="blush"
          rhythm="compact"
        />
        {applicators.map((a, i) => (
          <SplitBand
            key={a.title}
            image={a.image}
            title={a.title}
            titleAs="h3"
            paragraphs={a.paragraphs}
            reverse={i % 2 === 1}
          />
        ))}

        <SplitBand
          heading={fastStart.heading}
          image={images.imrsPrimeModes}
          title={fastStart.title}
          titleAs="h3"
          paragraphs={fastStart.paragraphs}
          tone="mist"
        >
          <ul className="mt-6 flex flex-wrap gap-3">
            {fastStart.programs.map((p) => (
              <li key={p} className="u-plate px-4 py-2 text-ink-soft">
                {p}
              </li>
            ))}
          </ul>
        </SplitBand>
        <PanelGrid panels={modes} panelTitleAs="h3" tone="mist" />

        <PanelGrid
          heading={accessoriesHeading}
          panels={accessories}
          panelTitleAs="h3"
          tone="blush"
        />
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
          tone="mist"
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
          tone="blush"
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
            image: images.imrsModel3.src,
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
