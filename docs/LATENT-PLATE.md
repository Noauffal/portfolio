# LATENT PLATE — Portfolio Source of Truth

> Single source of truth for the creative direction and technical implementation of this
> portfolio. Written to let a future session resume without re-explaining Stages 2–8.
> The **current implementation in `src/` is authoritative**; the older plan
> (`.kilo/plans/1790868953656-single-page-portfolio-reset.md`) is historical only.
>
> Status: complete and visually approved through **Stage 8**. Projects currently use
> placeholder content. Nothing is committed beyond the Phase 1 reset commit `21449a4`.

---

## 0. How to use this document

Read this file first, then (in order):

1. `src/app/globals.css` — tokens + all animation/scroll/reveal CSS.
2. `src/components/hero.tsx` — hero composition.
3. `src/components/hero-latent-field.tsx` — the Canvas 2D latent field (`FIELD_CONFIG`).
4. `src/components/hero-scroll.tsx` — Stage 6 scroll progress.
5. `src/components/projects/*` + `src/data/projects.ts` — the Projects/PLATE SEQUENCE system.

Treat Stages 2–8 as **LOCKED**. Do not redesign a locked stage without an explicit,
stated reason. Prefer tuning existing parameters (Section 12) over restructuring.

---

## 1. Creative direction

### 1.1 LATENT PLATE philosophy
The page is **a scientific plate that measures an invisible field**. Large editorial
typography is the subject; scientific/specimen apparatus (ruler, indices, hairlines,
mono metadata, figure captions) is the *calibration* around it; a sparse latent field
is the atmosphere. The AI/data connection is *discovered*, never advertised.

Two approved ideas were fused:
- **Latent Field** (depth/atmosphere from an abstract point field).
- **Specimen Plate** (editorial/scientific discipline: hairlines, rulers, mono apparatus,
  figure captions, generous negative space).

### 1.2 Intended emotional impression
Calm, precise, slightly mysterious; “the opening frame of a restrained film” / “the first
plate of a well-set monograph.” Confidence through omission. The hero must remain the most
cinematic moment; everything after is secondary and restrained. The visitor should feel
continuity between the hero and the projects (“the specimen plate quietly dissolves and the
document continues”), not a sequence of unrelated landing-page sections.

### 1.3 Editorial / scientific specimen language
- 1px hairlines; tick marks; endpoint ticks; coordinate labels (`0.0`, `1.0`).
- Plate registers (`Plate 01`), running header (`Projects — Plates 01–03`).
- Figure captions in mono (`FIG. 01 — SPECIMEN`).
- Specimen metadata as label/value rows (`Role / Year / Stack`).
- Type roles: **Instrument Sans** for display/editorial voice; **Geist Mono** for all apparatus.

### 1.4 Hierarchy and negative space
1. Display typography (hero) / plate titles (projects)
2. Supporting copy + editorial metadata
3. Latent field (atmosphere)
4. Apparatus (hairlines, ruler, ticks)
Negative space is structural, not leftover. The hero keeps a deliberate central void and a
clean lower-left type zone; the field is densest upper-right and never crosses the type.

### 1.5 What the design must NOT become
Not a generic/SaaS/dev-portfolio site. Specifically **not**: portfolio cards or a 3-column
grid; Behance-style thumbnails; glassmorphism; neon/glow/blue-purple AI gradients; cyberpunk;
Matrix effects; AI brains / neural-network illustrations; floating tech logos; excessive
particles; pill-heavy UI; huge rounded CTAs; a presentation-slide or parallax-demo feel.

---

## 2. Locked visual system

### 2.1 Colors (tokens in `globals.css`)
| Token | Value | Use |
|---|---|---|
| `--background` | `#0b0b0d` | near-black base |
| `--foreground` | `#ededed` | off-white display/type |
| `--muted` | `#8f8f94` | mono apparatus |
| `--line` | `rgba(255,255,255,0.1)` | hairlines / ticks / frames |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | expo-out easing for all motion |
Field color is `#ededed` (monochrome). No accent color is in use.

### 2.2 Fonts
- Display: **Instrument Sans** via `next/font/google`, exposed as `--font-instrument`, mapped to
  the Tailwind `font-display` token.
