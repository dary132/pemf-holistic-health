import { site } from "@/lib/site";
import { PhoneButton } from "./PhoneButton";

/** The book-an-appointment block that closes every page. Copy is the client's
 *  own recurring per-page call-to-action block (document lines 78-84,
 *  repeated verbatim 7 times), not marketing prose invented for the site:
 *    Call / Text / WhatsApp
 *    Certified PEMF Expert Sharon
 *    for Appointment (949) 891 5572 (client-corrected number; the source
 *    document printed 600 7899, which is retired) */
export function CTA() {
  return (
    <section className="bg-sage text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center">
        {/* text-white is required, not decorative: the global `h1, h2, h3 {
            color: var(--sage) }` rule in globals.css otherwise wins over the
            section's inherited text-white, rendering this heading in sage
            text on a sage background -- invisible. Pre-existing bug, found
            while re-verifying this section against the screenshot harness. */}
        <h2 className="text-3xl text-white sm:text-4xl">Call / Text / WhatsApp</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/90 leading-relaxed">
          Certified PEMF Expert Sharon
          <br />
          for Appointment {site.officePhone}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PhoneButton />
          <a
            href={site.whatsappHref}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/40 px-8 py-3.5 font-medium text-white transition hover:bg-white/10"
          >
            WhatsApp {site.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
