import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { categories } from "@/content/services";
import { getArticles } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/approach", "/journey", "/industries", "/manufacturing", "/marketing", "/about", "/insights", "/navigator", "/contact", "/privacy", "/terms"];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${site.url}/services/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getArticles().map((a) => ({ url: `${site.url}/insights/${a.slug}`, lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
