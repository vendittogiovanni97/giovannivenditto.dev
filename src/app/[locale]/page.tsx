import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { HomeSections } from "@/components/layout/HomeSections";
import { getAllProjects } from "@/lib/content";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  return { alternates: localeAlternates(locale, "") };
}

export default async function Home({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const projects = getAllProjects(locale);

  return (
    <>
      <Hero />
      <HomeSections projects={projects} />
    </>
  );
}
