import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const shell =
  "flex flex-col overflow-hidden rounded-3xl border border-rule bg-white shadow-sm";

export function Card({
  image,
  alt,
  eyebrow,
  title,
  body,
  imageAspect = "aspect-[4/3]",
  imageFit = "cover",
  href,
  cta,
  children,
}: {
  image?: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  /** Tailwind aspect ratio for the image well. */
  imageAspect?: string;
  /** Banner artwork with text baked in needs `contain` so nothing is cropped. */
  imageFit?: "cover" | "contain";
  /** When set, the card title becomes a link to this route. */
  href?: string;
  cta?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className={href ? `${shell} transition-shadow hover:shadow-md` : shell}>
      {image && (
        <Image
          src={image}
          alt={alt ?? title}
          width={800}
          height={600}
          className={`w-full ${imageAspect} ${
            imageFit === "contain" ? "bg-white object-contain p-2" : "object-cover"
          }`}
        />
      )}
      <div className="flex grow flex-col p-6">
        {/* The eyebrow was text-xs with tracking-widest: the smallest, most
            letterspaced text on the site, and all-caps on top of that. Wide
            tracking breaks a word into loose letters, which is the opposite of
            what an older reader needs. Larger and closer, still an eyebrow. */}
        {eyebrow && (
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-clay">
            {eyebrow}
          </p>
        )}
        <h3 className="text-xl text-sage">
          {href ? (
            <Link
              href={href}
              className="inline-flex min-h-[48px] items-center underline underline-offset-4 hover:text-clay"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {body && <p className="mt-2 grow text-base leading-relaxed text-ink-soft">{body}</p>}
        {children}
        {cta && (
          <a
            href={cta.href}
            className="mt-5 inline-flex min-h-[56px] items-center justify-center rounded-full bg-button px-6 py-2.5 text-center text-base font-bold text-button-ink transition-colors hover:bg-button-hover"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

/** A Smart Pulser frequency zone. `range` is kept as a stable key by callers
 *  but not rendered here: `name` already carries its Hz range verbatim (e.g.
 *  "The Deep Recovery Zone (0.5–4 Hz):"), so showing `range` too would repeat
 *  the numbers and strand a trailing colon mid-card. */
export function FrequencyCard({ name, body }: { range: string; name: string; body: string }) {
  return (
    <div data-reveal className="u-plate p-5">
      <p className="font-bold text-sage">{name}</p>
      <p className="mt-2 text-base leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

/** Full-width lifestyle artwork used to open a block. */
export function Banner({
  image,
  alt,
  caption,
  aspect = "aspect-[3/1]",
}: {
  image: string;
  alt: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-rule bg-white shadow-sm">
      <Image
        src={image}
        alt={alt}
        width={1440}
        height={480}
        className={`w-full ${aspect} object-cover`}
      />
      {caption && (
        <figcaption className="px-5 py-3 text-base text-ink-soft">{caption}</figcaption>
      )}
    </figure>
  );
}