- Apparatus: **Geist Mono** (`--font-geist-mono`), mapped to `font-mono`.
- Geist Sans was intentionally removed.
- `display: "swap"`; the hero entrance waits on `document.fonts.ready` to avoid a swap mid-reveal.

### 2.3 Grid / container geometry
- Outer: `mx-auto w-full max-w-[1600px]`, `px-6 sm:px-10`, `py-6 sm:py-8`.
- Desktop apparatus gutter: **`4rem`** (`md:pl-16`); strings/mono live to the right of it.
- Hero is `min-h-svh` with `grid-rows-[auto_1fr_auto]` (top band / middle / bottom band).
- Projects plates use `md:grid-cols-[4rem_1fr]` so each plate carries its own gutter ruler.
- Baseline-honest spacing; plate heights vary by `emphasis`/`variant`.

### 2.4 Ruler / hairline apparatus
- Vertical hairline at `left-5` inside the 4rem gutter; ticks at `0/25/50/75/100%`;
  endpoint ticks `w-3`, interior `w-2`; labels `0.0` / `1.0` at `left-9` (Geist Mono 10px,
  tracking `0.18em`, `text-muted`).
- Horizontal hairlines are 1px `bg-line`/`border-line`. In animated contexts they are
  absolutely-positioned overlay spans with `origin-left` so they can draw via `scaleX`.
- Ruler is hidden below `md`.

### 2.5 Typography hierarchy
- Hero display: `clamp(1.75rem, 8.8vw, 8.6rem)`, `uppercase`, `leading-[0.88]`,
  `tracking-[-0.02em]`; line 1 `font-semibold`, line 2 `font-normal` (weight contrast, not color).
- Hero supporting: `clamp(1.05rem, 1.6vw, 1.4rem)`, `leading-[1.5]`, `max-w-[36ch]`,
  `text-foreground/70`.
- Apparatus/mono: 10–11px, `uppercase`, `tracking-[0.18em]`, `text-muted`.
- Projects title: `clamp(1.75rem,4.5vw,4.5rem)` (major) / `clamp(1.5rem,3vw,2.75rem)` (minor),
  `uppercase`, `leading-[0.95]`.
- Projects description: `clamp(1rem,1.3vw,1.15rem)`, `leading-[1.55]`, `text-foreground/70`.

### 2.6 Responsive principles
- Single route `/`; server-rendered composition; `min-h-svh` (not `100vh`) for mobile bars.
- Below `md` (768px): ruler hidden; hero type full width with controlled breaks; field count
  reduced; coarse pointers get no parallax; projects become a single-column flow.
- Canvas count/breakpoint and all clamp scales are the responsive levers.

---

## 3. Stages 2–8 (history, final behavior, locked)

### Stage 2 — Static hero composition
- **Objective:** hero layout, typography, grid, ruler, hairlines with zero motion.
- **Final behavior:** three-band hero (top: name + `01 / 2026`; middle: lower-left display block
  with left ruler and central void; bottom: `Lyon, France` + `SCROLL`). Display block is
  vertically centred then nudged up via `pb-[7vh]`. Two display lines use overflow-hidden
  wrappers with inner spans.
- **Final tuned values (authoritative):** display `clamp(1.75rem,8.8vw,8.6rem)` / leading `0.88`;
  supporting `mt-10 max-w-[36ch] clamp(1.05rem,1.6vw,1.4rem) text-foreground/70`; line weights
  semibold/normal; `md:pl-16` gutter; ruler geometry as §2.4.
- **LOCKED:** layout, type sizes/weights, gutter, ruler geometry, hairlines, copy.

### Stage 3 — Cinematic entrance choreography
- **Objective:** make the approved static composition arrive cinematically.
- **Final behavior:** pure CSS keyframes gated by classes on `<html>`. No GSAP. One-shot; no loop.
- **Mechanism:**
  - Inline pre-paint script (via `InlineScript` in `layout.tsx`) adds `hero-anim` only if JS and
    not reduced motion.
  - `hero-ready` is added after `document.fonts.ready` (fallback `900ms`) + one `requestAnimationFrame`.
  - `HeroGate` re-applies gate classes after React's dev Strict-Mode remount.
  - Classes are removed ~2400ms after start (clean end state).
