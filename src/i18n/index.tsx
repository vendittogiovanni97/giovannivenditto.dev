"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import en from "./en.json";
import it from "./it.json";

type Locale = "en" | "it";
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, it };

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLocale = "it" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
      document.documentElement.lang = newLocale;
    }
    // Server Components (project/writing lists resolved from locale-specific
    // MDX) read the locale cookie at request time, so a pure client-side
    // context update leaves them stale until the next navigation. Refresh
    // the router so they re-render with the new locale immediately.
    router.refresh();
  }, [router]);

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
