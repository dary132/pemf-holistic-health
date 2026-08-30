import { site } from "@/lib/site";
import { PhoneButton } from "./PhoneButton";

/** The book-an-appointment block that closes every page. Copy is the client's
 *  own recurring per-page call-to-action block (document lines 78-84,
 *  repeated verbatim 7 times), not marketing prose invented for the site:
 *    Call / Text / WhatsApp (rendered with pipe separators at the client's
 *      request, 2026-08-30; registered in verify-copy's ALLOWED_EDITS so the
 *      deviation from the document's slashes is recorded rather than hidden)
 *    Certified PEMF Expert Sharon
 *    for Appointment (949) 891 5572 (client-corrected number; the source
 *    document printed 600 7899, which is retired)
 *
 *  The visit block beneath it is the same rule: "Office and Home Visits
 *  Available" is the document's own line (it sets it across two lines,
 *  "Office and Home" / "Visits Available"; normalise() collapses the newline
 *  before matching, which is why the joined form passes and why Footer.tsx
 *  has rendered it joined since it was written). The address comes from
 *  lib/site.ts, where it is checked as copy. Nothing here is invented.
 *
 *  Deliberately NOT deduplicated against the Clinical design comp's proposed
 *  credential strip, which carries the same three strings under the hero. The
 *  Sharon line is the client's standard block and appears 7 times in the
 *  document -- dropping it from the sitewide band to avoid a clash with a comp
 *  that does not exist yet would be deleting real client copy to serve
 *  unwritten code. The comp dedupes on its side; see the spec amendment in
 *  docs/superpowers/specs/2026-08-24-home-design-comps-design.md. */
/* bg-band, not bg-sage: this is the one full-colour band on every page, so it
   is the strongest emphasis the themes have to play with. Under Vital Spectrum
   it picks up whichever spectrum colour its position in the page assigns it;
   under the other themes --band resolves to that theme's primary, which is the
   previous bg-sage behaviour exactly. */
export function CTA() {
  return (
    <section className="bg-band text-band-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center">
        {/* The explicit heading colour is required, not decorative: the global
            `h1, h2, h3 { color: var(--sage) }` rule in globals.css otherwise
            wins over the section's inherited colour, rendering this heading in
            sage text on a sage background -- invisible. Pre-existing bug, found
            while re-verifying this section against the screenshot harness. */}
        <h2 className="text-3xl text-band-ink sm:text-4xl">Call | Text | WhatsApp</h2>
        <p className="mx-auto mt-3 max-w-2xl text-band-ink/90 leading-relaxed">
          Certified PEMF Expert Sharon
          <br />
          for Appointment {site.officePhone}
        </p>

        {/* The visit ask. Full opacity rather than the /90 the line above uses:
            this is wayfinding an older visitor may be reading off a phone in a
            car park, so it gets the maximum contrast the palette allows rather
            than the softer treatment that suits subordinate text. */}
        <hr className="mx-auto mt-10 w-16 border-0 border-t-2 border-band-ink/30" />
        {/* mx-auto is load-bearing, not decoration: globals.css sets `p { max-width: 65ch }`,
            so without auto margins this block box hangs at the container's left edge and
            text-center only centres the text *inside* it -- the line rendered 200px left of
            every other element in the band. The paragraph above escapes it by having its
            own mx-auto; this one had none. */}
        <p className="mx-auto mt-10 text-xl font-bold text-band-ink">Office and Home Visits Available</p>
        <address className="mt-2 not-italic leading-relaxed text-band-ink">
          {site.address[0]}
          <br />
          {site.address[1]}
        </address>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          <PhoneButton variant="inverse" />
          <a
            href={site.whatsappHref}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-band-ink/40 px-8 py-3.5 font-bold text-band-ink transition hover:bg-band-ink/10"
          >
            WhatsApp {site.whatsapp}
          </a>
          {/* Opens the visitor's own maps app already routed to the office, so
              it leaves the site -- hence target/rel. rel="noreferrer" is not
              belt-and-braces here: without it the new tab gets window.opener. */}
          <a
            href={site.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-band-ink/40 px-8 py-3.5 font-bold text-band-ink transition hover:bg-band-ink/10"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
