import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface WritingMetadata {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  readingTime: string;
}

export interface WritingPost {
  metadata: WritingMetadata;
  content: string;
}

const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

function getWritingFilePath(slug: string, locale?: string): string | null {
  if (locale) {
    const localePath = path.join(WRITING_DIR, locale, `${slug}.mdx`);
    if (fs.existsSync(localePath)) return localePath;
  }
  const rootPath = path.join(WRITING_DIR, `${slug}.mdx`);
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

export function getWritingSlugs(locale?: string): string[] {
  const slugs = new Set<string>();

  // If locale is specified, prefer locale directory
  if (locale) {
    const localeDir = path.join(WRITING_DIR, locale);
    if (fs.existsSync(localeDir)) {
      fs.readdirSync(localeDir)
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => slugs.add(file.replace(".mdx", "")));
      return Array.from(slugs);
    }
  }

  // Fall back to root directory
  if (fs.existsSync(WRITING_DIR)) {
    fs.readdirSync(WRITING_DIR)
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(".mdx", "")));
  }

  return Array.from(slugs);
}

export function getWritingPost(slug: string, locale?: string): WritingPost | null {
  const filePath = getWritingFilePath(slug, locale);
  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    metadata: data as WritingMetadata,
    content,
  };
}

export function getAllWritingPosts(locale?: string): WritingPost[] {
  const slugs = getWritingSlugs(locale);
  const posts = slugs
    .map((slug) => getWritingPost(slug, locale))
    .filter((post): post is WritingPost => post !== null);
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
}
