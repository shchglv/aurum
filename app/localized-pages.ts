export type LocalizedSection = { title: string; paragraphs: string[]; bullets?: string[] };
export type LocalizedFaq = { question: string; answer: string };
export type LocalizedPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  primaryKeyword: string;
  keywords: string[];
  highlights: { title: string; text: string }[];
  sections: LocalizedSection[];
  faq: LocalizedFaq[];
  related: string[];
};

export const localizedLocales = ["tg", "ky", "uz"] as const;
export type LocalizedLocale = (typeof localizedLocales)[number];

const common = {
  tg: { label: "Тоҷикӣ", name: "Крипто ва интиқолҳои байналмилалӣ", home: "Асосӣ", open: "Кушодани ҳамён", catalog: "Саҳифаҳои мавзӯъ", more: "Муфассал", faq: "Саволҳои маъмул", note: "Шартҳо, тарифҳо ва дастрасии самтро пеш аз амалиёт дар кабинети AURUM санҷед.", hubTitle: "Крипто ва интиқолҳои хориҷӣ", hubDescription: "Роҳнамоҳо барои USDT, ҳамёни крипто ва интиқоли пул ба хориҷ бо забони тоҷикӣ." },
  ky: { label: "Кыргызча", name: "Крипто жана эл аралык которуулар", home: "Башкы бет", open: "Капчыкты ачуу", catalog: "Тематикалык барактар", more: "Толук маалымат", faq: "Көп берилген суроолор", note: "Операциядан мурун AURUM кабинетинен шарттарды, комиссияларды жана жеткиликтүү багытты текшериңиз.", hubTitle: "Крипто жана чет өлкөгө которуулар", hubDescription: "USDT, крипто капчык жана чет өлкөлүк карталарга акча которуу боюнча кыргызча колдонмолор." },
  uz: { label: "O‘zbekcha", name: "Kripto va xalqaro pul o‘tkazmalari", home: "Bosh sahifa", open: "Hamyonni ochish", catalog: "Mavzu sahifalari", more: "Batafsil", faq: "Ko‘p beriladigan savollar", note: "Amaliyotdan oldin AURUM kabinetida shartlar, komissiyalar va yo‘nalish mavjudligini tekshiring.", hubTitle: "Kripto va xorijga o‘tkazmalar", hubDescription: "USDT, kripto hamyon va xorijiy kartalarga pul yuborish bo‘yicha o‘zbekcha qo‘llanmalar." },
} as const;

type LocaleCopy = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  primaryKeyword: string;
  keywords: string[];
  highlights: [string, string][];
  sections: [string, string, string[]?][];
  faq: [string, string][];
};

