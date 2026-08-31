import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { Section } from "@/components/Section";
import { details, intro } from "@/lib/content/contact";
import { images } from "@/lib/content/images";
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

      <Section id="contact" title={intro.title} titleAs="h1">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl">Call | Text | WhatsApp</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <PhoneButton />
                <a
                  href={site.whatsappHref}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl">Visit Us</h2>
              <address className="mt-2 not-italic leading-relaxed text-ink-soft">
                {site.address[0]}
                <br />
                {site.address[1]}
              </address>
              <p className="mt-2 text-ink-soft">{details.visits}</p>
            </div>

            <div>
              <h2 className="text-2xl">WeChat</h2>
              <Image
                src={images.wechatQr.src}
                alt={images.wechatQr.alt}
                width={130}
                height={130}
                className="mt-3 rounded-xl border border-rule bg-white p-2"
              />
            </div>
          </div>

          {/* Kept: a map, not a video -- the no-YouTube rule does not touch it.
              The title is the office address, an accessibility label for
              assistive tech, not visible body copy -- see the narrow <iframe>
              exemption in scripts/verify-jsx-copy.mjs. */}
          <iframe
            title={`${site.address[0]}, ${site.address[1]}`}
            src="https://www.google.com/maps?q=22706+Aspan+St+Suite+504+Lake+Forest+CA+92630&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full rounded-2xl border border-rule lg:aspect-auto lg:min-h-[26rem]"
          />
        </div>
      </Section>
      <Disclaimer />
    </main>
  );
}
