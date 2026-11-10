import type { Metadata } from "next";
import { Footer, Header, PrimaryButton } from "./site-components";
import { getLocaleCopy, getLocalizedPage, localizedLocales, localizedPages, type LocalizedLocale } from "./localized-pages";
import { getLocaleUi } from "./localized-ui";
import { SITE_URL } from "./site-config";

const base = SITE_URL;

export function localizedMetadata(locale: LocalizedLocale, slug?: string): Metadata {
  const page = slug ? getLocalizedPage(locale, slug) : undefined;
  const copy = getLocaleCopy(locale);
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  return {
    title: page?.title ?? copy.hubTitle,
    description: page?.description ?? copy.hubDescription,
    keywords: page ? [page.primaryKeyword, ...page.keywords] : undefined,
    alternates: {
      canonical: path,
      languages: slug
        ? Object.fromEntries(localizedLocales.map((item) => [item, `${base}/${item}/${slug}`]))
        : { ru: base, "x-default": base, ...Object.fromEntries(localizedLocales.map((item) => [item, `${base}/${item}`])) },
    },
    openGraph: { title: page?.title ?? copy.hubTitle, description: page?.description ?? copy.hubDescription, type: "article", url: `${base}${path}` },
  };
}

function HeroVisual({ rateLabel, rateNote }: { rateLabel: string; rateNote: string }) {
  return (
    <div className="hero-visual" aria-label="AURUM">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <img className="hero-shadow-image" src="/source/hero-shadow.png" alt="" aria-hidden="true" />
      <div className="float-pill pill-rub">₽ <span>RUB</span></div>
      <div className="float-pill pill-usdt">₮ <span>USDT</span></div>
      <img className="hero-phone-image" src="/source/hero-phone.png" alt="AURUM" fetchPriority="high" />
      <div className="rate-card"><span>{rateLabel}</span><strong>1 USDT = 92,46 ₽</strong><small>{rateNote}</small></div>
    </div>
  );
}