const copies: Record<LocalizedLocale, LocaleCopy[]> = {
  tg: [
    { slug: "crypto-wallet", eyebrow: "Ҳамёни крипто", title: "Ҳамёни крипто барои USDT ва интиқолҳои байналмилалӣ", description: "Чӣ гуна ҳамёни крипто барои USDT ва интиқол ба хориҷ интихоб карда мешавад: шабака, амният ва комиссия.", intro: "AURUM рубл, USDT ва самтҳои дастрасро дар як кабинети қулай муттаҳид мекунад.", primaryKeyword: "ҳамёни крипто барои USDT", keywords: ["ҳамёни крипто онлайн", "ҳамёни USDT", "ҳамён бо баровардан ба корт"], highlights: [["RUB ва USDT", "Бақияро пур карда, дар дохили як интерфейс иваз кунед."], ["Шабака зери назорат", "Пеш аз ирсол шабака, суроға ва комиссияро санҷед."], ["Таърихи амалиёт", "Ҳар як пуркунӣ ва бароварданро нигоҳ доред."]], sections: [["Ҳамёни крипто чӣ бояд дошта бошад", "Барои амалиёти ҳаррӯза пуркунӣ, ивазкунӣ, шабакаҳои дастгиришаванда ва нишон додани комиссия муҳиманд.", ["Санҷиши шабака", "Курс ва комиссия пеш аз амалиёт", "Таърихи пуркунӣ ва баровардан"]], ["USDT барои интиқол ба хориҷ", "USDT метавонад қисми масири байналмилалӣ бошад, аммо дастрасии корт ё бонк аз кишвар ва қоидаҳо вобаста аст."]], faq: [["Оё AURUM барои нигоҳдории USDT мувофиқ аст?", "Агар хизматрасонӣ барои ҳисоби шумо дастрас бошад, ҳа. Шабака ва лимитҳоро пешакӣ санҷед."], ["Оё USDT-ро ба хориҷ фиристодан мумкин аст?", "Самт, кишвар ва шабакаи дастгиришавандаро дар кабинет санҷед."]]},
    { slug: "buy-usdt", eyebrow: "Хариди крипто", title: "Чӣ гуна USDT-ро бо рубл онлайн харидан мумкин аст", description: "Хариди USDT бо рубл: пуркунӣ аз ҳисоби худ, курс, комиссия ва баровардан.", intro: "Аз ҳисоби бонкии худ рубл ворид кунед, ҳисобро санҷед ва RUB → USDT-ро дар AURUM иваз намоед.", primaryKeyword: "харидани USDT бо рубл", keywords: ["USDT-ро онлайн харидан", "дар куҷо USDT харидан", "хариди крипто бо рубл"], highlights: [["Ҳисоби худ", "Пулро аз реквизитҳои худ ворид кунед."], ["Ҳисоб пешакӣ", "Курс ва комиссия пеш аз тасдиқ намоён аст."], ["Оғози бехатар", "Аввал бо маблағи хурд санҷиш гузаронед."]], sections: [["Қадамҳои хариди USDT", "Ҳисоби AURUM кушоед, санҷиши заруриро гузаред ва рублро бо усули дастрас пур кунед. Сипас RUB → USDT-ро интихоб карда, курс ва комиссияро санҷед.", ["Пур кардани RUB", "Санҷиши курс", "Тасдиқи ивазкунӣ"]], ["Бартарӣ нисбат ба P2P", "Шумо аз ҳисоби худ истифода мебаред ва бо фурӯшандаи ношинос мукотиба намекунед."]], faq: [["Оё тавассути СБП харидан мумкин аст?", "Агар самт дар кабинети шумо дастрас бошад, ҳа."], ["Оё верификатсия лозим аст?", "Барои амалиётҳои молиявӣ ва лимитҳо метавонад тасдиқи шахсият талаб шавад."]]},
    { slug: "send-usdt-abroad", eyebrow: "USDT ба хориҷ", title: "Чӣ гуна USDT-ро ба ҳамён ё корти дигар фиристодан мумкин аст", description: "Ирсоли USDT ба хориҷ: интихоби шабака, санҷиши суроға ва комиссия.", intro: "Пеш аз ирсол шабака ва суроғаро ду бор санҷед — амалиёти блокчейн одатан баргардонида намешавад.", primaryKeyword: "чӣ гуна USDT-ро интиқол додан", keywords: ["USDT ба ҳамён", "USDT ба корт", "кадом шабака барои USDT"], highlights: [["Шабака якхела", "Шабакаи ирсолкунанда ва қабулкунанда бояд мувофиқ бошад."], ["Маблағи санҷишӣ", "Барои суроғаи нав аввал маблағи хурд фиристед."], ["Санҷиши самт", "Ирсол ба корт аз кишвар ва бонк вобаста аст."]], sections: [["Қадамҳои интиқоли USDT", "Шабакаро интихоб кунед, суроғаи қабулкунандаро гузоред ва аломатҳои аввалу охирро муқоиса кунед.", ["Санҷиши шабака", "Санҷиши суроға", "Нигоҳ доштани txid"]], ["Чаро амалиёт барнамегардад", "Пас аз ворид шудан ба блокчейн баргардонидан одатан имконнопазир аст."]], faq: [["Интиқол чанд вақт мегирад?", "Вақт аз шабака ва шумораи тасдиқҳо вобаста аст."], ["Кадом шабака арзонтар аст?", "Танҳо шабакаеро интихоб кунед, ки қабулкунанда дастгирӣ мекунад."]]},
    { slug: "international-transfer", eyebrow: "Интиқоли байналмилалӣ", title: "Интиқоли пул ба хориҷ аз Русия", description: "Чӣ гуна интиқоли байналмилалиро ташкил кардан мумкин аст: қабулкунанда, асъор, комиссия ва лимитҳо.", intro: "Кишвар, бонк, асъор ва маблағи ниҳоиро пеш аз тасдиқ муайян кунед.", primaryKeyword: "интиқоли пул ба хориҷ аз Русия", keywords: ["интиқоли пул ба хориҷ", "интиқоли байналмилалӣ онлайн", "интиқол ба корти хориҷӣ"], highlights: [["Қабулкунандаи воқеӣ", "Танҳо реквизитҳои шахси воқеиро истифода баред."], ["Асъор ва курс", "Маблағи списание ва маблағи қабулро муқоиса кунед."], ["Санҷиши пешакӣ", "Лимит ва ҳуҷҷатҳои эҳтимолиро пешакӣ бинед."]], sections: [["Пеш аз интиқол чӣ санҷидан лозим аст", "Кишвар, бонк, асъор, номи қабулкунанда ва лимитро муайян кунед.", ["Кишвар ва бонк", "Асъор ва комиссия", "Лимит ва ҳуҷҷатҳо"]], ["Вақте USDT мувофиқ аст", "USDT метавонад як қисми масир бошад, агар қабулкунанда ва шабака онро дастгирӣ кунанд."]], faq: [["Оё ба корти хориҷӣ фиристодан мумкин аст?", "Агар самт дар кабинети шумо дастрас бошад ва санҷишро гузарад."], ["Статусро аз куҷо дидан мумкин аст?", "Рақами амалиётро дар кабинет кушоед."]]},
    { slug: "perevod-usdt-za-granicu", eyebrow: "Интиқоли крипто", title: "Интиқоли USDT ба ҳамёни хориҷӣ", description: "Ирсоли USDT ба ҳамёни хориҷӣ: суроға, шабака, маблағи санҷишӣ ва txid.", intro: "Суроғаи қабулкунанда ва шабакаро пеш аз тасдиқ муқоиса кунед.", primaryKeyword: "интиқоли USDT ба ҳамёни хориҷӣ", keywords: ["USDT ба ҳамёни хориҷӣ", "USDT ба биржа", "баровардани USDT ба хориҷ"], highlights: [["Суроғаи дуруст", "Суроғаро аз канали бехатар нусха кунед."], ["Шабака мувофиқ", "Шабакаи қабулкунанда ва ирсолкунанда якхела бошад."], ["Txid", "Идентификаторро барои пайгирӣ нигоҳ доред."]], sections: [["Чӣ гуна ба ҳамёни беруна фиристодан", "Суроғаро нусха карда, ҳамон шабакаро интихоб кунед ва бо маблағи хурд оғоз намоед.", ["Нусхаи суроға", "Интихоби шабака", "Нигоҳ доштани txid"]], ["Амнияти калидҳо", "Seed-фраза, парол ва кодҳои тасдиқро ба касе нафиристед."]], faq: [["Оё ба биржаи хориҷӣ фиристодан мумкин аст?", "Агар биржа USDT ва шабакаи интихобшударо қабул кунад."], ["Комиссияро кӣ мегирад?", "Комиссияи шабака пеш аз тасдиқ нишон дода мешавад."]]},
    { slug: "transfer-fees", eyebrow: "Комиссияҳо", title: "Комиссияи интиқоли крипто ва пул ба хориҷ", description: "Курс, комиссияи сервис, шабака ва бонки қабулкунанда чӣ гуна арзиши интиқолро ташкил медиҳанд.", intro: "На танҳо фоиз, балки маблағи воқеии қабулшавандаро муқоиса кунед.", primaryKeyword: "комиссияи интиқоли USDT TRC20", keywords: ["комиссияи USDT TRC20", "интиқол бе комиссия", "арзиши интиқол ба хориҷ"], highlights: [["Комиссияи сервис", "То тасдиқ сатри алоҳидаро бинед."], ["Комиссияи шабака", "Блокчейн метавонад маблағи иловагӣ нигоҳ дорад."], ["Бонки қабулкунанда", "Бонк метавонад тарифи худро истифода барад."]], sections: [["Арзиш аз чӣ иборат аст", "Курс, комиссияи AURUM, шабака ва эҳтимолан конверсияи бонки қабулкунанда ба назар гирифта мешаванд.", ["Маблағи списание", "Маблағи қабул", "Курс ва ҳамаи комиссияҳо"]], ["Чӣ гуна зиёд напардозем", "Пеш аз амалиёт лимит ва асъори мувофиқро санҷед."]], faq: [["Комиссия пеш аз интиқол дида мешавад?", "Бале, ҳисоб пеш аз тасдиқ нишон дода мешавад."], ["Чаро қабулкунанда камтар гирифт?", "Комиссияи шабака, бонк ё конверсия метавонад таъсир расонад."]] },
  ],
  ky: [],
  uz: [],
};

