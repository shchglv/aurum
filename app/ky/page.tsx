import type { Metadata } from "next";
import { LocalizedHub, localizedMetadata } from "../localized-seo-page";
export const metadata: Metadata = localizedMetadata("ky");
export default function KyrgyzHub() { return <LocalizedHub locale="ky" />; }
