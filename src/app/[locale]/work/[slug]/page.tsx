import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getAllProjects, getProjectSlugs } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { config } from "@/lib/config";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const project = getProject(slug, locale);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const { metadata } = project;
  return {
    // Plain string, not "title | author" — the root layout's title.template
    // already appends " | {author}" to every page; doing it here too
    // doubled the author name in the tab title ("X | Giovanni | Giovanni").
    title: metadata.title,
    description: metadata.shortDescription,
    alternates: localeAlternates(locale, `/work/${slug}`),
    openGraph: {
      title: metadata.title,
      description: metadata.shortDescription,
      type: "article",
      images: metadata.images?.hero ? [`${config.siteUrl}${metadata.images.hero}`] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.shortDescription,
      images: metadata.images?.hero ? [`${config.siteUrl}${metadata.images.hero}`] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const project = getProject(slug, locale);

  if (!project) {
    notFound();
  }

  const html = await renderMarkdown(project.content);

  const allProjects = getAllProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <CaseStudyLayout
      project={project.metadata}
      prevProject={prevProject}
      nextProject={nextProject}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </CaseStudyLayout>
  );
}