const kyTitles = [
  ["Крипто капчык", "USDT жана эл аралык которуулар үчүн крипто капчык", "USDT капчыгын тандоо: тармак, коопсуздук жана комиссия."],
  ["Крипто сатып алуу", "USDTни рублга онлайн кантип сатып алса болот", "Рублга USDT сатып алуу: өз эсебиңиз, курс жана комиссия."],
  ["USDT чет өлкөгө", "USDTни башка капчыкка же картага кантип которсо болот", "USDT которуу: тармакты, даректи жана комиссияны текшерүү."],
  ["Эл аралык которуу", "Россиядан чет өлкөгө акча которуу", "Кабыл алуучу, валюта, комиссия жана лимиттер боюнча колдонмо."],
  ["Крипто которуу", "USDTни чет өлкөлүк крипто капчыкка которуу", "Дарек, тармак, тесттик сумма жана txid боюнча нускама."],
  ["Комиссиялар", "Крипто жана эл аралык которуунун комиссиясы", "Курс, сервис, блокчейн жана кабыл алуучу банктын чыгымдары."],
] as const;
const uzTitles = [
  ["Kripto hamyon", "USDT va xalqaro o‘tkazmalar uchun kripto hamyon", "USDT hamyonini tanlash: tarmoq, xavfsizlik va komissiya."],
  ["Kripto sotib olish", "USDTni rublda onlayn qanday sotib olish mumkin", "Rublda USDT sotib olish: o‘z hisobingiz, kurs va komissiya."],
  ["USDT xorijga", "USDTni boshqa hamyon yoki kartaga qanday o‘tkazish mumkin", "USDT yuborish: tarmoq, manzil va komissiyani tekshirish."],
  ["Xalqaro o‘tkazma", "Rossiyadan xorijga pul o‘tkazish", "Qabul qiluvchi, valyuta, komissiya va limitlar bo‘yicha qo‘llanma."],
  ["Kripto o‘tkazma", "USDTni xorijiy kripto hamyonga o‘tkazish", "Manzil, tarmoq, test summasi va txid bo‘yicha yo‘riqnoma."],
  ["Komissiyalar", "Kripto va xalqaro o‘tkazma komissiyasi", "Kurs, servis, blokcheyn va qabul qiluvchi bank xarajatlari."],
] as const;

