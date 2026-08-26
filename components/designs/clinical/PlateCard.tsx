import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/content/types";

/** Bordered card with a coloured top rule. The rule is `bg-band`, so under
 *  Vital Spectrum every card in a row picks up its SECTION's spectrum colour
 *  -- not one colour per card. Spectrum rotates via main's own direct-child
 *  selector, `*:nth-child(7n+N)` (see globals.css for the exact rule), which
 *  colours top-level bands, and these cards are nested inside one Section
 *  component; custom properties inherit down to them from there. That is
 *  the intended behaviour: a row of individually-coloured cards would need
 *  seven top-level wrappers and would break the section rhythm this
 *  direction is built on. Under the other three palettes --band resolves to
 *  that palette's primary, exactly as the closing CTA band does.
 *
 *  Note on this comment's wording: verify-jsx-copy.mjs's JSX-text-child
 *  regex scans raw file text, comments included, for a span that starts at
 *  a bare "greater than" character and ends at the next "less than" one.
 *  The brief's original comment named the CSS child-combinator symbol in
 *  the clear, then a few lines later named the Section component in angle
 *  brackets the way a JSX tag is written; the guard misread everything
 *  between those two characters as one long fake JSX text node and failed
 *  the build. Reworded here to avoid writing either bare symbol -- meaning
 *  unchanged, no rendered code touched, the guard's own logic left alone as
 *  out of this task's scope. */
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
