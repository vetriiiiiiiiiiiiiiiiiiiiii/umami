import type { CSSProperties, ReactNode } from "react";

/**
 * The Umami Labs drawing kit — everything that makes the site feel hand-made:
 * SVG filters (wobbly ink + watercolour bleed), washes, scribbles, arrows and
 * a small set of sketched icons. Pure SVG, no images, works in both themes.
 */

/** Mounted once in the root layout. */
export function SketchDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* wobbly ink line */}
        <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* watercolour bleed */}
        <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="28" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" result="b" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.2" result="holes" />
          <feComposite in="b" in2="holes" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

type WashTone = "green" | "blue" | "purple";

/** Watercolour stain. Position it absolutely behind content. */
export function Wash({ tone = "green", className = "", style, opacity = 0.55 }: { tone?: WashTone; className?: string; style?: CSSProperties; opacity?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 200 160" className={`pointer-events-none ${className}`} style={style} preserveAspectRatio="none">
      <g filter="url(#watercolor)" opacity={opacity}>
        <ellipse cx="100" cy="80" rx="78" ry="56" fill={`var(--wash-${tone})`} />
        <ellipse cx="72" cy="66" rx="40" ry="30" fill={`var(--wash-${tone})`} opacity="0.6" />
      </g>
    </svg>
  );
}

/** Scribbled underline; drawn on scroll via data-reveal="draw". */
export function Scribble({ className = "", color = "var(--color-accent)", draw = true }: { className?: string; color?: string; draw?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 240 22" preserveAspectRatio="none" className={`pointer-events-none overflow-visible ${className}`}>
      <path
        d="M4 14 C 40 4, 80 4, 120 11 S 200 19, 236 7"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#ink)"
        pathLength={1}
        className={draw ? "draw" : undefined}
        data-reveal={draw ? "draw" : undefined}
      />
    </svg>
  );
}

/** Hand-drawn wavy divider line */
export function Doodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 24" preserveAspectRatio="none" className={`h-6 w-full ${className}`}>
      <path
        d="M0 12 Q 50 2 100 12 T 200 12 T 300 12 T 400 12 T 500 12 T 600 12 T 700 12 T 800 12 T 900 12 T 1000 12 T 1100 12 T 1200 12"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        filter="url(#ink)"
      />
    </svg>
  );
}

/** Hand-drawn arrow, from bottom-left curving to the right. Flip with CSS transforms. */
export function Arrow({ className = "", style, d = "M6 50 C 30 20, 70 10, 110 22" }: { className?: string; style?: CSSProperties; d?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 60" className={`pointer-events-none overflow-visible ${className}`} style={style}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d={d} pathLength={1} className="draw" data-reveal="draw" />
        <path d="M98 12 L112 22 L97 30" />
      </g>
    </svg>
  );
}

/** Small handwritten note */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`t-hand block text-[clamp(1.1rem,1.6vw,1.6rem)] leading-[1] text-ink ${className}`}>{children}</span>;
}

/* ───────── sketched icons ───────── */

