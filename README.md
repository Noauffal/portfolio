# LATENT PLATE — Portfolio

Personal portfolio for Noauffal Abdullatief (Data Scientist & AI Engineer).

The page is a single scrolling experience: a cinematic **Hero** over an animated latent
field, followed by a continuous near-black **latent world** in which three physical
specimen **Plates** (WebGL slabs with real DOM editorial content) are encountered while
scrolling. A restrained **Instrument Navigation** provides section jumps and whole-page
progress once the Hero hands off.

The authoritative creative/technical reference is [`docs/LATENT-PLATE.md`](docs/LATENT-PLATE.md).
Where that document and the code disagree, the code wins.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` configuration in `src/app/globals.css`)
- `three` — used directly, only by `src/components/projects/physical-plate.tsx`
- No animation/UI libraries

## Development

```bash
npm install
npm run dev        # start the dev server at http://localhost:3000
```

## Checks

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build (also runs the TypeScript check)
```

## Structure

- `src/app/page.tsx` — route composition (`SiteNav` + `Hero` + `PhysicalProjects`)
- `src/app/globals.css` — design tokens, Hero animation CSS, plate + nav scopes
- `src/components/hero*.tsx` — Hero, latent field, scroll exit, entrance gate
- `src/components/site-nav.tsx` — Instrument Navigation + scroll progress
- `src/components/projects/` — the physical Plates and their editorial content
- `src/data/projects.ts` — project content model (placeholder content for now)
