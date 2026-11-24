"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { serviceGroups, hrefFor, titleFor, categories, featureServices } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { EASE_OUT } from "@/lib/motion";

const summaryFor = (slug: string) =>
  categories.find((c) => c.slug === slug)?.summary ?? featureServices.find((f) => f.slug === slug)?.summary ?? "";

const numberFor = (slug: string) =>
  categories.find((c) => c.slug === slug)?.n ?? featureServices.find((f) => f.slug === slug)?.n ?? "";

export function MegaMenu({ onClose, onEnter }: { onClose: (focusTrigger?: boolean) => void; onEnter: () => void }) {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const group = serviceGroups[active];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onGroupKey = (e: React.KeyboardEvent, i: number) => {
    const btns = Array.from(panel.current?.querySelectorAll<HTMLElement>("[data-group]") ?? []);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = (i + (e.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length;
      setActive(n);
      btns[n]?.focus();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      panel.current?.querySelector<HTMLElement>("[data-svc]")?.focus();
    }
  };

  return (
    <motion.div
      id="mega-menu"
      ref={panel}
      role="region"
      aria-label="Services"
      onMouseEnter={onEnter}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="absolute inset-x-0 top-full hidden border-b border-rule bg-canvas lg:block"
    >
      <div className="wrap grid grid-cols-12 gap-8 py-10">
        {/* categories */}
        <div className="col-span-3 border-r border-rule pr-8">
          <p className="t-label mb-6 text-muted">Capabilities / 17</p>
          <ul className="space-y-1">
            {serviceGroups.map((g, i) => (
              <li key={g.label}>
                <button
                  type="button"
                  data-group
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onGroupKey(e, i)}
                  aria-current={i === active}
                  className={`group relative flex w-full items-baseline gap-4 py-2.5 text-left transition-colors ${i === active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  <span className="t-label w-6">{g.n}</span>
                  <span className="text-[2rem] font-medium leading-none tracking-[-0.04em]">{g.label}</span>
                  {i === active && (
                    <motion.span
                      layoutId="mega-indicator"
                      className="absolute -right-8 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-lime ring-4 ring-canvas"
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <Link href="/services" className="t-label mt-8 inline-flex items-center gap-2 text-ink" onClick={() => onClose()}>
            <span className="link-u">All services</span> <span aria-hidden>→</span>
          </Link>
        </div>

        {/* links */}
        <div className="col-span-5">
          <AnimatePresence mode="wait">
            <motion.ul
              key={group.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="divide-y divide-rule border-y border-rule"
            >
              {group.items.map((slug) => (
                <li key={slug}>
                  <Link
                    href={hrefFor(slug)}
                    data-svc
                    onClick={() => onClose()}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-4 focus-visible:outline-offset-0"
                  >
                    <span className="t-label text-muted">{numberFor(slug)}</span>
                    <span>
                      <span className="block text-[1.15rem] tracking-[-0.015em] text-ink">{titleFor(slug)}</span>
                      <span className="mt-1 block max-w-[46ch] text-[0.85rem] leading-snug text-muted">{summaryFor(slug)}</span>
                    </span>
                    <span aria-hidden className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* visual */}
        <div className="col-span-4">
          <div className="relative aspect-[4/3] overflow-hidden bg-panel">
            <AnimatePresence initial={false}>
              <motion.div
                key={group.image}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                <Photo name={group.image} sizes="30vw" />
              </motion.div>
            </AnimatePresence>
            <span className="t-label absolute left-3 top-3 z-10 bg-canvas/85 px-2 py-1 text-ink">
              {group.n} / {group.label}
            </span>
          </div>
          <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-snug text-muted">{group.blurb}</p>
          <Link href="/contact" onClick={() => onClose()} className="cta cta--accent mt-5 !min-h-11">
            <span>Start a project</span>
            <span aria-hidden className="cta-arrow">↗</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
