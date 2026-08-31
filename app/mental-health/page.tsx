import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { JumpNav } from "@/components/JumpNav";
import { Section } from "@/components/Section";
import { PanelGrid } from "@/components/TriPanel";
import {
  benefitsOfRelaxation,
  dimensions,
  intro,
  relaxation,
  stress,
} from "@/lib/content/mental-health";
import { images, isSvg } from "@/lib/content/images";
import { blurFor } from "@/lib/content/blur";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  /* "Wellness", not the document's "Mental Health", client instruction
     2026-08-31. This was the last place on the site still carrying the old
     name: it drives the browser tab, the search-result heading and the Open
     Graph title (lib/seo.ts renders "<title> | PEMF for Holistic Health"),
     none of which are page copy, so verify-copy has no opinion on it.

     It was held back from the earlier rename in this session on purpose and
     flagged to the client rather than changed quietly, because a <title> is
     an SEO surface -- "Mental Health" is a term people actually search, and
     changing it is a traffic decision rather than a naming one. They chose
     the consistency.

     The URL stays /mental-health. That is the one remaining piece of the old
     name, and it is the expensive one: changing it needs a redirect pair in
     next.config.ts (see /what-is-pemf and /benefits for the pattern) and
     costs the page its accumulated search history. Not worth doing unless the
     client asks. */
  title: "Wellness",
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
          /* Matches the nav label, which is the convention every other page
             follows (compare /energy, /pets-health, ...). It had drifted: the
             nav said "Brain Health" from 2026-08-28 while this still said
             "Mental Health", and the 2026-08-31 move to "Wellness" would have
             made it a third name for one page. The page's H1 is deliberately
             still "PEMF Improves Brain Health" -- see lib/routes.ts. */
          { name: "Wellness", path: "/mental-health" },
        ]}
      />
      {/* The eight-dimensions wheel opens this page, moved here from
          /holistic-health on the client's instruction 2026-08-31 in the same
          pass that made this the Wellness page. It belongs here on the
          content too, not just in the nav: the panels immediately below are
          five of that wheel's own dimensions -- mental acuity, emotional,
          spiritual, social, financial -- so the wheel now reads as the key to
          the row under it instead of sitting on a different page from it.

          max-w-[712px] is the file's own width, carried over with the image
          rather than reset to the container's 1152px: the eight descriptions
          are burnt into the artwork at small sizes, and a wider track would
          upscale a 712px file and soften them. Same reasoning that capped it
          on the page it came from. */}
      <Section id="mental-health" title={intro.title} titleAs="h1">
        <Image
          src={images.eightDimensions.src}
          {...blurFor(images.eightDimensions.src)}
          alt={images.eightDimensions.alt}
          unoptimized={isSvg(images.eightDimensions.src)}
          width={712}
          height={455}
          className="mx-auto h-auto w-full max-w-[712px] object-contain"
        />
      </Section>
      <JumpNav
        items={[
          { href: "#stress", label: "Stress" },
          { href: "#relaxation", label: "Relaxation" },
        ]}
      />
      {/* No heading prop: this TriPanel sits directly under the page's h1
          with nothing at h2, so its own panel titles must render as h2 to
          avoid an h1 -> h3 skip (spec fix-wave item I-7). */}
      <PanelGrid panels={dimensions} panelTitleAs="h2" />
      <section id="stress">
        <PanelGrid heading={stress.heading} panels={stress.panels} tone="mist" />
      </section>
      <section id="relaxation">
        <PanelGrid heading={relaxation.heading} panels={relaxation.panels} />
      </section>
      <PanelGrid
        heading={benefitsOfRelaxation.heading}
        panels={benefitsOfRelaxation.panels}
        tone="blush"
      />
      <CTA />
      <Disclaimer />
    </main>
  );
}
