export type Locale = "en" | "it";

export const locales: Locale[] = ["it", "en"];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return value === "it" || value === "en";
}
