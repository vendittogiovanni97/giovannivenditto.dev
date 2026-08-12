"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[90px]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: "450px",
          height: "450px",
        }}
      />
    </motion.div>
  );
}
