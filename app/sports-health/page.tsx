import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
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

      {/* Alternating full-width bands, the redesign approved 2026-08-28 and
          built 2026-08-31. It replaces two PanelGrids -- three-column rows
          that capped every image at a third of the content width, which is
          what the client objected to twice: they wanted the document's own
          icons shown large, and they disliked the bordered cards.

          frame="open" is the de-carding half: the image sits directly on the
          band ground with its own rounded corners instead of inside a
          u-plate, so the artwork carries the block. reverse alternates the
          sides so the eye zig-zags down the page rather than reading three
          identical rows.

          The source icons are 210-230px and render near 600px here. That
          upscale was tested on performance.png before the layout was approved:
          they are flat art with no fine detail to lose, and they survive it
          cleanly. No derived assets -- the document's own files ship as-is. */}
      <SplitBand
        heading={athletic.heading}
        image={athletic.image}
        paragraphs={athletic.paragraphs}
        frame="open"
        reverse
      />

      {/* The section heading rides on the FIRST band rather than standing
          alone, so it cannot end up orphaned at the foot of a viewport with
          its content scrolled past. The other two carry no heading, and all
          three use titleAs="h3" because that h2 is their parent. */}
      {boosts.bands.map((band, i) => (
        <SplitBand
          key={band.title}
          heading={i === 0 ? boosts.heading : undefined}
          title={band.title}
          titleAs="h3"
          image={band.image}
          paragraphs={band.paragraphs}
          frame="open"
          reverse={i % 2 === 1}
        />
      ))}

      <CTA />
      <Disclaimer />
    </main>
  );
}
