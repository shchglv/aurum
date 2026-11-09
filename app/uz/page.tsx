import type { Metadata } from "next";
import { LocalizedHub, localizedMetadata } from "../localized-seo-page";
export const metadata: Metadata = localizedMetadata("uz");
export default function UzbekHub() { return <LocalizedHub locale="uz" />; }
