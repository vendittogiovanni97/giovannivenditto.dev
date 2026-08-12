"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { GlassPanel, Button } from "@/components/ui";
import { config } from "@/lib/config";

export function CVGenerator() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

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
            <h2 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight mb-4">CV</h2>
            <p className="font-headline text-slate-400 max-w-xl text-lg font-light">
              Download or print my resume.
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={handlePrint} className="mt-4 md:mt-0 print:hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print / Save PDF
          </Button>
        </motion.div>

        <div ref={cvRef} className="bg-slate-900 rounded-3xl p-8 md:p-12 print:bg-white print:text-black print:rounded-none print:p-0">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight print:text-black mb-2">
                Giovanni Venditto
              </h1>
              <p className="font-headline text-lg text-slate-400 print:text-gray-600">
                Senior Frontend Developer & Creative Engineer
              </p>
              <div className="flex flex-wrap gap-4 mt-4 font-code-snippet text-2xs text-slate-400 print:text-gray-500">
                <span>{config.siteUrl.replace("https://", "")}</span>
                <span>linkedin.com/in/{config.linkedin}</span>
                <span>github.com/{config.github}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className="font-headline text-xl text-slate-100 print:text-black mb-4 border-b border-accent/20 print:border-gray-300 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline text-slate-100 print:text-black font-medium">Tech Lead & Senior Frontend Developer</h3>
                    <span className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2022 – Present</span>
                  </div>
                  <p className="font-code-snippet text-2xs text-accent print:text-blue-600 mb-2">Agilae</p>
                  <ul className="list-disc list-inside text-sm text-slate-400 print:text-gray-600 space-y-1">
                    <li>Lead frontend architecture for insurance platform digitalizing Italian agencies</li>
                    <li>Built token-based design system with dark/light mode, used across 3 production apps</li>
                    <li>Implemented real-time collaboration features with WebSocket integration</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline text-slate-100 print:text-black font-medium">Frontend Developer</h3>
                    <span className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2020 – 2022</span>
                  </div>
                  <p className="font-code-snippet text-2xs text-accent print:text-blue-600 mb-2">InkFlow Studio</p>
                  <ul className="list-disc list-inside text-sm text-slate-400 print:text-gray-600 space-y-1">
                    <li>Developed SaaS platform for tattoo studio management (booking, CRM, POS)</li>
                    <li>Built offline-first PWA with sync capabilities for unreliable connections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-headline text-xl text-slate-100 print:text-black mb-4 border-b border-accent/20 print:border-gray-300 pb-2">
                Skills
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-code-snippet text-2xs text-accent print:text-blue-600 uppercase tracking-widest mb-2">Frontend</h3>
                  <p className="text-sm text-slate-400 print:text-gray-600">React, Next.js, TypeScript, Tailwind CSS, Framer Motion, WebGL, Three.js</p>
                </div>
                <div>
                  <h3 className="font-code-snippet text-2xs text-accent print:text-blue-600 uppercase tracking-widest mb-2">Backend</h3>
                  <p className="text-sm text-slate-400 print:text-gray-600">Node.js, tRPC, Prisma, PostgreSQL, REST APIs</p>
                </div>
                <div>
                  <h3 className="font-code-snippet text-2xs text-accent print:text-blue-600 uppercase tracking-widest mb-2">Tools</h3>
                  <p className="text-sm text-slate-400 print:text-gray-600">Git, Docker, Vercel, AWS, Figma, Storybook</p>
                </div>
              </div>

              <h2 className="font-headline text-xl text-slate-100 print:text-black mt-8 mb-4 border-b border-accent/20 print:border-gray-300 pb-2">
                Certifications
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-slate-100 print:text-black">AWS Certified Developer</p>
                  <p className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2024</p>
                </div>
                <div>
                  <p className="text-sm text-slate-100 print:text-black">Meta Frontend Professional</p>
                  <p className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2023</p>
                </div>
                <div>
                  <p className="text-sm text-slate-100 print:text-black">Google IT Automation</p>
                  <p className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2022</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-xl text-slate-100 print:text-black mb-4 border-b border-accent/20 print:border-gray-300 pb-2">
              Education
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-slate-100 print:text-black font-medium">Computer Science</h3>
                <p className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">University of Naples Federico II</p>
              </div>
              <span className="font-code-snippet text-2xs text-slate-400 print:text-gray-500">2016 – 2020</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-bg, .print-bg * { visibility: visible; }
          .print-bg { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </section>
  );
}
