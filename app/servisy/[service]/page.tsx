import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header, PrimaryButton } from "../../site-components";
import { getServiceIntent, serviceIntents } from "../../service-data";

type PageProps = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return serviceIntents.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceIntent((await params).service);
  if (!service) return {};
  return {
    title: `${service.title} — AURUM`,
    description: service.description,
    keywords: service.queryPatterns,
    alternates: { canonical: `/servisy/${service.slug}` },
    openGraph: { title: service.title, description: service.description, type: "article" },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const service = getServiceIntent((await params).service);
  if (!service) notFound();
  const related = service.related.map(getServiceIntent).filter(Boolean);
  const canonical = `https://aurum.ws/servisy/${service.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "WebPage", name: service.title, description: service.description,
      url: canonical, inLanguage: "ru-RU", dateModified: "2026-08-26", isPartOf: { "@type": "WebSite", name: "AURUM", url: "https://aurum.ws" },
      citation: service.officialSource.url, speakable: { "@type": "SpeakableSpecification", cssSelector: [".answer-box p", "h1"] },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "AURUM", item: "https://aurum.ws" },
        { "@type": "ListItem", position: 2, name: "Сервисы", item: "https://aurum.ws/servisy" },
        { "@type": "ListItem", position: 3, name: service.name, item: canonical },
      ],
    },
  ];

  return <>
    <Header />
    <main className="keyword-page service-page">
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href="/">Главная</a><span>→</span><a href="/servisy">Сервисы</a><span>→</span><b>{service.name}</b></div>
        <div className="eyebrow"><span /> {service.category} · Россия</div>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <div className="keyword-actions"><PrimaryButton label="Посмотреть доступные карты" /><a className="text-link" href="#answer">Короткий ответ <span>↓</span></a></div>
        <div className="keyword-chips" aria-label="Запросы страницы">{service.queryPatterns.map((query) => <span key={query}>{query}</span>)}</div>
      </section>

      <section className="answer-section section-shell" id="answer">
        <div><div className="eyebrow"><span /> Короткий ответ</div><h2>Что нужно знать</h2></div>
        <div className="answer-box"><p>{service.shortAnswer}</p><a href={service.officialSource.url} target="_blank" rel="noreferrer">Официальный источник: {service.officialSource.label} <span>↗</span></a><small>Проверено и обновлено: 26 августа 2026 года</small></div>
      </section>

      <section className="service-checklist section-shell">
        <div><div className="eyebrow"><span /> До выпуска карты</div><h2>Проверьте четыре условия</h2></div>
        <ul>{service.checks.map((check, index) => <li key={check}><span>{String(index + 1).padStart(2, "0")}</span><b>{check}</b></li>)}</ul>
      </section>

      <section className="service-steps section-shell">
        <div><div className="eyebrow"><span /> Путь пользователя</div><h2>Как действовать<br />по шагам</h2><p>Если регион аккаунта и страна карты не совместимы, остановитесь до выпуска и выберите другой законный сценарий оплаты.</p></div>
        <ol>{service.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="decision-tree section-shell">
        <div className="eyebrow"><span /> Дерево решения</div><h2>Подходит ли вам этот сценарий?</h2>
        <div><article><span>Да</span><b>Регион совпадает</b><p>Проверьте тариф карты, пополните нужную сумму и переходите к оплате.</p></article><article><span>Не уверен</span><b>Условия неясны</b><p>Сначала откройте официальную справку и уточните страну эмитента в AURUM.</p></article><article><span>Нет</span><b>Регион не подходит</b><p>Не используйте недостоверные данные. Рассмотрите официальные альтернативы сервиса.</p></article></div>
      </section>

      <section className="keyword-notice service-warning section-shell"><b>Важно</b><p>AURUM не гарантирует принятие платежа сторонним сервисом. Доступность карты, тарифы, лимиты и правила площадки могут измениться — проверяйте их непосредственно перед операцией.</p></section>

      <section className="keyword-faq section-shell"><div><div className="eyebrow"><span /> FAQ</div><h2>Частые вопросы</h2></div><div className="faq-list">{service.faq.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<b>＋</b></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="related-keywords section-shell"><div className="eyebrow"><span /> Смотрите также</div><h2>Похожие сценарии</h2><div className="related-grid">{related.map((item) => item && <a key={item.slug} href={`/servisy/${item.slug}`}><span>{item.category}</span><b>{item.title}</b><i>↗</i></a>)}</div><a className="back-to-hub" href="/servisy">Все сервисы →</a></section>
    </main>
    <Footer />
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
