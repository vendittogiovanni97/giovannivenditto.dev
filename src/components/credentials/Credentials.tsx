"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, Code2, ExternalLink, X, ZoomIn } from "lucide-react";
import { useI18n } from "@/i18n";

interface Credential {
  id: string;
  year: string;
  title: string;
  issuer: string;
  badge?: string;
  image?: string;
  icon: React.ReactNode;
}

const credentials: Credential[] = [
  {
    id: "claude-101",
    year: "2026",
    title: "Claude 101",
    issuer: "Anthropic",
    badge: "Certificazione Ufficiale",
    image: "/certificates/claude-101.png",
    icon: <Award className="w-6 h-6 text-accent" />,
  },
  {
    id: "link-campus",
    year: "2025",
    title: "Full Stack Developer",
    issuer: "Università degli Studi Link Campus",
    badge: "Attestato Accademico",
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
  },
  {
    id: "nexus-pozzuoli",
    year: "2025",
    title: "Frontend Developer",
    issuer: "Corso TEMP presso Nexus Pozzuoli",
    badge: "Corso di Specializzazione",
    icon: <Code2 className="w-6 h-6 text-accent" />,
  },
];

export function Credentials() {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<{ title: string; image: string } | null>(null);

  return (
    <section id="credentials" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-slate-800 pb-6 flex items-center justify-between"
        >
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              {t.credentials.title}
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              {t.credentials.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Icon & Year */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-accent/40 transition-colors">
                    {cred.icon}
                  </div>
                  <span className="font-mono text-xs text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-semibold">
                    {cred.year}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-headline text-xl font-bold text-slate-100 mb-1 group-hover:text-accent transition-colors">
                  {cred.title}
                </h3>
                <p className="font-headline text-sm text-slate-300 font-medium mb-4">
                  {cred.issuer}
                </p>

                {/* Certificate Preview Image if Available */}
                {cred.image ? (
                  <div
                    onClick={() => setSelectedImage({ title: cred.title, image: cred.image! })}
                    className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-accent/50 cursor-pointer transition-all my-4 bg-slate-950 flex items-center justify-center p-2"
                  >
                    {/* Standard HTML img to avoid Next Image loader blocking */}
                    <img
                      src={cred.image}
                      alt={cred.title}
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-slate-900/90 text-accent font-mono text-xs px-3.5 py-2 rounded-xl border border-accent/40 flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                        Ingrandisci
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full py-10 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs my-4">
                    <span>Documento in fase di caricamento</span>
                  </div>
                )}
              </div>

              {/* Footer Badge */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">
                  {cred.badge}
                </span>
              </div>
            </motion.div>
          ))}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="font-headline text-lg font-bold text-slate-100">
                  {selectedImage.title} — Certificato Ufficiale Anthropic
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image View */}
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