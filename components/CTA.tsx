import { site } from "@/lib/site";

/** The book-an-appointment block that closes every page. */
export function CTA() {
  return (
    <section className="bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Book a PEMF Session</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/90 leading-relaxed">
          Talk it through with {site.consultant.title} {site.consultant.name.split(" ")[0]}.
          Office and home visits are available across {site.areaServed}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={site.phoneHref}
            className="rounded-full bg-accent px-8 py-3.5 font-medium text-white transition hover:brightness-110"
          >
            Call or Text · {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            className="rounded-full border border-white/40 px-8 py-3.5 font-medium text-white transition hover:bg-white/10"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
