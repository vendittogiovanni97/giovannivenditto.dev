"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Award, Sparkles, Building2 } from "lucide-react";
import { useI18n } from "@/i18n";

const MILESTONES = [
  { id: "agilae", stack: ["Next.js 16", "React 19", "TypeScript", "tRPC", "Prisma", "Tailwind CSS v4"] },
  { id: "studio", stack: ["React", "Three.js", "WebGL", "GSAP", "Framer Motion", "Zustand"] },
  { id: "dph", stack: ["Node.js", "Express", "React", "PostgreSQL", "Docker", "Jest"] },
] as const;

export function ExperienceTimeline() {
  const { t } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="experience" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.experience.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {MILESTONES.map((item, idx) => {
            const copy = t.experience.milestones[item.id];
            const isExpanded = expandedIndex === idx;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass-panel rounded-3xl border transition-all overflow-hidden ${
                  isExpanded
                    ? "border-accent/40 bg-slate-900 shadow-xl"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-accent shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-headline text-lg font-bold text-slate-100">
                          {copy.role}
                        </h3>
                        <span className="font-mono text-xs text-accent px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                          {copy.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          {copy.year}
                        </span>
                        <span>•</span>
                        <span>{copy.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                      {isExpanded ? t.experience.collapse : t.experience.expand}
                    </span>
                    <div className={`p-1.5 rounded-full border border-slate-700 transition-transform ${isExpanded ? "rotate-180 text-accent border-accent/50" : "text-slate-400"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 border-t border-slate-800/80"
                    >
                      <p className="font-headline text-slate-300 text-sm sm:text-base font-light leading-relaxed my-5">
                        {copy.description}
                      </p>

                      <div className="space-y-2 mb-5">
                        <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center gap-2">
                          <Award className="w-3.5 h-3.5" />
                          <span>{t.experience.results}</span>
                        </div>
                        <ul className="space-y-2">
                          {copy.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-3 font-headline text-sm text-slate-300">
                              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg font-mono text-xs bg-slate-950 border border-slate-800 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