- **Timings:** rule-top `0.9s @0.15s`; index `0.5s @0.30s`; name `0.5s @0.40s`;
  line 1 mask `0.95s @0.55s`; line 2 mask `0.95s @0.80s`; support rise `0.6s @1.30s`;
  rule-bottom `0.7s @1.35s`; foot `0.5s @1.50s`; ruler `0.4s @1.70s`.
  Mask reveal is `translateY(140% → 0)`, line-level only (never letter/word-level).
- **Locked:** grammar, timings, gate classes, hero-anim keyframes.

### Stage 4 — Static latent field
- **Objective:** add the field as subtle atmosphere; validate composition/density/exclusion.
- **Final behavior:** one Canvas 2D `<canvas>` behind all hero content (`z-0`, `pointer-events-none`,
  `aria-hidden`). Static render on mount, again after `document.fonts.ready`, and on resize.
- **LOCKED:** counts, size/opacity/depth mapping, bias, exclusion, color.

### Stage 5 — Field motion + pointer depth
- **Objective:** add near-imperceptible ambient drift and restrained pointer parallax.
- **Final behavior:** single rAF loop (canvas only). Per-point deterministic sinusoidal drift
  (amplitude scaled by depth). Pointer parallax on fine pointers only, smoothed with lerp.
  Loop pauses when `document.hidden` or the canvas is off-screen. No per-frame layout reads.
- **Locked:** drift, parallax, pause/cleanup behavior, DPR cap.

### Stage 6 — First-scroll hero exit
- **Objective:** reversible, scroll-driven hero dissolution.
- **Final behavior:** `--hero-p` on `[data-hero]` drives staggered group windows (see §5).
  Scroll controller `hero-scroll.tsx` (passive listener + rAF throttle). No GSAP, no snapping.
- **Tuning history kept:** 0.18 → 0.32 → **0.45** × `innerHeight`.
- **Locked:** scroll range 0.45, progress windows, reversibility, separation from Stage 3.

### Stage 7 — Static Projects / PLATE SEQUENCE
- **Objective:** validate projects layout/rhythm/continuity before animation.
- **Final behavior:** three placeholder plates with intentionally different compositions;
  running header; per-plate gutter ruler; specimen figure placeholders; constrained data model.
  The temporary 60vh spacer was removed; the real Projects section replaces it.
- **Locked:** grid, ruler, hairlines, plate asymmetries, figure dimensions, metadata placement,
  typography sizes, placeholder content.

### Stage 8 — Project reveal choreography
- **Objective:** quiet, one-shot assembly of each plate as it enters.
- **Final behavior:** `IntersectionObserver` (`rootMargin: "0px 0px -12% 0px"`, `threshold: 0`)
  adds `is-revealed` to `[data-reveal-root]` and unobserves it (one-shot). CSS transitions the
  `[data-reveal]` descendants with per-type delays (see §7). Gate class `reveal-armed` is added
  pre-paint with a 5s safety fallback.
- **Locked:** observer config, timing grammar, one-shot behavior, reduced-motion fallbacks.

---

## 4. Hero architecture

### 4.1 Composition (`src/components/hero.tsx`, server)
- `<section data-hero>` = `relative mx-auto grid min-h-svh w-full max-w-[1600px] grid-rows-[auto_1fr_auto] px-6 py-6 sm:px-10 sm:py-8`.
- Top band: `name` left, `01 / 2026` right on a hairline (`md:pl-16`).
- Middle: `relative z-10 flex items-center`; left ruler (absolute, `hidden md:block`); display
  block (`w-full pb-[7vh] md:pl-16`).
- Display `<h1 data-scroll="display" data-exclude="hero-type">`: two masked lines.
- Supporting `<p data-anim="support" data-exclude="hero-type">`.
- Bottom band: `Lyon, France` left, `SCROLL` right on a hairline.
- `HeroLatentField` and `HeroScroll` are rendered inside the section.

