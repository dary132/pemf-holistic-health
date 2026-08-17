import Image from "next/image";
import type { ReactNode } from "react";

const shell =
  "flex flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm";

export function Card({
  image,
  alt,
  eyebrow,
  title,
  body,
  imageAspect = "aspect-[4/3]",
  imageFit = "cover",
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
  cta?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className={shell}>
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
        {eyebrow && (
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h3 className="font-display text-xl text-brand-dark">{title}</h3>
        {body && <p className="mt-2 grow text-base leading-relaxed text-ink-soft">{body}</p>}
        {children}
        {cta && (
          <a
            href={cta.href}
            className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

/** A Smart Pulser frequency zone. The Hz range is the visual anchor. */
export function FrequencyCard({
  range,
  name,
  body,
}: {
  range: string;
  name: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm">
      <p className="font-display text-2xl text-accent">{range}</p>
      <p className="mt-1 font-medium text-brand-dark">{name}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
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
    <figure className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm">
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
