---
target: src/app/page.tsx
total_score: 27
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
timestamp: 2026-08-12T08-16-02Z
slug: src-app-page-tsx
---
Method: dual-agent attempted — A completed source-only (could not reach the live server from its sandbox); B executed 0 tool calls and was discarded, detector re-run in parent. Parent supplied live visual inspection (desktop + mobile).

## Design Health Score (Experience surface)

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live clock, scroll-progress bar, active states, loading skeletons, empty state all present |
| 2 | Match System / Real World | 3 | Italian-first fits audience; "Radar Tecnologico" is a grid not a radar; minor EN/IT mix in hardcoded strings |
| 3 | User Control and Freedom | 3 | Filters, modal close, language toggle, focus ring; role ticker auto-advances with no pause |
| 4 | Consistency and Standards | 3 | Big jump from 1: one palette + one header system. Residual: from-violet classes in CodePlayground, stale OG-image colors, emerald not remapped |
| 5 | Error Prevention | 3 | Little to break on a portfolio; GitHub fetch guarded |
| 6 | Recognition Rather Than Recall | 3 | Mostly labelled; hero bento + tech radar overlap forces holding two tech lists in memory |
| 7 | Flexibility and Efficiency | 3 | Real affordances: quick-view modal vs full case study, filters, keyboard focus, lang toggle |
| 8 | Aesthetic and Minimalist Design | 3 | Much cleaner; hero still busy (clock + role ticker + 2 CTAs + bento) and carries vanity metrics |
| 9 | Error Recovery | 3 | Open-source empty/error state now exemplary (icon + plain message + recovery CTA) |
| 10 | Help and Documentation | n/a | Self-explanatory portfolio; no docs warranted |
| **Total** | | **27/36 (75%)** | **Good** |

First run (all 10 scored, /40): 24/40 = 60% Acceptable. Now 75% Good. Denominator/ruleset differ (H10 now n/a; detector rules changed with the v4 skill update), so treat as directional, not like-for-like.

## Design Specificity Verdict
Content is genuinely authored for this person (named employer, named domains, real code snippets in the tech radar). The Deep Green Terminal palette is now a committed, non-default identity, and the gradient-text tell is gone (detector: gradient-text 2 -> 0). The site no longer reads "obsidian+cyan+violet AI starter." Remaining specificity drag: round vanity metrics ("99.9% Performance Score", "10k+ Commits") and a generic 4-title role ticker sitting next to the specific bio.

Deterministic scan (parent-run detector): design-system-font-size 73, design-system-color 14, gray-on-color 11, overused-font 3 (Geist, accepted per DESIGN.md), ai-color-palette 2, codex-grid-background 1. The 11 gray-on-color are mostly false positives (dark text on the bright lime accent = correct high contrast). ai-color-palette 2 = residual `from-violet-500/600` classes in CodePlayground (render lime via the @theme remap, but should use accent classes). The 73 font-size hits are arbitrary `text-[10px/11px]` sizes, a pre-existing tokenization gap.

## What's Working
1. Real code in the tech radar (proof-of-work, not a logo cloud) — best moment on the page.
2. Exemplary open-source empty/error state (icon + plain message + recovery CTA).
3. Specific, credible bio copy; coherent single-accent palette and unified section headers.

## Priority Issues
- [P1] Hero has no single focus + too much simultaneous motion (ticking clock + 4-title ticker + WebGL shader + ping dot + two competing CTAs). Fix: pick one focal action, demote the second CTA, drop the per-second clock to minutes, reserve lime for the one action.
- [P1] JS-driven motion ignores prefers-reduced-motion (WebGL rAF, 5 scroll-divider rAFs, role-ticker setInterval). The global CSS rule only tames CSS animations. Fix: gate each on matchMedia('(prefers-reduced-motion: reduce)').
- [P2] i18n integrity: TechRadar + ImpactMetrics hardcoded Italian, hero bento hardcoded English, SelectedWork category labels English within Italian cards. Fix: route all strings through the dictionary.
- [P3] Vanity/inflated metrics ("99.9% Performance Score", "10k+ Commits") undercut the credible bio. Fix: replace with concrete outcomes (e.g. "12 studios onboarded", "sub-second TTFB").
- [P3] Residual palette leaks: from-violet classes in CodePlayground, stale colors in opengraph-image (rgba(90,108,255), #c7c6cb), emerald dots not remapped. Fix: swap to accent tokens.

## Persona Red Flags
- Jordan (first-timer): busy hero with no obvious "look here"; two competing CTAs; "99.9%" reads as fluff and dents first-impression trust.
- Sam (accessibility): reduced-motion ignored by WebGL + dividers + ticker (continuous motion for someone who asked for none); role ticker swaps text with no aria-live; footer copyright at slate-400/60 may fall below 4.5:1.
- Casey (mobile): six live WebGL contexts (hero + 5 dividers) is a battery/context-limit risk; primary contact CTA sits top-right behind the hamburger, away from the thumb arc.

## Minor Observations
- Hero "Focus Attuale" bento duplicates the TechRadar tech list.
- Scroll-progress bar still uses a gradient utility (renders near-solid lime after remap).
- WebGLBackground computes an accent from theme.colors but the shader hardcodes lime (source-of-truth drift).
- Uppercase mono micro-labels persist widely (the redesign killed section eyebrows, not the label habit).

## Questions to Consider
1. What is the single action you want a first-time visitor to take, and does the hero make it obvious?
2. Which is more convincing to a hiring lead: "99.9%" or "12 studios onboarded"?
3. Should the WebGL + 5 dividers keep animating for a visitor who set reduce-motion?
