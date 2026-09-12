import { config } from "@/lib/config";
import type { Locale } from "@/i18n/server";

/**
 * IT is the default, unprefixed locale (canonical URLs have no /it), EN
 * lives under /en. Every page must set its OWN alternates (not just the
 * root layout) because the canonical URL depends on the full path, which
 * a shared layout never sees — only the locale segment.
 */
export function localeAlternates(locale: Locale, subPath: string) {
  const itUrl = `${config.siteUrl}${subPath}`;
  const enUrl = `${config.siteUrl}/en${subPath}`;
  return {
    canonical: locale === "it" ? itUrl : enUrl,
    languages: {
      it: itUrl,
      en: enUrl,
      "x-default": itUrl,
    },
  };
}
