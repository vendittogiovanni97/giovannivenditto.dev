"use client";

import { useState, useCallback } from "react";
import { useKonamiCode } from "@/lib/hooks";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { KonamiOverlay } from "@/components/ui/KonamiOverlay";

export function EasterEggs() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showTrail, setShowTrail] = useState(false);

  const handleKonami = useCallback(() => {
    setShowOverlay(true);
    setShowTrail(true);
  }, []);

  useKonamiCode(handleKonami);

  return (
    <>
      {showTrail && <CursorTrail />}
      <KonamiOverlay
        isActive={showOverlay}
        onClose={() => {
          setShowOverlay(false);
          setShowTrail(false);
        }}
      />
    </>
  );
}
