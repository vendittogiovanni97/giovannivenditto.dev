import { Metadata } from "next";
import { StudioContent } from "@/components/studio/StudioContent";

export const metadata: Metadata = {
  title: "Studio | Giovanni Venditto",
  description: "About me: values, timeline, tech stack, and how I work.",
};

export default function StudioPage() {
  return <StudioContent />;
}