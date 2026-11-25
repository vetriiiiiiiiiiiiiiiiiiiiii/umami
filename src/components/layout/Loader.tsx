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
    <div id="loader" ref={ref} role="status" aria-live="polite" aria-label="Loading Umami Labz" style={{ ["--p" as string]: p }}>
      <div className="ld-inner flex w-[min(460px,84vw)] flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/umami-labz-jar.png" alt="" width={760} height={604} className="ld-jar h-36 w-auto md:h-44" />
        <p className="t-inked mt-4 text-center font-[family-name:var(--ff-display)] text-[clamp(2.4rem,8vw,3.4rem)] font-extrabold leading-none tracking-[0.02em]">
          UMAMI
        </p>
        <p className="t-inked-rust mt-1 font-[family-name:var(--ff-display)] text-[1.5rem] font-extrabold tracking-[0.06em]">LABZ</p>
        <div className="ld-line mt-8 w-full">
          <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="absolute inset-x-0 -top-[7px] h-4 w-full overflow-visible">
            <path d="M2 9 C 60 3, 120 13, 200 8 S 340 4, 398 9" fill="none" stroke="var(--color-border-strong)" strokeWidth="2" strokeLinecap="round" filter="url(#ink)" />
            <path className="ld-draw" d="M2 9 C 60 3, 120 13, 200 8 S 340 4, 398 9" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" pathLength={1} filter="url(#ink)" />
          </svg>
        </div>
        <ol className="mt-4 grid w-full grid-cols-3 font-[family-name:var(--ff-hand)] text-[1.2rem]">
          {STAGES.map((s, i) => (
            <li key={s} className={`ld-stage ${step > i ? "on" : ""} ${i === 1 ? "text-center" : i === 2 ? "text-right" : ""}`}>
              {i + 1}. {s.toLowerCase()}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
