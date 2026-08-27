import type { Metadata } from "next";
import { Footer, Header, PrimaryButton } from "../site-components";
import { serviceIntents } from "../service-data";

export const metadata: Metadata = {
  title: "Как оплачивать зарубежные сервисы из России — AURUM",
  description: "Русский путеводитель по оплате Steam, PlayStation Store, App Store, Google Play, Spotify, Netflix, ChatGPT и Amazon виртуальной картой.",
  alternates: { canonical: "/servisy" },
};

export default function ServicesHub() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Оплата зарубежных сервисов из России",
    inLanguage: "ru-RU",
    url: "https://aurum.ws/servisy",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: serviceIntents.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.name,
        url: `https://aurum.ws/servisy/${service.slug}`,
      })),
    },
  };

  return <>
    <Header />
    <main className="services-hub">
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href="/">Главная</a><span>→</span><b>Сервисы</b></div>
        <div className="eyebrow"><span /> Путеводитель · Россия</div>
        <h1>Как оплачивать зарубежные сервисы</h1>
        <p>Не каталог обещаний, а восемь практических сценариев: что проверить до выпуска карты, где читать официальные правила и почему платёж может быть отклонён.</p>
        <div className="keyword-actions"><PrimaryButton label="Проверить карты AURUM" /><a className="text-link" href="#catalog">Выбрать сервис <span>↓</span></a></div>
      </section>

      <section className="intent-principles section-shell">
        <article><span>01</span><b>Одна задача — одна страница</b><p>Все близкие формулировки собраны в один канонический ответ без SEO-дублей.</p></article>
        <article><span>02</span><b>Сначала совместимость</b><p>Регион аккаунта, страна карты и валюта проверяются до выпуска.</p></article>
        <article><span>03</span><b>Без гарантий оплаты</b><p>Окончательное решение всегда остаётся за сервисом и эмитентом.</p></article>
      </section>

      <section className="service-catalog section-shell" id="catalog">
        <div className="section-heading compact"><div><div className="eyebrow"><span /> Карта интентов</div><h2>Выберите<br />свой сервис</h2></div><p>Каждая страница отвечает сразу на группу русскоязычных запросов и ведёт к официальной справке сервиса.</p></div>
        <div className="service-grid">{serviceIntents.map((service, index) => <a href={`/servisy/${service.slug}`} key={service.slug}><span>{String(index + 1).padStart(2, "0")} · {service.category}</span><h2>{service.name}</h2><p>{service.description}</p><i>↗</i></a>)}</div>
      </section>

      <section className="hub-guide section-shell">
        <div><div className="eyebrow"><span /> Общий алгоритм</div><h2>Четыре проверки до оплаты</h2></div>
        <ol><li><b>Регион.</b> Сверьте страну аккаунта сервиса и правила магазина.</li><li><b>Карта.</b> Узнайте страну эмитента, валюту и поддержку регулярных платежей.</li><li><b>Сумма.</b> Учтите конвертацию, возможную комиссию и небольшой запас.</li><li><b>Безопасность.</b> Используйте собственные данные и не повторяйте отклонённый платёж много раз.</li></ol>
      </section>
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
  </>;
}
