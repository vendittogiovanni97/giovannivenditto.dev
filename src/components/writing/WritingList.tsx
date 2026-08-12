"use client";

import { motion } from "framer-motion";
import { GlassPanel, Chip } from "@/components/ui";
import { useI18n } from "@/i18n";
import Link from "next/link";
import type { WritingPost } from "@/lib/writing";

interface WritingListProps {
  posts: WritingPost[];
}

function PostCard({ post, delay = 0 }: { post: WritingPost; delay?: number }) {
  const { t, locale } = useI18n();
  const categoryColors: Record<string, string> = {
    Engineering: "text-accent border-accent/30 bg-accent/5",
    Creative: "text-slate-300 border-slate-300/30 bg-slate-300/5",
    Product: "text-slate-100 border-slate-100/20 bg-slate-100/5",
  };

  return (
    <Link href={`/writing/${post.metadata.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className="group"
      >
        <GlassPanel variant="hover" padding="lg" className="rounded-3xl h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Chip variant="status" size="sm" className={categoryColors[post.metadata.category] || ""}>
              {post.metadata.category}
            </Chip>
            <span className="font-code-snippet text-2xs text-slate-400">
              {post.metadata.readingTime}
            </span>
          </div>

          <h3 className="font-headline text-xl md:text-2xl text-slate-100 mb-3 group-hover:text-accent transition-colors leading-tight">
            {post.metadata.title}
          </h3>

          <p className="font-headline text-sm text-slate-400 mb-6 flex-1 font-light leading-relaxed">
            {post.metadata.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-900 rounded font-code-snippet text-3xs text-slate-400 border border-accent/10">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-accent/10 pt-4">
            <span className="font-code-snippet text-2xs text-slate-400">
              {new Date(post.metadata.date).toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="font-code-snippet text-2xs text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              {t.writing.readMore}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>
        </GlassPanel>
      </motion.article>
    </Link>
  );
}

export function WritingList({ posts }: WritingListProps) {
  const { t } = useI18n();

  return (
    <section className="w-full pt-36 pb-24 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-accent/20 pb-8"
        >
          <div>
            <h1 className="font-headline text-4xl md:text-5xl text-slate-100 tracking-tight mb-4">{t.writing.title}</h1>
            <p className="font-headline text-slate-400 max-w-xl text-lg font-light">
              {t.writing.subtitle}
            </p>
          </div>
          <span className="font-code-snippet text-code-snippet text-accent mt-4 md:mt-0 px-4 py-1 rounded-full border border-accent/20 bg-accent/5">
            {t.writing.articles.replace("{{count}}", String(posts.length))}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.metadata.slug} post={post} delay={0.1 + index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