### 4.2 Entrance
See Stage 3. Keyframes `hero-fade`, `hero-rise`, `hero-mask`, `hero-rule`; gate on `html.hero-anim` /
`html.hero-ready`; hidden start states only exist while armed (no-JS shows final state).

### 4.3 Latent field (`src/components/hero-latent-field.tsx`, client)
Final `FIELD_CONFIG` (authoritative):
```
counts:    { desktop: 220, mobile: 120 }   breakpoint: 768
size:      { min: 0.4, max: 2.1 }          (px; depth-mapped)
opacity:   { min: 0.045, max: 0.23 }       (depth-mapped)
depth:     { min: 0.2, max: 1 }
bias:      { strength: 0.65, exponent: 1.6 }   (upper-right; mixed with uniform)
exclusion: { padding: 48, feather: 120 }       (px)
drift:     { amplitudeMin: 1, amplitudeMax: 2.5, frequencyMin: 0.05, frequencyMax: 0.1 }
parallax:  { max: 22, lerp: 0.06 }         (px at depth=1)
maxDpr:    2
color:     "#ededed"
```
- Points: normalized `{x,y,z}` + per-point drift phase/frequency. Projection = anchor + drift +
  `pointer * parallaxMax * depth`. Size and alpha scale with depth (fog). Drawn as sub-pixel
  `fillRect`, `globalAlpha` per point, `source-over` only.
- **Ambient drift:** smooth, bounded sinusoids (no wrap/bounce/pulse/spawn). Near points drift
  slightly more.
- **Pointer parallax:** fine-pointer only; normalized against the canvas; lerp `0.06`; near points
  up to `22px`, far/medium much less. Typography never moves. No attraction/proximity/readout.
- **Typography exclusion:** the type rect is the union of `[data-exclude="hero-type"]` (the `<h1>`
  and the supporting `<p>`), measured after fonts load and on resize; a 48px hard core is
  rejected at generation and a 120px `smoothstep` feather fades points near it. The live
  (drifted + parallaxed) position is masked each frame.
- **Reduced motion:** `animate = !prefers-reduced-motion && (pointer: fine)`; when false the field
  renders one static frame. Coarse pointers are also static.
- **Performance:** DPR ≤ 2; layout measured only on `ResizeObserver`/`fonts.ready`; loop paused
  when hidden/off-screen; no React state in the loop; full cleanup on unmount.

### 4.4 Reduced motion (hero)
`prefers-reduced-motion: reduce` ⇒ no entrance (`hero-anim` not added) and static field; CSS
reduce blocks force final states. Content is always visible without JS.

---

## 5. Stage 6 — first-scroll hero exit

- **Range:** `p = clamp(scrollY / (0.45 * innerHeight), 0, 1)` (`SCROLL_DISTANCE = 0.45` in
  `hero-scroll.tsx`). `--hero-p` is set on `[data-hero]`; derived per-group values are computed
  in CSS.
- **Group windows (`globals.css`):**
  | Group | Local progress | Range | Effect |
  |---|---|---|---|
  | support + metadata (name, index, location, SCROLL) | `clamp(p/0.55)` | 0.00–0.55 | fade + ≤8px up |
  | display typography | `clamp((p−0.15)/0.75)` | 0.15–0.90 | fade + ≤30px up |
  | latent field (canvas element) | `clamp((p−0.05)/0.95)` | 0.05–1.00 | opacity 1→0.08 + ≤12px up |
  | ruler | `clamp((p−0.40)/0.50)` | 0.40–0.90 | fade only |
  | hairlines | `clamp((p−0.55)/0.45)` | 0.55–1.00 | fade only |
- **Reversibility:** every value is a pure function of `p`; scrolling back to `scrollY=0`
  restores the exact Stage 5 hero (identity transforms, opacity 1). No one-shot animation, no
  accumulated state.
- **Relationship with Stage 3:** Stage 3 animates inner `data-anim` elements; Stage 6 animates
  outer `data-scroll` wrappers and the canvas. Different elements/properties, so they never
  conflict. Stage 6 does not modify Stage 3.
- **Reduced motion:** `hero-scroll.tsx` returns early; a CSS reduce block forces no scroll
  transforms.

