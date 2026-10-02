# LATENT PLATE — Portfolio Source of Truth

> Single source of truth for the creative direction and technical implementation of this
> portfolio. The **current implementation in `src/` is authoritative**; this document
> describes it and is kept in sync with the code. Where this document and the code
> disagree, **the code wins**.
>
> Status: Hero (Stages 2–6) is LOCKED and unchanged. Projects are now the approved
> **Direction 03 / Physical Plates** system. The former BLACK → PAPER / Stage 7–8 paper
> Projects experience is **superseded and retained for rollback only**. Projects still
> use placeholder content.

---

## 0. How to use this document

Read this file first, then (in order):

1. `src/app/page.tsx` — the single route composition.
2. `src/app/globals.css` — tokens + Hero keyframes/scroll/reveal CSS + plate scopes.
3. `src/components/hero.tsx` — Hero composition (LOCKED).
4. `src/components/hero-latent-field.tsx` — Canvas 2D field (`FIELD_CONFIG`).
5. `src/components/hero-scroll.tsx` — Stage 6 scroll progress.
6. `src/components/projects/physical-plate.tsx` — the only Three.js engine.
7. `src/components/projects/physical-projects.tsx` + `plate-01/02/03.tsx` + `plate-parts.tsx`
   — the Projects compositions.
8. `src/data/projects.ts` — project content model.

The Hero (Sections 3) and the Physical Projects system (Section 4) are the production
architecture. Section 5 marks the superseded legacy system.

---

## 1. Creative direction

### 1.1 LATENT PLATE philosophy
The page is **a scientific plate that measures an invisible field**. Large editorial
typography is the subject; scientific/specimen apparatus (ruler, indices, hairlines,
mono metadata, figure captions) is the *calibration* around it. The AI/data connection is
*discovered*, never advertised.

The original fusion of **Latent Field** (depth/atmosphere from an abstract point field)
and **Specimen Plate** (editorial/scientific discipline) remains the identity. It now
extends into Projects as **physical specimen objects** encountered in a continuous black
space (Section 4).

### 1.2 Intended emotional impression
Calm, precise, slightly mysterious. The Hero is the cinematic opening; the visitor then
scrolls through a large empty black spatial field in which physical project Plates appear.
Confidence through omission.

### 1.3 What the design must NOT become
Not a generic/SaaS/dev-portfolio site. Specifically **not**: portfolio cards or a 3-column
grid; Behance-style thumbnails; glassmorphism; neon/glow/blue-purple AI gradients;
cyberpunk; Matrix effects; AI brains / neural-network illustrations; floating tech logos;
excessive particles; pill-heavy UI; huge rounded CTAs; a presentation-slide or
parallax-demo feel. Projects must not read as "website cards".

---

## 2. Locked visual system

### 2.1 Colors (tokens in `globals.css:root`)
| Token | Value | Use |
|---|---|---|
| `--background` | `#0b0b0d` | near-black base / continuous latent world |
| `--foreground` | `#ededed` | off-white display/type |
| `--muted` | `#8f8f94` | mono apparatus |
| `--line` | `rgba(255,255,255,0.1)` | hairlines / ticks / frames |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | expo-out easing |

Retained but **not rendered by `/`** (legacy BLACK → PAPER): `--paper #e9e6df`,
`--paper-ink #171513`, `--paper-muted #6b675f`, `--paper-line rgba(23,21,15,0.15)`.
The Hero latent field color is `#ededed`.

### 2.2 Fonts
- Display: **Instrument Sans** (`next/font/google`, `--font-instrument` → `font-display`).
- Apparatus: **Geist Mono** (`--font-geist-mono` → `font-mono`).
- Geist Sans was intentionally removed. `display: "swap"`; the Hero entrance waits on
  `document.fonts.ready`.

### 2.3 Grid / container geometry
- Hero content: `mx-auto w-full max-w-[1600px]`, `px-6 sm:px-10`, `py-6 sm:py-8`.
- Desktop apparatus gutter: **`4rem`** (`md:pl-16`).
- Hero: `min-h-svh`, `grid-rows-[auto_1fr_auto]`.
- Projects runways use the same `max-w-[1600px]` container and a 12-col grid for axis
  placement (Section 4.6). A dedicated 4rem gutter is used by the Hero and by the legacy
  paper plates, not by the physical Plates (which are objects, not grid columns).

