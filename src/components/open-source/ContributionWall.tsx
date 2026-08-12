"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel, Chip } from "@/components/ui";
import { useI18n } from "@/i18n";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  updated_at: string;
}

interface ContributionWallProps {
  username: string;
}

function RepoCard({ repo, delay = 0 }: { repo: GitHubRepo; delay?: number }) {
  const langColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    GLSL: "#5686a5",
  };

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <GlassPanel variant="hover" padding="lg" className="rounded-2xl h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <h3 className="font-headline text-sm text-slate-100 group-hover:text-accent transition-colors truncate">
              {repo.name}
            </h3>
          </div>
          {repo.fork && (
            <Chip variant="tech" size="sm" className="text-4xs">fork</Chip>
          )}
        </div>

        {repo.description && (
          <p className="font-headline text-xs text-slate-400 mb-4 flex-1 line-clamp-2 font-light">
            {repo.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="px-2 py-0.5 bg-slate-900 rounded font-code-snippet text-4xs text-slate-400 border border-slate-800">
              {topic}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-slate-800">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: langColors[repo.language] || "#5c7565" }} />
              <span className="font-code-snippet text-3xs text-slate-400">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-code-snippet text-3xs text-slate-400">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
              <path d="M12 12v3" />
            </svg>
            <span className="font-code-snippet text-3xs text-slate-400">{repo.forks_count}</span>
          </div>
        </div>
      </GlassPanel>
    </motion.a>
  );
}

export function ContributionWall({ username }: ContributionWallProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          setRepos([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setRepos(Array.isArray(data.repos) ? data.repos : []);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section className="w-full py-[120px]">
      <div className="max-w-container-max mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-slate-800 pb-8"
        >
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight mb-4">{t.openSource.title}</h2>
            <p className="font-headline text-slate-400 max-w-xl text-lg font-light">
              {t.openSource.subtitle}
            </p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-code-snippet text-2xs text-accent hover:underline mt-4 md:mt-0 flex items-center gap-1"
          >
            github.com/{username}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-panel rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="glass-panel rounded-2xl flex flex-col items-center justify-center text-center py-16 px-6 gap-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.579v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <p className="text-slate-400 text-sm max-w-sm">{t.openSource.error}</p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-5 py-2.5 rounded-full bg-accent text-slate-950 font-medium text-sm hover:bg-accent-bright transition-colors"
            >
              {t.openSource.viewOnGithub}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {repos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} delay={0.05 * index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
