"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = ["Idea", "Formula", "Industry"];
const MIN_MS = 600; // time for the line to read as a sequence
const MAX_MS = 2400; // never hold the visitor longer than this

/**
 * FORMULA 001 — first-visit loading sequence.
 * Progress reflects real milestones: app hydrated → fonts ready → page loaded
 * (and, on the home page, the hero visual initialised). Shown once per session.
 */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const done = () => {
      window.__umamiReady = true;
      window.dispatchEvent(new Event("umami:ready"));
    };
    if (root.classList.contains("no-loader") || !ref.current) {
      setGone(true);
      done();
      return;
    }
    root.style.overflow = "hidden";
    const start = performance.now();
    let finished = false;
    let reached = 1;
    setStep(1); // hydrated

    const finish = () => {
      if (finished) return;
      finished = true;
      setStep(3);
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(() => {
        ref.current?.classList.add("is-leaving");
        root.style.overflow = "";
        try {
          sessionStorage.setItem("umami-loaded", "1");
        } catch {}
        // hand over while the mask is still opening so the hero is already moving
        window.setTimeout(done, 250);
        window.setTimeout(() => setGone(true), 1150);
      }, wait + 250);
    };

    const advance = (n: number) => {
      if (n > reached) {
        reached = n;
        setStep(n);
      }
    };

    document.fonts?.ready.then(() => advance(2));

    const hasHero = !!document.querySelector("[data-hero]");
    let loaded = document.readyState === "complete";
    let heroReady = !hasHero;
    const check = () => {
      if (loaded && heroReady) finish();
    };
    const onLoad = () => {
      loaded = true;
      advance(2);
      check();
      // don't wait forever on the WebGL scene
      window.setTimeout(() => {
        heroReady = true;
        check();
      }, 700);
    };
    const onHero = () => {
      heroReady = true;
      check();
    };
    if (loaded) onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    window.addEventListener("umami:hero-ready", onHero, { once: true });
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("umami:hero-ready", onHero);
      window.clearTimeout(cap);
      root.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const p = step / 3;
  return (
    <div id="loader" ref={ref} role="status" aria-live="polite" aria-label="Loading Umami Labs" style={{ ["--p" as string]: p }}>
      <div className="ld-inner w-[min(560px,84vw)]">
        <div className="mb-10 flex items-baseline justify-between">
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-[#aab9a2]">FORMULA 001</span>
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-[#aab9a2]" aria-hidden>
            {String(step).padStart(2, "0")} / 03
          </span>
        </div>
        <p className="mb-10 text-center text-[clamp(2.2rem,7vw,3.6rem)] font-medium leading-none tracking-[-0.04em]">
          UMAMI <span className="font-serif font-normal italic tracking-[-0.02em]">Labs</span>
        </p>
        <div className="ld-line">
          <div className="ld-fill" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="ld-particle"
              style={{ animationDelay: `${i * 0.27}s`, ["--dy" as string]: `${(i % 2 ? 1 : -1) * (3 + i)}px` }}
            />
          ))}
          <div className="ld-head" />
        </div>
        <ol className="mt-5 grid grid-cols-3 font-mono text-[0.68rem] tracking-[0.16em]">
          {STAGES.map((s, i) => (
            <li key={s} className={`ld-stage ${step > i ? "on" : ""} ${i === 1 ? "text-center" : i === 2 ? "text-right" : ""}`}>
              0{i + 1} — {s.toUpperCase()}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
