"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui";
import { useI18n } from "@/i18n";
import { Search, Layout, Code2, Rocket } from "lucide-react";

export function HowIWork() {
  const { t } = useI18n();

  const steps = [
    {
      step: "01",
      icon: <Search className="w-5 h-5 text-accent" />,
      title: "Analisi & Architettura Dati",
      desc: "Definizione dei requisiti aziendali, modellazione del database e scelta dell'architettura ideale.",
      tags: ["Model Design", "API Contracts", "Type-Safety"],
    },
    {
      step: "02",
      icon: <Layout className="w-5 h-5 text-accent" />,
      title: "Progettazione UI & Componenti",
      desc: "Creazione di interfacce pulite, reattive e modulari per un'esperienza utente veloce ed intuitiva.",
      tags: ["React 19", "Design System", "Responsive UX"],
    },
    {
      step: "03",
      icon: <Code2 className="w-5 h-5 text-accent" />,
      title: "Sviluppo Fullstack & Integrazioni",
      desc: "Scrittura di codice pulito in TypeScript con gestione delle API, integrazioni OCR ed intelligenza artificiale.",
      tags: ["Node.js / Express", "Prisma / Mongo", "Automazioni AI"],
    },
    {
      step: "04",
      icon: <Rocket className="w-5 h-5 text-accent" />,
      title: "Deploy & Ottimizzazione",
      desc: "Containerizzazione Docker, rilascio continuo ed ottimizzazione delle prestazioni con tempi di risposta minimi.",
      tags: ["Docker", "Vercel Cloud", "Prestazioni 99+"],
    },
  ];

  return (
    <section id="how-i-work" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-slate-800 pb-6">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Come lavoro
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl font-headline font-light">
            Il mio metodo per trasformare idee e requisiti in software reattivo, sicuro e pronto per la produzione.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassPanel
                variant="hover"
                padding="lg"
                className="rounded-2xl h-full border border-slate-800 bg-slate-900/60 hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs text-accent/80 font-bold px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg font-bold text-slate-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-headline text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md font-mono text-3xs bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
