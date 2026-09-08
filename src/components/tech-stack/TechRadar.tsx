"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n";

interface TechLogo {
  id: string;
  name: string;
  category: string;
}

const TECH_LOGOS: TechLogo[] = [
  { id: "nextjs", name: "Next.js 16", category: "Framework" },
  { id: "typescript", name: "TypeScript", category: "Language" },
  { id: "react", name: "React 19", category: "UI Library" },
  { id: "tailwind", name: "Tailwind CSS", category: "Styling" },
  { id: "mui", name: "MUI (Material UI)", category: "UI Component Library" },
  { id: "vite", name: "Vite", category: "Build Tool" },
  { id: "nestjs", name: "NestJS", category: "Backend Framework" },
  { id: "java", name: "Java", category: "Language" },
  { id: "nodejs", name: "Node.js", category: "Runtime" },
  { id: "prisma", name: "Prisma ORM", category: "Database" },
  { id: "postgres", name: "PostgreSQL", category: "Database" },
  { id: "supabase", name: "Supabase", category: "Backend / Database" },
  { id: "vercel", name: "Vercel", category: "Cloud Deployment" },
  { id: "threejs", name: "Three.js", category: "3D Graphics" },
  { id: "framer", name: "Framer Motion", category: "Animations" },
  { id: "docker", name: "Docker", category: "DevOps" },
  { id: "python", name: "Python / AI", category: "Machine Learning" },
  { id: "git", name: "Git & CI/CD", category: "Version Control" },
];