### 2.4 Ruler / hairline apparatus (Hero — LOCKED)
Vertical hairline at `left-5` inside the `4rem` gutter; ticks at `0/25/50/75/100%`;
endpoint ticks `w-3`, interior `w-2`; labels `0.0` / `1.0` at `left-9` (Geist Mono 10px,
tracking `0.18em`, `text-muted`). Hidden below `md`.

### 2.5 Typography hierarchy (Hero — LOCKED)
- Display: `clamp(1.75rem, 8.8vw, 8.6rem)`, `uppercase`, `leading-[0.88]`,
  `tracking-[-0.02em]`; line 1 `font-semibold`, line 2 `font-normal`.
- Supporting: `clamp(1.05rem, 1.6vw, 1.4rem)`, `leading-[1.5]`, `max-w-[36ch]`,
  `text-foreground/70`.
- Apparatus/mono: 10–11px, `uppercase`, `tracking-[0.18em]`, `text-muted`.

### 2.6 Responsive principles
Single route `/`; `min-h-svh`. Below `md` (768px): Hero ruler hidden, field count
reduced, coarse pointers get no parallax; physical Plates remain frontal/static on coarse
pointers. Canvas count/breakpoint and clamp scales are the responsive levers.

---

## 3. HERO — LOCKED (Plate 00)

The Hero is **approved and was not redesigned during the Physical Projects work**. Do not
modify composition, entrance, field, scroll exit, ruler, metadata or typography.

### 3.1 Composition (`src/components/hero.tsx`, server)
`<section data-hero>` = `relative mx-auto grid min-h-svh w-full max-w-[1600px]
grid-rows-[auto_1fr_auto] px-6 py-6 sm:px-10 sm:py-8`. Top band: name + `01 / 2026` on a
hairline (`md:pl-16`). Middle: left ruler (absolute, `hidden md:block`) + display block
(`w-full pb-[7vh] md:pl-16`). `<h1 data-scroll="display" data-exclude="hero-type">` with
two masked lines; supporting `<p data-anim="support" data-exclude="hero-type">`. Bottom
band: `Lyon, France` + `SCROLL` on a hairline. `HeroLatentField` and `HeroScroll` render
inside. Copy lives in the `HERO` const.

### 3.2 Entrance — Stage 3 (LOCKED)
Pure CSS keyframes (`hero-fade`, `hero-rise`, `hero-mask`, `hero-rule`) gated by classes
on `<html>`. One-shot, no loop. Inline pre-paint script adds `hero-anim` only if JS and not
reduced motion; `hero-ready` after `document.fonts.ready` (900ms fallback) + one rAF;
`HeroGate` re-applies gates after dev Strict-Mode remount; classes removed ~2400ms after
start. Timings: rule-top `0.9s @0.15s`; index `0.5s @0.30s`; name `0.5s @0.40s`; line-1
mask `0.95s @0.55s`; line-2 mask `0.95s @0.80s`; support rise `0.6s @1.30s`; rule-bottom
`0.7s @1.35s`; foot `0.5s @1.50s`; ruler `0.4s @1.70s`. Mask reveal is line-level only.

### 3.3 Latent field — Stages 4/5 (LOCKED)
One Canvas 2D `<canvas>` behind Hero content (`z-0`, `pointer-events-none`, `aria-hidden`).
`FIELD_CONFIG` (authoritative): counts `{desktop:220, mobile:120}`, breakpoint `768`,
size `0.4–2.1px`, opacity `0.045–0.23`, depth `0.2–1`, bias `{strength:0.65,
exponent:1.6}` (upper-right), exclusion `{padding:48, feather:120}`, drift `{amplitude
1–2.5, frequency 0.05–0.1}`, parallax `{max:22, lerp:0.06}`, `maxDpr:2`, color `#ededed`.
Points are normalized `{x,y,z}` + drift phase/frequency; projection = anchor + drift +
pointer·parallax·depth. Sinusoidal bounded drift; fine-pointer-only parallax; typography
exclusion via `[data-exclude="hero-type"]`. Single rAF loop; pauses when hidden/off-screen;
no per-frame layout reads; full cleanup.

