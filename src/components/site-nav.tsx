"use client";

import { useEffect, useRef } from "react";

/* Deliberately kept local to the nav, but it must stay in sync with
   SCROLL_DISTANCE (0.45) in hero-scroll.tsx: the Hero exit choreography is
   complete at scrollY = 0.45 * innerHeight. The nav only observes that
   boundary — it never writes --hero-p or owns the Hero animation. */
const HERO_EXIT_RATIO = 0.45;
const ACTIVE_REFERENCE_K = 0.5;
const CLICK_CENTER_K = 0.5;

const SECTIONS = [
  { id: "hero", index: "00", label: "Hero" },
  { id: "plate-01", index: "01", label: "Plate 01" },
  { id: "plate-02", index: "02", label: "Plate 02" },
  { id: "plate-03", index: "03", label: "Plate 03" },
] as const;

export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const plates = Array.from(
      document.querySelectorAll<HTMLElement>("[data-plate-scene]"),
    ).slice(0, 3);
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let viewportHeight = window.innerHeight;
    let scrollSpan = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
    let clickTargets: number[] = [];
    let boundaries: number[] = [];
    let activeIndex = -1;
    let frame = 0;
    let resizeFrame = 0;
    let open = false;
    let disposed = false;

    const measure = () => {
      viewportHeight = window.innerHeight;
      scrollSpan = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      const scrollY = window.scrollY;
      const heroAnchor = hero
        ? hero.getBoundingClientRect().top + scrollY + hero.offsetHeight / 2
        : 0;
      const plateAnchors = plates.map((plate) => {
        const rect = plate.getBoundingClientRect();
        return rect.top + scrollY + rect.height / 2;
      });

      const anchors = [heroAnchor, ...plateAnchors];
      boundaries = [];
      for (let i = 0; i < anchors.length - 1; i += 1) {
        boundaries.push((anchors[i] + anchors[i + 1]) / 2);
      }

      clickTargets = [
        0,
        ...plateAnchors.map((anchor) => anchor - viewportHeight * CLICK_CENTER_K),
      ];
    };

    const updateProgress = () => {
      const progress =
        scrollSpan > 0 ? Math.min(Math.max(window.scrollY / scrollSpan, 0), 1) : 0;
      nav.style.setProperty("--nav-progress", progress.toFixed(5));
    };

    const updateActive = () => {
      const reference = window.scrollY + viewportHeight * ACTIVE_REFERENCE_K;
      let index = 0;
      for (let i = 0; i < boundaries.length; i += 1) {
        if (reference >= boundaries[i]) index = i + 1;
      }
      if (index === activeIndex) return;
      activeIndex = index;
      nav.dataset.active = String(index);
      links.forEach((link, i) => {
        if (i === index) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    const render = () => {
      frame = 0;
      updateProgress();
      updateActive();
    };

    const schedule = () => {
      if (frame || disposed) return;
      frame = requestAnimationFrame(render);
    };

    const setOpen = (next: boolean) => {
      if (next === open) return;
      open = next;
      if (next) {
        nav.setAttribute("data-open", "");
        measure();
      } else {
        nav.removeAttribute("data-open");
      }
      schedule();
    };

    let observer: IntersectionObserver | null = null;
    const armObserver = () => {
      measure();
      observer?.disconnect();
      if (!hero) {
        setOpen(true);
        return;
      }
      const topMargin = HERO_EXIT_RATIO * viewportHeight - hero.offsetHeight;
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          setOpen(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: `${Math.round(topMargin)}px 0px 0px 0px` },
      );
      observer.observe(hero);
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "[data-nav-link]",
      );
      if (!anchor) return;
      const index = Number(anchor.dataset.navIndex);
      if (!Number.isInteger(index) || index < 0 || index >= clickTargets.length) return;
      event.preventDefault();
      window.scrollTo({
        top: clickTargets[index],
        behavior: reduceMotion ? "auto" : "smooth",
      });
      if (anchor.hash) window.history.replaceState(null, "", anchor.hash);
    };

    const onScroll = () => {
      if (open) schedule();
    };

    const onResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        if (disposed) return;
        armObserver();
        schedule();
      });
    };

    nav.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const onFontsReady = () => {
      if (disposed) return;
      armObserver();
      schedule();
    };
    if (document.fonts?.ready) document.fonts.ready.then(onFontsReady);

    armObserver();
    updateProgress();

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      observer?.disconnect();
      nav.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      nav.style.removeProperty("--nav-progress");
    };
  }, []);

  return (
    <nav ref={navRef} data-site-nav aria-label="Sections">
      <div data-nav-inner>
        <a data-nav-brand href="#hero" aria-label="Back to top">
          N.A / 2026
        </a>
        <ol data-nav-list>
          {SECTIONS.map((section, index) => (
            <li key={section.id}>
              <a
                data-nav-link
                data-nav-index={index}
                href={`#${section.id}`}
                aria-label={section.label}
              >
                <span data-nav-label>{section.index}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span data-nav-progress aria-hidden="true" />
    </nav>
  );
}
