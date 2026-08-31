import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { images } from "@/lib/content/images";
import { HeadingText } from "@/components/PemfWord";
import { blurFor } from "@/lib/content/blur";

/** Every route is reachable from here, so the Wellness disclosure is never the
 *  only path to a page. */
export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-rule bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          {/* The four letter colours reach the footer's practice name too,
              client request 2026-08-30. text-sage stays on the <p>, so it is
              still what "for Holistic Health" renders in; HeadingText only
              recolours the word itself. This ground is --sand, which is why
              --tc-1 and --tc-4 had to be darkened when the treatment left the
              hero -- see the note in globals.css. */}
          <p className="font-[family-name:var(--font-display)] text-2xl text-sage">
            <HeadingText text={site.name} />
          </p>
          <address className="mt-3 not-italic text-ink-soft">
            {site.address[0]}
            <br />
            {site.address[1]}
          </address>
          <p className="mt-3 text-ink-soft">Office and Home Visits Available</p>
        </div>

        <nav aria-label="Footer">
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="flex min-h-[48px] items-center font-bold text-ink-soft no-underline hover:text-clay"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-bold text-ink">Get in touch</p>
          <a
            href={site.officePhoneHref}
            className="mt-2 flex min-h-[48px] items-center text-clay underline-offset-4 hover:underline"
          >
            Office {site.officePhone}
          </a>
          <a
            href={site.whatsappHref}
            className="flex min-h-[48px] items-center text-clay underline-offset-4 hover:underline"
          >
            WhatsApp {site.whatsapp}
          </a>
          <Image
            src={images.wechatQr.src}
            {...blurFor(images.wechatQr.src)}
            alt={images.wechatQr.alt}
            width={120}
            height={120}
            className="mt-4 rounded-xl border border-rule bg-white p-2"
          />
        </div>
      </div>

      <div className="border-t border-rule">
        {/* The "not a medical device" line that sat above the copyright was
            removed on the client's explicit instruction, 2026-08-31. It was
            never the client's copy -- it appeared nowhere in the 2026
            document and was carried over from the prior build, which is why
            lib/site.ts held it as a flagged exception awaiting exactly this
            decision rather than as verified copy. The sitewide Disclaimer
            component is untouched and still runs on every page. */}
        <div className="mx-auto max-w-6xl px-5 py-6 text-base text-ink-soft">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
