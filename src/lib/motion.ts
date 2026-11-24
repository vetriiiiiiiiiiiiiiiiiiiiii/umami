"use client";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

declare global {
  interface Window {
    __umamiReady?: boolean;
  }
}

/** Resolves once the loading sequence has handed over to the page. */
export function onSiteReady(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__umamiReady) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener("umami:ready", h, { once: true });
  return () => window.removeEventListener("umami:ready", h);
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (typeof target === "number") window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
