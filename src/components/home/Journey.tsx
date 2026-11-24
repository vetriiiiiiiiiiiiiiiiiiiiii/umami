"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Photo } from "@/components/ui/Photo";
import { prefersReducedMotion } from "@/lib/motion";
import type { ImageKey } from "@/content/images";

const stages: { n: string; key: string; label: string; title: string; serif: string; body: string; items: string[]; image: ImageKey; href: string }[] = [
  {
    n: "01",
    key: "concept",
    label: "The Lab",
    title: "Concept",
    serif: "ingredients become a formula",
    body: "Recipes are developed against taste, texture, cost and shelf life — and against the realities of the line they will run on.",
    items: [
      "Product formulation", "Recipe development", "New product strategy", "Ingredient selection", "Prototype development",
      "Taste & texture optimisation", "Shelf-life research", "Product benchmarking", "Clean-label reformulation",
      "Nutrition enhancement", "Technology transfer",
    ],
    image: "spicesDark",
    href: "/services/product-development",
  },
  {
    n: "02",
    key: "compliant",
    label: "The Standard",
    title: "Compliant",
    serif: "a formula becomes a product",
    body: "Category, label, claims and testing are reviewed alongside development, so the product you finish is one you can register and sell.",
    items: [
      "FSSAI licensing & registration", "Product classification", "Label review", "Regulatory guidance", "Food safety systems",
      "Nutrition declaration", "Claims review", "Testing coordination", "Legal Metrology", "Export compliance",
    ],
    image: "labGlass",
    href: "/services/regulatory-compliance",
  },
  {
    n: "03",
    key: "commercial",
    label: "The Factory",
    title: "Commercial",
    serif: "a product becomes production",
    body: "Layouts, equipment, utilities and trials — or the right manufacturing partner — so the product scales without losing what makes it good.",
    items: [
      "Plant layout", "Process flow", "Equipment selection", "Project reports", "Utilities planning", "Commissioning",
      "Production planning", "Capacity optimisation", "Manufacturing trials", "Scale-up",
    ],
    image: "processPlant",
    href: "/services/plant-setup",
  },
];

/* 24 particles: scattered ingredients → formula grid → production line */
const N = 24;
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 91.7 + k * 13.1) * 43758.5453;
  return x - Math.floor(x);
};
const r1 = (v: number) => Math.round(v * 10) / 10;
const scattered = Array.from({ length: N }, (_, i) => [r1(20 + rand(i, 1) * 160), r1(20 + rand(i, 2) * 160)]);
const grid = Array.from({ length: N }, (_, i) => [55 + (i % 6) * 18, 62 + Math.floor(i / 6) * 18]);
const line = Array.from({ length: N }, (_, i) => [-10 + i * 10, 140]);