### 3.4 First-scroll exit — Stage 6 (LOCKED)
`hero-scroll.tsx` sets `--hero-p = clamp(scrollY / (0.45 * innerHeight), 0, 1)` on
`[data-hero]` (passive listener + rAF throttle). Derived windows (globals.css): meta
`0–0.55`; display `0.15–0.90`; ruler `0.40–0.90`; rule-top/bottom `0.55–1.0`; canvas
`0.05–1.0` (opacity 1→0, ≤12px up). Reversible pure function of `p`.

### 3.5 Reduced motion / progressive enhancement
`prefers-reduced-motion: reduce` ⇒ no entrance (`hero-anim` not added), static field,
CSS reduce blocks force final states. Content is always visible without JS.

---

## 4. CURRENT PRODUCTION PROJECTS — PHYSICAL PLATES (Direction 03)

### 4.1 Concept and rules
Projects are **physical specimen objects**, not page sections or UI cards. They exist in
one continuous near-black world (`#0b0b0d`) with the Hero, encountered while scrolling.

- Natural document scroll only. **No** sticky, pinning, scroll hijacking, GSAP, or
  scroll-driven rotation.
- **No** fade/pop/scale reveals. Plates enter from below and leave through the top purely
  because they exist in normal document flow.
- Scroll controls vertical **presence/position**; pointer controls **orientation** only.
- Neutral orientation is frontal (`rotateX = 0`, `rotateY = 0`).
- Real 3D perspective determines which side walls appear; no fake side-opacity toggles,
  no permanent all-edge outline.
- Editorial content is real, selectable DOM (not canvas text); links remain native.

### 4.2 `/` component tree
```
<main>
  <Hero />
  <PhysicalProjects />
</main>
```
`PhysicalProjects` renders the void + three Plate runways in order. The black latent world
continues through Projects — there is **no paper transition**.

Sequence: **Hero / Plate 00 → black void → Plate 01 (portrait, right) → black void →
Plate 02 (taller portrait, left) → black void → Plate 03 (very large 16:10, centered) →
black void / future continuation**.

### 4.3 Architecture / files
| File | Boundary | Responsibility |
|---|---|---|
| `src/components/projects/physical-plate.tsx` | **client** | The only Three.js engine: geometry, materials, lighting, camera, projection, pointer, lifecycle. |
| `src/components/projects/plate-parts.tsx` | server | Shared editorial pieces (`PlateMeta`, `PlateLinks`, `PlateFigure`). |
| `src/components/projects/plate-01.tsx` / `plate-02.tsx` / `plate-03.tsx` | server | Per-plate dimensions + editorial composition; pass server children into `PhysicalPlate`. |
| `src/components/projects/physical-projects.tsx` | server | Void + runways + the three plates. |
| `src/data/projects.ts` | — | Project content model (unchanged); `projects[0..2]`. |

Three.js is used directly. **No R3F, no drei, no new dependencies.** Compositions stay
server components; only `physical-plate.tsx` is a client component.

### 4.4 Validated physical model (LOCKED)
Shared engine constants (`physical-plate.tsx`):
- `BoxGeometry`, **normalized world width = 1**, shared **`DEPTH = 0.24`**, `FRONT_Z = 0.12`.
- Opaque solid baseline: **`MeshStandardMaterial`, `FrontSide`** only.
  - Front/back (BoxGeometry groups `[4]=+z`, `[5]=-z`): `#ededeb`, `roughness 0.85`, `metalness 0`.
  - Sides (groups `[0]=+x`, `[1]=-x`, `[2]=+y`, `[3]=-y`): `#a8acad`, `roughness 0.8`, `metalness 0`.
- **No** glass, transmission, attenuation, clearcoat, PMREM/environment, bevel, rounded
  corners, or transparency. (Material polish deferred; see §8.)
- Lighting: `HemisphereLight(white, #666666, 0.85)` + key `DirectionalLight(white, 1)` at
  `(2,3,4)` + weak fill `DirectionalLight(white, 0.4)` at `(-3,-1,2)`.
- Renderer: `antialias: !coarse`, `alpha: true`, `powerPreference: "high-performance"`,
  `SRGBColorSpace`; DPR cap `2` (`1.5` coarse). No tone mapping set (default).

Pointer (orientation only):
- Neutral `rotateX = 0`, `rotateY = 0`.
- Max `rotateY ≈ ±12°`, `rotateX ≈ ±8°`.
- **Local** normalization relative to each Plate's own screen-space center/dimensions
  (`rect.width * plateFraction`, `rect.height * plateFraction`), never the viewport.
