"use client";

import { motion } from "framer-motion";
import { GlassPanel, Chip } from "@/components/ui";
import { useI18n } from "@/i18n";
const valueIcons = [
  <svg key="eng" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  <svg key="perf" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="ds" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  <svg key="a11y" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></svg>,
  <svg key="ship" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
];

const valueKeys = ["engineering", "performance", "designSystems", "accessibility", "ship"] as const;

export function StudioContent() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="mb-16 border-b border-slate-800 pb-8">
          <h1 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight">{t.studio.title}</h1>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.studio.subtitle}
          </p>
        </div>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="font-headline text-2xl md:text-3xl text-slate-100 mb-6">{t.studio.bioTitle}</h2>
              <div className="space-y-4 font-headline text-base text-slate-400 font-light leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP2 }} />
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP3 }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <GlassPanel padding="lg" className="rounded-2xl mb-6">
                <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-4">{t.studio.quickFacts}</div>
                <div className="space-y-3 font-code-snippet text-2xs">
                  <div className="flex justify-between"><span className="text-slate-400">{t.studio.location}</span><span className="text-slate-100">Italy</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">{t.studio.experience}</span><span className="text-slate-100">5+ years</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">{t.studio.focus}</span><span className="text-slate-100">Frontend / Full Stack</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">{t.studio.languages}</span><span className="text-slate-100">IT, EN</span></div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </section>

        <section className="mb-24">
          <div className="font-headline text-2xl text-slate-100 mb-8">{t.studio.valuesTitle}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassPanel variant="hover" padding="lg" className="rounded-2xl h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 border border-accent/30 text-accent">
                    {valueIcons[i]}
                  </div>
                  <h3 className="font-headline text-lg text-slate-100 mb-2">{t.studio.values[key].title}</h3>
                  <p className="font-headline text-sm text-slate-400 font-light leading-relaxed">{t.studio.values[key].description}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="font-headline text-2xl text-slate-100 mb-8">{t.studio.timelineTitle}</div>
          <div className="space-y-0">
            {[
              { period: t.studio.timeline.current, role: t.studio.timeline.currentRole, company: t.studio.timeline.currentCompany, description: t.studio.timeline.currentDesc },
              { period: t.studio.timeline["2022"], role: t.studio.timeline["2022Role"], company: t.studio.timeline["2022Company"], description: t.studio.timeline["2022Desc"] },
              { period: t.studio.timeline["2020"], role: t.studio.timeline["2020Role"], company: t.studio.timeline["2020Company"], description: t.studio.timeline["2020Desc"] },
              { period: t.studio.timeline["2019"], role: t.studio.timeline["2019Role"], company: t.studio.timeline["2019Company"], description: t.studio.timeline["2019Desc"] },
            ].map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0 border-l border-accent/20 last:border-transparent"
              >
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-[7px]" />
                <div className="font-code-snippet text-2xs text-accent mb-2">{item.period}</div>
                <h3 className="font-headline text-lg text-slate-100 mb-1">{item.role}</h3>
                <div className="font-headline text-sm text-slate-400 mb-2">{item.company}</div>
                <p className="font-headline text-sm text-slate-400 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="font-headline text-2xl text-slate-100 mb-8">{t.studio.techStackTitle}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: t.techStack.categories.frontend, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js / R3F", "WebGL / WebGPU"] },
              { category: t.techStack.categories.backend, items: ["Node.js", "tRPC", "Prisma", "PostgreSQL", "Supabase", "GraphQL", "REST APIs"] },
              { category: t.techStack.categories.tools, items: ["Git", "GitHub Actions", "Vercel", "Docker", "Sentry", "Playwright", "Storybook"] },
              { category: "Learning", items: ["Rust / WASM", "AI/ML Integration", "Shader Programming", "System Design"] },
            ].map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassPanel padding="lg" className="rounded-2xl h-full">
                  <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-4">{group.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item} variant="tech" size="sm">{item}</Chip>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
