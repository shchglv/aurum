import type { Metadata } from "next";
import { Footer, PrimaryButton } from "./site-components";
import { getLocaleCopy, getLocalizedPage, localizedLocales, localizedPages, type LocalizedLocale } from "./localized-pages";

const base = "https://aurum.ws";

export function localizedMetadata(locale: LocalizedLocale, slug?: string): Metadata {
  const page = slug ? getLocalizedPage(locale, slug) : undefined;
  const copy = getLocaleCopy(locale);
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  return {
    title: page?.title ?? copy.hubTitle,
    description: page?.description ?? copy.hubDescription,
    keywords: page ? [page.primaryKeyword, ...page.keywords] : undefined,
    alternates: { canonical: path, languages: Object.fromEntries(localizedLocales.map((item) => [item, `${base}/${item}${slug ? `/${slug}` : ""}`])) },
    openGraph: { title: page?.title ?? copy.hubTitle, description: page?.description ?? copy.hubDescription, type: "article", url: `${base}${path}` },
  };
}

function LocalizedHeader({ locale }: { locale: LocalizedLocale }) {
  const copy = getLocaleCopy(locale);
  return <header className="site-header"><div className="section-shell header-inner">
    <a className="brand" href={`/${locale}`} aria-label="AURUM"><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a>
    <nav aria-label="Language navigation"><a href={`/${locale}`}>{copy.home}</a><a href="/kripto">RU</a>{localizedLocales.filter((item) => item !== locale).map((item) => <a key={item} href={`/${item}`}>{getLocaleCopy(item).label}</a>)}</nav>
    <a className="header-cta" href="https://vk.cc/d0ovkk" target="_blank" rel="noreferrer">{copy.open} <span>↗</span></a>
  </div></header>;
}

export function LocalizedHub({ locale }: { locale: LocalizedLocale }) {
  const copy = getLocaleCopy(locale);
  const pages = localizedPages[locale];
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", name: copy.hubTitle, url: `${base}/${locale}`, inLanguage: locale, mainEntity: { "@type": "ItemList", itemListElement: pages.map((page, index) => ({ "@type": "ListItem", position: index + 1, name: page.title, url: `${base}/${locale}/${page.slug}` })) } };
  return <><LocalizedHeader locale={locale} /><main className="services-hub"><section className="keyword-hero section-shell"><div className="breadcrumbs"><a href={`/${locale}`}>{copy.home}</a><span>→</span><b>{copy.name}</b></div><div className="eyebrow"><span /> {copy.label} · AURUM</div><h1>{copy.hubTitle}</h1><p>{copy.hubDescription}</p><div className="keyword-actions"><PrimaryButton label={copy.open} /><a className="text-link" href="#catalog">{copy.catalog} <span>↓</span></a></div></section><section className="service-catalog section-shell" id="catalog"><div className="section-heading compact"><div><div className="eyebrow"><span /> {copy.label}</div><h2>{copy.catalog}</h2></div><p>{copy.note}</p></div><div className="service-grid">{pages.map((page, index) => <a href={`/${locale}/${page.slug}`} key={page.slug}><span>{String(index + 1).padStart(2, "0")} · {page.eyebrow}</span><h2>{page.title}</h2><p>{page.description}</p><i>↗</i></a>)}</div></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} /></>;
}

export function LocalizedPage({ locale, slug }: { locale: LocalizedLocale; slug: string }) {
  const copy = getLocaleCopy(locale); const page = getLocalizedPage(locale, slug); if (!page) return null;
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "AURUM", item: base }, { "@type": "ListItem", position: 2, name: copy.name, item: `${base}/${locale}` }, { "@type": "ListItem", position: 3, name: page.title, item: `${base}/${locale}/${slug}` }] };
  return <><LocalizedHeader locale={locale} /><main className="keyword-page"><section className="keyword-hero section-shell"><div className="breadcrumbs"><a href={`/${locale}`}>{copy.home}</a><span>→</span><b>{page.primaryKeyword}</b></div><div className="eyebrow"><span /> {page.eyebrow}</div><h1>{page.title}</h1><p className="intent-answer">{page.intro}</p><div className="keyword-actions"><PrimaryButton label={copy.open} /><a className="text-link" href="#details">{copy.more} <span>↓</span></a></div><div className="keyword-chips" aria-label="Keywords">{page.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></section><section className="keyword-highlights section-shell">{page.highlights.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</section><section className="keyword-content section-shell" id="details"><aside><div className="eyebrow"><span /> {copy.label}</div><p>{copy.note}</p><PrimaryButton label={copy.open} /></aside><div className="keyword-article">{page.sections.map((section, index) => <article key={section.title}><span className="article-number">0{index + 1}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</article>)}<div className="keyword-notice"><b>Важно</b><p>{copy.note}</p></div></div></section><section className="keyword-faq section-shell"><div><div className="eyebrow"><span /> FAQ</div><h2>{copy.faq}</h2></div><div className="faq-list">{page.faq.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<b>＋</b></summary><p>{item.answer}</p></details>)}</div></section><section className="related-keywords section-shell"><div className="eyebrow"><span /> {copy.catalog}</div><h2>{copy.more}</h2><div className="related-grid">{page.related.map((related) => <a key={related} href={`/${locale}/${related}`}><span>{copy.label}</span><b>{getLocalizedPage(locale, related)?.title}</b><i>↗</i></a>)}</div></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /></>;
}

