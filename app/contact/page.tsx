import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "22706 Aspan St, Suite 504, Lake Forest, CA.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section
        id="contact"
        eyebrow="Book a Session"
        title="Contact"
        titleAs="h1"
        intro={`Call, text, or message on WhatsApp to arrange an appointment. Office and home visits are available across ${site.areaServed}.`}
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-brand-dark">Call / Text / WhatsApp</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                {site.consultant.title} {site.consultant.name}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={site.phoneHref}
                  className="rounded-full bg-accent px-7 py-3 font-medium text-white transition hover:brightness-110"
                >
                  Call or Text · {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  className="rounded-full border border-brand/25 px-7 py-3 font-medium text-brand transition hover:bg-brand-light"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-brand-dark">Visit Us</h2>
              <address className="mt-2 not-italic leading-relaxed text-ink-soft">
                {site.address[0]}
                <br />
                {site.address[1]}
              </address>
              <p className="mt-2 text-ink-soft">Office and Home Visits Available</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-brand-dark">WeChat</h2>
              <Image
                src="/images/wechat-qr.png"
                alt="WeChat QR code"
                width={130}
                height={130}
                className="mt-3 rounded-md border border-brand/10 bg-white p-2"
              />
            </div>
          </div>

          <iframe
            title="Map to 22706 Aspan St, Suite 504, Lake Forest, CA 92630"
            src="https://www.google.com/maps?q=22706+Aspan+St+Suite+504+Lake+Forest+CA+92630&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full rounded-2xl border border-brand/10 lg:aspect-auto lg:min-h-[26rem]"
          />
        </div>
      </Section>
      <Disclaimer />
    </main>
  );
}
