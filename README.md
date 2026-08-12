# Giovanni Venditto — Portfolio

Personal portfolio and creative-engineering playground of **Giovanni Venditto**, Fullstack & Creative Engineer.

Bilingual (IT/EN), built on Next.js with a committed **"Deep Green Terminal"** visual identity: a green-black canvas lit by a single acid-lime accent, WebGL motion, and an interactive tech radar.

🔗 **Live:** https://giovannivenditto.dev

---

## Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@theme` design tokens) — see [`DESIGN.md`](./DESIGN.md)
- **Motion & 3D:** Framer Motion, Three.js / WebGL shaders
- **Content:** MDX (`next-mdx-remote`, `gray-matter`, `remark`/`rehype`) for projects and writing
- **Forms:** React Hook Form + Zod, email delivery via [Resend](https://resend.com)
- **Playground:** CodeMirror 6
- **i18n:** custom lightweight provider, cookie-synced between server and client (IT default, EN toggle)

## Features

- **Hero** with a live WebGL background and a single, focused call to action
- **Impact metrics** and an **interactive Tech Radar** with real code snippets per skill
- **Selected work** driven by MDX case studies, with quick-view modal and a generative cover fallback
- **Experience timeline**, **credentials**, and a **GitHub open-source wall** (cached server route)
- **Writing / blog** (MDX) with RSS, plus **Studio/About**, **Contact**, and a printable **CV**
- **SEO & PWA:** per-route metadata, `sitemap.ts`, `robots.ts`, dynamic OpenGraph image, web manifest + service worker
- **Accessible motion:** every animation honors `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run analyze` | Build with the bundle analyzer (`ANALYZE=true`) |

## Environment variables

All are optional — the app falls back to sensible defaults (see [`src/lib/config.ts`](./src/lib/config.ts)). Create a `.env.local` to override:

```bash
# Identity / links (public)
NEXT_PUBLIC_SITE_URL=https://giovannivenditto.dev
NEXT_PUBLIC_AUTHOR_NAME="Giovanni Venditto"
NEXT_PUBLIC_EMAIL=you@example.com
NEXT_PUBLIC_GITHUB_USERNAME=giovannivenditto
NEXT_PUBLIC_LINKEDIN_USERNAME=giovannivenditto
NEXT_PUBLIC_TWITTER_USERNAME=giovannivenditto

# Contact form (Resend)
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@example.com

# GitHub open-source wall (optional; raises the API rate limit)
GITHUB_TOKEN=ghp_...
```

## Project structure

```
src/
├─ app/                 # App Router routes, API routes, SEO (sitemap/robots/rss/og)
├─ components/          # Feature + UI components (hero, tech-stack, work, writing, ui, …)
├─ content/             # MDX projects & writing (it/ + en/ variants)
├─ i18n/                # Dictionaries (it.json / en.json) + provider + server locale
└─ lib/                 # config, content loaders, hooks, utils
```

## Design system

The visual identity is the **single source of truth** in [`src/app/globals.css`](./src/app/globals.css) (`:root` + `@theme`) and documented in [`DESIGN.md`](./DESIGN.md): one green-black base, one acid-lime accent, a green-tinted neutral ramp, and a tokenized micro type scale. Legacy Tailwind color families are remapped to the accent so the whole site reskins from one place.

## Deploy

Optimized for [Vercel](https://vercel.com) (`vercel.json` included). Any Node host that runs `next build` / `next start` works too.

## License

© Giovanni Venditto. All rights reserved.
