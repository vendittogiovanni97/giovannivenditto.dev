"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/#work", label: t.nav.work },
    { href: "/writing", label: t.nav.writing },
    { href: "/studio", label: t.nav.studio },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? window.scrollY / docH : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scrim: hides page content scrolling behind the floating nav pill */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 w-full h-28 z-40 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 64%, color-mix(in oklab, var(--background) 80%, transparent) 86%, transparent)",
        }}
      />

      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <nav
        id="main-nav"
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center glass-panel rounded-full px-6 py-2.5 bg-slate-950/80 border-slate-800">
          
          {/* Logo */}
          <Link href="/" className="font-headline text-lg font-extrabold tracking-tighter text-slate-100 hover:text-cyan-400 transition-colors">
            GV.
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 font-mono text-xs hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-2xs text-slate-400 pr-2 border-r border-slate-800">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              {t.nav.available}
            </div>
            <SoundToggle />
            <LanguageToggle />
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full bg-cyan-400 text-slate-950 font-mono text-xs font-semibold hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(184,255,60,0.3)]"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden mt-3 rounded-2xl px-6 py-5 bg-slate-950 border border-slate-800 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-200 font-mono text-sm hover:text-accent py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <SoundToggle />
                    <LanguageToggle />
                  </div>
                  <Link
                    href="/contact"
                    className="px-5 py-2 rounded-full bg-accent text-slate-950 font-mono text-xs font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.contact}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}