import { Metadata } from "next";
import { StudioContent } from "@/components/studio/StudioContent";

export const metadata: Metadata = {
  title: "Chi Sono & Formazione",
  description:
    "La mia storia, il percorso accademico presso Link Campus, l'esperienza in Agilae e le 4 certificazioni ufficiali Anthropic Claude.",
  openGraph: {
    title: "Chi Sono & Competenze | Giovanni Venditto",
    description:
      "Fullstack Engineer con specializzazione in piattaforme web scalabili, sicurezza RBAC e soluzioni AI-first (Anthropic & Gemini).",
  },
};

export default function StudioPage() {
  return <StudioContent />;
}