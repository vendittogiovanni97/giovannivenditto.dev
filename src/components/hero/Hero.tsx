"use client";

import { useEffect, useState } from "react";
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
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTimeString(
        new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Rome",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

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
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16 aurora-bg"
    >
      <WebGLBackground />

      {/* Single ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-[12%] left-[6%] w-[44vw] h-[44vw] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-8">
        {/* Status line */}
        <motion.div
          {...reveal(0)}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10 font-mono text-xs text-slate-400"
        >
          <span className="glass-panel inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-slate-200">{t.hero.availability}</span>
          </span>
          {timeString && <span aria-hidden="true">Rome, IT • {timeString}</span>}
        </motion.div>

        {/* Name: the one dominant idea */}
        <motion.h1
          {...reveal(0.08)}
          className="font-headline text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-slate-100"
        >
          GIOVANNI<br />
          <span className="text-accent">VENDITTO</span>
        </motion.h1>

        {/* Single role */}
        <motion.div
          {...reveal(0.16)}
          className="mt-6 flex items-center gap-3 font-mono text-lg sm:text-xl text-accent"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">{t.hero.role}</span>
        </motion.div>

        {/* Positioning line */}
        <motion.p
          {...reveal(0.22)}
          className="mt-6 text-slate-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl text-balance"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          {...reveal(0.28)}
          className="mt-4 text-slate-400 text-base leading-relaxed max-w-2xl"
        >
          {t.hero.bio.replace("{{company}}", "Agilae")}
        </motion.p>

        {/* One primary action + one quiet link */}
        <motion.div
          {...reveal(0.36)}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#work"
            className="px-6 py-3 rounded-full bg-accent text-slate-950 font-semibold text-sm hover:bg-accent-bright transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(184,255,60,0.3)] hover:shadow-[0_0_35px_rgba(184,255,60,0.5)] cursor-pointer"
          >
            <span>{t.hero.exploreWork}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="font-mono text-sm text-slate-300 hover:text-accent transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            {t.hero.contactMe}
          </a>
        </motion.div>
      </div>
    </header>
  );
}
