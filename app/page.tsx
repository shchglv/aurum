import type { Metadata } from "next";
import { Footer, Header, PopularPages, PrimaryButton } from "./site-components";

export const metadata: Metadata = {
  title: "AURUM — Web3-кошелёк, USDT и виртуальная карта",
  description:
    "Покупайте USDT за рубли, выпускайте виртуальные карты и оплачивайте покупки в России и за рубежом в одном лицензированном сервисе.",
};

const faq = [
  {
    q: "Что такое AURUM?",
    a: "AURUM — крипто-фиатный кошелёк, который объединяет рублёвый счёт, операции с USDT и виртуальные карты. Сервис работает на базе РНКО «Алтын» с лицензией Национального банка Республики Абхазии №005.",
  },
  {
    q: "Как купить USDT за рубли?",
    a: "Пополните кошелёк со своего счёта через СБП, выберите обмен RUB → USDT и подтвердите операцию. Курс и итоговая сумма показываются до подтверждения.",
  },
  {
    q: "Почему снижается риск блокировки банковской карты?",
    a: "Вы пополняете кошелёк только со своих реквизитов и не получаете переводы от случайных участников P2P-сделок. Это исключает типичный для P2P риск «грязных» переводов от третьих лиц.",
  },
  {
    q: "Где работает виртуальная карта?",
    a: "Карта подходит для онлайн-покупок, подписок и зарубежных сервисов, которые принимают соответствующую платёжную систему. Доступность конкретного сервиса зависит от его правил и региона.",
  },
  {
    q: "Нужна ли верификация?",
    a: "Да. Проверка личности требуется для финансовых операций и выпуска карты. Она защищает аккаунт и нужна для соблюдения требований лицензированного сервиса.",
  },
  {
    q: "Какие комиссии?",
    a: "Пополнение и вывод рублей, а также операции по картам заявлены без комиссии сервиса. Перед обменом AURUM показывает курс и итоговую сумму — без скрытых списаний.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Header />
      <main>
        <div className="ticker section-shell" aria-label="Преимущества AURUM">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
                <span>Покупка USDT за 30 секунд</span>
                <span>Виртуальная карта для зарубежных сервисов</span>
                <span>Пополнение через СБП — 0%</span>
                <span>Без случайных P2P-переводов</span>
                <span>Работаем 24/7</span>
              </div>
            ))}
          </div>
        </div>
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Финансы без границ</div>
            <h1>Один кошелёк.<br />Любые деньги.<br /><em>Весь мир.</em></h1>
            <p className="hero-lead">
              Покупайте USDT за рубли, выпускайте виртуальные карты и платите
              в России и за рубежом — в одном лицензированном сервисе.
            </p>
            <div className="hero-actions">
              <PrimaryButton />
              <a className="text-link" href="#how">Как это работает <span>↗</span></a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true"><i>А</i><i>₽</i><i>₮</i></div>
              <p><strong>Рубли, USDT и карты</strong><br />в одном приложении</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Интерфейс кошелька AURUM">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <img className="hero-shadow-image" src="/source/hero-shadow.png" alt="" aria-hidden="true" />
            <div className="float-pill pill-rub">₽ <span>RUB</span></div>
            <div className="float-pill pill-usdt">₮ <span>USDT</span></div>
            <img className="hero-phone-image" src="/source/hero-phone.png" alt="Мобильный интерфейс кошелька AURUM с балансом и историей операций" fetchPriority="high" />
            <div className="rate-card"><span>Курс сегодня</span><strong>1 USDT = 92,46 ₽</strong><small>Итог виден до обмена</small></div>
          </div>
        </section>

        <section className="trust-bar">
          <div className="section-shell trust-grid">
            <div><strong>0%</strong><span>пополнение и вывод RUB</span></div>
            <div><strong>0%</strong><span>операции по картам</span></div>
            <div><strong>24/7</strong><span>доступ к кошельку</span></div>
            <div><strong>№005</strong><span>банковская лицензия</span></div>
          </div>
        </section>

        <section className="benefits section-shell" id="features">
          <div className="section-heading">
            <div><div className="eyebrow"><span /> Возможности</div><h2>Финансы, которые<br /><em>не тормозят жизнь</em></h2></div>
            <p>Всё необходимое для ежедневных платежей, поездок и цифровых активов — без прыжков между банком, биржей и обменником.</p>
          </div>
          <div className="bento-grid">
            <article className="bento bento-exchange">
              <div className="card-index">01</div><h3>RUB ↔ USDT<br />за несколько касаний</h3><p>Пополняйте через СБП, обменивайте по прозрачному курсу и выводите на свой криптокошелёк.</p>
              <div className="exchange-widget"><div><span>Отдаёте</span><b>50 000 <small>RUB</small></b></div><i>⇅</i><div><span>Получаете</span><b>540,77 <small>USDT</small></b></div><button>Обменять</button></div>
            </article>
            <article className="bento bento-world">
              <div className="card-index">02</div><h3>Карта для<br />оплаты за рубежом</h3><p>Подписки, покупки, поездки и зарубежные сервисы — с отдельными реквизитами.</p>
              <img className="bento-card-image" src="/source/virtual-cards.png" alt="Виртуальные карты AURUM в рублях и долларах" loading="lazy" />
            </article>
            <article className="bento bento-safe">
              <div className="card-index">03</div><h3>Без случайных<br />P2P-переводов</h3><p>Пополнение только со своих счетов — никаких переводов от незнакомцев.</p>
              <div className="safe-line"><span>Ваш банк</span><i>→</i><b>A</b><i>→</i><span>Ваш кошелёк</span></div>
            </article>
            <article className="bento bento-telegram">
              <div className="card-index">04</div><h3>Всегда под рукой</h3><p>Запускайте кошелёк в Telegram и управляйте балансом без установки лишних приложений.</p>
              <img className="bento-telegram-image" src="/source/telegram-app.png" alt="AURUM в Telegram — переводы и пополнение" loading="lazy" />
              <a href="https://t.me/aurumwalletbot" target="_blank" rel="noreferrer">Открыть Telegram <span>↗</span></a>
            </article>
          </div>
        </section>

        <section className="how section-shell" id="how">
          <div className="how-copy"><div className="eyebrow light"><span /> Старт</div><h2>От регистрации<br />до оплаты —<br /><em>три шага</em></h2><p>Никаких визитов в офис и бумажных заявлений. Всё происходит онлайн.</p><PrimaryButton label="Создать кошелёк" /></div>
          <div className="steps">
            <article><b>01</b><div><h3>Создайте аккаунт</h3><p>По номеру телефона или через Telegram.</p></div><span>2 минуты</span></article>
            <article><b>02</b><div><h3>Пройдите проверку</h3><p>Подтвердите личность с камеры телефона.</p></div><span>Онлайн</span></article>
            <article><b>03</b><div><h3>Пополните баланс</h3><p>Рубли через СБП или USDT из внешнего кошелька.</p></div><span>Мгновенно</span></article>
          </div>
        </section>

        <section className="comparison section-shell">
          <div className="section-heading compact"><div><div className="eyebrow"><span /> Разница</div><h2>Спокойнее,<br />чем P2P</h2></div><p>Продуманный маршрут денег вместо сделки с незнакомцем.</p></div>
          <div className="compare-table" role="table" aria-label="Сравнение AURUM и P2P">
            <div className="compare-row compare-head" role="row"><span>Что важно</span><b>AURUM</b><strong>Обычный P2P</strong></div>
            <div className="compare-row" role="row"><span>Откуда приходят рубли</span><b>Только ваши реквизиты</b><strong>Счёт незнакомца</strong></div>
            <div className="compare-row" role="row"><span>Курс и сумма</span><b>Видны до операции</b><strong>Зависят от продавца</strong></div>
            <div className="compare-row" role="row"><span>Скорость</span><b>Мгновенно</b><strong>Нужно ждать контрагента</strong></div>
            <div className="compare-row" role="row"><span>Кто отвечает</span><b>Поддержка сервиса</b><strong>Арбитраж площадки</strong></div>
          </div>
        </section>

        <section className="license" id="license">
          <div className="section-shell license-inner">
            <div className="license-mark">A<span>✓</span></div>
            <div><div className="eyebrow light"><span /> Регулирование</div><h2>Не просто приложение.<br /><em>Лицензированный сервис.</em></h2><p>AURUM работает на базе РНКО «Алтын». Лицензия Национального банка Республики Абхазии на осуществление банковских операций для расчётной организации №005 от 15.06.2012.</p><a href="https://nb-ra.org/rnko-altyn.html" target="_blank" rel="noreferrer">Проверить лицензию <span>↗</span></a></div>
            <div className="license-facts"><div><b>№005</b><span>номер лицензии</span></div><div><b>2012</b><span>год выдачи</span></div><div><b>РНКО</b><span>регулируемая организация</span></div></div>
          </div>
        </section>

        <section className="use-cases section-shell" id="cards">
          <div className="section-heading"><div><div className="eyebrow"><span /> Виртуальная карта</div><h2>Платите там,<br />где вам нужно</h2></div><p>Отдельная карта для зарубежных подписок и покупок помогает не светить реквизиты основной карты.</p></div>
          <div className="wallet-showcase">
            <div><span>Оригинальный интерфейс AURUM</span><h3>Баланс, платежи и история — в одном экране</h3><p>Следите за движением средств и управляйте картами из личного кабинета.</p></div>
            <img src="/source/wallet-ui.png" alt="Экран кошелька AURUM с балансом и историей операций" loading="lazy" />
          </div>
          <div className="logo-cloud" aria-label="Примеры категорий оплаты">
            <span>NETFLIX</span><span>SPOTIFY</span><span>STEAM</span><span>APP STORE</span><span>AMAZON</span><span>TRAVEL</span><span>AI TOOLS</span><span>CLOUD</span>
          </div>
          <div className="seo-copy"><h3>Виртуальная карта иностранного банка для россиян</h3><p>Оформите виртуальную карту онлайн, пополняйте её рублями или через USDT и используйте для оплаты зарубежных сервисов. Выпуск, управление лимитами и история операций доступны в личном кабинете AURUM.</p><a className="text-link" href="/virtual-card">Подробнее о виртуальной карте <span>↗</span></a></div>
        </section>

        <PopularPages />

        <section className="faq section-shell" id="faq">
          <div className="faq-title"><div className="eyebrow"><span /> FAQ</div><h2>Вопросы,<br />которые стоит<br /><em>задать</em></h2><p>Коротко и честно о кошельке, USDT, картах и безопасности.</p><a href="/faq" className="text-link">Все вопросы <span>↗</span></a></div>
          <div className="faq-list">
            {faq.map((item, index) => <details key={item.q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<b>＋</b></summary><p>{item.a}</p></details>)}
          </div>
        </section>

        <section className="final-cta section-shell">
          <div className="cta-glow" /><div className="eyebrow light"><span /> Ваш ход</div><h2>Деньги уже<br />не знают границ.<br /><em>А вы?</em></h2><p>Откройте AURUM и управляйте рублями, USDT и картами из одного окна.</p><PrimaryButton label="Открыть кошелёк" /></section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
