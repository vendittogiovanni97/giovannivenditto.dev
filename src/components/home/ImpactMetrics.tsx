"use client";

import { motion } from "framer-motion";
import { Code, ShieldCheck, Globe, Trophy } from "lucide-react";
import { useI18n } from "@/i18n";

const METRICS = [
  { key: "experience", icon: Trophy, value: "5+", color: "text-accent" },
  { key: "projects", icon: Code, value: "20+", color: "text-accent-bright" },
  { key: "studios", icon: ShieldCheck, value: "12", color: "text-accent-deep" },
  { key: "loc", icon: Globe, value: "50k+", color: "text-accent" },
] as const;

export function ImpactMetrics() {
  const { t } = useI18n();

  return (
    <section className="w-full py-12 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const copy = t.metrics[metric.key];
            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${metric.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ShieldCheck className="w-4 h-4 text-slate-600 group-hover:text-accent transition-colors" />
                </div>

                <div className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-1">
                  {metric.value}
                </div>

                <div className="font-headline text-sm font-semibold text-slate-200 mb-1">
                  {copy.label}
                </div>

                <div className="font-mono text-xs text-slate-400 font-normal">
                  {copy.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
