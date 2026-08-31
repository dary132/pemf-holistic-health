import Image from "next/image";
import type { Img } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";
import { TONE_BG, type Tone } from "@/lib/tones";
import { HeadingText } from "@/components/PemfWord";
import { blurFor } from "@/lib/content/blur";

/** Two-column image and text band. Stacks to one column below 900px.
 *
 *  The image sits in a `u-plate` -- the bordered, 12px-radius, shadowless
 *  plate the Clinical direction is built on -- rather than the soft
 *  `rounded-3xl ... shadow-sm` card this used before the 2026-08-26 roll-out.
 *  PanelGrid already used u-plate, so aligning this one (and Figure, and
 *  FrequencyCard) is what makes the nine inner pages match the home page
 *  instead of mixing two card languages on the same site. */
export function SplitBand({
  heading,
  image,
  title,
  titleAs: Heading = "h2",
  paragraphs = [],
  bullets = [],
  reverse = false,
  tone,
  frame = "plate",
  children,
}: {
  /** Section-level h2 above the band, inside the same block -- exactly as on
   *  PanelGrid. Use with `titleAs="h3"` so the band's own title nests under it. */
  heading?: string;
  image: Img;
  title?: string;
  /** "h3" when the band sits under a section-level h2 (its own `heading`, or
   *  a preceding band's). */
  titleAs?: "h2" | "h3";
  paragraphs?: string[];
  /** Parallel one-line claims, rendered as a marked list. See the field of
   *  the same name on Panel in lib/content/types.ts. */
  bullets?: string[];
  reverse?: boolean;
  /** Ground tint; omitted means the cream page ground shows through. */
  tone?: Tone;
  /** "open" drops the bordered plate around the image, added 2026-08-28 at
   *  the client's request for larger images with less card chrome: the image
   *  sits directly on the band ground with its own rounded corners, so the
   *  artwork itself carries the block instead of a border. */
  frame?: "plate" | "open";
  children?: React.ReactNode;
}) {
  const imgClass = image.contain
    ? frame === "open"
      ? "mx-auto h-auto w-full object-contain rounded-2xl"
      : "mx-auto h-auto w-full object-contain"
    : frame === "open"
      ? "h-auto w-full object-cover rounded-2xl"
      : "h-auto w-full object-cover rounded-lg";
  return (
    <div className={tone && TONE_BG[tone]}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        {heading && (
          <h2 data-reveal className="mb-10">
            <HeadingText text={heading} />
          </h2>
        )}
        {/* 55/45 in the image's favour (was 50/50) -- the client asked for
            larger images, 2026-08-28. The template flips with `reverse`
            because the image div moves to the SECOND column via lg:order-2;
            a fixed template would hand the reversed image the narrow track. */}
        <div
          className={`grid items-center gap-10 ${
            reverse ? "lg:grid-cols-[9fr_11fr]" : "lg:grid-cols-[11fr_9fr]"
          }`}
        >
          <div data-reveal className={reverse ? "lg:order-2" : undefined}>
            {/* In the open frame the wrapper div stays but carries no plate
                styling -- keeping the element tree identical between frames
                is what lets verify-jsx-copy's tag scanner parse this file. */}
            <div className={frame === "plate" ? "u-plate p-3" : undefined}>
              <Image
                src={image.src}
                {...blurFor(image.src)}
                alt={image.decorative ? "" : image.alt}
                aria-hidden={image.decorative || undefined}
                unoptimized={isSvg(image.src)}
                width={900}
                height={700}
                className={imgClass}
              />
            </div>
          </div>
          <div data-reveal>
            {title && (
              <>
                <Heading className="text-3xl">
                  <HeadingText text={title} />
                </Heading>
                <span className="u-accent-rule" />
              </>
            )}
            {paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[62ch] text-ink-soft">
                {p}
              </p>
            ))}
            {bullets.length > 0 && (
              <ul className="u-bullets mt-6 text-ink-soft">
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
