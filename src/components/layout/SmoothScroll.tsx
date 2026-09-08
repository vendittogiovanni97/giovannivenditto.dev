"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global smooth-scroll driver. Framer Motion's whileInView / scroll-linked
 * effects and native anchor links (#work, #credentials) all read from the
 * browser's real scroll position, which Lenis keeps in sync while it eases
 * the motion — no other component needs to know it's there.
 *
 * Driven by GSAP's own ticker (not a separate requestAnimationFrame loop) and
 * wired into ScrollTrigger's scroll event: without this, Lenis and every
 * ScrollTrigger instance on the page (Hero, SelectedWork, HowIWork, etc.) run
 * on two independent rAF loops that drift out of sync, so trigger points fire
 * a frame early/late relative to where Lenis has actually eased the scroll to.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
