import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "./site-config";

const YM_ID = 114154654;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AURUM — кошелёк без границ", template: "%s" },
  description: "Рубли, USDT и виртуальные карты в одном лицензированном сервисе.",
  keywords: ["AURUM", "купить USDT", "виртуальная карта", "карта иностранного банка", "Web3 кошелек"],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: { type: "website", locale: "ru_RU", siteName: "AURUM", title: "AURUM — деньги без границ", description: "Рубли, USDT и виртуальные карты в одном приложении.", url: SITE_URL, images: [{ url: "/og.png", width: 1200, height: 630, alt: "AURUM — деньги без границ" }] },
  twitter: { card: "summary_large_image", title: "AURUM — деньги без границ", description: "Рубли, USDT и виртуальные карты в одном приложении.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const org = { "@context": "https://schema.org", "@type": "FinancialService", "@id": `${SITE_URL}/#organization`, name: "AURUM", url: SITE_URL, email: "info@aurum.ws", logo: `${SITE_URL}/source/aurum-logo.svg`, description: "Крипто-фиатный кошелёк и сервис виртуальных карт", areaServed: "RU", availableLanguage: "ru" };
  return (
    <html lang="ru">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=114154654','ym');
ym(${YM_ID},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
        ` }} />
        <noscript>
          <div><img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div>
        </noscript>
      </body>
    </html>
  );
}
