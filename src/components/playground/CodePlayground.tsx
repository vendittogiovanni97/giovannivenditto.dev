"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

type Language = "javascript" | "html" | "css";

interface CodePlaygroundProps {
  code?: string;
  language?: Language;
  title?: string;
}

const DEFAULT_CODE = `function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>React Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`;

const languageExtensions: Record<Language, () => ReturnType<typeof javascript>> = {
  javascript: () => javascript({ jsx: true }),
  html: () => html(),
  css: () => css(),
};

const tabLabels: Record<Language, string> = {
  javascript: "JS",
  html: "HTML",
  css: "CSS",
};

export function CodePlayground({
  code: initialCode,
  language: initialLanguage = "javascript",
  title = "Code Playground",
}: CodePlaygroundProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<Language>(initialLanguage);
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        oneDark,
        languageExtensions[activeLanguage](),
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
  }, [activeLanguage]);

  function handleLanguageChange(lang: Language) {
    if (lang === activeLanguage) return;
    setCode(viewRef.current?.state.doc.toString() || code);
    setActiveLanguage(lang);
  }

  function handleRun() {
    setShowOutput(true);

    if (activeLanguage === "javascript") {
      runJavaScript();
    } else if (activeLanguage === "html") {
      runHTML();
    } else {
      runCSS();
    }
  }

  function runJavaScript() {
    const logs: string[] = [];
    const sandbox = {
      console: {
        log: (...args: unknown[]) => {
          logs.push(args.map(String).join(" "));
        },
        error: (...args: unknown[]) => {
          logs.push(`Error: ${args.map(String).join(" ")}`);
        },
        warn: (...args: unknown[]) => {
          logs.push(`Warning: ${args.map(String).join(" ")}`);
        },
      },
      React,
      useState: React.useState,
    };

    try {
      const fn = new Function(...Object.keys(sandbox), code);
      fn(...Object.values(sandbox));
    } catch (e) {
      logs.push(`Runtime Error: ${(e as Error).message}`);
    }

    setOutput(logs.join("\n") || "(no output)");
  }

  function runHTML() {
    setOutput("__HTML__");
  }

  function runCSS() {
    setOutput("__CSS__");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel className="rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white/90">{title}</h3>
          <div className="flex items-center gap-1">
            {(["javascript", "html", "css"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeLanguage === lang
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                {tabLabels[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div ref={editorRef} className="min-h-[200px] max-h-[400px] overflow-auto" />

        {/* Run Button */}
        <div className="flex justify-end px-5 py-3 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            className="px-5 py-2 text-sm font-semibold text-slate-950 bg-accent rounded-lg hover:bg-accent-bright transition-all shadow-[0_0_15px_rgba(184,255,60,0.3)]"
          >
            Esegui
          </motion.button>
        </div>
      </GlassPanel>

      {/* Output */}
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 rounded-2xl overflow-hidden bg-slate-900"
        >
          {output === "__HTML__" ? (
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:16px;font-family:sans-serif;">${code}</body></html>`}
              className="w-full h-[300px] border-0 rounded-2xl"
              sandbox="allow-scripts"
              title="HTML Output"
            />
          ) : output === "__CSS__" ? (
            <div className="p-6">
              <div className="bg-white rounded-xl p-8">
                <style>{code}</style>
                <p className="text-gray-800 text-lg">Preview</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Sample Button
                </button>
                <input
                  className="mt-2 ml-2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Sample Input"
                />
              </div>
            </div>
          ) : (
            <pre className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
