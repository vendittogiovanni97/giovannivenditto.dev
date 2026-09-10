"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Award, GraduationCap, Code2, X, ZoomIn, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";

type BadgeKey = "official" | "academic" | "specialization";

interface Credential {
  id: string;
  year: string;
  title: string;
  issuer: string;
  badgeKey: BadgeKey;
  image?: string;
  icon: React.ReactNode;
}

const credentials: Credential[] = [
  {
    id: "claude-101",
    year: "2026",
    title: "Claude 101",
    issuer: "Anthropic",
    badgeKey: "official",
    image: "/certificates/claude-101.png",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "claude-code-101",
    year: "2026",
    title: "Claude Code 101",
    issuer: "Anthropic",
    badgeKey: "official",
    image: "/certificates/claude-code-101.png",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "claude-platform-101",
    year: "2026",
    title: "Claude Platform 101",
    issuer: "Anthropic",
    badgeKey: "official",
    image: "/certificates/claude-platform-101.png",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "claude-cowork",
    year: "2026",
    title: "Claude Cowork",
    issuer: "Anthropic",
    badgeKey: "official",
    image: "/certificates/claude-cowork.png",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "link-campus",
    year: "2025",
    title: "Full Stack Developer",
    issuer: "Università degli Studi Link Campus",
    badgeKey: "academic",
    icon: <GraduationCap className="w-8 h-8" />,
  },
  {
    id: "nexus-pozzuoli",
    year: "2025",
    title: "Frontend Developer",
    issuer: "Corso presso Nexus Pozzuoli",
    badgeKey: "specialization",
    icon: <Code2 className="w-8 h-8" />,
  },
];

const AUTOPLAY_MS = 6000;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.97,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.97,
  }),
};

export function Credentials() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [selectedImage, setSelectedImage] = useState<{ title: string; image: string } | null>(null);
  const [paused, setPaused] = useState(false);
  const total = credentials.length;
  const current = credentials[index];

  const goTo = useCallback(
    (next: number) => {
      const wrapped = (next + total) % total;
      setSlide(([i]) => [wrapped, wrapped > i || (i === total - 1 && wrapped === 0) ? 1 : -1]);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Escape closes the certificate modal, matching native <dialog> expectations.
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Autoplay: advances on a timer, pauses on hover/focus and resets whenever
  // the user navigates manually so it never fights an intentional click.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, next]);

  return (
    <section
      id="credentials"
      className="w-full py-20 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="mb-12 border-b border-slate-800 pb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-slate-100 tracking-tight">
              {t.credentials.title}
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">{t.credentials.subtitle}</p>
          </div>
          <div className="font-mono text-sm text-slate-500 tracking-wider">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Anthropic Official AI Spotlight Strip */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-accent text-slate-950 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-headline text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{t.credentials.anthropicBadge}</span>
                <span className="font-mono text-3xs uppercase tracking-widest px-2 py-0.5 rounded bg-accent/20 text-accent font-bold">
                  Official
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{t.credentials.anthropicSpotlight}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["Claude 101", "Claude Code 101", "Claude Platform 101", "Claude Cowork"].map((badge, bIdx) => (
              <span
                key={bIdx}
                className="inline-block font-mono text-3xs text-slate-300 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800"
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial={reduce ? undefined : "enter"}
              animate="center"
              exit={reduce ? undefined : "exit"}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Left: identity block */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <span
                  aria-hidden="true"
                  className="block [font-family:var(--font-display)] text-[7rem] sm:text-[9rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-slate-700)] select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {t.credentials.badges[current.badgeKey]} · {current.year}
                </span>
                <h3 className="mt-3 [font-family:var(--font-display)] uppercase text-4xl sm:text-5xl leading-[0.95] text-slate-100">
                  {current.title}
                </h3>
                <p className="mt-4 text-slate-400 text-base sm:text-lg">{current.issuer}</p>

                {current.image && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage({ title: current.title, image: current.image! })}
                    className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-semibold text-accent hover:text-accent-bright transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                    {t.credentials.enlarge}
                  </button>
                )}
              </div>

              {/* Right: the certificate itself, framed and flat (no crop) */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative rounded-lg bg-paper text-ink p-3 sm:p-4 shadow-[14px_18px_0_rgba(0,0,0,0.35)] border border-black/5">
                  {current.image ? (
                    <button
                      type="button"
                      onClick={() => setSelectedImage({ title: current.title, image: current.image! })}
                      className="group relative block w-full aspect-[4/3] overflow-hidden bg-slate-950 cursor-pointer rounded-sm"
                    >
                      <img
                        src={current.image}
                        alt={current.title}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-ink/85 text-paper font-mono text-2xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5" />
                          {t.credentials.enlarge}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="relative w-full aspect-[4/3] bg-slate-100 flex flex-col items-center justify-center gap-3 text-slate-500 rounded-sm">
                      {current.icon}
                      <FileText className="w-6 h-6 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label={t.credentials.prevAria}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-700 text-slate-200 hover:bg-accent hover:text-slate-950 hover:border-accent transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.credentials.nextAria}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-700 text-slate-200 hover:bg-accent hover:text-slate-950 hover:border-accent transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2">
            {credentials.map((cred, i) => (
              <button
                key={cred.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t.credentials.goToAria.replace("{n}", String(i + 1))}
                aria-current={i === index}
                className={`h-1.5 flex-1 max-w-16 rounded-full transition-colors duration-300 cursor-pointer ${
                  i === index ? "bg-accent" : "bg-slate-800 hover:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* High-Res Certificate Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 id="certificate-modal-title" className="[font-family:var(--font-display)] uppercase text-lg text-slate-100">
                  {selectedImage.title} — {t.credentials.officialCertificate}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-2 flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full max-h-[75vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
