"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui";
import { Play, RotateCcw, Sparkles, Terminal, Copy, Check } from "lucide-react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

interface SnippetPreset {
  id: string;
  title: string;
  category: string;
  language: "html" | "javascript" | "css";
  description: string;
  code: string;
}

const PRESETS: SnippetPreset[] = [
  {
    id: "aurora-card",
    title: "1. Aurora Glassmorphic Card",
    category: "CSS & Web Design",
    language: "html",
    description: "Card con effetto frosted glass, bordo neon 1px e gradient mesh reattivo.",
    code: `<div style="
  background: rgba(15, 27, 20, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(184, 255, 60, 0.3);
  box-shadow: 0 10px 40px rgba(184, 255, 60, 0.15);
  border-radius: 24px;
  padding: 32px;
  max-width: 380px;
  color: #e7efe9;
  font-family: system-ui, sans-serif;
">
  <div style="
    display: inline-block;
    padding: 4px 12px;
    background: rgba(184, 255, 60, 0.15);
    border: 1px solid rgba(184, 255, 60, 0.3);
    border-radius: 99px;
    color: #b8ff3c;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 16px;
  ">LIVE UI PRESET</div>
  
  <h2 style="margin: 0 0 8px 0; font-size: 22px; color: #f2f7f3;">Aurora Cyber Panel</h2>
  <p style="color: #8aa294; line-height: 1.5; font-size: 14px; margin-bottom: 24px;">
    Modifica il codice nell'editor per personalizzare sfumature e bordi luminosi.
  </p>

  <button onclick="alert('Inizializzazione completata!')" style="
    width: 100%;
    padding: 12px;
    background: #b8ff3c;
    border: none;
    border-radius: 12px;
    color: #0b1410;
    font-weight: 700;
    cursor: pointer;
  ">Esegui Azione Test</button>
</div>`
  },
  {
    id: "canvas-particles",
    title: "2. WebGL Particle Field Generator",
    category: "Canvas & Graphics",
    language: "html",
    description: "Generatore di particelle interattivo con simulazione su canvas HTML5.",
    code: `<canvas id="canvas" style="width: 100%; height: 260px; background: #0b1410; border-radius: 16px;"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: Math.random() * 2 + 1
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#b8ff3c';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#b8ff3c';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
</script>`
  },
  {
    id: "optimistic-state",
    title: "3. React Server Action & State",
    category: "Fullstack Architecture",
    language: "javascript",
    description: "Pattern per la sincronizzazione ottimistica dello stato prima della risposta del server.",
    code: `// Simulation of React Server Action with Optimistic UI
console.log("🚀 Inizializzazione Server Action...");

async function submitLike(currentLikes) {
  console.log("⚡ Applicazione immediata aggiornamento ottimistico...");
  const optimisticLikes = currentLikes + 1;
  console.log("📊 Likes ottimisti:", optimisticLikes);

  await new Promise(r => setTimeout(r, 500));
  console.log("✅ Server confermato! Dati persistiti su DB.");
  return optimisticLikes;
}

submitLike(42);`
  }
];

export function InteractiveSnippetLab() {
  const [activePreset, setActivePreset] = useState<SnippetPreset>(PRESETS[0]);
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const langExt = activePreset.language === "html" ? html() : activePreset.language === "css" ? css() : javascript({ jsx: true });

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        oneDark,
        langExt,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePreset.id]);

  const handleSelectPreset = (preset: SnippetPreset) => {
    setActivePreset(preset);
    setCode(preset.code);
  };

  const handleReset = () => {
    setCode(activePreset.code);
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: activePreset.code },
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="snippet-lab" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE CODE PLAYGROUND PRESETS</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Interactive Snippet Lab
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-sm">
            Modifica il codice in tempo reale nel CodeMirror per testare la resa dal vivo.
          </p>
        </div>

        {/* Preset Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-4 py-2.5 rounded-full font-mono text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                activePreset.id === preset.id
                  ? "bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(184,255,60,0.3)] border-cyan-400"
                  : "glass-panel text-slate-300 border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>

        {/* Editor & Live Render Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CodeMirror Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 flex-1 flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="font-mono text-xs text-slate-400 ml-2">{activePreset.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    title="Ripristina Codice"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopy}
                    title="Copia Codice"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div ref={editorRef} className="flex-1 font-mono text-xs min-h-[300px] max-h-[420px] overflow-auto p-2" />

              <div className="px-5 py-2.5 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between font-mono text-2xs text-slate-500">
                <span>{activePreset.category}</span>
                <span className="text-cyan-400">Live Editor</span>
              </div>
            </div>
          </div>

          {/* Render Output Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 flex-1 flex flex-col p-6 relative">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Output in Tempo Reale</span>
                </span>
                <span className="text-3xs text-slate-500">PREVIEW</span>
              </div>

              <div className="flex-1 min-h-[300px] flex items-center justify-center bg-slate-950 rounded-2xl border border-slate-800/80 p-4 relative overflow-hidden">
                {activePreset.language === "html" ? (
                  <iframe
                    key={code}
                    srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:24px;background:#0b1410;display:flex;align-items:center;justify-content:center;min-height:100vh;">${code}</body></html>`}
                    className="w-full h-full border-0 min-h-[280px] rounded-xl"
                    sandbox="allow-scripts"
                    title="Live HTML Preview"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col font-mono text-xs text-emerald-400 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-auto">
                    <div className="text-slate-500 mb-2">// Console Output:</div>
                    <pre className="whitespace-pre-wrap leading-relaxed">{`> Output generato con successo:
> Inizializzazione Server Action...
> Applicazione immediata aggiornamento ottimistico...
> Likes ottimisti: 43
> ✅ Server confermato! Dati persistiti su DB.`}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
