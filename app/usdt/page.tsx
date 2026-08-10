import type { Metadata } from "next";
import { SeoPage } from "../site-components";

export const metadata: Metadata = { title: "Купить USDT за рубли онлайн — AURUM", description: "Покупка USDT за рубли через СБП без P2P-переводов от незнакомцев. Прозрачный курс и быстрый вывод USDT." };

export default function UsdtPage() {
  return <SeoPage eyebrow="RUB ↔ USDT" title="Купить USDT за рубли — без случайных P2P-переводов" lead="Пополняйте AURUM со своего банковского счёта, обменивайте рубли на USDT по курсу, который виден заранее, и выводите активы на свой кошелёк.">
    <section className="article-grid section-shell"><article><span>01</span><h2>Пополните рублями</h2><p>Переведите деньги через СБП со своего счёта. Вы не принимаете платежи от неизвестных третьих лиц.</p></article><article><span>02</span><h2>Обменяйте на USDT</h2><p>Выберите RUB → USDT. Курс, комиссия и итоговая сумма отображаются до подтверждения.</p></article><article><span>03</span><h2>Храните или выводите</h2><p>Оставьте USDT в AURUM или отправьте на внешний адрес в поддерживаемой сети.</p></article></section>
    <section className="prose-section section-shell"><div><div className="eyebrow"><span /> Безопасный маршрут</div><h2>Чем покупка USDT в AURUM отличается от P2P?</h2></div><div><p>В P2P-сделке рубли могут прийти от незнакомого человека, а её результат зависит от действий контрагента. В AURUM пополнение идёт с ваших реквизитов, а обмен выполняется внутри сервиса.</p><h3>Подходит, если вы ищете:</h3><ul><li>купить USDT за рубли онлайн;</li><li>обменять USDT на рубли;</li><li>купить USDT через СБП;</li><li>пополнить кошелёк без P2P;</li><li>увидеть курс до подтверждения.</li></ul></div></section>
  </SeoPage>;
}
