import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getAllProjects, getProjectSlugs } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { config } from "@/lib/config";
import { getLocale } from "@/i18n/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = await getLocale();
  const project = getProject(resolvedParams.slug, locale);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const { metadata } = project;
  return {
    title: `${metadata.title} | ${config.authorName}`,
    description: metadata.shortDescription,
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
  const resolvedParams = await params;
  const locale = await getLocale();
  const project = getProject(resolvedParams.slug, locale);

  if (!project) {
    notFound();
  }

  const html = await renderMarkdown(project.content);

  const allProjects = getAllProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === resolvedParams.slug);
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
