# CLAUDE.md

Personal portfolio site — React 19 + Vite + Tailwind CSS v4. Deployed to GitHub Pages at `/personalsite/`.

## Stack

- **React 19** with JSX (no TypeScript)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — write utility classes directly, no config file
- **React Router v7** using `HashRouter` (required for GitHub Pages static hosting)
- **Lucide React** for icons
- **Vite 8** as bundler

## Project layout

```
src/
  components/   # Reusable UI pieces (Sidebar, Tabs, BentoGrid, Cursor)
  pages/        # Full views (Home, Articles, ArticleDetail, Portfolio, Lab, Timeline)
  context/      # ThemeContext — light/dark, persisted in localStorage
  data/         # articles.js — static content array
  lib/          # Utilities
public/         # Static assets served as-is
```

See `ESTRUCTURA.md` for a detailed breakdown and the component tree.

## Routing

Uses `HashRouter` — all routes are hash-based (`/#/`, `/#/articles/:slug`).  
`ArticleDetail` renders without the `Sidebar`; all other routes go through `Layout`.

## Content / CMS

Content lives in `src/data/articles.js` as plain JS arrays. Schema for articles, lab items, and portfolio items is documented in `CMS_SCHEMA.md`.

- Article body supports `## Heading` for sections and blank lines for paragraphs
- `cover` and `gradient` fields accept CSS gradients or image URLs

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build → dist/
npm run preview   # Preview the build locally
npm run lint      # ESLint
```

## Deploy

Automatic via GitHub Actions on push to `main`. Deploys to GitHub Pages under `MatiasCanepa/personalsite`.

## Style conventions

- No TypeScript — plain JSX throughout
- Tailwind utility classes for all styling; no CSS modules, minimal custom CSS (only `index.css` / `App.css` for globals)
- `ThemeContext` provides `theme` (`"dark"` | `"light"`) and `toggleTheme` — use it for any theme-aware styling
- Keep components focused; pages compose components, not the other way around
