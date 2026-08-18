import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { images } from "@/lib/content/images";

/** Every route is reachable from here, so the Wellness disclosure is never the
 *  only path to a page. */
export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-rule bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-sage">
            {site.name}
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
          <p className="mt-2">
            <a href={site.officePhoneHref} className="text-clay">
              Office {site.officePhone}
            </a>
          </p>
          <p className="mt-1">
            <a href={site.whatsappHref} className="text-clay">
              WhatsApp {site.whatsapp}
            </a>
          </p>
          <Image
            src={images.wechatQr.src}
            alt={images.wechatQr.alt}
            width={120}
            height={120}
            className="mt-4 rounded-xl border border-rule bg-white p-2"
          />
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-6 text-base text-ink-soft">
          <p className="max-w-[62ch]">{site.deviceNote}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