- Hor. radius `H_RADIUS 0.65`, vert. radius `V_RADIUS 0.55`, dead zone `0.04`,
  lerp `0.08`, settle `0.002`. Returns to `0/0` on pointer-leave / window blur.
- Sign convention: pointer on a side exposes that side's wall.

### 4.5 Camera / projection lessons (important invariants)
- **World geometry and CSS display size are separate.** `surfaceWidth` is the desired
  visible front-face width; the world geometry is normalized (`1 × height × 0.24`).
- Camera framing accounts for side visibility. `computeCamera(width,height)`:
  - `distanceForHeight = FRONT_Z + height / (2·FILL·tan(fov/2))`
  - `distanceForWidth  = FRONT_Z + width  / (2·FILL·tan(fov/2)·aspect)`
  - `fillDistance = max(distanceForHeight, distanceForWidth)`
  - `sideVisibleDistance = FRONT_Z + width/2 / (sin(12°)·0.9)` — a shared minimum so a
    wide/flat plate's side walls do not stay back-facing under `THREE.FrontSide` at max Y.
  - `cameraDistance = max(fillDistance, sideVisibleDistance)`
  - `plateFraction = FILL · (fillDistance − FRONT_Z) / (cameraDistance − FRONT_Z)` — the
    fraction of the scene the visible front face occupies. `FILL = 0.88`.
- DOM content maps to the actual `+Z` front face:
  `contentFraction = height / (2·tan(fov/2)·cameraDistance)`, overlay
  `inset = (1 − contentFraction)/2`, `perspective = focalPx = (sceneH/2)/tan(fov/2)`,
  `translateZ = FRONT_Z·scale`. The placeholder uses `surfaceInset = (1 − plateFraction)/2`.
- **Projection variables are deterministic at SSR.** All `--plate-*` values are computed in
  the component body (independent of measured size) and rendered inline, so SSR and the
  hydrated client are identical — no post-hydration size jump. `resize()` is WebGL-only
  (camera aspect + renderer size); it never mutates layout/projection CSS.
- **`shrink-0` is REQUIRED on the scene root.** The transparent projection scene is
  intentionally wider than its flex parent (`scene = surfaceWidth / plateFraction`). If the
  scene root is allowed to `flex-shrink`, a large landscape plate's scene is clamped by the
  parent and the visible physical front face becomes far smaller than `surfaceWidth`. This
  was the P03 sizing bug; the scene root must not shrink. The Projects section uses
  `overflow-x-clip` to contain the extra transparent room.

### 4.6 Current plates
| Plate | Data | Format | Axis | Notes |
|---|---|---|---|---|
| **01** | `projects[0]` | portrait `1 × 1.4` (≈5:7) | **right** | Reference physical object. `surfaceWidth: min(clamp(264px, 42.7svh, 604px), 77vw)`. |
| **02** | `projects[1]` | portrait `1 × 1.5` (≈2:3) | **left** | Narrower/taller; compact composition. `surfaceWidth: min(clamp(255px, 41.1svh, 616px), 77vw)`. |
| **03** | `projects[2]` | landscape `1 × 0.625` (**exactly 16:10**) | **center** | Monumental scale/rhythm change. `surfaceWidth: clamp(800px, 84vw, 1350px)`. Derived scene ≈ `× 2.29114`. At 1440px viewport the visible front face ≈ **1210 × 756px**. |

P01/P02 surfaceWidth values are `0.88 ×` their original container width (because the scene
width = `surfaceWidth / plateFraction`, and `plateFraction = 0.88` for them), preserving
their previously approved on-screen face sizes. P03 must read as a monumental landscape
slab, not a third card.

### 4.7 Current scroll rhythm (`physical-projects.tsx`)
These are **current starting values, not permanently locked**. Scroll rhythm is the next
likely visual calibration area.

| Segment | Value |
|---|---|
| initial void (Hero → P01) | `min-h-[45svh] sm:min-h-[60svh]` |
| P01 runway | `min-h-[150svh]`, right axis |
| gap | `min-h-[28svh]` |
| P02 runway | `min-h-[150svh]`, left axis |
| gap | `min-h-[28svh]` |
| P03 runway | `min-h-[140svh]`, centered, `overflow-x-clip` |

### 4.8 Performance / lifecycle
- **One WebGL renderer/context per Plate — three contexts currently.** A future single
  shared renderer is a possible optimization, **not a current requirement**.
