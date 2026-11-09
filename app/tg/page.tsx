import type { Metadata } from "next";
import { LocalizedHub, localizedMetadata } from "../localized-seo-page";
export const metadata: Metadata = localizedMetadata("tg");
export default function TajikHub() { return <LocalizedHub locale="tg" />; }
