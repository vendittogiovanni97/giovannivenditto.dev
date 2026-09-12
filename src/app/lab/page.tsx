import { Metadata } from "next";
import { LabContent } from "@/components/lab/LabContent";
import { getLocale } from "@/i18n/server";

const COPY = {
  it: {
    title: "Lab Interattivo & Demo AI",
    description:
      "Testa dal vivo il simulatore di estrazione OCR + LLM per documenti PDF, il benchmark di 10.000 record su AG Grid a 60fps e il Design System Inspector.",
    ogTitle: "Interactive Lab & AI Demos | Giovanni Venditto",
    ogDescription:
      "Benchmark ad alte prestazioni ed estrazione dati OCR + AI testabili in tempo reale nel browser.",
  },
  en: {
    title: "Interactive Lab & AI Demos",
    description:
      "Try live the OCR + LLM extraction simulator for PDF documents, the 10,000-row AG Grid benchmark at 60fps, and the Design System Inspector.",
    ogTitle: "Interactive Lab & AI Demos | Giovanni Venditto",
    ogDescription:
      "High-performance benchmarks and OCR + AI data extraction you can test live in the browser.",
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

export default function LabPage() {
  return <LabContent />;
}
