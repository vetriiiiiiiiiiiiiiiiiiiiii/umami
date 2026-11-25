"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

type Theme = "light" | "dark";

export function ThemeToggle({ className = "", showLabel = false }: { className?: string; showLabel?: boolean }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () => setTheme((document.documentElement.dataset.theme as Theme) || "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    // follow the OS while the visitor hasn't chosen explicitly
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("umami-theme");
      } catch {}
      if (!stored) document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onChange);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("umami-theme", next);
      } catch {}
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (doc.startViewTransition && !prefersReducedMotion()) {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const t = doc.startViewTransition(apply);
      t.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 750, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
    } else {
      root.classList.add("theme-switching");
      apply();
      window.setTimeout(() => root.classList.remove("theme-switching"), 500);
    }
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle colour theme"}
      aria-pressed={theme ? isDark : undefined}
      className={`group relative inline-flex h-11 items-center gap-3 rounded-full text-ink ${showLabel ? "px-1" : "w-11 justify-center"} ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]" aria-hidden>
        <Sun
          strokeWidth={1.5}
          className="absolute inset-0 h-full w-full transition-all duration-500 [transition-timing-function:var(--ease-out)] dark:rotate-90 dark:scale-0 dark:opacity-0"
        />
        <Moon
          strokeWidth={1.5}
          className="absolute inset-0 h-full w-full -rotate-90 scale-0 opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out)] dark:rotate-0 dark:scale-100 dark:opacity-100"
        />
      </span>
      {showLabel && (
        <span className="t-label">
          <span className="dark:hidden">Light — paper &amp; ink</span>
          <span className="hidden dark:inline">Dark — night sketchbook</span>
        </span>
      )}
    </button>
  );
}
