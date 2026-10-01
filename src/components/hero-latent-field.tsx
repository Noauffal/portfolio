"use client";

import { useEffect, useRef } from "react";

const FIELD_CONFIG = {
  counts: { desktop: 220, mobile: 120 },
  size: { min: 0.4, max: 2.1 },
  opacity: { min: 0.045, max: 0.23 },
  depth: { min: 0.2, max: 1 },
  bias: { strength: 0.65, exponent: 1.6 },
  exclusion: { padding: 48, feather: 120 },
  drift: {
    amplitudeMin: 1,
    amplitudeMax: 2.5,
    frequencyMin: 0.05,
    frequencyMax: 0.1,
  },
  parallax: { max: 22, lerp: 0.06 },
  breakpoint: 768,
  maxDpr: 2,
  color: "#ededed",
} as const;

type Point = {
  x: number;
  y: number;
  z: number;
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
};

type Rect = { left: number; top: number; right: number; bottom: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(t: number) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

function distanceToRect(x: number, y: number, rect: Rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.hypot(dx, dy);
}

export function HeroLatentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const animate = !reduceMotion && finePointer;

    let points: Point[] = [];
    let exclusion: Rect | null = null;
    let width = 0;
    let height = 0;
    let offsetLeft = 0;
    let offsetTop = 0;

    let raf = 0;
    let syncRaf = 0;
    let running = false;
    let disposed = false;
    let visible = true;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const desiredCount = () =>
      width < FIELD_CONFIG.breakpoint
        ? FIELD_CONFIG.counts.mobile
        : FIELD_CONFIG.counts.desktop;

    const generate = () => {
      const count = desiredCount();
      const next: Point[] = [];
      const { padding } = FIELD_CONFIG.exclusion;
      let guard = 0;

      while (next.length < count && guard < count * 40) {
        guard += 1;

        const uniform = Math.random() < 1 - FIELD_CONFIG.bias.strength;
        const x = uniform
          ? Math.random()
          : 1 - Math.pow(Math.random(), FIELD_CONFIG.bias.exponent);
        const y = uniform
          ? Math.random()
          : Math.pow(Math.random(), FIELD_CONFIG.bias.exponent);
        const z = lerp(
          FIELD_CONFIG.depth.min,
          FIELD_CONFIG.depth.max,
          Math.random(),
        );

        if (exclusion) {
          const px = x * width;
          const py = y * height;
          const insideCore =
            px > exclusion.left - padding &&
            px < exclusion.right + padding &&
            py > exclusion.top - padding &&
            py < exclusion.bottom + padding;

          if (insideCore) continue;
        }

        next.push({
          x,
          y,
          z,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          freqX: lerp(
            FIELD_CONFIG.drift.frequencyMin,
            FIELD_CONFIG.drift.frequencyMax,
            Math.random(),
          ),
          freqY: lerp(
            FIELD_CONFIG.drift.frequencyMin,
            FIELD_CONFIG.drift.frequencyMax,
            Math.random(),
          ),
        });
      }

      points = next;
    };

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      offsetLeft = rect.left;
      offsetTop = rect.top;

      const dpr = Math.min(window.devicePixelRatio || 1, FIELD_CONFIG.maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodes = Array.from(
        document.querySelectorAll('[data-exclude="hero-type"]'),
      );

      if (nodes.length === 0) {
        exclusion = null;
        return;
      }

      let left = Infinity;
      let top = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;

      for (const node of nodes) {
        const r = node.getBoundingClientRect();
        left = Math.min(left, r.left - rect.left);
        top = Math.min(top, r.top - rect.top);
        right = Math.max(right, r.right - rect.left);
        bottom = Math.max(bottom, r.bottom - rect.top);
      }

      exclusion = { left, top, right, bottom };
    };

    const draw = (time: number) => {
      if (width < 1 || height < 1) return;

      const motion = animate ? 1 : 0;
      currentX += (targetX - currentX) * FIELD_CONFIG.parallax.lerp;
      currentY += (targetY - currentY) * FIELD_CONFIG.parallax.lerp;

      const seconds = time / 1000;
      const { min: zMin, max: zMax } = FIELD_CONFIG.depth;
      const { feather } = FIELD_CONFIG.exclusion;
      const parallaxMax = FIELD_CONFIG.parallax.max * motion;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = FIELD_CONFIG.color;

      for (const point of points) {
        const depth = (point.z - zMin) / (zMax - zMin);

        const amplitude =
          lerp(
            FIELD_CONFIG.drift.amplitudeMin,
            FIELD_CONFIG.drift.amplitudeMax,
            depth,
          ) * motion;

        const driftX = amplitude * Math.sin(seconds * point.freqX + point.phaseX);
        const driftY = amplitude * Math.sin(seconds * point.freqY + point.phaseY);
        const parallaxX = currentX * parallaxMax * depth;
        const parallaxY = currentY * parallaxMax * depth;

        const px = point.x * width + driftX + parallaxX;
        const py = point.y * height + driftY + parallaxY;

        const mask = exclusion
          ? smoothstep(distanceToRect(px, py, exclusion) / feather)
          : 1;

        if (mask <= 0.001) continue;

        const size = lerp(FIELD_CONFIG.size.min, FIELD_CONFIG.size.max, depth);
        const alpha =
          lerp(FIELD_CONFIG.opacity.min, FIELD_CONFIG.opacity.max, depth) * mask;

        ctx.globalAlpha = alpha;
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (!running) return;
      draw(time);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || disposed || !animate) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const syncLayout = () => {
      measure();
      if (points.length !== desiredCount()) generate();
      if (!animate) draw(0);
    };

    const scheduleSync = () => {
      if (syncRaf) cancelAnimationFrame(syncRaf);
      syncRaf = requestAnimationFrame(() => {
        syncRaf = 0;
        if (disposed) return;
        syncLayout();
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (width < 1 || height < 1) return;
      targetX = clamp(((event.clientX - offsetLeft) / width) * 2 - 1, -1, 1);
      targetY = clamp(((event.clientY - offsetTop) / height) * 2 - 1, -1, 1);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else if (visible) {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(scheduleSync);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (animate) {
          if (visible && !document.hidden) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (animate) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    syncLayout();
    if (animate) start();

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleSync);
    }

    return () => {
      disposed = true;
      stop();
      if (syncRaf) cancelAnimationFrame(syncRaf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
