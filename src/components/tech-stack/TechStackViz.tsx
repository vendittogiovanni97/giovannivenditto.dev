"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "creative";
  level: number;
  icon: string;
}

const skills: Skill[] = [
  { name: "React", category: "frontend", level: 95, icon: "⚛" },
  { name: "Next.js", category: "frontend", level: 92, icon: "▲" },
  { name: "TypeScript", category: "frontend", level: 90, icon: "TS" },
  { name: "Tailwind CSS", category: "frontend", level: 88, icon: "🎨" },
  { name: "Framer Motion", category: "frontend", level: 85, icon: "✦" },
  { name: "WebGL / GLSL", category: "creative", level: 78, icon: "◈" },
  { name: "Three.js", category: "creative", level: 72, icon: "△" },
  { name: "Node.js", category: "backend", level: 82, icon: "⬡" },
  { name: "PostgreSQL", category: "backend", level: 75, icon: "◆" },
  { name: "Prisma", category: "backend", level: 80, icon: "◇" },
  { name: "tRPC", category: "backend", level: 78, icon: "⟡" },
  { name: "Docker", category: "tools", level: 70, icon: "☐" },
  { name: "Git", category: "tools", level: 88, icon: "⊞" },
  { name: "Figma", category: "tools", level: 85, icon: "◐" },
  { name: "Vercel", category: "tools", level: 82, icon: "▽" },
  { name: "AWS", category: "tools", level: 72, icon: "◈" },
];

const categoryConfig = {
  frontend: { key: "frontend" as const, color: "#b8ff3c" },
  backend: { key: "backend" as const, color: "#84c70f" },
  tools: { key: "tools" as const, color: "#8aa294" },
  creative: { key: "creative" as const, color: "#cbff6b" },
};

function SkillNode({ skill, index }: { skill: Skill; index: number }) {
  const config = categoryConfig[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative"
    >
      <div className="glass-panel rounded-2xl p-4 h-full flex flex-col items-center justify-center text-center cursor-default transition-all duration-300 group-hover:border-[var(--hover-color)] group-hover:shadow-[0_0_20px_var(--glow-color)]"
        style={{
          "--hover-color": `${config.color}60`,
          "--glow-color": `${config.color}15`,
        } as React.CSSProperties}
      >
        <div className="text-2xl mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          {skill.icon}
        </div>
        <div className="font-headline text-sm text-slate-100 mb-2 group-hover:text-accent transition-colors">
          {skill.name}
        </div>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ backgroundColor: config.color }}
          />
        </div>
        <div className="font-code-snippet text-3xs text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {skill.level}%
        </div>
      </div>
    </motion.div>
  );
}

export function TechStackViz() {
  const { t } = useI18n();

  return (
    <section className="w-full py-[120px]">
      <div className="max-w-container-max mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-accent/20 pb-8"
        >
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight mb-4">{t.techStack.title}</h2>
            <p className="font-headline text-slate-400 max-w-xl text-lg font-light">
              {t.techStack.subtitle}
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="font-code-snippet text-2xs text-slate-400">{t.techStack.categories[config.key]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {skills.map((skill, index) => (
            <SkillNode key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
