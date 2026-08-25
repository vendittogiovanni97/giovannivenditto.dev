import { Metadata } from "next";
import { LabContent } from "@/components/lab/LabContent";

export const metadata: Metadata = {
  title: "Interactive Lab | Giovanni Venditto",
  description: "Live interactive engineering playground featuring OCR PDF Simulator, 10k AG Grid Benchmark, and Real-time Design System Inspector.",
  openGraph: {
    type: "website",
  },
};

export default function LabPage() {
  return <LabContent />;
}
