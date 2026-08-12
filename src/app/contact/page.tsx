import { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Giovanni Venditto",
  description: "Get in touch for project inquiries, collaborations, or just to say hello.",
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
