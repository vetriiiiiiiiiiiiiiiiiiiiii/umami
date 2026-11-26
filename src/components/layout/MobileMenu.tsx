"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { primaryNav, site } from "@/content/site";
import { serviceGroups, hrefFor, titleFor } from "@/content/services";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/ui/Sketch";
import { EASE_OUT } from "@/lib/motion";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose]);

  const item = (i: number) => ({
    initial: { y: "110%" },
    animate: { y: 0 },
    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.15 + i * 0.05 },
  });

  return (
    <motion.div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="deep grain fixed inset-0 z-[60] flex flex-col overflow-y-auto xl:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="wrap relative z-10 flex h-[var(--nav-h)] shrink-0 items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center" aria-label="The Umami Labs — home">
          <Logo size="md" onDark />
        </Link>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 items-center gap-3">
          <span className="t-label">Close</span>
          <span aria-hidden className="relative block h-5 w-5">
            <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="wrap relative z-10 flex-1 pb-10 pt-6">
        <ul className="border-t border-rule">
          {primaryNav.map((n, i) => (
            <li key={n.href} className="overflow-hidden border-b border-rule">
              <motion.div {...item(i)}>
                {"mega" in n && n.mega ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={svcOpen}
                      onClick={() => setSvcOpen((v) => !v)}
                      className="flex w-full items-baseline justify-between py-4 text-left"
                    >
                      <span className="text-[clamp(2rem,9vw,3.2rem)] font-medium leading-none tracking-[-0.045em]">{n.label}</span>
                      <span aria-hidden className={`t-label transition-transform ${svcOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {svcOpen && (
                      <div className="grid gap-6 pb-6 sm:grid-cols-2">
                        {serviceGroups.map((g) => (
                          <div key={g.label}>
                            <p className="t-label mb-2 text-band-muted">
                              {g.n} — {g.label}
                            </p>
                            <ul className="space-y-1.5">
                              {g.items.map((s) => (
                                <li key={s}>
                                  <Link href={hrefFor(s)} onClick={onClose} className="block py-1 text-[1.02rem]">
                                    {titleFor(s)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href="/services" onClick={onClose} className="t-label text-lime">
                          All services →
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={n.href} onClick={onClose} className="flex items-baseline justify-between py-4">
                    <span className="text-[clamp(2rem,9vw,3.2rem)] font-medium leading-none tracking-[-0.045em]">{n.label}</span>
                    <span className="t-label text-band-muted">0{i + 1}</span>
                  </Link>
                )}
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.div
          className="mt-10 flex flex-col gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
        >
          <Link href="/contact" onClick={onClose} className="cta cta--accent w-full justify-between">
            <span>Start a project</span>
            <span aria-hidden className="cta-arrow">↗</span>
          </Link>
          <div className="flex items-center justify-between border-t border-rule pt-4">
            <ThemeToggle showLabel />
            {site.email && (
              <a href={`mailto:${site.email}`} className="t-label text-band-muted">
                {site.email}
              </a>
            )}
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}