- Each Plate: `ResizeObserver` (sizing), `IntersectionObserver` (threshold 0) pauses
  rendering off-screen, `visibilitychange` pauses when hidden, demand rendering (the rAF
  loop runs only while the pointer lerp is active, then stops), DPR cap, and full disposal
  of geometry/materials/renderer on unmount.
- Coarse pointer / mobile: no pointer tilt (static frontal). Reduced motion: static;
  `[data-plate-content]` transform forced to `none`. No gyroscope.
- Progressive enhancement: before WebGL is ready (or if WebGL fails) a CSS `::before` paper
  placeholder at the front-face inset keeps content readable; `data-webgl-ready` hides it.

### 4.9 Mobile caveat (OPEN FOLLOW-UP)
P03's `surfaceWidth` floor (`clamp(800px, 84vw, 1350px)`) means below ≈952px viewport width
the 800px floor can exceed the viewport; the section's `overflow-x-clip` contains the
overflow but the face may be wider than the screen. Mobile P03 sizing/layout is an **open
follow-up** — desktop integration was the priority and mobile was not redesigned.

---

## 5. SUPERSEDED / RETAINED LEGACY PROJECTS (Stage 7/8 + BLACK → PAPER)

The former paper-based Projects experience and Stage 8 reveal choreography are **no longer
the production Projects experience**. They are superseded by the Physical Plates (§4) and
retained only for rollback.

Superseded files (not imported by `/`):
- `src/components/projects/projects-section.tsx`
- `src/components/projects/project-plate.tsx`
- `src/components/projects/specimen-figure.tsx`
- `src/components/projects/projects-reveal.tsx`

Superseded CSS still present but not rendered by `/`:
- `[data-paper]` scope and `--paper*` tokens (`globals.css`).
- Stage 8 `.reveal-armed [data-reveal]` rules and the reduced-motion reveal block.
- The `[data-paper]` datum `border-top`.

**BLACK → PAPER is NOT the current production direction.** These items remain for easy
rollback and are candidates for a separate cleanup pass (see §8).

---

## 6. Architecture map

Server-first App Router. Animation is CSS-driven for the Hero; Projects use one small
Three.js client component per Plate.

| File | Boundary | Responsibility |
|---|---|---|
| `src/app/layout.tsx` | server | Fonts, metadata, pre-paint gate scripts, `HeroGate`. |
| `src/app/page.tsx` | server | `<main>` → `<Hero/>` + `<PhysicalProjects/>`. |
| `src/app/globals.css` | — | Tokens; Hero Stage 3/6 CSS; plate scopes; legacy paper/Stage 8 CSS. |
| `src/components/hero.tsx` | server | Hero composition (LOCKED). |
| `src/components/hero-latent-field.tsx` | client | Canvas 2D field. |
| `src/components/hero-scroll.tsx` | client | Stage 6 `--hero-p`. |
| `src/components/hero-gate.tsx` | client | Re-applies Hero gates after Strict-Mode remount. |
| `src/components/inline-script.tsx` | client | Safe inline `<script>` helper. |
| `src/components/projects/physical-plate.tsx` | **client** | Three.js engine (only). |
| `src/components/projects/physical-projects.tsx` | server | Void + runways + plates. |
| `src/components/projects/plate-01/02/03.tsx` | server | Plate dimensions + compositions. |
| `src/components/projects/plate-parts.tsx` | server | Shared editorial pieces. |
| `src/data/projects.ts` | — | Project content model. |

Dependencies: `next`, `react`, `react-dom`, `three` (plus dev `@types/three`). No animation
or UI libraries.

---

## 7. Non-negotiable constraints

**Aesthetic**
- No generic portfolio cards, 3-column grids, thumbnails-in-rectangles, carousels.
- No SaaS aesthetic; no glassmorphism, blur panels, glowing cards, neon/glow, blue/purple
  AI gradients, AI-brain/neural imagery, floating tech logos.
- No excessive particles; the Hero field must read as measured dust, never a particle effect.
- Physical Plates are opaque solid objects — no glass/transmission/bevel unless deliberately
  revisited (deferred).

**Motion / interaction**
- No scroll hijacking, snapping, wheel interception, or artificial inertia.
- No gratuitous animation; motion ends and becomes still. The Hero stays the strongest moment.
- No letter-by-letter animation. No hover-gated content. No fade/pop/scale reveals on Plates.
- Scroll = position; pointer = orientation only.

