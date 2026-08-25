"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-slate-800/80 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-8 flex items-center justify-center sm:justify-start">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-code-snippet text-xs text-slate-400"
        >
          © 2026 {config.authorName}
        </motion.p>
      </div>
    </footer>
  );
}