function TechBrandIcon({ id, className = "w-10 h-10" }: { id: string; className?: string }) {
  switch (id) {
    case "nextjs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="64" fill="#FFFFFF" />
          <path d="M106.333 111.966L49.167 38H38v52h9.167V50.366l51.616 66.6z" fill="#000000" />
          <path d="M89.833 38H80.667v52h9.166V38z" fill="#000000" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 0h125a1.5 1.5 0 0 1 1.5 1.5v125a1.5 1.5 0 0 1-1.5 1.5h-125a1.5 1.5 0 0 1-1.5-1.5v-125A1.5 1.5 0 0 1 1.5 0z" fill="#3178C6" />
          <path d="M76.8 86.4c2.3 1.8 5.5 3.2 9.4 3.2 4.2 0 6.6-2 6.6-4.8 0-3-2-4.5-7.1-6.5l-3.1-1.2c-7.4-2.9-11.2-7.2-11.2-13.7 0-8.6 6.9-14.6 17.9-14.6 5.4 0 10 1.5 12.7 3.3l-3.4 7.5c-2.3-1.4-5.4-2.7-9.2-2.7-4.6 0-6.3 2.2-6.3 4.5 0 2.7 1.8 4 6.9 5.9l3.1 1.2c8.2 3.2 11.6 7.5 11.6 14.2 0 9.2-6.9 15.1-18.9 15.1-6.3 0-11.8-1.8-15-4l3.6-7.3zM39.3 57H25.5v-7.5H63.6V57H49.8v40.2H39.3V57z" fill="#FFFFFF" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="10" fill="#61DAFB" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="5.5" fill="none" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="5.5" fill="none" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="5.5" fill="none" transform="rotate(120 64 64)" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 67.2C35.2 57.6 43.2 52.8 56 52.8C72 52.8 76.8 64 86.4 64C92.8 64 97.6 59.2 100.8 49.6C97.6 59.2 89.6 64 76.8 64C60.8 64 56 52.8 46.4 52.8C40 52.8 35.2 57.6 32 67.2ZM32 89.6C35.2 80 43.2 75.2 56 75.2C72 75.2 76.8 86.4 86.4 86.4C92.8 86.4 97.6 81.6 100.8 72C97.6 81.6 89.6 86.4 76.8 86.4C60.8 86.4 56 75.2 46.4 75.2C40 75.2 35.2 80 32 89.6Z" fill="#38BDF8" />
        </svg>
      );
    case "mui":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 38.5L51.5 25.5L77 38.5V64.5L51.5 77.5L26 64.5V38.5Z" fill="#00B0FF" />
          <path d="M51.5 25.5L77 38.5L102.5 25.5V51.5L77 64.5L51.5 51.5V25.5Z" fill="#0081CB" />
          <path d="M51.5 77.5L77 64.5L102.5 77.5V103.5L77 90.5L51.5 103.5V77.5Z" fill="#00B0FF" />
          <path d="M26 64.5L51.5 77.5L77 64.5V90.5L51.5 103.5L26 90.5V64.5Z" fill="#0081CB" />
        </svg>
      );
    case "vite":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M99.8 25.6L64 105L28.2 25.6h71.6z" fill="url(#vite_g1)" />
          <path d="M87 25.6L64 76.8L41 25.6h46z" fill="url(#vite_g2)" />
          <path d="M66.6 35.84L53.8 64h10.2l-7.7 23 20.5-33.3H66.6l7.7-17.9h-7.7z" fill="#FFC017" />
          <defs>
            <linearGradient id="vite_g1" x1="28.2" y1="25.6" x2="99.8" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="vite_g2" x1="41" y1="25.6" x2="87" y2="76.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA83" />
              <stop offset="1" stopColor="#FFDD35" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "nestjs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 20C45 32 25 25 25 50C25 82 64 108 64 108C64 108 103 82 103 50C103 25 83 32 64 20Z" fill="#E0234E" />
          <path d="M64 32C51 42 38 36 38 58C38 77 64 96 64 96C64 96 90 77 90 58C90 36 77 42 64 32Z" fill="#FFFFFF" opacity="0.95" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 90c0 0 20 6 40 0s-7-13-7-13H51s-7 13-7 13z" fill="#ED8B00" />
          <path d="M38 70c0 0 26 5 52 0 0 0-13-10-26-10s-26 10-26 10z" fill="#5382A1" />
          <path d="M57 32c0 0-6 13 6 20s0 13 0 13" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M70.4 19.2L25.6 70.4h32L57.6 108.8L102.4 57.6h-32l6-38.4z" fill="url(#supa_g)" />
          <defs>
            <linearGradient id="supa_g" x1="25.6" y1="19.2" x2="102.4" y2="108.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#30B275" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 28L105 99H23L64 28Z" fill="#FFFFFF" />
        </svg>
      );
    case "trpc":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6 96L64 25.6L102.4 96H25.6Z" stroke="#3982CE" strokeWidth="10" strokeLinejoin="round" fill="none" />
          <circle cx="64" cy="64" r="16" fill="#00F0FF" />
        </svg>
      );
    case "prisma":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.2 108.8L25.6 81.2L87.5 19.2L102.4 34.1L53.2 108.8Z" fill="#2D3748" />
          <path d="M25.6 81.2L53.2 108.8L68 94L40.4 66.4L25.6 81.2Z" fill="#4169E1" />
          <path d="M87.5 19.2L40.4 66.4L68 94L102.4 34.1L87.5 19.2Z" fill="#5A67D8" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="38" stroke="#336791" strokeWidth="8" fill="none" />
          <path d="M44 51c0-13 40-13 40 0 0 13-40 13-40 26 0 13 40 13 40 0" stroke="#336791" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "threejs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 19.2L108.8 99.8H19.2L64 19.2Z" stroke="#00F0FF" strokeWidth="8" strokeLinejoin="round" fill="none" />
          <path d="M64 44.8L89.6 89.6H38.4L64 44.8Z" fill="#caa456" opacity="0.85" />
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 25.6h64v32H64L32 25.6z" fill="#0055FF" />
          <path d="M32 57.6h32h32v32H64L32 57.6z" fill="#0055FF" opacity="0.9" />
          <path d="M32 89.6h32v32L32 89.6z" fill="#0055FF" opacity="0.75" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6 70.4h15.36v15.36H25.6zM44.8 70.4h15.36v15.36H44.8zM64 70.4h15.36v15.36H64zM44.8 51.2h15.36v15.36H44.8zM64 51.2h15.36v15.36H64zM83.2 51.2h15.36v15.36H83.2zM64 32h15.36v15.36H64zM83.2 32h15.36v15.36H83.2z" fill="#2496ED" />
          <path d="M19.2 92.16c6.4 12.8 32 12.8 44.8 12.8s44.8 0 51.2-19.2c-6.4 0-12.8 2.56-19.2 2.56s-19.2-6.4-32-6.4-25.6 10.24-44.8 10.24z" fill="#2496ED" opacity="0.9" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 25.6L102.4 47.36v45.76L64 115.2L25.6 93.12V47.36L64 25.6Z" fill="#339933" opacity="0.95" />
          <path d="M64 44.8L89.6 58.88V87.04L64 99.84L38.4 87.04V58.88L64 44.8Z" fill="#FFFFFF" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M61.44 25.6c-19.2 0-17.92 7.68-17.92 7.68v7.68h19.2v2.56H34.56s-8.96 0-8.96 17.92 7.68 17.92 7.68 17.92h5.12V74.24c0-7.68 6.4-7.68 6.4-7.68h19.2s7.68 0 7.68-7.68V33.28s1.28-7.68-10.24-7.68h-3.84zm-6.4 6.4a2.56 2.56 0 1 1 0 5.12 2.56 2.56 0 0 1 0-5.12z" fill="#3776AB" />
          <path d="M66.56 102.4c19.2 0 17.92-7.68 17.92-7.68v-7.68h-19.2v-2.56h28.16s8.96 0 8.96-17.92-7.68-17.92-7.68-17.92h-5.12v6.4c0 7.68-6.4 7.68-6.4 7.68h-19.2s-7.68 0-7.68 7.68v25.6s-1.28 7.68 10.24 7.68h3.84zm6.4-6.4a2.56 2.56 0 1 1 0-5.12 2.56 2.56 0 0 1 0 5.12z" fill="#FFD43B" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M104.96 57.6L70.4 23.04a6.4 6.4 0 0 0-8.96 0L44.8 39.68l15.36 15.36a7.68 7.68 0 0 1 8.96 8.96l15.36 15.36a7.68 7.68 0 1 1-5.12 5.12L64 69.12v23.04a7.68 7.68 0 1 1-7.68-7.68V55.04a7.68 7.68 0 0 1-3.84-3.84L35.84 34.56 23.04 47.36a6.4 6.4 0 0 0 0 8.96l34.56 34.56a6.4 6.4 0 0 0 8.96 0l38.4-38.4a6.4 6.4 0 0 0 0-8.96z" fill="#F05032" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="28" fill="#caa456" />
        </svg>
      );
  }
}

export function TechRadar() {
  const { t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicating the array twice for seamless CSS/Framer animation
  const loopItems = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <section id="tech-stack" className="w-full py-16 relative overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-12 border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.techRadar.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl font-headline font-light">
            {t.techRadar.subtitle}
          </p>
        </div>
        <span className="font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span>{t.techRadar.pauseHint}</span>
        </span>
      </div>

      {/* Side Vignette Gradient Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent" />

      {/* Pure Icon-Only Marquee Ticker */}
      <div
        className="w-full overflow-hidden py-10 pb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-12 sm:gap-16 items-center w-max ${
            isPaused ? "[animation-play-state:paused]" : ""
          } animate-infinite-scroll-right`}
          style={{
            animation: "infinite-scroll-right 35s linear infinite",
          }}
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative group shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.25, y: -6 }}
                className="transition-all cursor-pointer flex items-center justify-center p-1"
              >
                <TechBrandIcon id={item.id} className="w-11 h-11 sm:w-13 sm:h-13 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
              </motion.div>

              {/* Sleek High-Contrast Tooltip on Hover */}
              <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-40 whitespace-nowrap bg-slate-900 border border-slate-700 px-3.5 py-1 rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.9)]">
                <span className="font-mono text-xs text-accent font-bold">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