**Process / architecture**
- Do not add runtime dependencies (no GSAP, Three.js wrappers, R3F/drei, Lenis, UI libs)
  without an explicit, justified reason.
- Hero (Stages 2–6) is LOCKED; do not redesign without an explicit, stated reason.
- The physical engine invariants in §4.4–4.5 are LOCKED (geometry, depth, camera,
  `sideVisibleDistance`, `plateFraction`/`contentFraction`, `shrink-0`, FrontSide).
- Preserve progressive enhancement: no-JS and reduced-motion must show final, readable
  content; failed scripts must never leave content hidden.
- Preserve the server/client boundaries; keep Three.js in the smallest client component.
- No new sections/navigation/placeholder architecture without an explicit request.

---

## 8. Current status / next steps

**LOCKED**
- Hero (Stages 2–6): composition, typography, ruler, field, entrance, scroll exit.
- Physical BoxGeometry behavior, shared `DEPTH = 0.24`, `FrontSide` baseline.
- Pointer orientation behavior (local normalization, ±12°/±8°).
- P01/P02 formats; P03 16:10 monumental format.
- Continuous black Projects world; DOM/WebGL front-face alignment; `shrink-0` invariant.

**OPEN / NEXT**
- Final scroll rhythm calibration (§4.7 values are a starting point).
- Real project content/assets (replace placeholders in `src/data/projects.ts`).
- Mobile P03 treatment (the 800px floor caveat, §4.9).
- Possible material refinement later — **explicitly deferred**; do not reintroduce glass
  unless deliberately revisited.
- Possible single-renderer optimization later (not required).
- Cleanup/removal of superseded Stage 7/8 components + paper CSS after the rollback window.

---

## 9. Future-session instructions

- **Read first:** this document, then `page.tsx`, `globals.css`, the Hero components, and
  `src/components/projects/physical-plate.tsx`.
- **Hero is LOCKED.** Do not modify Stages 2–6.
- **Physical engine invariants are LOCKED** (§4.4–4.5). Tune parameters (plate formats,
  `surfaceWidth`, scroll rhythm) rather than restructuring.
- **Prefer parameter tuning over restructuring:** plate `width`/`height`/`surfaceWidth`,
  runway heights in `physical-projects.tsx`, and project content in `src/data/projects.ts`.
- **Keep it dependency-light, progressive, and performant:** passive listeners, rAF
  throttling, IntersectionObserver offscreen pause, visibility pause, DPR cap, disposal.
- **Verify before finishing:** `npm run lint`, `npx tsc --noEmit`, `npm run build`.

---

## Appendix A — Authoritative parameters (quick reference)

- Colors: `#0b0b0d` / `#ededed` / `#8f8f94` / `rgba(255,255,255,0.1)`.
- Hero exit: `--hero-p = clamp(scrollY/(0.45·innerHeight), 0, 1)`.
- Field: 220/120 pts, size `0.4–2.1px`, opacity `0.045–0.23`, depth `0.2–1`,
  bias `0.65/1.6`, exclusion `48/120`, drift `1–2.5 @0.05–0.1`, parallax `22 @0.06`, DPR ≤ 2.
- Physical engine: `DEPTH 0.24`, `FRONT_Z 0.12`, `FILL 0.88`, `FOV 30`,
  `rotateY ±12°`, `rotateX ±8°`, `H_RADIUS 0.65`, `V_RADIUS 0.55`, dead zone `0.04`,
  lerp `0.08`. DPR cap `2` / `1.5` coarse.
- Plates: P01 `1×1.4` right · P02 `1×1.5` left · P03 `1×0.625` (16:10) centered.
- Scroll rhythm: void `45–60svh`; runways `150/150/140svh`; gaps `28svh` (current).

## Appendix B — Historical notes (superseded)

The original plan (`.kilo/plans/…`) and the BLACK → PAPER / Stage 7–8 paper Projects
experience are historical. The current implementation is authoritative. Earlier decorative
Hero field tuning (size/opacity/parallax) and the Hero display scale
(`clamp(1.75rem,8.8vw,8.6rem)`, `leading 0.88`) are as implemented. The prototype route
`/direction-03` and `src/components/direction-03/` no longer exist — Direction 03 graduated
into the production Projects architecture under `src/components/projects/`.
