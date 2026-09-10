"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global smooth-scroll driver. Framer Motion's whileInView / scroll-linked
 * effects and native anchor links (#work, #credentials) all read from the
 * browser's real scroll position, which Lenis keeps in sync while it eases
 * the motion — no other component needs to know it's there.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target && lenisRef.current) {
          setTimeout(() => {
            lenisRef.current?.scrollTo(target as HTMLElement, { offset: -80 });
            // Clean hash from URL so future browser reloads start at top (Hero)
            history.replaceState(null, "", window.location.pathname);
          }, 100);
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
