"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, Code2, Layers, Award } from "lucide-react";
import type { ProjectMetadata } from "@/lib/content";
import Link from "next/link";
import { Chip } from "@/components/ui";

interface ProjectQuickViewModalProps {
  project: ProjectMetadata | null;
  onClose: () => void;
}

export function ProjectQuickViewModal({ project, onClose }: ProjectQuickViewModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-cyan-400/30 bg-slate-950/90 shadow-[0_0_50px_rgba(184,255,60,0.15)] text-slate-100 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Chiudi anteprima"
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-cyan-500/20 border border-slate-700/50 hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Visual */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 border-b border-cyan-500/10">
            {project.images?.hero ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.images.hero}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/20 to-slate-950 flex items-center justify-center">
                <Code2 className="w-20 h-20 text-cyan-400/30" />
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Chip variant="status" size="sm" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                    {project.category.toUpperCase()}
                  </Chip>
                  <span className="font-mono text-xs text-slate-400">{project.startDate}</span>
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Description */}
            <div>
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Panoramica Progetto</span>
              </h3>
              <p className="font-headline text-lg text-slate-300 leading-relaxed font-light">
                {project.shortDescription}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([label, value], idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-4 rounded-xl border border-cyan-400/15 bg-slate-900/40"
                  >
                    <div className="font-headline text-2xl font-bold text-cyan-300">{value}</div>
                    <div className="font-mono text-xs text-slate-400 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Stack Badges */}
            <div>
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>Tech Stack Utilizzato</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-900 border border-slate-800 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Role & Company info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              <div>
                <span className="font-mono text-xs text-slate-400 block">Ruolo svolto</span>
                <span className="font-headline text-sm font-medium text-slate-200">{project.role}</span>
              </div>
              {project.company && (
                <div>
                  <span className="font-mono text-xs text-slate-400 block">Azienda / Client</span>
                  <span className="font-headline text-sm font-medium text-slate-200">{project.company}</span>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-6 border-t border-slate-800/80">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full font-mono text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Chiudi anteprima
              </button>
              <Link
                href={`/work/${project.slug}`}
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-cyan-400 text-slate-950 font-medium text-sm hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(184,255,60,0.3)] hover:shadow-[0_0_30px_rgba(184,255,60,0.5)] cursor-pointer"
              >
                <span>Leggi Case Study Completa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
