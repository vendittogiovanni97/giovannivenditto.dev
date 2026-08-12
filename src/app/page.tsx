import { Credentials } from "@/components/credentials/Credentials";
import { Hero } from "@/components/hero/Hero";
import { HomeSections } from "@/components/layout/HomeSections";
import { getAllProjects } from "@/lib/content";
import { getLocale } from "@/i18n/server";

export default async function Home() {
  const locale = await getLocale();
  const projects = getAllProjects(locale);

  return (
    <>
      <Hero />
      <HomeSections projects={projects} />
      <Credentials />
    </>
  );
}
