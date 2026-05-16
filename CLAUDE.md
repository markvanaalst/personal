# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (port 3000, Turbopack)
pnpm build      # Production build
pnpm lint       # Biome check (read-only)
pnpm lint:fix   # Biome auto-fix
```

No test runner is configured.

## Architecture

**Personal portfolio + blog** built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Content pipeline

Blog posts are `.mdx` files in `content/blog/<category>/<slug>.mdx`. There is no database — `lib/blog.ts` reads from the filesystem at build/request time using `gray-matter` for frontmatter and `next-mdx-remote` for rendering. Categories are defined in `content/blog/categories.json`. All blog routes are statically generated via `generateStaticParams`.

MDX frontmatter shape:
```yaml
title: string
date: YYYY-MM-DD
excerpt: string
categories: [string]   # must match slugs in categories.json
published: boolean     # omit or true to publish, false to draft
```

Post slugs are derived from the file path relative to `content/blog/` (e.g., `aspnet/my-post`), which maps to the URL `/blog/aspnet/my-post`.

### Key directories

- `app/` — App Router: pages, layouts, route handlers. Blog uses `[...slug]` catch-all.
- `components/` — Organized by domain: `blog/`, `homepage/`, `layout/`, `profile/`, `shared/`, `ui/` (shadcn primitives, excluded from Biome).
- `lib/` — Data layer (`blog.ts`), MDX config, pagination, types, site constants.
- `content/` — All static content: MDX posts, `resume.json`, `settings.json` (navbar links).

### Path aliases

`@/*` resolves to the project root. Use it for all imports (e.g., `@/lib/blog`, `@/components/layout/navbar`).

### Server vs. client components

Components are Server Components by default. Add `'use client'` only for interactivity, state, or browser APIs. Never use `next/dynamic` with `{ ssr: false }` inside a Server Component — instead, extract client-only logic into a dedicated Client Component and import it directly.

In Next.js 16, `cookies()`, `headers()`, and `params`/`searchParams` in Server Components are async — always `await` them.

Do not call your own Route Handlers from Server Components. Extract shared logic into `lib/` modules and call them directly.

### UI stack

- `shadcn/ui` + `@base-ui/react` + `radix-ui` for components
- `clsx` + `tailwind-merge` via `cn()` utility for conditional classes
- `motion` for animations
- `@tabler/icons-react` for icons
- Dark mode is CSS-native via a `dark` class on `<html>`, toggled by `ThemeSwitcher`

### OG images

Dynamic OG images are generated at `/blog/og/[...slug]` as a Next.js route.
