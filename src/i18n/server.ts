import { cookies } from "next/headers";

export type Locale = "en" | "it";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  if (locale === "en" || locale === "it") return locale;
  return "it";
}
