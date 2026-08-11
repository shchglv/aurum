import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKeywordPage, keywordPages } from "../keyword-pages";
import { Footer, Header, PrimaryButton } from "../site-components";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return keywordPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getKeywordPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.keywords],
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, type: "article" },
  };
}

export default async function KeywordLanding({ params }: PageProps) {
  const { slug } = await params;
  const page = getKeywordPage(slug);
  if (!page) notFound();
  const relatedPages = page.related.map(getKeywordPage).filter(Boolean);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AURUM", item: "https://aurum.ws" },
      { "@type": "ListItem", position: 2, name: page.title, item: `https://aurum.ws/${page.slug}` },
    ],
  };

  return <>
    <Header />
    <main className="keyword-page">
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href="/">Главная</a><span>→</span><b>{page.primaryKeyword}</b></div>
        <div className="eyebrow"><span /> {page.eyebrow}</div>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <div className="keyword-actions"><PrimaryButton label="Открыть AURUM" /><a className="text-link" href="#details">Разобраться подробнее <span>↓</span></a></div>
        <div className="keyword-chips" aria-label="Связанные запросы">{page.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
      </section>

      <section className="keyword-highlights section-shell" aria-label="Преимущества">
        {page.highlights.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
      </section>

      <section className="keyword-content section-shell" id="details">
        <aside>
          <div className="eyebrow"><span /> Коротко о главном</div>
          <p>Страница отвечает на запрос «{page.primaryKeyword}» и объясняет условия без скрытых обещаний.</p>
          <PrimaryButton label="Перейти в кошелёк" />
        </aside>
        <div className="keyword-article">
          {page.sections.map((section, index) => <article key={section.title}>
            <span className="article-number">0{index + 1}</span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </article>)}
          <div className="keyword-notice"><b>Важно</b><p>Актуальные тарифы, лимиты, доступные сети и карточные продукты всегда проверяйте в личном кабинете перед подтверждением операции.</p></div>
        </div>
      </section>

      <section className="keyword-faq section-shell">
        <div><div className="eyebrow"><span /> FAQ</div><h2>Частые вопросы</h2></div>
        <div className="faq-list">{page.faq.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<b>＋</b></summary><p>{item.answer}</p></details>)}</div>
      </section>

      {relatedPages.length > 0 && <section className="related-keywords section-shell"><div className="eyebrow"><span /> Смотрите также</div><h2>Полезные страницы</h2><div>{relatedPages.map((related) => related && <a key={related.slug} href={`/${related.slug}`}><span>{related.eyebrow}</span><b>{related.title}</b><i>↗</i></a>)}</div></section>}
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
  </>;
}
