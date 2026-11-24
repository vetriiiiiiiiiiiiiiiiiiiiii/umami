"use client";

import { scrollToTarget } from "@/lib/motion";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToTarget(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group t-label inline-flex h-11 items-center gap-2"
    >
      <span className="link-u">Back to top</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
    </button>
  );
}
