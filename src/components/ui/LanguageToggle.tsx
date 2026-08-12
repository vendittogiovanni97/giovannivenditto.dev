"use client";

import { useI18n } from "@/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "it" : "en")}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-accent/30 text-accent hover:bg-accent/10 transition-all font-code-snippet text-2xs"
      aria-label={`Switch to ${locale === "en" ? "Italian" : "English"}`}
    >
      {locale === "en" ? "IT" : "EN"}
    </button>
  );
}
