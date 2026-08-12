"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui";
import { useI18n } from "@/i18n";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t.contact.success);
        reset();
      } else {
        toast.error(t.contact.error);
      }
    } catch {
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest block mb-2">{t.contact.name}</label>
          <input
            id="contact-name"
            {...register("name")}
            className="w-full bg-slate-900 border border-accent/10 rounded-lg px-4 py-3 font-headline text-sm text-slate-100 placeholder:text-slate-400/40 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(184,255,60,0.1)] transition-all"
            placeholder={t.contact.name}
          />
          {errors.name && <p className="font-code-snippet text-2xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest block mb-2">{t.contact.email}</label>
          <input
            id="contact-email"
            {...register("email")}
            type="email"
            className="w-full bg-slate-900 border border-accent/10 rounded-lg px-4 py-3 font-headline text-sm text-slate-100 placeholder:text-slate-400/40 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(184,255,60,0.1)] transition-all"
            placeholder="you@example.com"
          />
          {errors.email && <p className="font-code-snippet text-2xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest block mb-2">{t.contact.subject}</label>
        <input
          id="contact-subject"
          {...register("subject")}
          className="w-full bg-slate-900 border border-accent/10 rounded-lg px-4 py-3 font-headline text-sm text-slate-100 placeholder:text-slate-400/40 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(184,255,60,0.1)] transition-all"
          placeholder="Project inquiry, collaboration, etc."
        />
        {errors.subject && <p className="font-code-snippet text-2xs text-red-400 mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-label-technical text-3xs text-slate-400 uppercase tracking-widest block mb-2">{t.contact.message}</label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={6}
          className="w-full bg-slate-900 border border-accent/10 rounded-lg px-4 py-3 font-headline text-sm text-slate-100 placeholder:text-slate-400/40 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(184,255,60,0.1)] transition-all resize-none"
          placeholder={t.contact.message}
        />
        {errors.message && <p className="font-code-snippet text-2xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            {t.contact.sending}
          </span>
        ) : (
          t.contact.send
        )}
      </Button>
    </form>
  );
}
