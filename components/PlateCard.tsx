import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/content/types";
import { HeadingText } from "@/components/PemfWord";
import { blurFor } from "@/lib/content/blur";

/** Bordered card with a coloured top rule.

 *  The rule is `bg-button`, matching the magenta border around the card, so
 *  the two read as one accent. It was `bg-band` until the 2026-08-26 magenta
 *  change, which left a green cap sitting on a magenta-outlined card.
 *
 *  That swap has one consequence worth knowing. Under Vital Spectrum,
 *  `main > *:nth-child(7n + N)` (see globals.css) rotates --band per top-level
 *  section, and these cards inherited that through their Section -- so the
 *  rule used to pick up its section's spectrum colour. Pointing it at --button
 *  makes it a fixed magenta in every palette instead. That is the intended
 *  trade: the client asked for magenta bordering, and a rule that changes hue
 *  per section would defeat it. To restore the rotation, change this back to
 *  `bg-band` and accept the green cap. */
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
    <article data-reveal className="u-plate overflow-hidden">
      <span aria-hidden="true" className="block h-1.5 w-full bg-button" />
      <div className="p-5">
        <div className="u-plate-media">
          <Image
            src={image.src}
            {...blurFor(image.src)}
            alt={image.alt}
            width={600}
            height={450}
            className={`h-full w-full ${image.contain ? "object-contain" : "object-cover"}`}
          />
        </div>
        <h3 className="mt-5 text-xl">
          <Link href={href}>
            <HeadingText text={title} />
          </Link>
        </h3>
        <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  );
}
