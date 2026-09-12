import { Metadata } from "next";
import { StudioContent } from "@/components/studio/StudioContent";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const COPY: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  it: {
    title: "Chi Sono & Formazione",
    description:
      "La mia storia, il percorso accademico presso Link Campus, l'esperienza in Agilae e le 4 certificazioni ufficiali Anthropic Claude.",
    ogTitle: "Chi Sono & Competenze | Giovanni Venditto",
    ogDescription:
      "Fullstack Engineer con specializzazione in piattaforme web scalabili, sicurezza RBAC e soluzioni AI-first (Anthropic & Gemini).",
  },
  en: {
    title: "About Me & Background",
    description:
      "My story, my academic path at Link Campus, my experience at Agilae, and my 4 official Anthropic Claude certifications.",
    ogTitle: "About Me & Skills | Giovanni Venditto",
    ogDescription:
      "Fullstack Engineer specialized in scalable web platforms, RBAC security, and AI-first solutions (Anthropic & Gemini).",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const c = COPY[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: localeAlternates(locale, "/studio"),
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
    },
  };
}

export default function StudioPage() {
  return <StudioContent />;
}