---

## 6. Projects — PLATE SEQUENCE

### 6.1 Concept
The hero is conceptually **Plate 00** (a conceptual register only — never added to the hero).
Projects continue as **Plates 01–0n** in one continuous specimen document. Plate identity comes
from the shared system; composition varies per project.

### 6.2 Why layouts intentionally vary
Variable height, asymmetry, and media proportion prevent a slideshow/template feel while the
system (numbering, grid, ruler, hairlines, fonts, captions, metadata) keeps it coherent. Some
plates are text/technical-dominant, others figure-dominant.

### 6.3 Global grid / system
- Same container and `4rem` gutter as the hero; per-plate `md:grid-cols-[4rem_1fr]` with a
  continuous vertical ruler in the gutter (line at `left-5`, top tick `w-3`).
- Running header (`Projects — Plates 01–03` + `03 Plates`) on a hairline; not sticky/reactive.
- Full-width separator hairline above plates 02..0n.

### 6.4 Content model (`src/data/projects.ts`)
Intentional and minimal; presentation is separate from content.
```
Project {
  slug, index, title, description, role, year, stack: string[],
  context?, highlight?,
  links: { label, href, kind: "case"|"code"|"paper"|"demo" }[],
  variant: "figure-dominant"|"text-dominant"|"split",
  mediaSide?: "left"|"right",
  emphasis: "major"|"minor",
  figures: { id, caption, kind: "screenshot"|"diagram"|"plot"|"code"|"artifact",
             span: "full"|"half"|"margin"|"banner" }[]
}
```
`plateKind` maps to a reveal variant: `split` → `"split"`, `minor` → `"compact"`, else `"default"`.

### 6.5 Figure / media philosophy
Every visual is a **specimen figure**, not a card/mockup: hairline frame, registration corner
marks, optional internal apparatus, and a mono `FIG. 0n — …` caption. Aspect by span:
`banner 21/9`, `full 16/9`, `half 4/3`, `margin 4/3`. No gradients/glow/imagery. Projects without
media get a neutral placeholding apparatus so the plate is never empty.

### 6.6 Metadata conventions
`Meta` renders a label/value grid (`Role`, `Year`, `Stack`, optional `Context`); stack is a
`·`-separated mono list (no pills). Links are mono uppercase text links (`Case ↗`, `Code ↗`,
`Paper ↗`) — currently `href: "#"` placeholders.

### 6.7 Current Plate 01 / 02 / 03 placeholder compositions
| Plate | Variant | Emphasis | Media | Composition |
|---|---|---|---|---|
| 01 | `figure-dominant` | major | right | 7/5 text/meta split, then a full-width wide banner figure (`FIG. 01 — SPECIMEN`, `diagram`) |
| 02 | `text-dominant` | minor | — | 7-col text with stacked metadata + 4-col margin `plot` at col 9 (`FIG. 02 — PLOT`); compact |
| 03 | `split` | major | left | 6-col figure stack left (`artifact` + smaller `diagram` detail), 6-col text right with a highlight line |

---

## 7. Stage 8 — project reveal behavior

- **Philosophy:** one-shot assembly as a plate enters — “the document registering as you read.”
  Never tied continuously to scroll; never replays when scrolling back up.
- **Activation:** `IntersectionObserver` with `rootMargin: "0px 0px -12% 0px"`, `threshold: 0`;
  `[data-reveal-root]` targets (running header + each plate) get `is-revealed`, then `unobserve`.
- **Grammar:** rules draw `scaleX(0→1)`; register/meta/links/caption fade + 8px rise; titles mask
  `translateY(105%→0)` (line-level only, no scale); figures fade + 16px rise; internal apparatus
  and the `PLACEHOLDER` label fade in after the frame.
- **Timing (base delays / durations):** rule `0/.5`; register `.05/.5`; title `.12/.7`;
  text `.24/.6`; meta `.34/.6`; links `.44/.6`; figure `.4/.7`; figure-secondary `.5/.7`;
  caption `.62/.6`; apparatus `.72/.6` — ranges overlap, not sequential.
