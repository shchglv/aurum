import type { Metadata } from "next";
import { Footer, Header, PrimaryButton } from "../site-components";
import { exchangePages } from "../exchange-pages";
import { SITE_URL } from "../site-config";

export const metadata: Metadata = {
  title: "Топ-10 криптобирж: USDT, комиссии и вывод на карту — AURUM",
  description: "Брендовый SEO-гид по Binance, Crypto.com, Coinbase, Upbit, OKX, Bybit, Bitget, Gate, KuCoin и MEXC: покупка USDT, вывод и комиссии.",
  alternates: { canonical: "/birzhi" },
};

export default function ExchangesHub() {
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", name: metadata.title, url: `${SITE_URL}/birzhi`, inLanguage: "ru-RU", mainEntity: { "@type": "ItemList", itemListElement: exchangePages.map((page, index) => ({ "@type": "ListItem", position: index + 1, name: page.title, url: `${SITE_URL}/birzhi/${page.slug}` })) } };
  return <><Header /><main className="services-hub"><section className="keyword-hero section-shell"><div className="breadcrumbs"><a href="/">Главная</a><span>→</span><b>Криптобиржи</b></div><div className="eyebrow"><span /> Брендовые интенты · Россия</div><h1>Топ-10 криптобирж и понятный маршрут USDT</h1><p>Страницы под брендовые запросы о Binance, Crypto.com, Coinbase, Upbit, OKX, Bybit, Bitget, Gate, KuCoin и MEXC — с фокусом на покупку, перевод, вывод и комиссию.</p><div className="keyword-actions"><PrimaryButton label="Открыть кошелёк" /><a className="text-link" href="#catalog">Выбрать биржу <span>↓</span></a></div></section><section className="intent-principles section-shell"><article><span>01</span><b>Проверяйте официальный домен</b><p>Брендовый запрос не заменяет проверку URL, приложения и условий конкретной биржи.</p></article><article><span>02</span><b>Сверяйте сеть и комиссию</b><p>USDT в разных сетях — разные адреса, скорость и сетевые расходы.</p></article><article><span>03</span><b>Используйте свои реквизиты</b><p>AURUM помогает выстроить понятный маршрут без переводов от случайных контрагентов.</p></article></section><section className="service-catalog section-shell" id="catalog"><div className="section-heading compact"><div><div className="eyebrow"><span /> Карта брендовых интентов</div><h2>Выберите биржу<br />и сценарий</h2></div><p>Каждая страница объединяет навигационный брендовый запрос и коммерческий сценарий: купить USDT, вывести на карту или проверить комиссию.</p></div><div className="service-grid">{exchangePages.map((page, index) => <a href={`/birzhi/${page.slug}`} key={page.slug}><span>{String(index + 1).padStart(2, "0")} · {page.brand}</span><h2>{page.title}</h2><p>{page.description}</p><i>↗</i></a>)}</div></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} /></>;
}
