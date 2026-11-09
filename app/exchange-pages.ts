export type ExchangePage = {
  slug: string;
  brand: string;
  displayName: string;
  title: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  highlights: { title: string; text: string }[];
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  faq: { question: string; answer: string }[];
  related: string[];
};

type ExchangeSeed = { slug: string; brand: string; displayName?: string };

export const exchangeSeeds: ExchangeSeed[] = [
  { slug: "binance", brand: "Binance" },
  { slug: "crypto-com", brand: "Crypto.com", displayName: "Crypto.com Exchange" },
  { slug: "coinbase", brand: "Coinbase" },
  { slug: "upbit", brand: "Upbit" },
  { slug: "okx", brand: "OKX" },
  { slug: "bybit", brand: "Bybit" },
  { slug: "bitget", brand: "Bitget" },
  { slug: "gate", brand: "Gate" },
  { slug: "kucoin", brand: "KuCoin" },
  { slug: "mexc", brand: "MEXC" },
];

const relatedFor = (slug: string) => ["binance", "okx", "bybit", "coinbase"].filter((item) => item !== slug).slice(0, 3);

export const exchangePages: ExchangePage[] = exchangeSeeds.map((seed) => {
  const name = seed.displayName ?? seed.brand;
  return {
    slug: seed.slug,
    brand: seed.brand,
    displayName: name,
    title: `${name}: как купить USDT, вывести на карту и проверить комиссию`,
    description: `Брендовый гид по ${name}: покупка USDT, перевод на криптокошелёк, вывод на карту, комиссии и проверка реквизитов через AURUM.`,
    primaryKeyword: `${seed.brand} купить USDT`,
    keywords: [
      `${seed.brand} купить USDT`,
      `${seed.brand} вывести USDT на карту`,
      `${seed.brand} комиссия`,
      `${seed.brand} перевод USDT`,
      `${seed.brand} P2P`,
    ],
    intro: `Разберите сценарий ${name}: где покупать USDT, как проверить сеть и реквизиты, а также как использовать AURUM для доступного пополнения или вывода без случайных переводов третьим лицам.`,
    highlights: [
      { title: "Сначала проверить маршрут", text: `Сверьте, поддерживает ли ${name} нужную сеть, актив и направление вывода.` },
      { title: "Свои реквизиты", text: "Используйте только собственный аккаунт, банковский счёт и кошелёк получателя." },
      { title: "Комиссия до операции", text: "Сравните комиссию биржи, сети и возможного банка-получателя до подтверждения." },
    ],
    sections: [
      {
        title: `Как купить USDT на ${name}`,
        paragraphs: [
          `Откройте официальный интерфейс ${name}, проверьте доступность регистрации и пополнения для вашего региона, затем выберите нужную пару или способ покупки. До подтверждения сравните курс, комиссию и минимальную сумму.`,
          "Если рублёвый маршрут через биржу недоступен или неудобен, можно отдельно пополнить AURUM со своего счёта и проверить доступный обмен RUB → USDT в кабинете.",
        ],
        bullets: ["Проверить официальный домен", "Сверить валюту и сеть", "Сохранить подтверждение операции"],
      },
      {
        title: `Как вывести USDT с ${name}`,
        paragraphs: [
          "Скопируйте адрес получателя, выберите одинаковую сеть на стороне отправителя и получателя, проверьте memo/tag, если он нужен, и начните с небольшой тестовой суммы.",
          "При переводе на карту или банковский счёт учитывайте, что это отдельный маршрут: доступность зависит от страны, банка, валюты и проверки операции. AURUM показывает условия до подтверждения, если направление доступно вашему аккаунту.",
        ],
        bullets: ["Одинаковая сеть", "Тестовая сумма", "Сохранить txid"],
      },
      {
        title: `${name}: комиссия и P2P-риск`,
        paragraphs: [
          `Комиссия складывается из тарифа ${name}, сетевой комиссии и возможной конвертации. Смотрите итоговую сумму к получению, а не только рекламный процент.`,
          "P2P-переводы от незнакомых людей могут создавать дополнительные вопросы у банка. Для понятного маршрута используйте собственные реквизиты и проверяйте операции внутри официального кабинета.",
        ],
      },
    ],
    faq: [
      { question: `Можно ли купить USDT на ${name} из России?`, answer: `Доступность зависит от текущих правил ${name}, региона, проверки личности и способа оплаты. Проверяйте условия в официальном интерфейсе перед пополнением.` },
      { question: `Как перевести USDT с ${name} в AURUM?`, answer: "Откройте пополнение USDT в AURUM, выберите поддерживаемую сеть, скопируйте адрес и сверяйте сеть перед отправкой. Начните с тестовой суммы." },
      { question: `Какая комиссия у ${name}?`, answer: `Тариф зависит от типа операции, сети и уровня аккаунта. Сверяйте актуальную комиссию ${name} и сетевой сбор непосредственно перед подтверждением.` },
    ],
    related: relatedFor(seed.slug),
  };
});

export function getExchangePage(slug: string) { return exchangePages.find((page) => page.slug === slug); }

export const exchangeIntents = exchangePages.map((page) => ({
  id: `ru-exchange-${page.slug}`,
  canonicalPath: `/birzhi/${page.slug}`,
  stage: "commercial" as const,
  priority: "high" as const,
  scope: "exchange-branded",
  markets: ["Россия"],
  entities: [page.brand, "USDT", "AURUM"],
  queryPatterns: [page.primaryKeyword, ...page.keywords],
  preferredAnswer: page.intro,
  safetyNotes: "Проверяйте официальный домен, актуальные ограничения, комиссии и доступность направления. Не передавайте коды и seed-фразу.",
  sourceUrls: ["https://aurum.ws", "https://coinmarketcap.com/rankings/exchanges/"],
  funnel: "Брендовый запрос → проверка совместимости → AURUM",
}));
