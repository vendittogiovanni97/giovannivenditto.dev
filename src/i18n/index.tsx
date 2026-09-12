"use client";

import { createContext, useContext, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import en from "./en.json";
import it from "./it.json";

type Locale = "en" | "it";
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, it };

// IT is the default, unprefixed locale (preserves every URL indexed before
// this migration); EN lives under /en. Middleware rewrites bare paths to
// /it/* internally, so this helper only ever needs to add/remove the /en
// prefix — it never sees /it in the actual pathname.
function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

function withLocalePrefix(locale: Locale, canonicalPath: string): string {
  if (locale === "it") return canonicalPath;
  return canonicalPath === "/" ? "/en" : `/en${canonicalPath}`;
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  /** Turn a canonical (IT) internal path into one that respects the active locale. */
  href: (canonicalPath: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLocale = "it" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    // Optimistic update so copy switches instantly, then navigate to the
    // equivalent localized URL — the source of truth is the URL now, not a
    // cookie, so search engines see distinct, indexable pages per language.
    setLocaleState(newLocale);
    const canonical = stripLocalePrefix(pathname);
    router.push(withLocalePrefix(newLocale, canonical));
  }, [locale, pathname, router]);

  const href = useCallback((canonicalPath: string) => withLocalePrefix(locale, canonicalPath), [locale]);

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, href }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
