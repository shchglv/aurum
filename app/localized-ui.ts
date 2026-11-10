import type { LocalizedLocale } from "./localized-pages";

// Тексты интерфейса для локализованных страниц: одна и та же структура,
// один и тот же набор блоков, что и на русской версии.
export type LocaleUi = {
  ticker: string[];
  heroEyebrow: string;
  heroProofStrong: string;
  heroProofText: string;
  rateLabel: string;
  rateNote: string;
  trust: [string, string][];
  catalogEyebrow: string;
  howLink: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  brief: string;
  notice: string;
  sources: string;
  sourceTitle: string;
  sourceText: string;
  linkOfficial: string;
  linkRegistry: string;
  updated: string;
  related: string;
  relatedTitle: string;
  cluster: string;
  footerProducts: string;
  footerInfo: string;
  footerReady: string;
  footerNote: string;
  disclaimer: string;
};

export const localizedUi: Record<LocalizedLocale, LocaleUi> = {
  uz: {
    ticker: ["USDT 30 soniyada sotib olish", "Xorijiy servislar uchun virtual karta", "SBP orqali to‘ldirish — 0%", "Tasodifiy P2P o‘tkazmalarsiz", "24/7 ishlaymiz"],
    heroEyebrow: "Chegarasiz moliya",
    heroProofStrong: "Rubl, USDT va kartalar",
    heroProofText: "bitta ilovada",
    rateLabel: "Bugungi kurs",
    rateNote: "Natija almashtirishdan oldin ko‘rinadi",
    trust: [["0%", "RUB to‘ldirish va yechish"], ["0%", "karta operatsiyalari"], ["24/7", "hamyonga kirish"], ["№011", "bank litsenziyasi"]],
    catalogEyebrow: "Mavzu sahifalari",
    howLink: "Bu qanday ishlaydi",
    ctaEyebrow: "Boshlashga tayyormisiz?",
    ctaTitle: "Hamyonni bir daqiqada oching",
    ctaText: "Shartlar, limitlar va mavjud yo‘nalishlarni shaxsiy kabinetda tekshiring.",
    brief: "Qisqacha asosiy",
    notice: "Muhim",
    sources: "Manbalar",
    sourceTitle: "Asl manbani tekshiring",
    sourceText: "Mahsulot tavsifi va shartlar — AURUM rasmiy saytida. Tashkilot to‘g‘risidagi ma’lumot — soha birlashmasi reyestrida.",
    linkOfficial: "AURUM rasmiy sayti",
    linkRegistry: "KB «Chernomorskij bank razvitiya» ma’lumotlari",
    updated: "Material 2026-yil 9-noyabrda yangilandi.",
    related: "Yana qarang",
    relatedTitle: "Foydali sahifalar",
    cluster: "So‘rovlar klasteri",
    footerProducts: "Mahsulotlar",
    footerInfo: "Ma’lumot",
    footerReady: "Boshlashga tayyormisiz?",
    footerNote: "Rubl, USDT va virtual kartalar bitta litsenziyalangan servisda.",
    disclaimer: "Saytdagi ma’lumot individual investitsiya tavsiyasi hisoblanmaydi.",
  },
  ky: {
    ticker: ["USDT 30 секундда сатып алуу", "Чет өлкөлүк сервистер үчүн виртуалдык карта", "СБП аркылуу толуктоо — 0%", "Кокустук P2P которууларсыз", "24/7 иштейбиз"],
    heroEyebrow: "Чеги жок каржы",
    heroProofStrong: "Рубль, USDT жана карталар",
    heroProofText: "бир колдонмодо",
    rateLabel: "Бүгүнкү курс",
    rateNote: "Жыйынтык алмашууга чейин көрүнөт",
    trust: [["0%", "RUB толуктоо жана чыгаруу"], ["0%", "карта операциялары"], ["24/7", "капчыкка кирүү"], ["№011", "банк лицензиясы"]],
    catalogEyebrow: "Тематикалык барактар",
    howLink: "Кантип иштейт",
    ctaEyebrow: "Баштоого даярсызбы?",
    ctaTitle: "Капчыкты бир мүнөттө ачыңыз",
    ctaText: "Шарттарды, лимиттерди жана жеткиликтүү багыттарды жеке кабинеттен текшериңиз.",
    brief: "Кыскача негизги",
    notice: "Маанилүү",
    sources: "Булактар",
    sourceTitle: "Баштапкы булакты текшериңиз",
    sourceText: "Продукт сүрөттөмөсү жана шарттары — AURUM расмий сайтында. Уюм тууралуу маалымат — тармактык бирикменин реестринде.",
    linkOfficial: "AURUM расмий сайты",
    linkRegistry: "КБ «Черноморский банк развития» маалыматы",
    updated: "Материал 2026-жылдын 9-ноябрында жаңыртылды.",
    related: "Дагы караңыз",
    relatedTitle: "Пайдалуу барактар",
    cluster: "Суроо кластери",
    footerProducts: "Продукттар",
    footerInfo: "Маалымат",
    footerReady: "Баштоого даярсызбы?",
    footerNote: "Рубль, USDT жана виртуалдык карталар бир лицензияланган сервисте.",
    disclaimer: "Сайттагы маалымат жеке инвестициялык кеңеш болуп эсептелбейт.",
  },
  tg: {
    ticker: ["USDT дар 30 сония харидан", "Корти виртуалӣ барои сервисҳои хориҷӣ", "Пуркунӣ тавассути СБП — 0%", "Бе интиқолҳои тасодуфии P2P", "24/7 кор мекунем"],
    heroEyebrow: "Молия бесарҳад",
    heroProofStrong: "Рубл, USDT ва кортҳо",
    heroProofText: "дар як барнома",
    rateLabel: "Қурси имрӯз",
    rateNote: "Натиҷа пеш аз мубодила дида мешавад",
    trust: [["0%", "пуркунӣ ва бароварди RUB"], ["0%", "амалиётҳо бо кортҳо"], ["24/7", "дастрасӣ ба ҳамён"], ["№011", "литсензияи бонкӣ"]],
    catalogEyebrow: "Саҳифаҳои мавзӯӣ",
    howLink: "Чӣ тавр кор мекунад",
    ctaEyebrow: "Ба оғоз омодаед?",
    ctaTitle: "Ҳамёнро дар як дақиқа кушоед",
    ctaText: "Шартҳо, лимитҳо ва самтҳои дастрасро дар кабинети шахсӣ тафтиш кунед.",
    brief: "Мухтасар",
    notice: "Муҳим",
    sources: "Сарчашмаҳо",
    sourceTitle: "Сарчашмаи аслиро тафтиш кунед",
    sourceText: "Тавсифи маҳсулот ва шартҳо — дар сайти расмии AURUM. Маълумот дар бораи ташкилот — дар феҳристи иттиҳодияи соҳавӣ.",
    linkOfficial: "Сайти расмии AURUM",
    linkRegistry: "Маълумот дар бораи КБ «Черноморский банк развития»",
    updated: "Мавод 9 ноябри соли 2026 нав карда шуд.",
    related: "Ҳамчунин бинед",
    relatedTitle: "Саҳифаҳои муфид",
    cluster: "Хӯшаи дархостҳо",
    footerProducts: "Маҳсулот",
    footerInfo: "Маълумот",
    footerReady: "Ба оғоз омодаед?",
    footerNote: "Рубл, USDT ва кортҳои виртуалӣ дар як сервиси литсензиядошта.",
    disclaimer: "Маълумоти сайт тавсияи инфиродии сармоягузорӣ нест.",
  },
};

export function getLocaleUi(locale: LocalizedLocale): LocaleUi {
  return localizedUi[locale];
}
