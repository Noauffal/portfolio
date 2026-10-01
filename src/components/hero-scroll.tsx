"use client";

import { useEffect } from "react";

const SCROLL_DISTANCE = 0.45;

export function HeroScroll() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let viewportHeight = window.innerHeight;
    let frame = 0;

    const update = () => {
      frame = 0;
      const distance = SCROLL_DISTANCE * viewportHeight;
      const progress =
        distance > 0 ? Math.min(Math.max(window.scrollY / distance, 0), 1) : 0;
      hero.style.setProperty("--hero-p", String(progress));
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      viewportHeight = window.innerHeight;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      hero.style.removeProperty("--hero-p");
    };
  }, []);

  return null;
}
