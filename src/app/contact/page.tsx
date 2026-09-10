import { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contatto & Prenota una Call",
  description:
    "Parliamo del tuo progetto, della fattibilità tecnica o prenota una call conoscitiva di 30 minuti su Calendly con Giovanni Venditto.",
  openGraph: {
    title: "Contatta Giovanni Venditto | Fullstack & AI-Ready Engineer",
    description:
      "Hai un progetto web o un'automazione AI da realizzare? Prenota 30 minuti su Calendly o invia un messaggio diretto.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <ContactContent />
      </div>
    </div>
  );
}
