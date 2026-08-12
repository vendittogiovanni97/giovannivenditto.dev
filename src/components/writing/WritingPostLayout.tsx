"use client";

import { WritingMetadata } from "@/lib/writing";
import { motion } from "framer-motion";
import { Chip } from "@/components/ui";
import { useI18n } from "@/i18n";
import Link from "next/link";

interface WritingPostLayoutProps {
  post: WritingMetadata;
  children: React.ReactNode;
}

export function WritingPostLayout({ post, children }: WritingPostLayoutProps) {
  const { t, locale } = useI18n();
  const formattedDate = new Date(post.date).toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-background">
      <header className="pt-32 pb-16 max-w-3xl mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {t.writing.backToWriting}
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Chip variant="status" size="sm">
            {post.category}
          </Chip>
          <span className="text-sm text-slate-400 font-code-snippet">
            {post.readingTime}
          </span>
          <span className="text-sm text-slate-400">{formattedDate}</span>
        </motion.div>

        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-headline text-slate-100 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {post.title}
        </motion.h1>

        <motion.p
          className="text-xl text-slate-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {post.description}
        </motion.p>

        {post.tags && post.tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-slate-900 text-accent border border-accent/20 font-code-snippet"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-gutter">
        <div className="prose prose-invert prose-lg prose-code:text-accent prose-code:bg-slate-900">
          {children}
        </div>
      </div>

      <nav className="max-w-3xl mx-auto px-gutter py-16 mt-16 border-t border-accent/10">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t.writing.backToWriting}
        </Link>
      </nav>
    </article>
  );
}