function buildLocale(locale: "ky" | "uz", titles: readonly (readonly [string, string, string])[]): LocaleCopy[] {
  const isKy = locale === "ky";
  const commonKeywords = isKy ? ["крипто капчык", "USDT сатып алуу", "акча которуу чет өлкөгө"] : ["kripto hamyon", "USDT sotib olish", "xorijga pul o‘tkazish"];
  return titles.map(([eyebrow, title, description], index) => ({
    slug: copies.tg[index].slug, eyebrow, title, description,
    intro: isKy ? "AURUM рубль, USDT жана жеткиликтүү эл аралык багыттарды бир капчыкта бириктирет." : "AURUM rubl, USDT va mavjud xalqaro yo‘nalishlarni bitta hamyonda birlashtiradi.",
    primaryKeyword: title.toLowerCase(), keywords: [...commonKeywords, isKy ? "USDT которуу" : "USDT o‘tkazmasi"],
    highlights: isKy ? [["Өз эсебиңиз", "Каражатты өз реквизиттериңизден киргизиңиз."], ["Алдын ала эсеп", "Курс жана комиссия ырастоодон мурун көрүнөт."], ["Коопсуз кадам", "Жаңы даректи кичине сумма менен сынаңыз."]] : [["O‘z hisobingiz", "Mablag‘ni o‘z rekvizitlaringizdan kiriting."], ["Oldindan hisob", "Kurs va komissiya tasdiqlashdan oldin ko‘rinadi."], ["Xavfsiz qadam", "Yangi manzilni kichik summa bilan sinang."]] as [string, string][],
    sections: isKy ? [["Негизги текшерүүлөр", "Өлкө, банк, валюта, тармак жана кабыл алуучунун реквизиттерин операциядан мурун салыштырыңыз.", ["Өз реквизиттериңиз", "Курс жана комиссия", "Операциянын статусу"]], ["AURUM менен иштөө", "Шарттар, лимиттер жана жеткиликтүү багыттар сиздин кабинетиңизде көрсөтүлөт."]] : [["Asosiy tekshiruvlar", "Mamlakat, bank, valyuta, tarmoq va qabul qiluvchi rekvizitlarini amaliyotdan oldin solishtiring.", ["O‘z rekvizitlaringiz", "Kurs va komissiya", "Operatsiya holati"]], ["AURUM bilan ishlash", "Shartlar, limitlar va mavjud yo‘nalishlar kabinetingizda ko‘rsatiladi."]] as [string, string, string[]?][],
    faq: isKy ? [["Комиссияны кайдан көрөм?", "Ырастоодон мурун кабинетте көрсөтүлөт."], ["Ката болсо эмне кылуу керек?", "Кайра жөнөтпөңүз, операциянын статусун текшерип, расмий колдоого кайрылыңыз."]] : [["Komissiyani qayerda ko‘raman?", "Tasdiqlashdan oldin kabinetda ko‘rsatiladi."], ["Xato bo‘lsa nima qilish kerak?", "Qayta yubormang, operatsiya holatini tekshirib, rasmiy yordamga murojaat qiling."]],
  }));
}

copies.ky = buildLocale("ky", kyTitles);
copies.uz = buildLocale("uz", uzTitles);

export const localizedPages: Record<LocalizedLocale, LocalizedPage[]> = Object.fromEntries(localizedLocales.map((locale) => [locale, copies[locale].map((page) => ({ ...page, highlights: page.highlights.map(([title, text]) => ({ title, text })), sections: page.sections.map(([title, paragraphs, bullets]) => ({ title, paragraphs: [paragraphs], ...(bullets ? { bullets } : {}) })), faq: page.faq.map(([question, answer]) => ({ question, answer })), related: ["crypto-wallet", "buy-usdt", "send-usdt-abroad"].filter((slug) => slug !== page.slug).slice(0, 2) }))])) as Record<LocalizedLocale, LocalizedPage[]>;

export function getLocalizedPage(locale: LocalizedLocale, slug: string) {
  return localizedPages[locale].find((page) => page.slug === slug);
}

export function getLocaleCopy(locale: LocalizedLocale) { return common[locale]; }
