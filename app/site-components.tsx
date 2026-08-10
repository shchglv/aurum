export function PrimaryButton({ label = "Открыть кошелёк" }: { label?: string }) {
  return <a className="primary-button" href="https://lk.aurum.ws" target="_blank" rel="noreferrer">{label}<span>↗</span></a>;
}

export function Header() {
  return <header className="site-header"><div className="section-shell header-inner">
    <a className="brand" href="/" aria-label="AURUM — главная"><b>A</b><span>AURUM<small>WALLET</small></span></a>
    <nav aria-label="Главная навигация"><a href="/#features">Возможности</a><a href="/usdt">USDT</a><a href="/virtual-card">Виртуальная карта</a><a href="/#license">Лицензия</a><a href="/faq">FAQ</a></nav>
    <a className="header-cta" href="https://lk.aurum.ws" target="_blank" rel="noreferrer">Открыть кошелёк <span>↗</span></a>
  </div></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="section-shell footer-top"><div><a className="brand brand-light" href="/"><b>A</b><span>AURUM<small>WALLET</small></span></a><p>Рубли, USDT и виртуальные карты<br />в одном лицензированном сервисе.</p></div><div><b>Продукты</b><a href="/usdt">Купить USDT</a><a href="/virtual-card">Виртуальная карта</a><a href="https://t.me/aurumwalletbot">Telegram</a></div><div><b>Информация</b><a href="/#license">Лицензия</a><a href="/faq">Вопросы и ответы</a><a href="mailto:info@aurum.ws">info@aurum.ws</a></div><div className="footer-action"><span>Готовы начать?</span><PrimaryButton /></div></div><div className="section-shell footer-bottom"><span>© AURUM, 2026</span><p>Информация на сайте не является индивидуальной инвестиционной рекомендацией.</p><span>RU</span></div></footer>;
}

export function SeoPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <><Header /><main className="seo-page"><section className="seo-hero section-shell"><div className="eyebrow"><span /> {eyebrow}</div><h1>{title}</h1><p>{lead}</p><PrimaryButton /></section>{children}</main><Footer /></>;
}
