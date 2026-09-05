import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { SplitBand } from "@/components/SplitBand";
import { PanelGrid } from "@/components/TriPanel";
import {
  approachBand,
  approachPanels,
  intro,
} from "@/lib/content/holistic-health";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Holistic Health",
  description:
    "PEMF is a holistic approach to promote a state of total wellness.",
  path: "/holistic-health",
});

/* The page is the client's "Edit PEMF for Holistic Health Page.docx"
   (2026-09-04) end to end, at the site owner's instruction: the flower diagram
   beside the three paragraphs, then the same copy as three picture cards. The
   wellness-practices figure and the two page-3 definition panels that were
   here before are in git history (6ec3697). */
export default function HolisticHealthPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Holistic Health", path: "/holistic-health" },
        ]}
      />
      <Section
        id="holistic-health"
        title={intro.title}
        titleAs="h1"
        rhythm="heading"
      />
      {/* No section heading: the document heads both blocks "PEMF - Holistic
          Approach", and the site owner asked on 2026-09-04 for that tag to go,
          so the page runs from the h1 straight into the flower band. Plate
          frame, not open: the flower's ground is near-white and this band is
          --sand, so the open frame would show the file's square edge. */}
      <SplitBand
        image={approachBand.image}
        paragraphs={approachBand.paragraphs}
      />
      <PanelGrid panels={approachPanels} />
      <CTA />
      <Disclaimer />
    </main>
  );
}
