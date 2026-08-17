import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact-footer" className="bg-brand-dark text-white mt-auto scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-xl mb-3">{site.name}</p>
          <p className="text-white/90 text-base leading-relaxed">
            {site.address[0]}
            <br />
            {site.address[1]}
          </p>
          <p className="text-white/90 text-base mt-3">Office and Home Visits Available</p>
        </div>

        <div>
          <p className="font-display text-xl mb-3">Call / Text / WhatsApp</p>
          <p className="text-white/90 text-base leading-relaxed">
            {site.consultant.title} {site.consultant.name.split(" ")[0]} for Appointment
          </p>
          <a href={site.phoneHref} className="mt-1 inline-block text-lg text-accent-light hover:underline">
            {site.phone}
          </a>
        </div>

        <div>
          <p className="font-display text-xl mb-3">Explore</p>
          <ul className="space-y-1.5 text-base text-white/90">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xl mb-3">WeChat</p>
          <Image
            src="/images/wechat-qr.png"
            alt="WeChat QR code"
            width={110}
            height={110}
            className="rounded-md bg-white p-1.5"
          />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/80 space-y-2.5">
          <p>{site.deviceNote}</p>
          <p>Disclaimer: {site.disclaimer}</p>
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
