import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: "monthly",
    priority: route.path === "/" ? 1 : 0.8,
  }));
}
