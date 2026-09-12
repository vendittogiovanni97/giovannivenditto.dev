import { Metadata } from "next";
import { StudioContent } from "@/components/studio/StudioContent";
import { getLocale } from "@/i18n/server";

const COPY = {
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
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const c = COPY[locale];
  return {
    title: c.title,
    description: c.description,
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
    },
  };
}

export default function StudioPage() {
  return <StudioContent />;
}