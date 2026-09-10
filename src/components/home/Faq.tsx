"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Mail, HelpCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { config } from "@/lib/config";

export function Faq() {
  const { t } = useI18n();
  // Default first item open to invite reading
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="w-full py-24 relative overflow-hidden">
      {/* Schema.org FAQPage JSON-LD for rich Google search snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
              {t.faq.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl lg:text-5xl text-slate-100 tracking-tight"
          >
            {t.faq.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-accent/50 bg-slate-900/90 shadow-[0_4px_30px_rgba(202,164,86,0.08)]"
                    : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
                        isOpen ? "text-accent" : "text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {itemNumber}
                    </span>
                    <span
                      className={`font-headline text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                        isOpen
                          ? "text-slate-100"
                          : "text-slate-300 group-hover:text-slate-100"
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "border-accent bg-accent/15 text-accent rotate-180"
                        : "border-slate-800 bg-slate-950 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-1 border-t border-slate-800/60 pl-14 sm:pl-20">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance & Direct Action Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-14 rounded-2xl border border-accent/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-500/5 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(202,164,86,0.06)]"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-slate-100 tracking-tight">
              {t.faq.stillQuestions}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg">
              {t.faq.askDirectly}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={config.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-slate-950 hover:bg-accent-bright font-headline text-sm font-semibold transition-all shadow-[0_0_20px_rgba(202,164,86,0.3)] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
              <span>{t.faq.bookCall}</span>
            </a>

            <a
              href={`mailto:${config.email}?subject=Richiesta%20Informazioni%20Progetto`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-700 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-slate-100 font-headline text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{t.faq.emailMe}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
