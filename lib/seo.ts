import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds page metadata one way, so titles, canonicals and Open Graph tags
 * cannot drift between routes.
 *
 * `description` must be 160 characters or fewer — scripts/verify-site.mjs enforces it.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
    },
  };
}

/**
 * The main local-pack signal available from inside the repo.
 *
 * `openingHours` is deliberately absent: the hours are an unresolved open item in
 * the design spec, and inventing them would publish a wrong fact about the business.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/opengraph-image.jpg`,
    description:
      "Whole-body PEMF wellness sessions in Lake Forest, California. Office and home visits available.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "22706 Aspan St, Suite 504",
      addressLocality: "Lake Forest",
      addressRegion: "CA",
      postalCode: "92630",
      addressCountry: "US",
    },
    areaServed: site.areaServed,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function productSchema({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `${site.url}${image}`,
    brand: { "@type": "Brand", name: "Swiss Bionic Solutions" },
  };
}
