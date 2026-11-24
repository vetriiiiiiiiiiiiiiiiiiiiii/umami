import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "accent" | "ghost";
  dir?: "up" | "down" | "right";
  className?: string;
};

const arrows = { up: "↗", down: "↓", right: "→" };

export function Cta({ href, children, variant = "solid", dir = "up", className = "" }: Props) {
  const cls = `cta ${variant === "accent" ? "cta--accent" : variant === "ghost" ? "cta--ghost" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="cta-arrow text-[0.95rem] leading-none">
        {arrows[dir]}
      </span>
    </>
  );
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} data-dir={dir}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-dir={dir}>
      {inner}
    </Link>
  );
}

/** Text link with arrow */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 t-label text-ink ${className}`}>
      <span className="link-u">{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
