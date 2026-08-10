import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aurum.ws";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/usdt`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/virtual-card`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
