import type { CSSProperties, ElementType, ReactNode } from "react";

/** Small uppercase technical label */
export function Label({ children, className = "", as: Tag = "p" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag className={`t-label text-muted ${className}`}>{children}</Tag>;
}

/** Numbered section marker, e.g. "02 — The Problem" */
export function SectionMark({ n, children, className = "" }: { n: string; children: ReactNode; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 text-muted ${className}`}>
      <span className="text-ink">{n}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Headline with per-line mask reveal. Pass lines as an array; wrap a
 * segment in {serif: "text"} to set it in the italic serif.
 */
type Seg = string | { serif: string } | { accent: string };
export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  lines: (Seg | Seg[])[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => {
        const segs = Array.isArray(line) ? line : [line];
        return (
          <span key={i} className="mask-line" style={{ "--i": i } as CSSProperties}>
            <span>
              {segs.map((s, j) =>
                typeof s === "string" ? (
                  <span key={j}>{s}</span>
                ) : "serif" in s ? (
                  <span key={j} className="t-serif">
                    {s.serif}
                  </span>
                ) : (
                  <span key={j} className="text-forest dark:text-lime">
                    {s.accent}
                  </span>
                ),
              )}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
