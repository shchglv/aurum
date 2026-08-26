import type { MetadataRoute } from "next";
import { keywordPages } from "./keyword-pages";
import { serviceIntents } from "./service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aurum.ws";
  return [
    { url: base, lastModified: "2026-08-26", changeFrequency: "weekly", priority: 1 },
    { url: `${base}/usdt`, lastModified: "2026-08-26", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/virtual-card`, lastModified: "2026-08-26", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/servisy`, lastModified: "2026-08-26", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, lastModified: "2026-08-26", changeFrequency: "monthly", priority: 0.7 },
    ...keywordPages.map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified: "2026-08-26",
      changeFrequency: "monthly" as const,
      priority: page.slug === "foreign-card" || page.slug === "usdt-safe" ? 0.9 : 0.8,
    })),
    ...serviceIntents.map((service) => ({
      url: `${base}/servisy/${service.slug}`,
      lastModified: "2026-08-26",
      changeFrequency: "monthly" as const,
      priority: service.slug === "steam" || service.slug === "chatgpt" ? 0.9 : 0.8,
    })),
  ];
}
