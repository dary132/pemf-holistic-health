import Image from "next/image";
import type { Img } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";

/** Two-column image and text band. Stacks to one column below 900px. */
export function SplitBand({
  image,
  title,
  paragraphs = [],
  reverse = false,
  tinted = false,
  children,
}: {
  image: Img;
  title?: string;
  paragraphs?: string[];
  reverse?: boolean;
  tinted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={reverse ? "lg:order-2" : undefined}>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <Image
                src={image.src}
                alt={image.decorative ? "" : image.alt}
                aria-hidden={image.decorative || undefined}
                unoptimized={isSvg(image.src)}
                width={900}
                height={700}
                className={
                  image.contain
                    ? "mx-auto h-auto w-full object-contain"
                    : "h-auto w-full rounded-2xl object-cover"
                }
              />
            </div>
          </div>
          <div>
            {title && <h2 className="text-3xl">{title}</h2>}
            {paragraphs.map((p) => (
              <p key={p} className="mt-4 max-w-[62ch] text-ink-soft">
                {p}
              </p>
            ))}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
