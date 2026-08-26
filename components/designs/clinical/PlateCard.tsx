import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/content/types";

/** Bordered card with a coloured top rule. The rule is `bg-band`, so under
 *  Vital Spectrum every card in a row picks up its SECTION's spectrum colour
 *  -- not one colour per card. Spectrum rotates via `main > *:nth-child(7n + N)`
 *  (see globals.css), which colours top-level bands only; these cards sit
 *  nested inside a single <Section>, and the custom properties inherit down
 *  to them from there. That is the intended behaviour: a row of
 *  individually-coloured cards would need seven top-level wrappers and would
 *  break the section rhythm this direction is built on. Under the other three
 *  palettes --band resolves to that palette's primary, exactly as the closing
 *  CTA band does. */
export function PlateCard({
  image,
  title,
  body,
  href,
}: {
  image: Img;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <article className="u-plate overflow-hidden">
      <span aria-hidden="true" className="block h-1.5 w-full bg-band" />
      <div className="p-5">
        <div className="u-plate-media">
          <Image
            src={image.src}
            alt={image.alt}
            width={600}
            height={450}
            className={`h-full w-full ${image.contain ? "object-contain" : "object-cover"}`}
          />
        </div>
        <h3 className="mt-5 text-xl">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  );
}