- **Plate variation:** `data-plate="compact"` multiplies all delays by `0.55` (Plate 02);
  `data-plate="split"` moves the primary figure to `.06s` so it precedes the title (Plate 03).
- **Why no replay:** `is-revealed` persists and targets are unobserved — a deliberate calm,
  non-distracting read.
- **Progressive enhancement / reduced motion:** the pre-paint gate adds `reveal-armed` only with
  JS and no reduced motion, with a **5s fallback**; `IntersectionObserver` missing ⇒ reveal all
  immediately; no-JS and reduce ⇒ final visible state (CSS reduce block forces opacity/transform).
  Content can never be left permanently hidden.

---

## 8. Architecture map

Server-first App Router. Animation is CSS-driven; client boundaries are tiny controllers.

| File | Boundary | Responsibility |
|---|---|---|
| `src/app/layout.tsx` | server | Fonts (Instrument Sans + Geist Mono), metadata, `suppressHydrationWarning`, two pre-paint inline gate scripts, `HeroGate` |
| `src/app/page.tsx` | server | `<Hero/>` + `<ProjectsSection/>` |
| `src/app/globals.css` | — | Tokens; Stage 3 keyframes/gates; Stage 6 scroll mapping; Stage 8 reveal rules |
| `src/components/hero.tsx` | server | Hero composition; `data-hero`/`data-scroll`/`data-anim`/`data-exclude` hooks; `HERO` const |
| `src/components/hero-latent-field.tsx` | **client** | Canvas 2D field: generation, drift, pointer parallax, exclusion, rAF lifecycle (`FIELD_CONFIG`) |
| `src/components/hero-scroll.tsx` | **client** | Stage 6 `--hero-p` scroll progress (0.45·innerHeight) |
| `src/components/hero-gate.tsx` | **client** | Re-applies `hero-anim`/`hero-ready` after dev Strict-Mode remount |
| `src/components/inline-script.tsx` | **client** | Safe inline `<script>` helper (server `text/javascript`, client `text/plain`) |
| `src/components/projects/projects-section.tsx` | server | Running header, per-plate mapping, mounts `ProjectsReveal` |
| `src/components/projects/project-plate.tsx` | server | Three plate layouts; reveal hooks; `data-plate` kind |
| `src/components/projects/specimen-figure.tsx` | server | Placeholder figures (frame, marks, apparatus, caption) |
| `src/components/projects/projects-reveal.tsx` | **client** | One-shot `IntersectionObserver` reveal controller |
| `src/data/projects.ts` | — | Project content model + three placeholder records |

Dependencies: `next`, `react`, `react-dom` only (plus dev tooling). No animation/UI libraries.

---

## 9. Non-negotiable constraints

**Aesthetic**
- No generic portfolio cards, 3-column grids, thumbnails-in-rectangles, or carousels.
- No SaaS aesthetic; no Behance/thumbnail-grid feel; no presentation-slide feel.
- No glassmorphism, blur panels, glowing cards, neon/glow, blue/purple AI gradients.
- No AI-brain / neural-network / node-graph imagery; no floating technology logos.
- No excessive particles; the latent field must read as measured dust, never a particle effect.
- No gradients, no stock/fake AI imagery; placeholders stay neutral apparatus.

**Motion / interaction**
- No scroll hijacking, snapping, wheel interception, or artificial inertia.
- No gratuitous animation; motion must end and become still. The hero stays the strongest moment.
- No letter-by-letter animation. No hover-gated content. No scale on figures.
- Project parallax/hover depth is **explicitly deferred** (not implemented).

**Process / architecture**
- Do not add runtime dependencies (no GSAP, Three.js/WebGL, Lenis, animation/UI libs) without an
  explicit, justified reason.
- Do not redesign or re-time a LOCKED stage (Stages 2–8) without an explicit reason.
- Preserve progressive enhancement: no-JS and reduced-motion must show final, readable content;
  a failed script must never leave content hidden.
- Preserve the server/client boundaries; do not convert whole sections to large client components.
- No new sections, navigation, or placeholder architecture without an explicit request.

---

## 10. Current project state

