"use client";

import { useCallback, useRef, useEffect, useState } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px) scale(1)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function useKonamiCode(onActivate: () => void) {
  const [progress, setProgress] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const expected = KONAMI_CODE[progress];
      if (e.code === expected) {
        const next = progress + 1;
        if (next === KONAMI_CODE.length) {
          onActivate();
          setProgress(0);
        } else {
          setProgress(next);
        }
      } else {
        setProgress(0);
      }
    },
    [progress, onActivate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return progress;
}
