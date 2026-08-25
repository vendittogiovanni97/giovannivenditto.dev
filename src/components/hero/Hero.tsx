"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useI18n } from "@/i18n";
import { ArrowDown, Sparkles } from "lucide-react";

const WebGLBackground = dynamic(
  () => import("./WebGLBackground").then((m) => ({ default: m.WebGLBackground })),
  { ssr: false }
);

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header
      id="about"
      className="relative min-h-[88vh] flex items-center overflow-hidden pt-28 pb-16 aurora-bg"
    >
      <WebGLBackground />

      {/* Single ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-[10%] left-[4%] w-[46vw] h-[46vw] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dominant Hero Text */}
          <div className="lg:col-span-7">
            {/* Name: the one dominant idea */}
            <motion.h1
              {...reveal(0)}
              className="font-headline text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-slate-100"
            >
              GIOVANNI<br />
              <span className="text-accent">VENDITTO</span>
            </motion.h1>

            {/* Role */}
            <motion.div
              {...reveal(0.08)}
              className="mt-6 sm:mt-8 flex items-center gap-3 font-mono text-xl sm:text-2xl text-accent"
            >
              <Sparkles className="w-6 h-6" />
              <span className="font-semibold">{t.hero.role}</span>
            </motion.div>

            {/* Positioning line */}
            <motion.p
              {...reveal(0.16)}
              className="mt-6 text-slate-200 text-xl sm:text-2xl font-light leading-relaxed text-balance"
            >
              {t.hero.tagline}
            </motion.p>

            {/* Bio */}
            <motion.p
              {...reveal(0.24)}
              className="mt-5 text-slate-400 text-base sm:text-lg leading-relaxed"
            >
              {t.hero.bio}
            </motion.p>

            {/* Primary action */}
            <motion.div {...reveal(0.32)} className="mt-8 sm:mt-10">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-slate-950 font-semibold text-sm hover:bg-accent-bright transition-all shadow-[0_0_25px_rgba(184,255,60,0.3)] hover:shadow-[0_0_35px_rgba(184,255,60,0.5)] cursor-pointer"
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Brand-Coherent Architecture Terminal Card */}
          <motion.div
            {...reveal(0.28)}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="font-mono text-xs text-slate-400 ml-2">architecture.config.ts</span>
                </div>
                <span className="font-mono text-xs text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                  {t.hero.currentFocus}
                </span>
              </div>

              {/* Stack Architecture Entries */}
              <div className="space-y-3 font-mono text-xs">
                {[
                  { label: "FRAMEWORK", value: "Next.js 16 (App Router) & React 19" },
                  { label: "TYPE SYSTEM", value: "TypeScript Strict Architecture" },
                  { label: "API & DATA", value: "Node.js, Express 5, MongoDB & Prisma" },
                  { label: "UI & TABLES", value: "Material UI (MUI) & AG Grid 32" },
                  { label: "AUTOMATION", value: "OCR (Tesseract) & LLM Integration" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-accent/30 transition-all flex flex-col gap-1"
                  >
                    <span className="text-slate-500 text-2xs uppercase tracking-wider">{item.label}</span>
                    <span className="text-slate-200 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
