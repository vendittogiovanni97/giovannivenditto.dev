"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Chip, Button } from "@/components/ui";
import Link from "next/link";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";

interface CaseStudyLayoutProps {
  project: ProjectMetadata;
  prevProject: ProjectMetadata | null;
  nextProject: ProjectMetadata | null;
  children: React.ReactNode;
}

export function CaseStudyLayout({ project, prevProject, nextProject, children }: CaseStudyLayoutProps) {
  const { t } = useI18n();
  return (
    <article className="min-h-screen bg-background">
      <header className="relative w-full pt-32 pb-16">
        <div className="max-w-container-max mx-auto px-gutter">
          <Link
            href="/#work"
            scroll={false}
            prefetch={true}
            className="inline-flex items-center gap-2 font-code-snippet text-2xs text-slate-400 hover:text-accent transition-colors mb-8 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t.work.caseStudy.backToWork}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Chip variant="status" size="md">{t.work.category[project.category]}</Chip>
            {project.current && (
              <Chip variant="status" size="md" className="bg-accent/20 text-accent border-accent/50">
                {t.work.caseStudy.current}
              </Chip>
            )}
          </div>

          <h1 className="[font-family:var(--font-display)] uppercase text-4xl md:text-6xl lg:text-7xl text-slate-100 tracking-tight leading-[0.9] mb-6">
            {project.title}
          </h1>

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
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">{t.work.caseStudy.role}</div>
              <div className="font-headline text-sm text-slate-100">{project.role}</div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-3">
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">{t.work.caseStudy.company}</div>
              <div className="font-headline text-sm text-slate-100">{project.company}</div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-3">
              <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-1">{t.work.caseStudy.period}</div>
              <div className="font-headline text-sm text-slate-100">
                {project.startDate}{project.endDate ? ` – ${project.endDate}` : ` – ${t.work.caseStudy.present}`}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <section className="w-full py-16 border-y border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-8">{t.work.caseStudy.keyMetrics}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(project.metrics).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="[font-family:var(--font-display)] text-3xl md:text-4xl text-slate-100 mb-1">{value}</div>
                  <div className="font-code-snippet text-2xs text-slate-400">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.images?.gallery && project.images.gallery.length > 0 && (
        <section className="w-full py-16 border-b border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-8">{t.work.caseStudy.screenshot}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative rounded-2xl overflow-hidden border border-slate-800 glass-panel ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — ${t.work.caseStudy.screenshot} ${i + 1}`}
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-container-max mx-auto px-gutter py-16">
        <div className="prose prose-invert prose-lg max-w-none [&_h2]:[font-family:var(--font-display)] [&_h2]:uppercase [&_h3]:[font-family:var(--font-display)] [&_h3]:uppercase prose-headings:text-slate-100 prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-slate-100 prose-code:text-accent prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-10 prose-ul:space-y-2 prose-li:marker:text-accent">
          {children}
        </div>
      </div>

      {project.stack && project.stack.length > 0 && (
        <section className="w-full py-12 border-t border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest mb-4">{t.work.caseStudy.techStack}</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech} variant="tech" size="md">{tech}</Chip>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.links?.live && (
        <section className="w-full py-12 border-t border-accent/10">
          <div className="max-w-container-max mx-auto px-gutter flex gap-4">
            <Button variant="primary" asChild size="lg">
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {t.work.caseStudy.liveDemo}
              </a>
            </Button>
          </div>
        </section>
      )}

      <nav className="w-full border-t border-accent/10">
        <div className="max-w-container-max mx-auto px-gutter flex">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              prefetch={true}
              className="flex-1 py-8 pr-8 group hover:bg-slate-900/30 transition-colors -mx-4 px-4"
            >
              <div className="font-code-snippet text-3xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {t.work.caseStudy.previous}
              </div>
              <div className="font-headline text-lg text-slate-100 group-hover:text-accent transition-colors">{prevProject.title}</div>
            </Link>
          ) : <div className="flex-1" />}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              prefetch={true}
              className="flex-1 py-8 pl-8 group hover:bg-slate-900/30 transition-colors text-right -mx-4 px-4"
            >
              <div className="font-code-snippet text-3xs text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                {t.work.caseStudy.next}
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