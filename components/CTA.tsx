import { site } from "@/lib/site";
import { PhoneButton } from "./PhoneButton";

/** The book-an-appointment block that closes every page. Copy is the client's
 *  own recurring per-page call-to-action block (document lines 78-84,
 *  repeated verbatim 7 times), not marketing prose invented for the site:
 *    Call / Text / WhatsApp
 *    Certified PEMF Expert Sharon
 *    for Appointment (949) 891 5572 (client-corrected number; the source
 *    document printed 600 7899, which is retired) */
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
        <h2 className="text-3xl text-band-ink sm:text-4xl">Call / Text / WhatsApp</h2>
        <p className="mx-auto mt-3 max-w-2xl text-band-ink/90 leading-relaxed">
          Certified PEMF Expert Sharon
          <br />
          for Appointment {site.officePhone}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PhoneButton />
          <a
            href={site.whatsappHref}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-band-ink/40 px-8 py-3.5 font-medium text-band-ink transition hover:bg-band-ink/10"
          >
            WhatsApp {site.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
