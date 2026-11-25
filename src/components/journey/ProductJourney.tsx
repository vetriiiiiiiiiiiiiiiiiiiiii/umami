"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, stages, type ProductKind } from "@/content/journey";
import { Product, Scene } from "./Scenes";
import { EASE_OUT, prefersReducedMotion } from "@/lib/motion";

const AUTO_MS = 4200;

export function ProductJourney({ headingLevel = "h2", compact = false }: { headingLevel?: "h1" | "h2"; compact?: boolean }) {
  const [kind, setKind] = useState<ProductKind>("bar");
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLElement>(null);
  const product = products.find((p) => p.kind === kind)!;
  const s = stages[stage];
  const Heading = headingLevel;

  const go = useCallback((i: number) => setStage(Math.max(0, Math.min(stages.length - 1, i))), []);

  // play the journey: advance through the stages, stop at the shelf
  useEffect(() => {
    if (!playing) return;
    if (stage >= stages.length - 1) {
      const t = window.setTimeout(() => setPlaying(false), AUTO_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStage((v) => v + 1), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [playing, stage]);

  const play = () => {
    if (prefersReducedMotion()) return go(stages.length - 1);
    if (stage >= stages.length - 1) setStage(0);
    setPlaying((v) => !v);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPlaying(false);
      go(stage + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPlaying(false);
      go(stage - 1);
    }
  };

  return (
    <section ref={root} id="journey" aria-labelledby="journey-heading" className={`relative scroll-mt-20 ${compact ? "section" : "pb-24"}`}>
      <div className="wrap">
        {/* heading + product picker */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="t-hand text-[1.3rem] text-terra">follow one product, start to finish —</p>
            <Heading id="journey-heading" className={headingLevel === "h1" ? "t-h1 mt-2" : "t-h2 mt-2"}>
              From formulation <span className="t-serif">to shelf.</span>
            </Heading>
            <p className="mt-4 max-w-[52ch] text-muted">
              Pick a product and walk it through every stage we handle — what happens, what gets decided and what you receive.
            </p>
          </div>
          <div className="lg:col-span-6">
            <p className="t-label mb-3 text-muted" id="product-picker">
              Choose an example product
            </p>
            <div role="radiogroup" aria-labelledby="product-picker" className="grid grid-cols-3 gap-3">
              {products.map((p) => (
                <button
                  key={p.kind}
                  type="button"
                  role="radio"
                  aria-checked={kind === p.kind}
                  onClick={() => {
                    setKind(p.kind);
                    setPlaying(false);
                  }}
                  className={`sketch-soft group flex flex-col items-center gap-1 px-2 pb-3 pt-2 text-center transition-all ${
                    kind === p.kind ? "!border-ink bg-raised shadow-[3px_3px_0_var(--color-text-primary)]" : "hover:border-ink"
                  }`}
                >
                  <svg viewBox="-150 -125 300 250" className="h-16 w-full" aria-hidden>
                    <Product kind={p.kind} x={0} y={0} s={p.kind === "bar" ? 0.95 : 0.95} state="labelled" colors={p.colors} />
                  </svg>
                  <span className="text-[0.9rem] font-bold leading-tight">{p.short}</span>
                  <span className="hidden text-[0.75rem] text-muted sm:block">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* stage view */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12" onKeyDown={onKey}>
          <div className="lg:col-span-7">
            <div className="sketch-card relative overflow-hidden bg-raised">
              <span className="t-hand pointer-events-none absolute left-4 top-1 z-10 text-[3.4rem] leading-none text-terra" aria-hidden>
                {s.n}
              </span>
              <span className="t-label absolute right-4 top-4 z-10 text-muted">
                {product.name} · stage {s.n} of {stages.length}
              </span>
              <div className="relative aspect-[3/2]">
                <AnimatePresence mode="wait">
                  <motion.svg
                    key={`${kind}-${stage}`}
                    viewBox="0 0 600 400"
                    className="absolute inset-0 h-full w-full"
                    role="img"
                    aria-label={`${product.name} at the ${s.title.toLowerCase()} stage: ${product.notes[stage]}`}
                    initial={{ opacity: 0, scale: 0.96, rotate: -0.6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <Scene stage={stage} product={product} />
                  </motion.svg>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${kind}-${stage}-text`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <p className="t-label text-muted">
                  Stage {s.n} · {s.title}
                </p>
                <h3 className="t-h3 mt-2">{s.title}</h3>
                <p className="t-hand mt-3 text-[1.45rem] leading-tight text-terra">“{product.notes[stage]}”</p>
                <p className="mt-4 text-muted">{s.happens}</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="t-label text-ink">What gets decided</p>
                    <ul className="mt-2 space-y-1 text-[0.95rem]">
                      {s.decisions.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span aria-hidden className="text-terra">→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="t-label text-ink">What you get</p>
                    <ul className="mt-2 space-y-1 text-[0.95rem]">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span aria-hidden className="text-forest">✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href={s.service.href} className="t-label link-u mt-5 inline-block text-ink">
                  {s.service.label} →
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <button type="button" onClick={() => { setPlaying(false); go(stage - 1); }} disabled={stage === 0} className="cta cta--ghost !min-h-11 !px-4 disabled:pointer-events-none disabled:opacity-40" aria-label="Previous stage">
                <span aria-hidden>←</span>
              </button>
              <button type="button" onClick={() => { setPlaying(false); go(stage + 1); }} disabled={stage === stages.length - 1} className="cta !min-h-11" aria-label="Next stage">
                <span>Next stage</span>
                <span aria-hidden className="cta-arrow">→</span>
              </button>
              <button type="button" onClick={play} aria-pressed={playing} className="t-label link-u ml-1 text-ink">
                {playing ? "❚❚ Pause" : stage >= stages.length - 1 ? "↺ Play again" : "▶ Play the journey"}
              </button>
            </div>
          </div>
        </div>

        {/* stage track */}
        <nav aria-label="Journey stages" className="mt-10">
          <ol className="relative grid grid-cols-8 gap-1">
            <svg aria-hidden viewBox="0 0 800 12" preserveAspectRatio="none" className="absolute left-[6%] right-[6%] top-[14px] h-3 w-[88%] overflow-visible">
              <path d="M0 6 C 100 1, 200 11, 300 6 S 500 1, 600 6 S 760 10, 800 6" fill="none" stroke="var(--color-border-strong)" strokeWidth="2" filter="url(#ink)" />
              <path
                d="M0 6 C 100 1, 200 11, 300 6 S 500 1, 600 6 S 760 10, 800 6"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="4"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 - stage / (stages.length - 1), transition: "stroke-dashoffset 600ms var(--ease-out)" }}
                filter="url(#ink)"
              />
            </svg>
            {stages.map((st, i) => (
              <li key={st.id} className="relative flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    go(i);
                  }}
                  aria-current={i === stage ? "step" : undefined}
                  aria-label={`Stage ${st.n}: ${st.title}`}
                  className="group flex min-h-11 flex-col items-center gap-1.5"
                >
                  <span
                    className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border-2 text-[0.8rem] font-extrabold transition-all ${
                      i === stage
                        ? "scale-110 border-ink bg-forest text-canvas shadow-[2px_2px_0_var(--color-text-primary)]"
                        : i < stage
                          ? "border-ink bg-lime text-lime-ink"
                          : "border-rule-strong bg-canvas text-muted group-hover:border-ink"
                    }`}
                  >
                    {st.n}
                  </span>
                  <span className={`hidden text-[0.78rem] font-bold sm:block ${i === stage ? "text-ink" : "text-muted"}`}>{st.short}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <p className="mt-6 text-center text-[0.8rem] text-muted">
          Illustrative examples — recipes and details are indicative, not client data.
        </p>
      </div>
    </section>
  );
}
