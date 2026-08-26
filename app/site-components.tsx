const WALLET_URL = "https://vk.cc/d0ovkk";

export function PrimaryButton({ label = "Открыть кошелёк" }: { label?: string }) {
  return <a className="primary-button" href={WALLET_URL} target="_blank" rel="noreferrer">{label}<span>↗</span></a>;
}

export function Header() {
  return <header className="site-header"><div className="section-shell header-inner">
    <a className="brand" href="/" aria-label="AURUM — главная"><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a>
    <nav aria-label="Главная навигация"><a href="/#features">Возможности</a><a href="/usdt">USDT</a><a href="/virtual-card">Виртуальная карта</a><a href="/servisy">Сервисы</a><a href="/#license">Лицензия</a><a href="/faq">FAQ</a></nav>
    <a className="header-cta" href={WALLET_URL} target="_blank" rel="noreferrer">Открыть кошелёк <span>↗</span></a>
  </div></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="section-shell footer-top"><div><a className="brand brand-light" href="/"><img className="brand-mark" src="/source/aurum-logo.svg" alt="" /><span>AURUM<small>WALLET</small></span></a><p>Рубли, USDT и виртуальные карты<br />в одном лицензированном сервисе.</p></div><div><b>Продукты</b><a href="/usdt">Купить USDT</a><a href="/virtual-card">Виртуальная карта</a><a href="/foreign-card">Зарубежная карта</a><a href="/crypto-card">Криптокарта</a></div><div><b>Информация</b><a href="/servisy">Оплата сервисов</a><a href="/what-is-usdt">Что такое USDT</a><a href="/how-to-use-virtual-card">Как пользоваться картой</a><a href="/faq">Вопросы и ответы</a><a href="mailto:info@aurum.ws">info@aurum.ws</a></div><div className="footer-action"><span>Готовы начать?</span><PrimaryButton /></div></div><div className="section-shell footer-bottom"><span>© AURUM, 2026</span><p>Информация на сайте не является индивидуальной инвестиционной рекомендацией.</p><span>RU</span></div></footer>;
}

export function PopularPages() {
  const pages = [
    ["USDT через СБП", "Купить USDT за рубли со своего счёта", "/kupit-usdt-cherez-sbp"],
    ["Безопасность", "USDT без случайных P2P-переводов", "/usdt-safe"],
    ["Зарубежная карта", "Карта иностранного банка онлайн", "/foreign-card"],
    ["Подписки", "Карта для зарубежных сервисов", "/subscriptions"],
    ["Сервисы", "Steam, ChatGPT, Spotify и другие", "/servisy"],
    ["Криптокарта", "Виртуальная карта с пополнением USDT", "/crypto-card"],
    ["Telegram", "Кошелёк и карта в Telegram Mini App", "/telegram-app"],
  ];
  return <section className="popular-pages section-shell"><div className="section-heading compact"><div><div className="eyebrow"><span /> Популярные запросы</div><h2>Найдите свой<br />сценарий</h2></div><p>Подробные страницы по самым востребованным задачам — с условиями, ограничениями и ответами.</p></div><div className="popular-grid">{pages.map(([label, title, href], index) => <a href={href} key={href}><span>{String(index + 1).padStart(2, "0")} · {label}</span><b>{title}</b><i>↗</i></a>)}</div></section>;
}

export function SeoPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <><Header /><main className="seo-page"><section className="seo-hero section-shell"><div className="eyebrow"><span /> {eyebrow}</div><h1>{title}</h1><p>{lead}</p><PrimaryButton /></section>{children}</main><Footer /></>;
}
