/** Clinical's whole argument: front-load the reasons to trust the practice,
 *  directly beneath the hero, before the visitor has to scroll for them.
 *
 *  Two strings, not three. The Lake Forest address was in the original spec
 *  and was removed in the 2026-08-25 amendment: it already appears three
 *  times on every page (sticky header bar, the closing CTA band since
 *  22f3bfa, and the footer), so a fourth instance one screen below the third
 *  buys nothing. What remains is trust claims rather than wayfinding, which
 *  is what earns space above the fold; wayfinding belongs beside the Get
 *  Directions button at the foot. Do not "restore" the address here.
 *
 *  Both strings are verbatim from the client document. "Office and Home
 *  Visits Available" is set there across two lines and normalise() collapses
 *  the break before matching -- components/CTA.tsx has rendered the joined
 *  form since 22f3bfa and verify:jsx passes it unexempted. */
export function CredentialStrip() {
  return (
    <section className="border-y-2 border-rule bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-6 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left">
        <p className="text-lg font-bold text-ink">Certified PEMF Expert Sharon</p>
        <span aria-hidden="true" className="hidden h-6 w-px bg-rule sm:block" />
        <p className="text-lg font-bold text-ink">Office and Home Visits Available</p>
      </div>
    </section>
  );
}
