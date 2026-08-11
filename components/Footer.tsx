import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl mb-3">{site.name}</p>
          <p className="text-white/80 text-sm leading-relaxed">
            {site.address[0]}
            <br />
            {site.address[1]}
          </p>
          <p className="text-white/80 text-sm mt-3">Office and Home Visits Available</p>
        </div>

        <div>
          <p className="font-display text-xl mb-3">Call / Text / WhatsApp</p>
          <p className="text-white/80 text-sm leading-relaxed">
            {site.consultant.title} {site.consultant.name.split(" ")[0]} for Appointment
          </p>
          <a href={site.phoneHref} className="mt-1 inline-block text-lg text-accent-light hover:underline">
            {site.phone}
          </a>
          <p className="text-white/80 text-sm mt-2">
            <a href={`mailto:${site.email}`} className="hover:underline">
              {site.email}
            </a>
          </p>
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
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/60 space-y-2">
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
