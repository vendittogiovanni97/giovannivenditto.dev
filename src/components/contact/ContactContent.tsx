"use client";

import { useI18n } from "@/i18n";
import { ContactForm } from "@/components/layout/ContactForm";
import { GlassPanel } from "@/components/ui";
import { config } from "@/lib/config";
import { Calendar, ArrowRight } from "lucide-react";

export function ContactContent() {
  const { t } = useI18n();

  return (
    <>
      <div className="mb-16 border-b border-slate-800 pb-8">
        <h1 className="[font-family:var(--font-display)] uppercase text-4xl md:text-5xl text-slate-100 tracking-tight">{t.contact.title}</h1>
        <p className="mt-2 text-slate-400 text-base max-w-xl">{t.contact.subtitle}</p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-7">
        <ContactForm />
      </div>

      <div className="lg:col-span-4 lg:col-start-9 space-y-6">
        {/* Book a 15-minute Discovery Call */}
        <div className="p-6 rounded-2xl border-2 border-accent/50 bg-accent/10 relative overflow-hidden shadow-[0_0_30px_rgba(202,164,86,0.1)]">
          <div className="font-mono text-3xs text-accent uppercase tracking-widest mb-2 flex items-center gap-2 font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>CALENDAR · 15 MIN</span>
          </div>
          <h3 className="font-headline text-base sm:text-lg font-bold text-slate-100 mb-2">
            {t.contact.bookCallTitle}
          </h3>
          <p className="font-body text-xs text-slate-300 leading-relaxed mb-4">
            {t.contact.bookCallDesc}
          </p>
          <a
            href={config.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-slate-950 font-headline text-xs sm:text-sm font-bold hover:bg-accent-bright transition-all cursor-pointer group"
          >
            <span>{t.contact.bookCallButton}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <GlassPanel padding="lg" className="rounded-2xl">
          <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-4">{t.contact.directContact}</div>
          <a href={`mailto:${config.email}`} className="font-headline text-lg text-slate-100 hover:text-accent transition-colors block mb-2">
            {config.email}
          </a>
          <div className="font-code-snippet text-2xs text-slate-400">{t.contact.replyWithin}</div>
        </GlassPanel>

        <GlassPanel padding="lg" className="rounded-2xl">
          <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-4">{t.contact.availability}</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(202,164,86,0.5)]" />
            <span className="font-headline text-sm text-slate-100">{t.contact.availableForFreelance}</span>
          </div>
          <div className="font-code-snippet text-2xs text-slate-400">
            {t.contact.openTo}
          </div>
        </GlassPanel>

        <GlassPanel padding="lg" className="rounded-2xl">
          <div className="font-label-technical text-3xs text-accent uppercase tracking-widest mb-4">{t.contact.social}</div>
          <div className="space-y-3">
            <a href={`https://linkedin.com/in/${config.linkedin}`} target="_blank" rel="noopener noreferrer" className="font-headline text-sm text-slate-100 hover:text-accent transition-colors block">LinkedIn</a>
            <a href={`https://github.com/${config.github}`} target="_blank" rel="noopener noreferrer" className="font-headline text-sm text-slate-100 hover:text-accent transition-colors block">GitHub</a>
            <a href={`https://twitter.com/${config.twitter}`} target="_blank" rel="noopener noreferrer" className="font-headline text-sm text-slate-100 hover:text-accent transition-colors block">Twitter / X</a>
          </div>
        </GlassPanel>
      </div>
    </div>
    </>
  );
}
