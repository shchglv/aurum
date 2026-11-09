import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./site-config";

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
  return <html lang="ru"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} /></body></html>;
}