// Хаб локали: та же структура и те же блоки, что на русской главной.
export function LocalizedHub({ locale }: { locale: LocalizedLocale }) {
  const copy = getLocaleCopy(locale);
  const ui = getLocaleUi(locale);
  const pages = localizedPages[locale];
  const words = copy.hubTitle.split(" ");
  const lastWord = words.pop();
  const navItems = ui.nav.map((item) => ({ label: item.label, href: `/${locale}${item.path}` }));
  const navMore = { label: ui.navMore.label, items: ui.navMore.items.map((item) => ({ label: item.label, href: `/${locale}${item.path}` })) };
  const products = pages.slice(0, 6).map((page) => ({ label: page.eyebrow, href: `/${locale}/${page.slug}` }));
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", name: copy.hubTitle, url: `${base}/${locale}`, inLanguage: locale, mainEntity: { "@type": "ItemList", itemListElement: pages.map((page, index) => ({ "@type": "ListItem", position: index + 1, name: page.title, url: `${base}/${locale}/${page.slug}` })) } };

  return <>
    <Header current={locale} home={`/${locale}`} items={navItems} more={navMore} cta={ui.headerCta} />
    <main lang={locale}>
      <div className="ticker section-shell" aria-label="AURUM">
        <div className="ticker-track">
          {[0, 1].map((row) => (
            <div className="ticker-group" key={row} aria-hidden={row === 1}>
              {ui.ticker.map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span /> {ui.heroEyebrow}</div>
          <h1>{words.join(" ")} <br /><em>{lastWord}</em></h1>
          <p className="hero-lead">{copy.hubDescription}</p>
          <div className="hero-actions">
            <PrimaryButton label={copy.open} />
            <a className="text-link" href="#catalog">{ui.howLink} <span>↗</span></a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><i>А</i><i>₽</i><i>₮</i></div>
            <p><strong>{ui.heroProofStrong}</strong><br />{ui.heroProofText}</p>
          </div>
        </div>
        <HeroVisual rateLabel={ui.rateLabel} rateNote={ui.rateNote} />
      </section>

      <section className="trust-bar">
        <div className="section-shell trust-grid">
          {ui.trust.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="popular-pages section-shell" id="catalog">
        <div className="section-heading compact">
          <div><div className="eyebrow"><span /> {ui.catalogEyebrow}</div><h2>{copy.catalog}</h2></div>
          <p>{copy.note}</p>
        </div>
        <div className="popular-grid">
          {pages.map((page, index) => <a href={`/${locale}/${page.slug}`} key={page.slug}><span>{String(index + 1).padStart(2, "0")} · {page.eyebrow}</span><b>{page.title}</b><i>↗</i></a>)}
        </div>
      </section>

      <section className="final-cta section-shell">
        <div className="cta-glow" />
        <div className="eyebrow light"><span /> {ui.ctaEyebrow}</div>
        <h2>{ui.ctaTitle}</h2>
        <p>{ui.ctaText}</p>
        <PrimaryButton label={copy.open} />
      </section>
    </main>
    <Footer ui={ui} code={locale.toUpperCase()} home={`/${locale}`} products={products} info={ui.footerInfoLinks} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
  </>;
}

// Тематическая страница локали: та же структура, что у русских SEO-страниц.
export function LocalizedPage({ locale, slug }: { locale: LocalizedLocale; slug: string }) {
  const copy = getLocaleCopy(locale);
  const ui = getLocaleUi(locale);
  const page = getLocalizedPage(locale, slug);
  if (!page) return null;
  const navItems = ui.nav.map((item) => ({ label: item.label, href: `/${locale}${item.path}` }));
  const navMore = { label: ui.navMore.label, items: ui.navMore.items.map((item) => ({ label: item.label, href: `/${locale}${item.path}` })) };
  const products = localizedPages[locale].slice(0, 6).map((item) => ({ label: item.eyebrow, href: `/${locale}/${item.slug}` }));
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "AURUM", item: base }, { "@type": "ListItem", position: 2, name: copy.name, item: `${base}/${locale}` }, { "@type": "ListItem", position: 3, name: page.title, item: `${base}/${locale}/${slug}` }] };

  return <>
    <Header current={locale} home={`/${locale}`} items={navItems} more={navMore} cta={ui.headerCta} />
    <main className="keyword-page" lang={locale}>
      <section className="keyword-hero section-shell">
        <div className="breadcrumbs"><a href={`/${locale}`}>{copy.home}</a><span>→</span><b>{page.primaryKeyword}</b></div>
        <div className="eyebrow"><span /> {page.eyebrow}</div>
        <h1>{page.title}</h1>
        <p className="intent-answer">{page.intro}</p>
        <div className="keyword-actions"><PrimaryButton label={copy.open} /><a className="text-link" href="#details">{copy.more} <span>↓</span></a></div>
        <div className="keyword-chips" aria-label={copy.label}>{page.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
      </section>

      <section className="keyword-highlights section-shell" aria-label={ui.brief}>
        {page.highlights.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
      </section>

      <section className="keyword-content section-shell" id="details">
        <aside>
          <div className="eyebrow"><span /> {ui.brief}</div>
          <p>{copy.note}</p>
          <PrimaryButton label={copy.open} />
        </aside>
        <div className="keyword-article">
          {page.sections.map((section, index) => <article key={section.title}>
            <span className="article-number">0{index + 1}</span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </article>)}
          <div className="keyword-notice"><b>{ui.notice}</b><p>{copy.note}</p></div>
          <div className="source-card">
            <div className="eyebrow"><span /> {ui.sources}</div>
            <h2>{ui.sourceTitle}</h2>
            <p>{ui.sourceText}</p>
            <div>
              <a href="https://aurum.ws" target="_blank" rel="noreferrer">{ui.linkOfficial} ↗</a>
              <a href="https://nb-ra.org/chernomorskij-bank-razvitiya.html" target="_blank" rel="noreferrer">{ui.linkRegistry} ↗</a>
            </div>
            <small>{ui.updated}</small>
          </div>
        </div>
      </section>

      <section className="keyword-faq section-shell">
        <div><div className="eyebrow"><span /> FAQ</div><h2>{copy.faq}</h2></div>
        <div className="faq-list">{page.faq.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<b>＋</b></summary><p>{item.answer}</p></details>)}</div>
      </section>

      {page.related.length > 0 && <section className="related-keywords section-shell"><div className="eyebrow"><span /> {ui.related}</div><h2>{ui.relatedTitle}</h2><div className="related-grid">{page.related.map((related) => <a key={related} href={`/${locale}/${related}`}><span>{copy.label}</span><b>{getLocalizedPage(locale, related)?.title}</b><i>↗</i></a>)}</div></section>}

      <section className="intent-meta section-shell"><span>{ui.cluster}</span><p>{page.keywords.join(" · ")}</p><a href={`/${locale}`}>{copy.catalog} →</a></section>
    </main>
    <Footer ui={ui} code={locale.toUpperCase()} home={`/${locale}`} products={products} info={ui.footerInfoLinks} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
  </>;
}