The visual/interaction system is **complete and approved through Stage 8**: hero (composition,
entrance, latent field, scroll exit) and Projects/PLATE SEQUENCE (static layout + reveal
choreography). The **three projects are placeholders** (`PROJECT TITLE`, `ROLE`, `YEAR`,
`STACK 0n`, `FIG. 0n`, `href: "#"`, neutral specimen frames) because real project content has not
been created or integrated yet. Nothing beyond the Phase 1 reset commit is committed.

---

## 11. Recommended resume point

The next priority is **not** more visual effects. It is:
1. Integrate the **first real project** into the existing Plate system via `src/data/projects.ts`
   (title, description, role, year, stack, links, figures).
2. Adapt the Plate 01 composition to the project's **actual screenshots/diagrams/data/technical
   artifacts** — replacing the neutral placeholder apparatus with real specimen figures.
3. Only then consider whether additional plate variants are needed and whether pointer/media
   depth is worth evaluating.
Optional non-visual items to consider when convenient: wrap the page content in a `<main>`
landmark (currently absent), replace placeholder `href="#"` links with real URLs, and add
`aria-hidden` to the `↗` glyph in links.

---

## 12. Future-session instructions

- **Read first:** this document, then `src/app/globals.css`, then the hero and projects components
  listed in Section 8.
- **Treat as LOCKED:** Stages 2–8 (hero composition, Stage 3 timings, Stage 5 field parameters,
  Stage 6 range/windows, Stage 7 layouts, Stage 8 reveal grammar). Change them only with an
  explicit reason and update this document accordingly.
- **Prefer parameter tuning over restructuring:** `HERO` const (copy) and the field’s
  `FIELD_CONFIG`; CSS tokens/`--hero-p` mapping/reveal delays; `src/data/projects.ts` content and
  `variant`/`emphasis`/figure `span`.
- **Keep it dependency-free, progressive, and performant:** passive listeners, rAF throttling,
  no per-frame layout reads, DPR ≤ 2, pause off-screen/hidden, tiny client boundaries.
- **Verify before finishing:** `npm run lint`, `npx tsc --noEmit`, `npm run build`.

---

## Appendix A — Authoritative parameters (quick reference)

- Scroll exit distance: `0.45 × innerHeight`.
- Field: 220/120 points, size `0.4–2.1px`, opacity `0.045–0.23`, depth `0.2–1`, bias `0.65/1.6`,
  exclusion `48/120`, drift `1–2.5px @0.05–0.1`, parallax `22px @ lerp 0.06`, DPR ≤ 2.
- Entrance: rule `.15s`, index `.30s`, name `.40s`, line-1 `.55s`, line-2 `.80s`, support `1.30s`,
  rule-bottom `1.35s`, foot `1.50s`, ruler `1.70s` (all expo-out). Ready on `fonts.ready` (900ms fallback).
- Reveal observer: `rootMargin: "0px 0px -12% 0px"`, `threshold: 0`.
- Colors: `#0b0b0d` / `#ededed` / `#8f8f94` / `rgba(255,255,255,0.1)`.

## Appendix B — Divergences from the original plan (historical only)

The original plan was written before tuning. Current implementation is authoritative:
- Display scale/leading: plan `clamp(2.75rem,11vw,9rem)` / `0.92` → now
  `clamp(1.75rem,8.8vw,8.6rem)` / `0.88`; display block nudged up (`pb-[7vh]`).
- Supporting copy: plan `mt-6 max-w-[34ch] text-muted` → now `mt-10 max-w-[36ch]
  clamp(1.05rem,1.6vw,1.4rem) text-foreground/70`.
- Field: plan ~240 pts, size ≤1.5px, opacity ≤0.10, parallax 12px → now 220/120 pts, size ≤2.1px,
  opacity 0.045–0.23, parallax 22px (tuned in Stages 4.1, 4.2, 5.1, 5.2, 5.3).
- Scroll range: plan `0.18×innerHeight` → now `0.45×innerHeight` (Stages 6.1, 6.2).
- The plan’s coordinate readout / proximity effect was **never built**; the field has no readout.
- `hero.tsx` remained a **server** component; client behavior lives in sibling client components.
- A `src/data/projects.ts` content model now exists (the plan assumed no data layer).
