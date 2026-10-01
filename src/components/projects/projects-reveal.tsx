"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealFallback?: number;
  }
}

export function ProjectsReveal() {
  useEffect(() => {
    if (window.__revealFallback) {
      window.clearTimeout(window.__revealFallback);
      window.__revealFallback = undefined;
    }

    const root = document.documentElement;

    if (typeof IntersectionObserver === "undefined") {
      root.classList.remove("reveal-armed");
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-root]"),
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return null;
}
