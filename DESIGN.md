---
name: Deep Green Terminal
colors:
  background: '#0b1410'
  surface: '#0f1b14'
  foreground: '#e7efe9'
  accent: '#b8ff3c'
  accent-bright: '#cbff6b'
  accent-deep: '#84c70f'
  neutral-50: '#f2f7f3'
  neutral-100: '#e7efe9'
  neutral-200: '#d0ddd4'
  neutral-300: '#b4c7bb'
  neutral-400: '#8aa294'
  neutral-500: '#5c7565'
  neutral-600: '#405648'
  neutral-700: '#2c4034'
  neutral-800: '#1c2b22'
  neutral-900: '#0f1b14'
  neutral-950: '#0a130e'
  border: 'rgba(184, 255, 60, 0.10)'
  glass-border: 'rgba(255, 255, 255, 0.07)'
  glass-shadow: 'rgba(0, 0, 0, 0.6)'
  error: '#ffb4ab'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.05'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-technical:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  code-snippet:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  '2xl': 1rem
  '3xl': 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1400px
---

## Brand & Style

Portfolio of a Fullstack / Creative Engineer. The personality fuses high-performance
technical engineering with a "living" digital environment. The aesthetic is
**Deep Green Terminal**: a green-black canvas lit by a single acid-lime accent, evoking
a phosphor terminal without falling into the saturated obsidian + cyan + violet look that
now reads as AI-generated.

The single source of truth for color lives in `src/app/globals.css` (`:root` and the
`@theme` blocks). This document mirrors those values; if they diverge, the CSS wins.

## Colors

One base, one accent. That is the whole discipline.

- **Base canvas:** Green-black `#0b1410`. Surfaces step up through the neutral ramp
  (`#0f1b14`, `#1c2b22`, ...), which is green-tinted rather than blue-tinted.
- **Single accent:** Acid lime `#b8ff3c`. Used for the one focal element per view
  (primary CTA, active state, key metric, brand highlight). `#cbff6b` (bright) and
  `#84c70f` (deep) are the only permitted variations. No second accent hue.
- **Text:** Green-white `#e7efe9` for headings/body, `#8aa294` for muted/secondary.
  Body text clears 4.5:1 on the base; muted text clears ~6:1.
- **No gradient text.** Emphasis comes from a solid accent color, weight, or size.

Legacy Tailwind accent families (`cyan`, `sky`, `indigo`, `violet`) are remapped to the
single lime accent in `@theme`, and `slate` is remapped to the green-tinted neutral ramp,
so utility classes reskin from one place.

## Typography

**Geist** carries all core communication (clean, technical, Swiss-inspired).
**Geist Mono** is reserved for genuine metadata: technical labels, timestamps, code,
and small UI descriptors. Mono is a seasoning, not a base; do not set paragraphs,
subtitles, or section copy in it.

Font sizes come from tokens, never arbitrary `text-[Npx]`. Standard Tailwind steps
(`text-xs` … `text-8xl`) plus a documented micro scale for technical labels:
`text-2xs` (11px), `text-3xs` (10px), `text-4xs` (9px), defined in the `@theme` block.

- **Headlines:** tight tracking, heavy weights.
- **Body:** generous line height for reading on the dark canvas.
- **Section headers:** one system everywhere. A title plus a short descriptive subtitle.
  No uppercase eyebrows and no numbered markers (`01 //`, `02 //`) above sections.

## Layout & Spacing

- 4px baseline unit; 24px gutters; 48px desktop / 16px mobile margins.
- Container max 1400px.
- Content grouped into modules separated by generous vertical rhythm.

## Elevation & Depth

Depth via tonal layering and restrained glass, not heavy shadows.

- **Panels:** `.glass-panel` — green-black at ~72% with 16px blur and a hairline
  white border. On hover the border shifts toward the lime accent.
- **Floating nav:** a fixed pill with a top scrim so page content fades out behind it
  instead of bleeding through.

## Shapes

Disciplined radii: 0.25rem for buttons/inputs, 0.75rem–1.5rem for cards and panels,
full radius for pills and chips.

## Components

- **Buttons:** Primary is solid lime with green-black text. Secondary is a ghost glass
  pill with a hairline border.
- **Chips/Badges:** small pills; active state uses the lime accent, resting state is glass.
- **Cards:** glass panels with a hairline border that warms toward lime on hover.
- **Empty / error states:** never bare text. A glass card with an icon, a plain-language
  message, and a recovery action.
- **Scrollbars:** ultra-thin with a neutral thumb that turns lime on hover.
