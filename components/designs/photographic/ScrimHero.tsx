import Image from "next/image";
import type { Img } from "@/lib/content/types";

/** Full-bleed photograph with the wordmark overlaid on a scrim.
 *
 *  The scrim is deliberately heavy. verify-contrast.mjs reasons about token
 *  pairs, not pixels, so it cannot check text over an image -- and the
 *  fireplace photograph runs from near-black to bright cream inside one
 *  frame, so the floor has to hold against the BRIGHTEST pixel a letter can
 *  land on, not the average. The value below was solved for 7:1 against that
 *  pixel (see Step 2 of Task 4 in the plan for the derivation) and rounded
 *  up. It will look heavier than a typical hero overlay. That is the trade,
 *  not a rendering mistake -- say so when showing the client. */
export function ScrimHero({
  image,
  wordmark,
  expansion,
}: {
  image: Img;
  wordmark: string;
  expansion: string;
}) {
  return (
    <section className="relative isolate">
      <Image
        src={image.src}
        alt={image.alt}
        priority
        width={1600}
        height={900}
        className="h-[70vh] min-h-[26rem] w-full object-cover"
      />
      {/* Inline color-mix rather than a Tailwind opacity modifier on an
          arbitrary var: `bg-[color:var(--ink)]/60` can silently emit no rule,
          and a scrim that fails to render ships an unreadable hero rather
          than an obviously broken one. --ink is redefined by every palette
          block, so this adapts per theme for free.
          SCRIM: public/images/hero-mat-fireplace.png (721x338) has a near-
          white highlight pixel at (679,118), RGB(254,255,252) -- WCAG
          relative luminance 0.996, essentially pure white. A hand solve of
          L*(1-a) + ink*a for the composite's WCAG relative luminance against
          that pixel put the requirement at 75-80% depending on palette
          (default --ink is the worst case: it is the least dark of the
          four). That estimate is not proof, though -- it assumes the naive
          linear alpha blend the plan's formula describes, not the gamma-
          aware compositing a real browser does. Step 6 measured the actual
          rendered pixels instead: at 1440x900 on the default palette, with
          the wordmark hidden to expose the composite underneath it, the
          brightest non-seam pixel in the hero band was (1005,558) at
          rgb(85,88,82) -- inside the subtitle's own bounding box, so a
          letter really could land there. That measured L=0.0952 against
          white gives 7.23:1 at 80% scrim (60% measured only 3.95:1, 70%
          measured 5.36:1, 75% measured 6.23:1 -- all short of AAA). 80% is
          the final figure.
          object-cover crops this photo differently at different widths, so
          the 1440 measurement alone did not prove AAA everywhere -- a fix
          round re-measured the same way (text set to opacity-0, brightest
          pixel found inside the actual rendered wordmark+subtitle bounding
          box, default palette) at 320, 390, 768, 1024, 1440, and 1920 wide.
          Every width cleared 7:1 at 80% already: 390 wide measured 7.65:1,
          768 wide 7.29:1, 1024 wide 7.23:1, 1440 wide 7.23:1 (the binding
          case), 1920 wide 7.25:1, 320 wide 7.45:1. No change to the 80%
          figure was needed. See Task 4's report for the full table. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--ink) 80%, transparent)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <h1 className="u-wordmark text-white">{wordmark}</h1>
        <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-white sm:text-2xl">
          {expansion}
        </p>
      </div>
    </section>
  );
}
