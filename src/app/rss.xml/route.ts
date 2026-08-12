import { getAllWritingPosts } from "@/lib/writing";

export async function GET() {
  const posts = getAllWritingPosts();
  const baseUrl = "https://giovannivenditto.dev";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Venditto | Writing</title>
    <description>Thoughts on engineering, creative coding, and building products that matter.</description>
    <link>${baseUrl}/writing</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en</language>
    ${posts
      .map(
        (post) => `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <description>${escapeXml(post.metadata.description)}</description>
      <link>${baseUrl}/writing/${post.metadata.slug}</link>
      <guid isPermaLink="true">${baseUrl}/writing/${post.metadata.slug}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.metadata.category)}</category>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
