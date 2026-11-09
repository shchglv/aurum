import { keywordIntents } from "../../keyword-pages";
import { serviceIntents } from "../../service-data";
import { localizedLocales, localizedPages } from "../../localized-pages";
import { exchangeIntents } from "../../exchange-pages";

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
  const localizedRecords = localizedLocales.flatMap((locale) => localizedPages[locale].map((page) => ({
    id: `${locale}-${page.slug}`,
    canonicalPath: `/${locale}/${page.slug}`,
    stage: page.slug === "buy-usdt" ? "transactional" : "commercial",
    priority: "medium",
    scope: "crypto-transfers",
    markets: [locale === "tg" ? "Таджикистан" : locale === "ky" ? "Кыргызстан" : "Узбекистан"],
    entities: [page.eyebrow, page.primaryKeyword, "AURUM"],
    queryPatterns: [page.primaryKeyword, ...page.keywords],
    preferredAnswer: page.intro,
    safetyNotes: "Проверяйте актуальные условия, лимиты, тарифы и доступность направления в кабинете AURUM.",
    sourceUrls: ["https://aurum.ws", `https://aurum.ws/${locale}`],
    funnel: "Ответ → проверка условий → AURUM",
  })));

  return Response.json({
    version: "2026-11-09",
    language: "ru",
    market: "Россия",
    canonicalPolicy: "Один кластер близких запросов — одна каноническая страница.",
    intents: [...keywordIntents, ...serviceRecords, ...localizedRecords, ...exchangeIntents],
  }, { headers: { "Cache-Control": "public, max-age=3600", "Content-Signal": "search=yes, ai-input=yes" } });
}
