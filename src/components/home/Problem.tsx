"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

const providers = [
  { label: "Formulation", s: [230, 92] },
  { label: "Compliance", s: [372, 196] },
  { label: "Costing", s: [530, 104] },
  { label: "Plant design", s: [262, 430] },
  { label: "Machinery", s: [470, 482] },
  { label: "Manufacturing", s: [640, 360] },
  { label: "Branding", s: [705, 178] },
];
const IDEA: [number, number] = [56, 280];
const MARKET: [number, number] = [846, 280];
const endX = (i: number) => 175 + i * 95;

const breaks = [
  { from: 0, to: 3, note: "incompatible with process" },
  { from: 1, to: 6, note: "claims rework" },
  { from: 2, to: 5, note: "delay" },
  { from: 4, to: 5, note: "who owns this?" },
];

const curve = (a: number[], b: number[]) => {
  const mx = (a[0] + b[0]) / 2;
  return `M${a[0]},${a[1]} C${mx},${a[1]} ${mx},${b[1]} ${b[0]},${b[1]}`;
};

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const build = () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.fromTo(q(".brk"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.12 }, 0.1)
        .to(q(".frag, .brk"), { opacity: 0, duration: 0.8 }, 1.6);
      providers.forEach((p, i) => {
        tl.to(q(`[data-node="${i}"]`), { x: endX(i) - p.s[0], y: IDEA[1] - p.s[1], duration: 1.2, ease: "power3.inOut" }, 1.6 + i * 0.04);
      });
      tl.fromTo(q(".band"), { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 1, transformOrigin: "50% 50%" }, 2.1)
        .fromTo(q(".merged"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2 }, 2.2)
        .to(q(".node-dot"), { fill: "var(--color-accent)", duration: 0.4, stagger: 0.05 }, 2.6)
        .fromTo(q(".swap-a"), { opacity: 1, y: 0 }, { opacity: 0, y: -16, duration: 0.5 }, 2.3)
        .fromTo(q(".swap-b"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 2.7)
        .to({}, { duration: 0.6 });
      return tl;
    };

    if (prefersReducedMotion()) {
      const tl = build();
      tl.progress(1).pause();
      return () => tl.kill();
    }

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const tl = build();
      ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, animation: tl });
    });
    mm.add("(max-width: 899px)", () => {
      const tl = build();
      tl.pause();
      ScrollTrigger.create({ trigger: q(".diagram")[0], start: "top 75%", end: "bottom 20%", scrub: 0.6, animation: tl });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="problem-title" className="j-section relative min-[900px]:h-[260vh]">
      <div className="min-[900px]:sticky min-[900px]:top-0 min-[900px]:flex min-[900px]:h-[100svh] min-[900px]:items-center">
        <div className="wrap grid gap-10 py-24 min-[900px]:grid-cols-12 min-[900px]:py-0">
          <div className="relative min-[900px]:col-span-4">
            <div className="grid">
              <div className="swap-a [grid-area:1/1]">
                <h2 id="problem-title" className="text-balance text-[clamp(2rem,3.6vw,3.6rem)] font-medium leading-[1] tracking-[-0.035em]">
                  Food innovation is a connected process. So why is it usually <span className="t-serif">fragmented?</span>
                </h2>
                <p className="mt-6 max-w-[42ch] text-muted">
                  A founder may need separate consultants for formulation, compliance, plant design, machinery, costing,
                  manufacturing and branding. Each handoff adds delay, repeated work and unclear responsibility — and a recipe
                  that works in the lab can quietly conflict with the label or the line.
                </p>
              </div>
              <div className="swap-b pointer-events-none opacity-0 [grid-area:1/1]" aria-hidden="false">
                <p className="text-[clamp(2.4rem,4.4vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                  ONE TEAM.
                  <br />
                  THE ENTIRE <span className="t-serif">journey.</span>
                </p>
                <p className="mt-6 max-w-[42ch] text-muted">
                  We bring formulation, compliance, manufacturing feasibility, and commercial planning together from the
                  beginning — so your product is designed to work beyond the lab.
                </p>
              </div>
            </div>
          </div>

          <figure className="diagram relative min-[900px]:col-span-8">
            <svg viewBox="0 0 900 560" className="h-auto w-full overflow-visible" role="img" aria-labelledby="diagram-desc">
              <desc id="diagram-desc">
                Diagram: an idea connected to seven separate consultants by broken paths with handoffs, delays and rework, which
                then merge into one continuous Umami Labz pathway from idea to market.
              </desc>
              <defs>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--color-border-strong)" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="900" height="560" fill="url(#dots)" opacity="0.5" />

              {/* one-team band */}
              <g className="band" opacity="0">
                <rect x="128" y="226" width="660" height="108" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
                <text x="140" y="324" fill="var(--color-text-secondary)" fontSize="13" fontFamily="var(--ff-mono)" letterSpacing="0.1em">
                  UMAMI LABZ — ONE COORDINATED TEAM
                </text>
              </g>

              {/* fragmented paths */}
              {providers.map((p) => (
                <path
                  key={p.label}
                  className="frag"
                  d={curve(IDEA, p.s)}
                  pathLength={1}
                  fill="none"
                  stroke="var(--color-border-strong)"
                  strokeWidth="1.2"
                  strokeDasharray="6 7"
                />
              ))}
              {breaks.map((b) => {
                const a = providers[b.from].s;
                const c = providers[b.to].s;
                const mx = (a[0] + c[0]) / 2;
                const my = (a[1] + c[1]) / 2;
                return (
                  <g key={b.note} className="brk" opacity="0">
                    <line x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke="var(--color-accent-2)" strokeWidth="1" strokeDasharray="3 6" />
                    <rect x={mx - 7} y={my - 7} width="14" height="14" fill="var(--color-bg)" />
                    <path d={`M${mx - 4},${my - 4} L${mx + 4},${my + 4} M${mx + 4},${my - 4} L${mx - 4},${my + 4}`} stroke="var(--color-accent-2)" strokeWidth="1.4" />
                    <text x={mx + 12} y={my + 5} fontSize="14" fill="var(--color-accent-2)" fontFamily="var(--ff-mono)">
                      {b.note}
                    </text>
                  </g>
                );
              })}

              {/* merged pathway */}
              <path
                className="merged"
                d={`M${IDEA[0]},${IDEA[1]} L${MARKET[0]},${MARKET[1]}`}
                pathLength={1}
                fill="none"
                stroke="var(--color-text-primary)"
                strokeWidth="2.5"
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />

              {/* endpoints */}
              <g>
                <circle cx={IDEA[0]} cy={IDEA[1]} r="10" fill="var(--color-text-primary)" />
                <text x={IDEA[0]} y={IDEA[1] + 34} textAnchor="middle" fontSize="15" fontFamily="var(--ff-mono)" fill="var(--color-text-primary)">
                  YOUR IDEA
                </text>
                <rect x={MARKET[0] - 10} y={MARKET[1] - 10} width="20" height="20" fill="var(--color-accent-2)" />
                <text x={MARKET[0]} y={MARKET[1] + 34} textAnchor="middle" fontSize="15" fontFamily="var(--ff-mono)" fill="var(--color-text-primary)">
                  MARKET
                </text>
              </g>

              {/* provider nodes */}
              {providers.map((p, i) => (
                <g key={p.label} data-node={i}>
                  <circle
                    className="node-dot"
                    cx={p.s[0]}
                    cy={p.s[1]}
                    r="8"
                    fill="var(--color-bg)"
                    stroke="var(--color-text-primary)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={p.s[0]}
                    y={p.s[1] + (i % 2 ? 34 : -20)}
                    textAnchor="middle"
                    fontSize="15"
                    letterSpacing="0.08em"
                    fontFamily="var(--ff-mono)"
                    fill="var(--color-text-primary)"
                  >
                    {p.label.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
            <figcaption className="t-label mt-4 flex justify-between text-muted">
              <span>Fig. 01 — Handoffs vs. one pathway</span>
              <span className="hidden sm:inline">Scroll to merge</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
