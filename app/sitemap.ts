import type { MetadataRoute } from "next";
import { keywordPages } from "./keyword-pages";
import { serviceIntents } from "./service-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aurum.ws";
  return [
    { url: base, lastModified: "2026-11-09", changeFrequency: "weekly", priority: 1 },
    { url: `${base}/usdt`, lastModified: "2026-11-09", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/p2p`, lastModified: "2026-10-15", changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/perevody`, lastModified: "2026-10-15", changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/virtual-card`, lastModified: "2026-11-09", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/servisy`, lastModified: "2026-11-09", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, lastModified: "2026-11-09", changeFrequency: "monthly", priority: 0.7 },
    ...keywordPages.map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified: "2026-11-09",
      changeFrequency: "monthly" as const,
      priority: ["foreign-card", "usdt-safe", "p2p-alternativa", "kupit-usdt-bez-p2p", "p2p-ili-aurum", "perevody-na-zarubezhnuyu-kartu", "perevod-deneg-na-kartu-zarubezhnogo-banka", "otpravit-dengi-za-granicu-na-kartu"].includes(page.slug) ? 0.9 : 0.8,
    })),
    ...serviceIntents.map((service) => ({
      url: `${base}/servisy/${service.slug}`,
      lastModified: "2026-11-09",
      changeFrequency: "monthly" as const,
      priority: service.slug === "steam" || service.slug === "chatgpt" ? 0.9 : 0.8,
    })),
  ];
}
