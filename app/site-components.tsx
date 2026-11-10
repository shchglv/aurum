import type { LocaleUi } from "./localized-ui";

const WALLET_URL = "https://vk.cc/d0ovkk";

export const LANGUAGES = [
  { code: "ru", label: "RU", title: "Русский", href: "/" },
  { code: "uz", label: "UZ", title: "O‘zbekcha", href: "/uz" },
  { code: "ky", label: "KY", title: "Кыргызча", href: "/ky" },
  { code: "tg", label: "TJ", title: "Тоҷикӣ", href: "/tg" },
] as const;

export type LinkItem = { label: string; href: string };

export function PrimaryButton({ label = "Открыть кошелёк" }: { label?: string }) {
  return <a className="primary-button" href={WALLET_URL} target="_blank" rel="noreferrer">{label}<span>↗</span></a>;
}

export function LanguageSwitcher({ current = "ru" }: { current?: string }) {
  return (
    <div className="lang-switch" role="group" aria-label="Язык сайта">
      {LANGUAGES.map((lang) => lang.code === current
        ? <span key={lang.code} aria-current="true" title={lang.title}>{lang.label}</span>
        : <a key={lang.code} href={lang.href} hrefLang={lang.code} title={lang.title}>{lang.label}</a>)}
    </div>
  );
}

const RU_NAV: LinkItem[] = [
  { label: "Возможности", href: "/#features" },
  { label: "USDT", href: "/usdt" },
  { label: "Переводы", href: "/perevody" },
  { label: "Карта", href: "/virtual-card" },
  { label: "Сервисы", href: "/servisy" },
  { label: "FAQ", href: "/faq" },
];

const RU_MORE: { label: string; items: LinkItem[] } = {
  label: "Ещё",
  items: [
    { label: "P2P → AURUM", href: "/p2p" },
    { label: "Криптобиржи", href: "/birzhi" },
    { label: "Лицензия", href: "/#license" },
  ],
};

