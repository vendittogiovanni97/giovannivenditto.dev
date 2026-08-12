import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { getAllWritingPosts } from "@/lib/writing";
import { config } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.siteUrl;
  const projects = getAllProjects();
  const writingPosts = getAllWritingPosts();

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/studio`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/writing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.7,
  }));

  const writingPages = writingPosts.map((post) => ({
    url: `${baseUrl}/writing/${post.metadata.slug}`,
    lastModified: new Date(post.metadata.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...writingPages];
}