function Glyph() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <g className="g-frame" opacity="0">
        <rect x="40" y="44" width="120" height="96" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="56" x2="160" y2="56" stroke="currentColor" strokeWidth="1" />
      </g>
      <g className="g-belt" opacity="0">
        <line x1="0" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={i * 20} cy="156" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
      </g>
      {scattered.map(([x, y], i) => (
        <circle
          key={i}
          className="g-dot"
          data-i={i}
          cx={x}
          cy={y}
          r={i % 5 === 0 ? 4 : 2.6}
          fill={i % 4 === 0 ? "var(--color-accent-2)" : i % 3 === 0 ? "var(--color-accent)" : "currentColor"}
        />
      ))}
    </svg>
  );
}

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dots = q(".g-dot");
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      // progress line
      tl.fromTo(q(".j-progress"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 3 }, 0);
      // stage 1 → 2
      tl.to(q(".j-img-1"), { clipPath: "inset(0% 0 0 0)", duration: 0.6 }, 0.9)
        .to(q(".j-panel-0"), { autoAlpha: 0, y: -30, duration: 0.3 }, 0.85)
        .fromTo(q(".j-panel-1"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 1.05)
        .to(q(".g-frame"), { opacity: 1, duration: 0.3 }, 0.95);
      dots.forEach((d, i) => tl.to(d, { attr: { cx: grid[i][0], cy: grid[i][1] }, duration: 0.6 }, 0.85 + i * 0.004));
      // stage 2 → 3
      tl.to(q(".j-img-2"), { clipPath: "inset(0% 0 0 0)", duration: 0.6 }, 1.9)
        .to(q(".j-panel-1"), { autoAlpha: 0, y: -30, duration: 0.3 }, 1.85)
        .fromTo(q(".j-panel-2"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 2.05)
        .to(q(".g-frame"), { opacity: 0, duration: 0.3 }, 1.95)
        .to(q(".g-belt"), { opacity: 1, duration: 0.3 }, 2.0);
      dots.forEach((d, i) => tl.to(d, { attr: { cx: line[i][0] + 10, cy: line[i][1] }, duration: 0.6 }, 1.85 + i * 0.006));
      tl.to(dots, { attr: { cx: "+=40" }, duration: 0.9, ease: "none" }, 2.5);

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        animation: tl,
        onUpdate: (self) => setCurrent(self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="journey-title" className="j-section deep grain relative lg:h-[400vh]">
      {/* ── desktop: pinned narrative ── */}
      <div className="j-desktop hidden lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col">
        <div className="wrap relative z-10 flex flex-1 flex-col pb-10 pt-[calc(var(--nav-h)+2rem)]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 id="journey-title" className="t-h3 max-w-[24ch]">
                Concept <span className="text-lime">→</span> Compliant <span className="text-lime">→</span> Commercial
              </h2>
            </div>
            <p className="t-label text-band-muted">
              Stage {stages[current].n} / 03
            </p>
          </div>

          {/* progress line with stage nodes */}
          <div className="relative mt-8 h-px bg-[var(--color-border)]">
            <div className="j-progress absolute inset-0 origin-left bg-lime" style={{ transform: "scaleX(0)" }} />
            {stages.map((s, i) => (
              <div key={s.key} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(i / 2) * 100}%` }}>
                <span
                  className={`block h-3 w-3 -translate-x-1/2 rounded-full border transition-colors duration-500 ${
                    i <= current ? "border-lime bg-lime" : "border-[var(--color-border-strong)] bg-band"
                  }`}
                />
                <span className={`t-label absolute top-5 whitespace-nowrap ${i === 0 ? "left-0" : i === 2 ? "right-0" : "-translate-x-1/2"} ${i <= current ? "text-band-ink" : "text-band-muted"}`}>
                  {s.n} {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[7vh] grid min-h-0 flex-1 grid-cols-12 gap-8">
            {/* text panels */}
            <div className="relative col-span-5 grid">
              {stages.map((s, i) => (
                <div key={s.key} className={`j-panel-${i} [grid-area:1/1]`} style={i ? { opacity: 0, visibility: "hidden" } : undefined}>
                  <p className="text-[clamp(3rem,min(9vw,13vh),9rem)] font-medium leading-[0.8] tracking-[-0.06em] text-lime">{s.n}</p>
                  <h3 className="mt-[3vh] text-[clamp(2rem,min(4.4vw,6.5vh),4.4rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                    {s.title}
                    <span className="t-serif block text-[0.55em] text-band-muted">{s.serif}</span>
                  </h3>
                  <p className="mt-5 max-w-[44ch] text-band-muted">{s.body}</p>
                  <ul className="mt-[3vh] grid max-w-[520px] grid-cols-2 gap-x-6 border-t border-rule [@media(max-height:760px)]:hidden">
                    {s.items.map((it) => (
                      <li key={it} className="border-b border-rule py-[0.9vh] text-[0.85rem]">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="t-label mt-6 inline-flex items-center gap-2 text-lime">
                    <span className="link-u">Explore {s.title.toLowerCase()} services</span> <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* image stack */}
            <div className="relative col-span-7 overflow-hidden">
              {stages.map((s, i) => (
                <div
                  key={s.key}
                  className={`j-img-${i} absolute inset-0`}
                  style={{ clipPath: i ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)", zIndex: i }}
                >
                  <Photo name={s.image} sizes="60vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-0 left-0 z-10 aspect-square w-[34%] max-w-[230px] bg-band p-4 text-band-ink">
                <Glyph />
              </div>
              <p className="t-label absolute bottom-4 right-4 z-10 text-white/85">
                {current === 0 ? "Ingredients → formula" : current === 1 ? "Formula → packaged product" : "Product → production line"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── mobile / tablet: stacked stages ── */}
      <div className="j-mobile wrap relative z-10 py-24 lg:hidden">
        <p className="t-label mb-4 text-band-muted">02 — The journey</p>
        <h2 className="t-h2">
          Concept <span className="text-lime">→</span> Compliant <span className="text-lime">→</span> Commercial
        </h2>
        <ol className="mt-12 space-y-16 border-l border-[var(--color-border-strong)] pl-6">
          {stages.map((s) => (
            <li key={s.key} className="relative">
              <span aria-hidden className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-lime" />
              <p className="t-label text-band-muted">
                {s.n} — {s.label}
              </p>
              <h3 className="t-h3 mt-2">
                {s.title} <span className="t-serif text-band-muted">— {s.serif}</span>
              </h3>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden" data-reveal="image">
                <Photo name={s.image} sizes="100vw" />
              </div>
              <p className="mt-5 text-band-muted">{s.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="border border-rule px-2.5 py-1 text-[0.82rem]">
                    {it}
                  </li>
                ))}
              </ul>
              <Link href={s.href} className="t-label mt-5 inline-flex items-center gap-2 text-lime">
                <span className="link-u">Explore {s.title.toLowerCase()} services</span> <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}

export function JourneyCta() {
  return (
    <section className="deep relative overflow-hidden border-t border-rule">
      <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
        <h2 className="t-display md:col-span-9" data-reveal="lines">
          <span className="mask-line" style={{ ["--i" as string]: 0 }}>
            <span>YOUR IDEA.</span>
          </span>
          <span className="mask-line" style={{ ["--i" as string]: 1 }}>
            <span>
              READY FOR <span className="t-serif text-lime">the</span>
            </span>
          </span>
          <span className="mask-line" style={{ ["--i" as string]: 2 }}>
            <span>REAL WORLD.</span>
          </span>
        </h2>
        <div className="md:col-span-3 md:justify-self-end" data-reveal="fade">
          <Link href="/contact" className="cta cta--accent">
            <span>Start your journey</span>
            <span aria-hidden className="cta-arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