export function Header({ current = "ru", home = "/", items, more, cta }: {
  current?: string;
  home?: string;
  items?: LinkItem[];
  more?: { label: string; items: LinkItem[] };
  cta?: string;
}) {
  const navItems = items ?? RU_NAV;
  const moreBlock = more ?? RU_MORE;
  const ctaLabel = cta ?? "Открыть кошелёк";

  return <header className="site-header"><div className="section-shell header-inner">
    <a className="brand" href={home} aria-label="AURUM"><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a>

    <nav className="main-nav" aria-label="Основная навигация">
      {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      {moreBlock.items.length > 0 && <details className="nav-more">
        <summary>{moreBlock.label}<span aria-hidden="true">▾</span></summary>
        <div className="nav-more-panel">
          {moreBlock.items.map((item) => <a key={item.href} href={item.href}>{item.label}<i aria-hidden="true">↗</i></a>)}
        </div>
      </details>}
    </nav>

    <div className="header-actions">
      <LanguageSwitcher current={current} />
      <a className="header-cta" href={WALLET_URL} target="_blank" rel="noreferrer"><b>{ctaLabel}</b><span>↗</span></a>
      <details className="nav-burger">
        <summary aria-label="Меню"><span /><span /><span /></summary>
        <div className="burger-panel">
          <a className="brand" href={home}><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a>
          <div className="burger-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}<i aria-hidden="true">↗</i></a>)}
            {moreBlock.items.map((item) => <a key={item.href} href={item.href}>{item.label}<i aria-hidden="true">↗</i></a>)}
          </div>
          <LanguageSwitcher current={current} />
          <a className="primary-button" href={WALLET_URL} target="_blank" rel="noreferrer">{ctaLabel}<span>↗</span></a>
        </div>
      </details>
    </div>
  </div></header>;
}

const FOOTER_PRODUCTS: LinkItem[] = [
  { label: "Купить USDT", href: "/usdt" },
  { label: "P2P и альтернативы", href: "/p2p" },
  { label: "Переводы за границу", href: "/perevody" },
  { label: "Виртуальная карта", href: "/virtual-card" },
  { label: "Зарубежная карта", href: "/foreign-card" },
  { label: "Криптокарта", href: "/crypto-card" },
];

const FOOTER_INFO: LinkItem[] = [
  { label: "Оплата сервисов", href: "/servisy" },
  { label: "Что такое USDT", href: "/what-is-usdt" },
  { label: "Как пользоваться картой", href: "/how-to-use-virtual-card" },
  { label: "Вопросы и ответы", href: "/faq" },
  { label: "info@aurum.ws", href: "mailto:info@aurum.ws" },
];

export function Footer({ ui, code = "RU", home = "/", products, info }: {
  ui?: LocaleUi;
  code?: string;
  home?: string;
  products?: LinkItem[];
  info?: LinkItem[];
} = {}) {
  const productLinks = products ?? FOOTER_PRODUCTS;
  const infoLinks = info ?? FOOTER_INFO;
  const note = ui ? ui.footerNote : "Рубли, USDT и виртуальные карты в одном лицензированном сервисе.";
  const disclaimer = ui?.disclaimer ?? "Информация на сайте не является индивидуальной инвестиционной рекомендацией.";
  const ctaLabel = ui?.headerCta ?? "Открыть кошелёк";

  return <footer className="site-footer">
    <div className="section-shell footer-top">
      <div className="footer-brand">
        <a className="brand brand-light" href={home}><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a>
        <p>{note}</p>
        <a className="primary-button" href={WALLET_URL} target="_blank" rel="noreferrer">{ctaLabel}<span>↗</span></a>
      </div>
      <nav className="footer-col" aria-label={ui?.footerProducts ?? "Продукты"}>
        <b>{ui?.footerProducts ?? "Продукты"}</b>
        {productLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <nav className="footer-col" aria-label={ui?.footerInfo ?? "Информация"}>
        <b>{ui?.footerInfo ?? "Информация"}</b>
        {infoLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
    </div>
    <div className="section-shell footer-bottom">
      <span>© AURUM, 2026</span>
      <p>{disclaimer}</p>
      <span>{code}</span>
    </div>
  </footer>;
}

export function PopularPages() {
  const pages = [
    ["USDT через СБП", "Купить USDT за рубли со своего счёта", "/kupit-usdt-cherez-sbp"],
    ["P2P → AURUM", "Легальная альтернатива частной сделке", "/p2p"],
    ["Переводы", "На карты зарубежных банков", "/perevody"],
    ["Безопасность", "USDT без случайных P2P-переводов", "/usdt-safe"],
    ["Зарубежная карта", "Карта иностранного банка онлайн", "/foreign-card"],
    ["Подписки", "Карта для зарубежных сервисов", "/subscriptions"],
    ["Сервисы", "Steam, ChatGPT, Spotify и другие", "/servisy"],
    ["Криптокарта", "Виртуальная карта с пополнением USDT", "/crypto-card"],
    ["Крипто-гид", "USDT, кошелёк и переводы за границу", "/kripto"],
    ["Криптобиржи", "Binance, OKX, Bybit и ещё 7 брендов", "/birzhi"],
    ["Telegram", "Кошелёк и карта в Telegram Mini App", "/telegram-app"],
  ];
  return <section className="popular-pages section-shell"><div className="section-heading compact"><div><div className="eyebrow"><span /> Популярные запросы</div><h2>Найдите свой<br />сценарий</h2></div><p>Подробные страницы по самым востребованным задачам — с условиями, ограничениями и ответами.</p></div><div className="popular-grid">{pages.map(([label, title, href], index) => <a href={href} key={href}><span>{String(index + 1).padStart(2, "0")} · {label}</span><b>{title}</b><i>↗</i></a>)}</div></section>;
}

export function SeoPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <><Header /><main className="seo-page"><section className="seo-hero section-shell"><div className="eyebrow"><span /> {eyebrow}</div><h1>{title}</h1><p>{lead}</p><PrimaryButton /></section>{children}</main><Footer /></>;
}
