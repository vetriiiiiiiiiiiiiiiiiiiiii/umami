"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { onSiteReady, prefersReducedMotion } from "@/lib/motion";
import { Photo } from "@/components/ui/Photo";
import type { SceneState } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const STAGES = ["Ingredient", "Formula", "Compliant", "Production"];
const DWELL = 4800;

const SERVICES = [
  { label: "Product formulation", href: "/services/product-development" },
  { label: "FSSAI & compliance", href: "/services/regulatory-compliance" },
  { label: "Plant setup", href: "/services/plant-setup" },
  { label: "Manufacturing partners", href: "/manufacturing" },
  { label: "Branding & marketing", href: "/marketing" },
];

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const state = useRef<SceneState>({ scroll: 0, reduced: false });
  const [gl, setGl] = useState<"pending" | "yes" | "no">("pending");
  const [active, setActive] = useState(true);
  const [lite, setLite] = useState(false);
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const resumeAt = useRef(0);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    state.current.reduced = reduced;
    // browser-only capabilities
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLite(window.matchMedia("(max-width: 767px), (pointer: coarse)").matches);
    setGl(supportsWebGL() ? "yes" : "no");
    if (reduced) setStage(2);
    return onSiteReady(() => {
      if (!reduced) window.setTimeout(() => setRunning(true), 900);
    });
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !active) return;
    const wait = Math.max(DWELL, resumeAt.current - Date.now());
    const id = window.setTimeout(() => setStage((s) => (s + 1) % STAGES.length), wait);
    return () => window.clearTimeout(id);
  }, [stage, running, active]);

  const pick = useCallback((i: number) => {
    resumeAt.current = Date.now() + 8000;
    setStage(i);
  }, []);

  // short, calm entrance
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.set(q("[data-h]"), { opacity: 1 });
      gsap.set(q("[data-h='line'] > span"), { yPercent: 110 });
      gsap.set(q("[data-h='fade']"), { opacity: 0, y: 14 });
      gsap.set(q("[data-h='visual']"), { opacity: 0 });
    }, el);
    const off = onSiteReady(() =>
      ctx.add(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q("[data-h='line'] > span"), { yPercent: 0, duration: 1, stagger: 0.07 }, 0)
          .to(q("[data-h='fade']"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.3)
          .to(q("[data-h='visual']"), { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.2);
      }),
    );
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} data-hero aria-labelledby="hero-title" className="relative overflow-hidden pt-[var(--nav-h)]">
      <div className="wrap grid items-center gap-8 pb-14 pt-8 md:pt-14 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-6">
        {/* message */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <p data-h="fade" className="t-label flex items-center gap-2 text-muted">
            <span aria-hidden className="h-2 w-2 rounded-full bg-lime ring-1 ring-forest/30" />
            Food product consultancy
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.4rem,5.4vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.04em]"
            aria-label="From first formulation to full-scale production."
          >
            {[["From first formulation"], ["to ", "full-scale"], ["production."]].map((line, i) => (
              <span key={i} data-h="line" className="mask-line" aria-hidden>
                <span>
                  {line.map((seg, j) =>
                    seg === "full-scale" ? (
                      <span key={j} className="t-serif text-forest dark:text-lime">
                        full-scale
                      </span>
                    ) : (
                      <span key={j}>{seg}</span>
                    ),
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p data-h="fade" className="mt-6 max-w-[48ch] text-[1.1rem] leading-relaxed text-muted">
            We help food founders and brands develop products, get them compliant and get them made — with one team handling
            recipe, regulation, factory and launch.
          </p>
          <div data-h="fade" className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="cta cta--accent">
              <span>Start a project</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
            <Link href="/services" className="cta cta--ghost">
              <span>Our services</span>
              <span aria-hidden className="cta-arrow">→</span>
            </Link>
          </div>
          <ul data-h="fade" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-5" aria-label="Core services">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="link-u text-[0.92rem] text-ink">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* visual: the journey in particles, with a plain caption */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <div data-h="visual" aria-hidden className="relative h-[36svh] min-h-[250px] md:h-[46svh] lg:h-[58svh]">
            {gl === "yes" && <HeroScene state={state} stage={stage} active={active} lite={lite} />}
            {gl === "no" && (
              <div className="absolute inset-[8%] overflow-hidden rounded-full">
                <Photo name="spicesFlat" sizes="50vw" decorative />
              </div>
            )}
          </div>
          <ol data-h="fade" className="mx-auto mt-2 grid max-w-[520px] grid-cols-4 gap-2" aria-label="How a product comes together">
            {STAGES.map((s, i) => (
              <li key={s}>
                <button type="button" onClick={() => pick(i)} aria-pressed={i === stage} className="group min-h-11 w-full text-left">
                  <span className="relative block h-[2px] overflow-hidden bg-rule">
                    <span
                      className={`absolute inset-0 origin-left bg-terra transition-transform duration-500 dark:bg-lime ${
                        i === stage ? "scale-x-100" : i < stage ? "scale-x-100 opacity-30" : "scale-x-0"
                      }`}
                    />
                  </span>
                  <span className={`t-label mt-2 block transition-colors ${i === stage ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                    0{i + 1} <span className="hidden sm:inline">{s}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
