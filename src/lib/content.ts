import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  stack: string[];
  category: "product" | "client" | "experimental";
  featured: boolean;
  order: number;
  metrics?: Record<string, string>;
  challenges?: string[];
  solutions?: string[];
  learnings?: string[];
  images?: {
    hero?: string;
    gallery?: string[];
  };
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

export interface ProjectContent {
  metadata: ProjectMetadata;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

function getProjectFilePath(slug: string, locale?: string): string | null {
  if (locale) {
    const localePath = path.join(projectsDirectory, locale, `${slug}.mdx`);
    if (fs.existsSync(localePath)) return localePath;
  }
  const rootPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

export function getProjectSlugs(locale?: string): string[] {
  const slugs = new Set<string>();

  // If locale is specified, prefer locale directory
  if (locale) {
    const localeDir = path.join(projectsDirectory, locale);
    if (fs.existsSync(localeDir)) {
      fs.readdirSync(localeDir)
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
      return Array.from(slugs);
    }
  }

  // Fall back to root directory
  if (fs.existsSync(projectsDirectory)) {
    fs.readdirSync(projectsDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
  }

  return Array.from(slugs);
}

export function getProject(slug: string, locale?: string): ProjectContent | null {
  const filePath = getProjectFilePath(slug, locale);
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      slug,
      ...data,
    } as ProjectMetadata,
    content,
  };
}

export function getAllProjects(locale?: string): ProjectMetadata[] {
  const slugs = getProjectSlugs(locale);
  const projects = slugs
    .map((slug) => getProject(slug, locale))
    .filter((p): p is ProjectContent => p !== null)
    .map((p) => p.metadata)
    .sort((a, b) => a.order - b.order);

  return projects;
}

export function getFeaturedProjects(locale?: string): ProjectMetadata[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

export function getProjectsByCategory(category: ProjectMetadata["category"], locale?: string): ProjectMetadata[] {
  return getAllProjects(locale).filter((p) => p.category === category);
}
