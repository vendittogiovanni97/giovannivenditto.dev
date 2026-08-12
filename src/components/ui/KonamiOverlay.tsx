"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KonamiOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export function KonamiOverlay({ isActive, onClose }: KonamiOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/90 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Konami code activated"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-8xl mb-6"
              aria-hidden="true"
            >
              🎮
            </motion.div>
            <h2 className="font-headline text-4xl md:text-6xl text-slate-100 tracking-tight mb-4">
              Konami Code Activated!
            </h2>
            <p className="font-headline text-slate-400 text-lg mb-8">
              You found the easter egg. Impressed?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                ref={closeRef}
                onClick={onClose}
                className="px-6 py-3 bg-accent text-slate-950 rounded-full font-label-technical text-sm hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
            <div className="mt-8 font-code-snippet text-2xs text-slate-400" aria-hidden="true">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
