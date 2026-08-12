import { Metadata } from "next";
import { getAllWritingPosts } from "@/lib/writing";
import { WritingList } from "@/components/writing/WritingList";
import { getLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Writing | Giovanni Venditto",
  description: "Engineering thoughts, deep dives, and lessons learned from building products.",
  openGraph: {
    type: "website",
  },
};

export default async function WritingPage() {
  const locale = await getLocale();
  const posts = getAllWritingPosts(locale);

  return <WritingList posts={posts} />;
}
