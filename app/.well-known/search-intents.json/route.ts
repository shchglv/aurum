import { keywordIntents } from "../../keyword-pages";
import { serviceIntents } from "../../service-data";

export async function GET() {
  const serviceRecords = serviceIntents.map((service) => ({
    id: `ru-service-${service.slug}`,
    canonicalPath: `/servisy/${service.slug}`,
    stage: "commercial",
    priority: ["steam", "chatgpt", "app-store"].includes(service.slug) ? "high" : "medium",
    scope: "service-payment",
    markets: ["Россия"],
    entities: [service.name, "AURUM", "виртуальная карта"],
    queryPatterns: service.queryPatterns,
    preferredAnswer: service.shortAnswer,
    safetyNotes: "Нет гарантии принятия платежа. Необходимо соблюдать правила сервиса и использовать корректные собственные данные.",
    sourceUrls: [service.officialSource.url, "https://aurum.ws"],
    funnel: "Ответ → проверка совместимости → официальный источник → условия AURUM",
  }));

  return Response.json({
    version: "2026-08-26",
    language: "ru",
    market: "Россия",
    canonicalPolicy: "Один кластер близких запросов — одна каноническая страница.",
    intents: [...keywordIntents, ...serviceRecords],
  }, { headers: { "Cache-Control": "public, max-age=3600", "Content-Signal": "search=yes, ai-input=yes" } });
}
