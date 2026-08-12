---
target: src/app/page.tsx
total_score: 28
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 0
timestamp: 2026-08-12T12-14-46Z
slug: src-app-page-tsx
---
⚠️ DEGRADED: single-context (sub-agent path unreliable here — A cannot reach the live server from its sandbox, B executed 0 tools; parent used deterministic detector + live desktop/mobile inspection)

## Design Health Score (Experience surface) — re-measure after fixes

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 3 | Clock, progress bar, active states, loading skeletons, empty state |
| 2 | Match System / Real World | 3 | i18n mix reduced (SelectedWork now dictionary-driven); TechRadar/ImpactMetrics content still hardcoded IT |
| 3 | User Control and Freedom | 3 | Filters, modal close, lang toggle; role ticker now pauses under reduced-motion |
| 4 | Consistency and Standards | 4 | Single-source palette now holds: cyan glows/blue divider removed, ai-color-palette 0, emerald->accent, one header system, font sizes tokenized |
| 5 | Error Prevention | 3 | Guarded fetch; contact form validation |
| 6 | Recognition Rather Than Recall | 3 | Mostly labelled; hero bento + radar still overlap |
| 7 | Flexibility and Efficiency | 3 | Quick-view modal, filters, keyboard focus, lang toggle |
| 8 | Aesthetic and Minimalist Design | 3 | Hero cleaner (clock to minutes, fewer accents, real metrics) but still feature-rich |
| 9 | Error Recovery | 3 | Exemplary open-source empty state; contact toast |
| 10 | Help and Documentation | n/a | Self-explanatory portfolio |
| **Total** | | **28/36 (78%)** | **Good** |

## Deterministic scan delta (v4 detector)
- design-system-font-size: 73 -> 5 (remaining 5 are legit: OG social-card sizes + editor chrome, not Tailwind)
- ai-color-palette: 2 -> 0 (from-violet classes removed)
- gradient-text: 0 (killed in redesign)
- design-system-color: 11 (structural primitives: glass border/shadow, OG white text, code-editor chrome)
- gray-on-color: 11 (false positives: dark text on lime accent = correct contrast)
- overused-font: 3 (Geist — accepted, documented in DESIGN.md)
- codex-grid-background: 1 (subtle .bg-grid backdrop)

## Fixes landed this pass
- prefers-reduced-motion respected by WebGL background, 5 scroll dividers, role ticker (+ aria-live on ticker)
- Hero focus: clock to minutes, secondary lime accents muted, vanity metrics replaced with claims from the author's own copy (12 studios onboarded, 50k+ type-safe LOC)
- i18n: SelectedWork category chips + filters wired to the dictionary
- Cleanup: from-violet->accent (playground Run button), stale OG-image colors, emerald availability dots -> accent, font sizes tokenized (text-2xs/3xs/4xs)
- Resolved pre-existing Next 16 error: inline <script> in RootLayout moved to next/script; theme set via data-theme on <html>
- Regressions from the prior sweep fixed: 14 no-space cyan rgba glows, blue #3b82f6 divider, "Reflessioni" typo

## To reach Excellent (90%+)
- H8: reduce hero to one dominant idea (bento + status bar + ticker still compete)
- H2: full i18n of TechRadar + ImpactMetrics content for correct EN toggle
- Tokenize code-editor chrome colors; document glass elevation primitives in DESIGN.md
