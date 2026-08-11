import type { MetadataRoute } from "next";
import { keywordPages } from "./keyword-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aurum.ws";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/usdt`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/virtual-card`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.7 },
    ...keywordPages.map((page) => ({
      url: `${base}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: page.slug === "foreign-card" || page.slug === "usdt-safe" ? 0.9 : 0.8,
    })),
  ];
}
