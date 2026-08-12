"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Layers, Code, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";

type Category = "frontend" | "backend" | "graphics" | "devops";
type Level = "Expert" | "Advanced" | "Proficient";

interface TechItem {
  id: string;
  name: string;
  level: Level;
  category: Category;
  codeSnippet?: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js 16 (App Router & RSC)",
    level: "Expert",
    category: "frontend",
    codeSnippet: `// Server Action Example
export async function updateProfile(formData: FormData) {
  'use server';
  const user = await auth();
  return db.user.update({ where: { id: user.id }, data: ... });
}`
  },
  {
    id: "typescript",
    name: "TypeScript Strict & Type Systems",
    level: "Expert",
    category: "frontend",
    codeSnippet: `type StrictlyTypedConfig<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K];
};`
  },
  {
    id: "trpc",
    name: "tRPC & Type-safe APIs",
    level: "Expert",
    category: "backend",
    codeSnippet: `export const appRouter = router({
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.user.findUnique({ where: { id: input } });
  }),
});`
  },
  {
    id: "threejs",
    name: "Three.js & WebGL / WebGPU",
    level: "Advanced",
    category: "graphics",
    codeSnippet: `const geometry = new THREE.BufferGeometry();
const material = new THREE.ShaderMaterial({
  vertexShader, fragmentShader, uniforms
});`
  },
  {
    id: "prisma",
    name: "Prisma ORM & PostgreSQL",
    level: "Expert",
    category: "backend"
  },
  {
    id: "framer",
    name: "Framer Motion & Micro-interactions",
    level: "Expert",
    category: "frontend"
  },
  {
    id: "ai-agents",
    name: "AI Agent Skills & LLM Tooling",
    level: "Advanced",
    category: "devops"
  },
  {
    id: "docker",
    name: "Docker & Cloud Infrastructure",
    level: "Proficient",
    category: "devops"
  }
];

export function TechRadar() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_ITEMS[0]);

  const categories = [
    { id: "all", label: t.techRadar.tabs.all, icon: Layers },
    { id: "frontend", label: t.techRadar.tabs.frontend, icon: Code },
    { id: "backend", label: t.techRadar.tabs.backend, icon: Cpu },
    { id: "graphics", label: t.techRadar.tabs.graphics, icon: Sparkles },
    { id: "devops", label: t.techRadar.tabs.devops, icon: Terminal },
  ];

  const filteredItems = activeCategory === "all"
    ? TECH_ITEMS
    : TECH_ITEMS.filter((item) => item.category === activeCategory);

  const copy = t.techRadar.items[selectedTech.id as keyof typeof t.techRadar.items];

  return (
    <section id="tech-radar" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.techRadar.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.techRadar.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-accent text-slate-950 font-semibold shadow-[0_0_15px_rgba(184,255,60,0.3)]"
                    : "glass-panel text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isSelected = selectedTech.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTech(item)}
                  className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "border-accent/60 bg-slate-900 shadow-[0_0_20px_rgba(184,255,60,0.1)]"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-headline text-sm font-semibold text-slate-100 group-hover:text-accent transition-colors">
                      {item.name}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-accent translate-x-1" : "text-slate-600"}`} />
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-mono text-3xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-accent">
                      {t.techRadar.levels[item.level]}
                    </span>
                    <span className="font-mono text-3xs text-slate-400">
                      {t.techRadar.categoryNames[item.category]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Inspector Box */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/80 relative"
              >
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1">
                      {t.techRadar.categoryNames[selectedTech.category]} • {t.techRadar.levels[selectedTech.level]}
                    </span>
                    <h3 className="font-headline text-2xl font-bold text-slate-100">
                      {selectedTech.name}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <p className="font-headline text-slate-300 text-sm font-light leading-relaxed mb-6">
                  {copy.description}
                </p>

                <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-mono text-xs text-accent font-semibold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.techRadar.keyImpact}</span>
                  </div>
                  <div className="font-headline text-xs text-slate-300">
                    {copy.highlight}
                  </div>
                </div>

                {selectedTech.codeSnippet && (
                  <div>
                    <div className="font-mono text-2xs text-slate-400 mb-2 uppercase tracking-wide">
                      {t.techRadar.exampleSnippet}
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-accent-bright overflow-x-auto">
                      <code>{selectedTech.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
