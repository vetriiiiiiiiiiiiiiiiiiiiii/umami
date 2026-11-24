"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onSiteReady } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global motion runtime:
 * - The [data-reveal] observer used by server-rendered sections
 */
export function MotionRoot() {
  const pathname = usePathname();

  // Reveal observer — re-scans on each route change
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const off = onSiteReady(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
      if (!document.documentElement.classList.contains("motion")) {
        els.forEach((el) => el.setAttribute("data-in", ""));
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.setAttribute("data-in", "");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      els.forEach((el) => io!.observe(el));
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      off();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
