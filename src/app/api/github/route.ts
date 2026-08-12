import { NextResponse } from "next/server";
import { config } from "@/lib/config";

interface GitHubRepo {
  fork: boolean;
  stargazers_count: number;
}

// Cached server-side (shared across visitors) to avoid per-client GitHub rate limits.
// Set GITHUB_TOKEN in the environment to raise the limit further.
export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${config.github}/repos?sort=updated&per_page=12&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return NextResponse.json({ repos: [] });
    const data = await res.json();
    const repos = Array.isArray(data)
      ? data
          .filter((r: GitHubRepo) => !r.fork || r.stargazers_count > 0)
          .slice(0, 8)
      : [];
    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [] });
  }
}
