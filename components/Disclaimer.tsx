import { site } from "@/lib/site";

/** The client's disclaimer. Appears at the foot of every page, as in the document.
 *
 *  On the tinted ground, NOT on a colour band. It used to be `bg-sage`, which
 *  sat it directly beneath the `bg-band` CTA -- and under three of the four
 *  palettes those two tokens resolve to the same colour (`--band: var(--sage)`),
 *  so the call to action and the legal fine print rendered as one seamless
 *  slab with no boundary between them. The strongest emphasis the page has was
 *  being spent half on a disclaimer.
 *
 *  Switching this to `bg-band` would NOT have fixed that: it is the same
 *  colour as `bg-sage` in exactly the three palettes where the problem shows,
 *  and under Vital Spectrum it would have handed the fine print its own
 *  full-strength spectrum colour (the nth-child rotation in globals.css puts
 *  this element one stop past the CTA), which is louder still.
 *
 *  `--ink` on `--sand` is an AAA pair verify-contrast.mjs already holds to 7:1
 *  in all four palettes, and it is full-strength body ink at the same size and
 *  position as before -- the disclaimer is no less legible, only less shouty.
 *  It also makes the claim in components/CTA.tsx ("the one full-colour band on
 *  every page") true, which it was not while this component existed. */
export function Disclaimer() {
  return (
    <div className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="max-w-[62ch] text-base leading-relaxed">
          <strong>Disclaimer:</strong> {site.disclaimer}
        </p>
      </div>
    </div>
  );
}
