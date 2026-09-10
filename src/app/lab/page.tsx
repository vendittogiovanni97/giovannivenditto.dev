import { Metadata } from "next";
import { LabContent } from "@/components/lab/LabContent";

export const metadata: Metadata = {
  title: "Lab Interattivo & Demo AI",
  description:
    "Testa dal vivo il simulatore di estrazione OCR + LLM per documenti PDF, il benchmark di 10.000 record su AG Grid a 60fps e il Design System Inspector.",
  openGraph: {
    title: "Interactive Lab & AI Demos | Giovanni Venditto",
    description:
      "Benchmark ad alte prestazioni ed estrazione dati OCR + AI testabili in tempo reale nel browser.",
  },
};

export default function LabPage() {
  return <LabContent />;
}
