import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "aurum.ws";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: "AURUM — кошелёк без границ", template: "%s" },
    description: "Рубли, USDT и виртуальные карты в одном лицензированном сервисе.",
    keywords: ["AURUM", "купить USDT", "виртуальная карта", "карта иностранного банка", "Web3 кошелек"],
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { type: "website", locale: "ru_RU", siteName: "AURUM", title: "AURUM — деньги без границ", description: "Рубли, USDT и виртуальные карты в одном приложении.", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "AURUM — деньги без границ" }] },
    twitter: { card: "summary_large_image", title: "AURUM — деньги без границ", description: "Рубли, USDT и виртуальные карты в одном приложении.", images: [`${origin}/og.png`] },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const org = { "@context": "https://schema.org", "@type": "FinancialService", name: "AURUM", url: "https://aurum.ws", email: "info@aurum.ws", description: "Крипто-фиатный кошелёк и сервис виртуальных карт" };
  return <html lang="ru"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} /></body></html>;
}
