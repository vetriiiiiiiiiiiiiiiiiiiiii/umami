"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";

export type HoverItem = { n: string; title: string; summary: string; href: string; image: ImageKey };

/** Editorial service index with a cursor-following image preview on fine pointers. */
export function HoverList({ items }: { items: HoverItem[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelAnimationFrame(raf.current);
    const { clientX: x, clientY: y } = e;
    raf.current = requestAnimationFrame(() => {
      if (preview.current) preview.current.style.transform = `translate3d(${x + 28}px, ${y - 120}px, 0)`;
    });
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative">
      <ul className="border-t border-rule-strong">
        {items.map((it, i) => (
          <li key={it.href} onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}>
            <Link
              href={it.href}
              className={`group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-rule py-5 transition-colors md:grid-cols-[4rem_1.2fr_1fr_2rem] ${
                hover !== null && hover !== i ? "md:text-muted" : ""
              }`}
            >
              <span className="t-label text-muted">{it.n}</span>
              <span className="text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-3">
                {it.title}
              </span>
              <span className="col-start-2 mt-2 max-w-[48ch] text-[0.95rem] text-muted md:col-start-3 md:mt-0">{it.summary}</span>
              <span aria-hidden className="hidden text-right transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[240px] w-[190px] overflow-hidden motion-safe:[@media(hover:hover)]:block"
        style={{ opacity: hover === null ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        {items.map((it, i) => (
          <div key={it.href} className="absolute inset-0 transition-[clip-path] duration-500 [transition-timing-function:var(--ease-out)]" style={{ clipPath: hover === i ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}>
            <Photo name={it.image} sizes="200px" decorative />
          </div>
        ))}
      </div>
    </div>
  );
}
