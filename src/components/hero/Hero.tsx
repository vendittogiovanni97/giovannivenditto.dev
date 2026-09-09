"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { useI18n } from "@/i18n";
import { ArrowDown } from "lucide-react";

function SplitHeadline({ text }: { text: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!wrapRef.current) return;
    const chars = wrapRef.current.querySelectorAll<HTMLElement>("[data-char]");
    if (reduce) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      chars,
      { opacity: 0, y: "0.25em" },
      {
        opacity: 1,
        y: "0em",
        duration: 0.45,
        ease: "power3.out",
        stagger: { each: 0.018, from: "start" },
      }
    );
    return () => {
      tween.kill();
    };
  }, [reduce]);

  return (
    <span ref={wrapRef} className="inline-block">
      {text.split("").map((ch, i) => (
        <span key={i} data-char className="inline-block will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: Math.min(delay * 0.35, 0.22), ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header
      id="about"
      className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
      style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}
    >
      {/* Faint print-grain texture, not a gradient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor 0, currentColor 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: the poster */}
          <div className="lg:col-span-7">
            <motion.p
              {...reveal(0)}
              className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 opacity-70"
            >
              {t.hero.role}
            </motion.p>

            <h1
              className="[font-family:var(--font-display)] uppercase text-[15vw] sm:text-[9vw] lg:text-[6.4vw] leading-[0.86] tracking-tight"
            >
              <SplitHeadline text="Giovanni" />
              <br />
              <span className="relative inline-block">
                <SplitHeadline text="Venditto" />
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? undefined : { scaleX: 0 }}
                  animate={reduce ? undefined : { scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-[6%] h-[10%] w-full origin-left"
                  style={{ background: "var(--color-mark)" }}
                />
              </span>
            </h1>

            <motion.p
              {...reveal(0.5)}
              className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed [font-family:var(--font-body)]"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              {...reveal(0.58)}
              className="mt-4 max-w-lg text-base opacity-70 leading-relaxed [font-family:var(--font-body)]"
            >
              {t.hero.bio}
            </motion.p>

            <motion.div {...reveal(0.66)} className="mt-10">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 border-b-2 pb-1 text-base font-semibold [font-family:var(--font-body)] transition-colors"
                style={{ borderColor: "var(--color-ink)" }}
              >
                <span>{t.hero.exploreWork}</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right: real product proof, framed as a browser specimen */}
          <motion.div
            {...reveal(0.4)}
            className="lg:col-span-5 hidden lg:block"
          >
            <div
              className="relative rotate-2 rounded-lg overflow-hidden shadow-[16px_20px_0_var(--color-ink)] border-2"
              style={{ borderColor: "var(--color-ink)", background: "var(--color-ink)" }}
            >
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-paper)", opacity: 0.5 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-paper)", opacity: 0.5 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-paper)", opacity: 0.5 }} />
                <span className="font-mono text-[10px] ml-2 opacity-60" style={{ color: "var(--color-paper)" }}>
                  {t.hero.currentFocus}
                </span>
              </div>
              <div className="relative w-full aspect-[16/9] bg-slate-950">
                <Image
                  src="/projects/assicurativo-studio/elaborazione-polizze.png"
                  alt="Portale Assicurativo — pipeline AI di elaborazione polizze"
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
