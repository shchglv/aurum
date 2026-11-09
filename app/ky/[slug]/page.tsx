import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedPage, localizedPages } from "../../localized-pages";
import { LocalizedPage, localizedMetadata } from "../../localized-seo-page";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return localizedPages.ky.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; return localizedMetadata("ky", slug); }
export default async function Page({ params }: Props) { const { slug } = await params; if (!getLocalizedPage("ky", slug)) notFound(); return <LocalizedPage locale="ky" slug={slug} />; }
