// Единый источник домена и юридических фактов для всего сайта.
//
// Домен задаётся при сборке: NEXT_PUBLIC_SITE_URL=https://example.ru npm run build
// Без переменной используется staging-адрес (не индексируется как дубль чужого сайта).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://88.218.60.165:8090"
).replace(/\/$/, "");

// Лицензия: формулировка взята с ОФИЦИАЛЬНОГО лендинга AURUM (aurum.ws), блок «Лицензия и регулирование».
// Реестр Банка Абхазии подтверждает организацию: КБ «Черноморский банк развития» (ООО),
// регистрационный номер 11, дата внесения в КГР 12.10.1994 — https://nb-ra.org/chernomorskij-bank-razvitiya.html
//
// ВАЖНО: в прошлой версии сайта стояла другая формулировка — РНКО «АЛТЫН» (ОАО), рег. №05,
// КГР 11.05.2011. Это отдельная организация платформы, она не подтверждается официальным
// лендингом AURUM. Если оператор AURUM сменится, править нужно только этот файл.
export const LICENSE = {
  bankFull: "КБ «Черноморский банк развития» (ООО)",
  bankShort: "Черноморский банк развития",
  number: "№011",
  numberShort: "011",
  date: "18.03.2010",
  year: "2010",
  kind: "Банк",
  doc: "Генеральная лицензия Национального банка Республики Абхазии на осуществление банковских операций",
  registryUrl: "https://nb-ra.org/chernomorskij-bank-razvitiya.html",
  registryLabel: "Сведения о КБ «Черноморский банк развития»",
  regNumber: "11",
  kgrDate: "12.10.1994",
};

export const LICENSE_TEXT = `AURUM базируется на ${LICENSE.bankFull}. ${LICENSE.doc} ${LICENSE.number}, выдана ${LICENSE.date} г.`;

export const LICENSE_TEXT_LONG =
  `AURUM базируется на ${LICENSE.bankFull}. ${LICENSE.doc} ${LICENSE.number} выдана ${LICENSE.date} г. ` +
  `Организация внесена в книгу государственной регистрации кредитных организаций ${LICENSE.kgrDate} г. под номером ${LICENSE.regNumber}.`;
