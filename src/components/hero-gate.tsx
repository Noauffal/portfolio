"use client";

import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

declare global {
  interface Window {
    __heroAnim?: "armed" | "ready" | "done";
  }
}

export function HeroGate() {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const state = window.__heroAnim;

    if (state === "armed") {
      root.classList.add("hero-anim");
    } else if (state === "ready") {
      root.classList.add("hero-anim", "hero-ready");
    }
  }, []);

  return null;
}
