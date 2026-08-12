"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui";
import { useI18n } from "@/i18n";

interface Credential {
  id: string;
  year: string;
  title: string;
  issuer: string;
  icon: React.ReactNode;
}

const credentials: Credential[] = [
  {
    id: "aws",
    year: "2024",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "meta",
    year: "2023",
    title: "Meta Frontend Professional",
    issuer: "Meta",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "google",
    year: "2022",
    title: "Google IT Automation",
    issuer: "Google",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

function CredentialCard({ credential, delay = 0 }: { credential: Credential; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <GlassPanel variant="hover" padding="lg" className="rounded-3xl h-full flex flex-col">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 border border-accent/30 group-hover:bg-accent/20 transition-colors"
          aria-hidden="true"
        >
          {credential.icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-code-snippet text-xs text-accent mb-2"
        >
          {credential.year}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-headline text-xl text-slate-100 mb-4 leading-tight"
        >
          {credential.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest border-t border-accent/10 pt-4 mt-auto"
        >
          {credential.issuer}
        </motion.div>
      </GlassPanel>
    </motion.div>
  );
}

export function Credentials() {
  const { t } = useI18n();

  return (
    <section id="credentials" className="w-full py-[120px]">
      <div className="max-w-container-max mx-auto px-gutter">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 border-b border-slate-800 pb-8"
      >
        <h2 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight">{t.credentials.title}</h2>
        <p className="mt-2 text-slate-400 text-base max-w-xl">
          {t.credentials.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {credentials.map((cred, index) => (
          <CredentialCard key={cred.id} credential={cred} delay={index * 0.1} />
        ))}
      </div>
      </div>
    </section>
  );
}