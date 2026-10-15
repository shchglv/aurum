import type { Metadata } from "next";
import { Footer, Header, PrimaryButton } from "../site-components";
import { getKeywordIntent, keywordPages } from "../keyword-pages";

export const metadata: Metadata = {
  title: "Переводы на карты зарубежных банков — AURUM",
  description: "Гид по международным переводам на карты зарубежных банков: страны, валюты, комиссии, сроки и проверка реквизитов в AURUM.",
  alternates: { canonical: "/perevody" },
};

const transferSlugs = [
  "perevody-na-zarubezhnuyu-kartu",
  "perevod-deneg-na-kartu-zarubezhnogo-banka",
  "otpravit-dengi-za-granicu-na-kartu",
  "perevod-na-kartu-visa-mastercard-za-granicej",
  "komissiya-perevoda-na-zarubezhnuyu-kartu",
];

export default function TransfersHub() {
  const pages = transferSlugs.map((slug) => keywordPages.find((page) => page.slug === slug)).filter(Boolean);
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Переводы на карты зарубежных банков",
    inLanguage: "ru-RU",
    url: "https://aurum.ws/perevody",
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
    <main className="services-hub transfers-hub">
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href="/">Главная</a><span>→</span><b>Переводы</b></div>
        <div className="eyebrow"><span /> Международные переводы · Россия</div>
        <h1>Переводы на карты зарубежных банков</h1>
        <p>Разберитесь, как отправить деньги за границу на карту другого банка: проверка получателя, валюта, курс, комиссия, сроки и ограничения конкретного направления.</p>
        <div className="keyword-actions"><PrimaryButton label="Проверить переводы AURUM" /><a className="text-link" href="#catalog">Выбрать сценарий <span>↓</span></a></div>
      </section>

      <section className="intent-principles section-shell">
        <article><span>01</span><b>Реквизиты без ошибок</b><p>Имя, страна и карта получателя должны совпадать с требованиями банка.</p></article>
        <article><span>02</span><b>Расчёт до подтверждения</b><p>Проверьте валюту, курс, комиссию и сумму к зачислению до отправки.</p></article>
        <article><span>03</span><b>Только доступные направления</b><p>Страны, банки и лимиты зависят от актуальных правил сервиса и комплаенса.</p></article>
      </section>

      <section className="hub-guide section-shell transfers-legal-note">
        <div><div className="eyebrow"><span /> Что важно знать</div><h2>Международный перевод<br />начинается с проверки</h2></div>
        <div><p>Visa или Mastercard сами по себе не гарантируют зачисление. Важны страна эмитента, банк получателя, валюта, лимит и разрешение на входящие операции.</p><p><b>Важно:</b> используйте только реальные реквизиты и правдивые сведения. Не дробите операции и не пытайтесь обходить ограничения — при сомнении уточните доступное направление в официальной поддержке.</p></div>
      </section>

      <section className="service-catalog section-shell" id="catalog">
        <div className="section-heading compact"><div><div className="eyebrow"><span /> Карта интентов</div><h2>Выберите свой<br />вопрос о переводах</h2></div><p>Каждая страница отвечает на отдельный запрос: от первого перевода до расчёта комиссии и проверки Visa/Mastercard.</p></div>
        <div className="service-grid">{pages.map((page, index) => {
          const intent = getKeywordIntent(page!);
          return <a href={`/${page!.slug}`} key={page!.slug}><span>{String(index + 1).padStart(2, "0")} · {intent.stage === "transactional" ? "Перевод" : "Гид"}</span><h2>{page!.title}</h2><p>{page!.description}</p><i>↗</i></a>;
        })}</div>
      </section>

      <section className="hub-guide section-shell">
        <div><div className="eyebrow"><span /> Быстрый алгоритм</div><h2>Пять проверок<br />до отправки</h2></div>
        <ol><li><b>Получатель.</b> Уточните имя, страну, банк и реквизиты напрямую.</li><li><b>Валюта.</b> Узнайте, в какой валюте банк зачислит перевод.</li><li><b>Стоимость.</b> Сверьте курс, комиссию и итоговую сумму к получению.</li><li><b>Лимиты.</b> Проверьте ограничения и необходимость дополнительных документов.</li><li><b>Статус.</b> Сохраните чек и дождитесь финального статуса, не создавая дубликат.</li></ol>
      </section>
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
  </>;
}
