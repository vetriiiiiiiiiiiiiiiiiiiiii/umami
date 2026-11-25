"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/ui/Sketch";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);


  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation (state adjusted during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(false);
    setMobile(false);
  }

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 180);
  }, []);
  const closeMega = useCallback((focusTrigger = false) => {
    setMega(false);
    if (focusTrigger) megaBtn.current?.focus();
  }, []);

  const solid = scrolled || mega;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${
          hidden && !mega && !mobile ? "-translate-y-full" : "translate-y-0"
        }`}
        onMouseLeave={scheduleClose}
      >
        <div
          className={`absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid ? "border-rule backdrop-blur-md" : "border-transparent"
          }`}
          style={{ background: solid ? "var(--nav-surface)" : "transparent" }}
        />
        <nav
          aria-label="Primary"
          className="nav-in wrap flex h-[var(--nav-h)] items-center justify-between gap-6"
        >
          <Link href="/" className="group flex items-center text-ink" aria-label="Umami Labz — home">
            <Logo size="md" className="transition-transform duration-300 group-hover:-rotate-2" />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {primaryNav.map((item) =>
              "mega" in item && item.mega ? (
                <li key={item.href} onMouseEnter={openMega}>
                  <button
                    ref={megaBtn}
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    onClick={() => setMega((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setMega(true);
                        window.setTimeout(() => document.querySelector<HTMLElement>("#mega-menu [data-group]")?.focus(), 50);
                      }
                    }}
                    className={`flex h-11 items-center gap-1.5 whitespace-nowrap px-2.5 text-[0.9rem] xl:px-3 ${isActive(item.href) || mega ? "text-ink" : "text-muted hover:text-ink"} transition-colors`}
                  >
                    {item.label}
                    <span aria-hidden className={`inline-block text-[0.7rem] transition-transform duration-300 ${mega ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </li>
              ) : (
                <li key={item.href} onMouseEnter={scheduleClose}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative flex h-11 items-center whitespace-nowrap px-2.5 text-[0.9rem] xl:px-3 transition-colors ${isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"}`}
                  >
                    {item.label}
                    {isActive(item.href) && <span aria-hidden className="absolute inset-x-2.5 bottom-2 h-px bg-current xl:inset-x-3" />}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1 sm:gap-3">
            <ThemeToggle />
            <Link href="/contact" className="cta max-md:!hidden !min-h-10 !px-4">
              <span>Start a project</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile(true)}
            >
              <span aria-hidden className="block w-6">
                <span className="block h-px w-6 bg-ink" />
                <span className="mt-[7px] block h-px w-4 bg-ink" />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mega && <MegaMenu onClose={closeMega} onEnter={openMega} />}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mega && (
          <motion.div
            key="scrim"
            aria-hidden
            className="fixed inset-0 z-40 hidden bg-[var(--color-overlay)] xl:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMega(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </>
  );
}
