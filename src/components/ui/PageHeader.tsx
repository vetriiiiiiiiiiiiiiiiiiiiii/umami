import Link from "next/link";
import type { ReactNode } from "react";
import { Photo } from "./Photo";
import { MaskLines } from "./Text";
import type { ImageKey } from "@/content/images";

type Seg = string | { serif: string };

/** Editorial page opener used across inner pages. */
export function PageHeader({
  label,
  title,
  intro,
  image,
  aside,
  crumbs,
  tone = "default",
}: {
  label: string;
  title: (Seg | Seg[])[];
  intro?: ReactNode;
  image?: ImageKey;
  aside?: ReactNode;
  crumbs?: { label: string; href: string }[];
  tone?: "default" | "deep";
}) {
  return (
    <header className={`grain relative overflow-hidden pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+5rem)] ${tone === "deep" ? "deep" : ""}`}>
      <div className="wrap relative z-10">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="t-label flex flex-wrap items-center gap-2 text-muted">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  <Link href={c.href} className="link-u">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="t-label flex items-center gap-3 text-muted" data-reveal="fade">
          <span aria-hidden className="h-2 w-2 rounded-full bg-lime ring-1 ring-forest/30" />
          {label}
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <MaskLines as="h1" className="t-h1 lg:col-span-8" lines={title} />
          {aside && <div className="lg:col-span-4" data-reveal="fade">{aside}</div>}
        </div>
        {intro && (
          <div className="mt-10 grid lg:grid-cols-12">
            <div className="t-lead text-muted lg:col-span-6 lg:col-start-7" data-reveal="fade" style={{ ["--d" as string]: "200ms" }}>
              {intro}
            </div>
          </div>
        )}
      </div>
      {image ? (
        <div className="wrap relative z-10 mt-14 md:mt-20">
          <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]" data-reveal="image">
            <Photo name={image} priority sizes="100vw" />
          </div>
        </div>
      ) : (
        <div className="h-16 md:h-24" />
      )}
    </header>
  );
}
