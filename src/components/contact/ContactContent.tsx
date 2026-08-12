"use client";

import { useI18n } from "@/i18n";
import { ContactForm } from "@/components/layout/ContactForm";
import { GlassPanel } from "@/components/ui";
import { config } from "@/lib/config";

export function ContactContent() {
  const { t } = useI18n();

  return (
    <>
      <div className="mb-16 border-b border-slate-800 pb-8">
        <h1 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight">{t.contact.title}</h1>
        <p className="mt-2 text-slate-400 text-base max-w-xl">{t.contact.subtitle}</p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-7">
        <ContactForm />
      </div>

      <div className="lg:col-span-4 lg:col-start-9 space-y-6">
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
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(184,255,60,0.5)]" />
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
