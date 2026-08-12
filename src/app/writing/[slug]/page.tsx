import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWritingPost,
  getAllWritingPosts,
  getWritingSlugs,
} from "@/lib/writing";
import { renderMarkdown } from "@/lib/markdown";
import { WritingPostLayout } from "@/components/writing/WritingPostLayout";
import { getLocale } from "@/i18n/server";
import { config } from "@/lib/config";

export async function generateStaticParams() {
  const slugs = getWritingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = await getLocale();
  const post = getWritingPost(resolvedParams.slug, locale);

  if (!post) return {};

  return {
    title: `${post.metadata.title} | ${config.authorName}`,
    description: post.metadata.description,
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const locale = await getLocale();
  const post = getWritingPost(resolvedParams.slug, locale);

  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <WritingPostLayout post={post.metadata}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </WritingPostLayout>
  );
}
