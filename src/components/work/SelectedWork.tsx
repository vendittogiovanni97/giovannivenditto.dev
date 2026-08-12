"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@/components/ui";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { Eye, ArrowUpRight, Filter } from "lucide-react";
import { ProjectQuickViewModal } from "./ProjectQuickViewModal";

interface ProjectCardProps {
  project: ProjectMetadata;
  delay?: number;
  className?: string;
  onQuickView: (project: ProjectMetadata) => void;
}

function ProjectCard({ project, delay = 0, className, onQuickView }: ProjectCardProps) {
  const { t } = useI18n();
  const categoryLabels = {
    product: t.work.category.product,
    client: t.work.category.client,
    experimental: t.work.category.experimental,
  };
  const initials = project.title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.article
      layout
      layoutId={`card-${project.slug}`}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card group relative rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-slate-900/60 hover:border-cyan-400/40 transition-all ${className ?? ""}`}
    >
      {/* Generative cover (fallback when no hero screenshot exists) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(120% 120% at 15% 15%, color-mix(in oklab, var(--color-accent) 18%, transparent) 0%, transparent 55%)",
          }}
        />
        <span className="absolute -right-4 -bottom-14 font-headline font-black leading-none text-9xl text-white/[0.04] select-none group-hover:text-white/[0.06] transition-colors">
          {initials}
        </span>
      </div>

      {/* Real hero screenshot, if present (layers above the cover) */}
      {project.images?.hero && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-55 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 transform-gpu"
          style={{ backgroundImage: `url('${project.images.hero}')` }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      {/* Card Content Overlay */}
      <div className="relative z-20 p-6 sm:p-8 flex flex-col min-h-[380px] justify-between">
        
        {/* Category & Action Buttons */}
        <div className="flex justify-between items-center w-full">
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
            {categoryLabels[project.category]}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(project);
              }}
              title="Anteprima Rapida"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-slate-700 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-all cursor-pointer shadow-md"
            >
              <Eye className="w-4 h-4" />
            </button>

            <Link
              href={`/work/${project.slug}`}
              title="Apri Case Study"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-slate-700 text-slate-200 hover:bg-cyan-400 hover:text-slate-950 transition-all cursor-pointer shadow-md"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Title, Description & Tech Badges */}
        <div className="mt-auto pt-8">
          <Link href={`/work/${project.slug}`}>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="font-headline text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg font-mono text-2xs bg-slate-950/80 border border-slate-800 text-slate-300">
                {tag}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg font-mono text-2xs bg-slate-950/40 text-slate-500 border border-slate-800/50">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface SelectedWorkProps {
  projects: ProjectMetadata[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  const categories = [
    { id: "all", label: t.work.filters.all },
    { id: "product", label: t.work.filters.product },
    { id: "client", label: t.work.filters.client },
    { id: "experimental", label: t.work.filters.experimental },
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.work.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.work.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <Filter className="w-4 h-4 text-cyan-400 mr-2 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(184,255,60,0.3)]"
                  : "glass-panel text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={0.05 + index * 0.05}
                onQuickView={(proj) => setActiveModalProject(proj)}
                className={project.slug === "neural-field-explorer" ? "md:col-span-2" : ""}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <ProjectQuickViewModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}