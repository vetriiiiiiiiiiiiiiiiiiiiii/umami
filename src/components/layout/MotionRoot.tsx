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
    let timer = 0;
    const start = () => {
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
    };
    // wait until the streamed page has hydrated before touching its DOM
    const onLoad = () => {
      timer = window.setTimeout(start, 60);
    };
    const off = onSiteReady(() => {
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    });
    return () => {
      off();
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
