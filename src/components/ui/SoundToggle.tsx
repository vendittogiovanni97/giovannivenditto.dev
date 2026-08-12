"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(soundManager.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={enabled ? "Disattiva effetti sonori" : "Attiva effetti sonori"}
      title={enabled ? "Audio FX On" : "Audio FX Muted"}
      className="p-2 rounded-full glass-panel border border-cyan-400/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all cursor-pointer flex items-center justify-center"
    >
      {enabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
    </button>
  );
}
