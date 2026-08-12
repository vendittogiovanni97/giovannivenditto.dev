"use client";

import { motion } from "framer-motion";
import { Chip, Button, GlassPanel } from "@/components/ui";
import Link from "next/link";
import type { ProjectMetadata } from "@/lib/content";

interface CaseStudyLayoutProps {
  project: ProjectMetadata;
  prevProject: ProjectMetadata | null;
  nextProject: ProjectMetadata | null;
  children: React.ReactNode;
}

export function CaseStudyLayout({ project, prevProject, nextProject, children }: CaseStudyLayoutProps) {
  return (
    <article className="min-h-screen bg-background">
      <header className="relative w-full pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-code-snippet text-2xs text-slate-400 hover:text-accent transition-colors mb-8 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Work
          </Link>

          <motion.div
            layoutId={`card-${project.slug}`}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <Chip variant="status" size="md">{project.category}</Chip>
            {project.current && (
              <Chip variant="status" size="md" className="bg-accent/20 text-accent border-accent/50">
                Current
              </Chip>
            )}
          </motion.div>

          <motion.h1
            layoutId={`title-${project.slug}`}
            className="font-headline text-4xl md:text-6xl lg:text-7xl text-slate-100 tracking-tight leading-[0.9] mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-lg md:text-xl text-slate-400 max-w-2xl mb-8"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <div className="glass-panel rounded-xl px-5 py-3">
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">Role</div>
              <div className="font-headline text-sm text-slate-100">{project.role}</div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-3">
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">Company</div>
              <div className="font-headline text-sm text-slate-100">{project.company}</div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-3">
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">Period</div>
              <div className="font-headline text-sm text-slate-100">
                {project.startDate}{project.endDate ? ` – ${project.endDate}` : " – Present"}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <section className="w-full py-16 border-y border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-8">Key Metrics</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(project.metrics).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-headline text-2xl md:text-3xl text-slate-100 mb-1">{value}</div>
                  <div className="font-code-snippet text-2xs text-slate-400">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-container-max mx-auto px-gutter py-16">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:text-slate-100 prose-p:text-slate-400 prose-p:font-headline prose-p:font-light prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-slate-100 prose-code:text-accent prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-10 prose-ul:space-y-2 prose-li:marker:text-accent">
          {children}
        </div>
      </div>

      {project.stack && project.stack.length > 0 && (
        <section className="w-full py-12 border-t border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-4">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech} variant="tech" size="md">{tech}</Chip>
              ))}
            </div>
          </div>
        </section>
      )}

      {(project.links?.live || project.links?.github) && (
        <section className="w-full py-12 border-t border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter flex gap-4">
            {project.links.live && (
              <Button variant="primary" asChild size="lg">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button variant="secondary" asChild size="lg">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.579v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </section>
      )}

      <nav className="w-full border-t border-accent/10">
        <div className="max-w-container-max mx-auto px-gutter flex">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="flex-1 py-8 pr-8 group hover:bg-slate-900/30 transition-colors -mx-4 px-4"
            >
              <div className="font-code-snippet text-3xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Previous
              </div>
              <div className="font-headline text-lg text-slate-100 group-hover:text-accent transition-colors">{prevProject.title}</div>
            </Link>
          ) : <div className="flex-1" />}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="flex-1 py-8 pl-8 group hover:bg-slate-900/30 transition-colors text-right -mx-4 px-4"
            >
              <div className="font-code-snippet text-3xs text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="font-headline text-lg text-slate-100 group-hover:text-accent transition-colors">{nextProject.title}</div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </nav>
    </article>
  );
}