const paths: Record<string, ReactNode> = {
  flask: (
    <>
      <path d="M26 8h12M29 8v14L16 50c-1.6 3.4.6 6 4 6h24c3.4 0 5.6-2.6 4-6L35 22V8" />
      <path d="M20 42c6-3 10 3 16 0s8-2 10 0" />
      <circle cx="28" cy="34" r="1.6" />
      <circle cx="34" cy="28" r="1.2" />
    </>
  ),
  jar: (
    <>
      <path d="M20 10h24v6H20z" />
      <path d="M21 16c-4 3-5 6-5 10v22c0 4 3 7 7 7h18c4 0 7-3 7-7V26c0-4-1-7-5-10" />
      <path d="M18 30h28v14H18z" />
      <path d="M23 36h12M23 40h8" />
    </>
  ),
  check: (
    <>
      <path d="M18 10h28v44H18z" />
      <path d="M26 6h12v8H26z" />
      <path d="M24 32l6 6 12-14" />
    </>
  ),
  shield: (
    <>
      <path d="M32 6l20 8v14c0 14-9 22-20 28C21 50 12 42 12 28V14z" />
      <path d="M23 31l6 6 12-13" />
    </>
  ),
  factory: (
    <>
      <path d="M8 54V30l12 8v-8l12 8v-8l12 8V12h8v42z" />
      <path d="M8 54h48" />
      <path d="M16 46h6M28 46h6M40 46h6" />
      <path d="M48 8c2-2 4-2 6 0" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="24" cy="18" rx="12" ry="5" />
      <path d="M12 18v8c0 3 5 5 12 5s12-2 12-5v-8" />
      <ellipse cx="38" cy="38" rx="12" ry="5" />
      <path d="M26 38v8c0 3 5 5 12 5s12-2 12-5v-8" />
    </>
  ),
  tag: (
    <>
      <path d="M10 30L30 10h22v22L32 52z" />
      <circle cx="43" cy="19" r="3" />
      <path d="M24 34l8 8M20 38l6 6" />
    </>
  ),
  lens: (
    <>
      <circle cx="27" cy="27" r="15" />
      <path d="M38 38l14 14" />
      <path d="M20 27c0-4 3-7 7-7" />
    </>
  ),
  wheat: (
    <>
      <path d="M32 56V14" />
      <path d="M32 20c-6-2-8-8-6-12 5 1 7 7 6 12zM32 20c6-2 8-8 6-12-5 1-7 7-6 12z" />
      <path d="M32 32c-6-2-8-8-6-12 5 1 7 7 6 12zM32 32c6-2 8-8 6-12-5 1-7 7-6 12z" />
      <path d="M32 44c-6-2-8-8-6-12 5 1 7 7 6 12zM32 44c6-2 8-8 6-12-5 1-7 7-6 12z" />
    </>
  ),
  globe: (
    <>
      <circle cx="32" cy="32" r="22" />
      <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" />
    </>
  ),
  rocket: (
    <>
      <path d="M32 6c10 8 12 22 6 34H26C20 28 22 14 32 6z" />
      <circle cx="32" cy="22" r="4" />
      <path d="M26 40l-8 6 2-12M38 40l8 6-2-12M28 46c0 4 2 8 4 10 2-2 4-6 4-10" />
    </>
  ),
  chart: (
    <>
      <path d="M10 54h46M14 54V12" />
      <path d="M20 44l10-12 8 6 14-18" />
      <path d="M46 20h6v6" />
    </>
  ),
  hat: (
    <>
      <path d="M18 34c-6 0-10-5-10-10s5-10 11-9c2-5 7-8 13-8s11 3 13 8c6-1 11 4 11 9s-4 10-10 10" />
      <path d="M18 34v18h28V34" />
      <path d="M18 44h28" />
    </>
  ),
  cap: (
    <>
      <path d="M4 24l28-12 28 12-28 12z" />
      <path d="M16 30v12c8 6 24 6 32 0V30" />
      <path d="M56 26v14" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 52C10 28 26 10 54 10c0 28-18 44-42 42z" />
      <path d="M12 52C24 40 32 30 42 20" />
    </>
  ),
  chat: (
    <>
      <path d="M8 12h40v26H24l-10 10V38H8z" />
      <path d="M18 22h22M18 28h14" />
      <path d="M52 22h4v24h-6v8l-8-8H30" />
    </>
  ),
  hands: (
    <>
      <path d="M4 30l12-10 10 4 8-4 10 2 16 10" />
      <path d="M16 22l14 16c2 2 5 2 6 0s0-4-2-6" />
      <path d="M26 34l6 6c2 2 5 1 5-2M32 30l8 8c2 2 5 0 4-3l-8-9" />
      <path d="M4 30l8 8M60 30l-8 8" />
    </>
  ),
  megaphone: (
    <>
      <path d="M8 26h10l26-14v38L18 36H8z" />
      <path d="M18 36l4 14h6l-2-12" />
      <path d="M50 24c4 2 4 10 0 12M54 18c8 4 8 20 0 24" />
    </>
  ),
  box: (
    <>
      <path d="M8 20l24-10 24 10v26L32 56 8 46z" />
      <path d="M8 20l24 10 24-10M32 30v26" />
      <path d="M20 15l24 10" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function SketchIcon({ name, tone = "green", className = "", label }: { name: IconName; tone?: WashTone; className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <g filter="url(#watercolor)" opacity="0.6">
        <ellipse cx="34" cy="36" rx="22" ry="18" fill={`var(--wash-${tone})`} />
      </g>
      <g fill="none" stroke="var(--color-text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        {paths[name]}
      </g>
    </svg>
  );
}

/** Icon for each service category / feature page */
export const serviceIcon: Record<string, IconName> = {
  "product-development": "flask",
  "regulatory-compliance": "shield",
  "food-safety-quality": "check",
  "plant-setup": "factory",
  "cost-optimization": "coins",
  "packaging-labeling": "tag",
  "testing-analytics": "lens",
  "specialized-categories": "wheat",
  "export-market-access": "globe",
  "startup-support": "rocket",
  "market-insights": "chart",
  "food-service-hospitality": "hat",
  training: "cap",
  sustainability: "leaf",
  "ongoing-advisory": "chat",
  manufacturing: "hands",
  "brand-marketing": "megaphone",
};

/* ───────── logo ───────── */

/** The jar + brush-script wordmark from The Umami Labs logo (light-green wordmark in dark mode / on dark bands). */
export function Logo({ size = "md", onDark = false, className = "" }: { size?: "sm" | "md" | "lg"; onDark?: boolean; className?: string }) {
  const jar = size === "lg" ? "h-24" : size === "sm" ? "h-9" : "h-11";
  const word = size === "lg" ? "h-20" : size === "sm" ? "h-8" : "h-10";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/the-umami-labs-mark.png" alt="" width={760} height={604} className={`${jar} w-auto select-none`} draggable={false} />
      {onDark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/brand/the-umami-labs-wordmark-dark.png" alt="The Umami Labs" width={900} height={259} className={`${word} w-auto select-none`} draggable={false} />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/the-umami-labs-wordmark.png" alt="The Umami Labs" width={900} height={259} className={`${word} w-auto select-none dark:hidden`} draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/the-umami-labs-wordmark-dark.png" alt="The Umami Labs" width={900} height={259} className={`${word} hidden w-auto select-none dark:block`} draggable={false} />
        </>
      )}
    </span>
  );
}
