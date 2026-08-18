import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-sage">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-clay">
                  {item.name}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink-soft/50">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  );
}
