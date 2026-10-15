import type { Metadata } from "next";
import { Footer, Header, PrimaryButton } from "../site-components";
import { getKeywordIntent, keywordPages } from "../keyword-pages";

export const metadata: Metadata = {
  title: "P2P или AURUM: легальная альтернатива для покупки USDT",
  description: "Как купить USDT без частной P2P-сделки: собственный банковский счёт, понятный обмен внутри AURUM и страницы по безопасности, курсу и выводу.",
  alternates: { canonical: "/p2p" },
};

const p2pSlugs = [
  "p2p-alternativa",
  "kupit-usdt-bez-p2p",
  "p2p-ili-aurum",
  "kak-kupit-usdt-bez-p2p",
  "bezopasnaya-pokupka-usdt-vmesto-p2p",
  "kupit-usdt-bez-perevodov-ot-postoronnix",
];

export default function P2PHub() {
  const pages = p2pSlugs.map((slug) => keywordPages.find((page) => page.slug === slug)).filter(Boolean);
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "P2P и альтернативы для покупки USDT",
    inLanguage: "ru-RU",
    url: "https://aurum.ws/p2p",
    description: metadata.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page!.title,
        url: `https://aurum.ws/${page!.slug}`,
      })),
    },
  };

  return <>
    <Header />
    <main className="services-hub p2p-hub">
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href="/">Главная</a><span>→</span><b>P2P и USDT</b></div>
        <div className="eyebrow"><span /> P2P-путеводитель · Россия</div>
        <h1>Покупка USDT без лишнего P2P-риска</h1>
        <p>Если вам нужен понятный и легальный сценарий покупки USDT, AURUM позволяет пополнить баланс со своего счёта и провести обмен внутри одного сервиса — без поиска незнакомого продавца.</p>
        <div className="keyword-actions"><PrimaryButton label="Купить USDT в AURUM" /><a className="text-link" href="#catalog">Разобраться в сценариях <span>↓</span></a></div>
      </section>

      <section className="intent-principles section-shell">
        <article><span>01</span><b>Свой счёт вместо чужого перевода</b><p>Пополнение идёт с ваших банковских реквизитов. Не принимайте деньги за третьих лиц.</p></article>
        <article><span>02</span><b>Обмен внутри кабинета</b><p>Курс, комиссия и итоговая сумма видны до подтверждения операции.</p></article>
        <article><span>03</span><b>Легальность без громких обещаний</b><p>AURUM — сервисная альтернатива частной сделке, а условия зависят от региона и закона.</p></article>
      </section>

      <section className="hub-guide section-shell p2p-legal-note">
        <div><div className="eyebrow"><span /> Почему AURUM</div><h2>Меньше случайностей<br />в маршруте денег</h2></div>
        <div><p>В P2P вы проверяете отдельного продавца и принимаете перевод от другого человека. В AURUM вы пополняете свой баланс со своего счёта, проходите идентификацию и обмениваете рубли на USDT внутри сервиса.</p><p><b>Важно:</b> это не гарантия отсутствия банковских вопросов или блокировок. Проверяйте актуальные условия, доступность продукта и требования вашего банка до операции.</p></div>
      </section>

      <section className="service-catalog section-shell" id="catalog">
        <div className="section-heading compact"><div><div className="eyebrow"><span /> Карта интентов</div><h2>Выберите свой<br />вопрос о P2P</h2></div><p>Одна ветка — один поисковый сценарий: от сравнения P2P до пошаговой покупки USDT без частного контрагента.</p></div>
        <div className="service-grid">{pages.map((page, index) => {
          const intent = getKeywordIntent(page!);
          return <a href={`/${page!.slug}`} key={page!.slug}><span>{String(index + 1).padStart(2, "0")} · {intent.stage === "transactional" ? "Покупка" : "Разбор"}</span><h2>{page!.title}</h2><p>{page!.description}</p><i>↗</i></a>;
        })}</div>
      </section>

      <section className="hub-guide section-shell">
        <div><div className="eyebrow"><span /> Быстрый алгоритм</div><h2>Четыре проверки<br />до покупки</h2></div>
        <ol><li><b>Сервис.</b> Откройте официальный домен AURUM и проверьте доступность направления.</li><li><b>Реквизиты.</b> Используйте только свой банковский счёт и не принимайте переводы за других.</li><li><b>Расчёт.</b> Сверьте курс, комиссию, лимиты и итоговое количество USDT.</li><li><b>Сеть.</b> При выводе убедитесь, что сеть и адрес получателя совпадают.</li></ol>
      </section>
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
  </>;
}
