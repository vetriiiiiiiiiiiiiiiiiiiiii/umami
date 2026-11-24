"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { formatDate, type Article } from "@/content/insights";

type Lite = Omit<Article, "body"> & { minutes: number };

export function InsightsIndex({ articles, categories }: { articles: Lite[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("All");
  const used = new Set(articles.map((a) => a.category));
  const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  return (
    <section className="pb-24" aria-label="Articles">
      <div className="wrap">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 border-y border-rule py-4">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              disabled={c !== "All" && !used.has(c as Article["category"])}
              onClick={() => setCat(c)}
              className="chip !min-h-10 !py-1 !text-[0.85rem] disabled:cursor-not-allowed disabled:opacity-35"
            >
              {c}
            </button>
          ))}
        </div>
        <p className="t-label mt-4 text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "article" : "articles"}
          {cat !== "All" ? ` in ${cat}` : ""}
        </p>
        <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {list.map((a, i) => (
            <li key={a.slug} className={i === 0 ? "md:col-span-2 lg:col-span-12" : "lg:col-span-4"}>
              <Link href={`/insights/${a.slug}`} className={`group grid gap-6 ${i === 0 ? "lg:grid-cols-12 lg:items-end" : ""}`}>
                <div className={`zoom-img relative overflow-hidden bg-panel ${i === 0 ? "aspect-[16/9] lg:col-span-8" : "aspect-[4/3]"}`}>
                  <Photo name={a.image} sizes={i === 0 ? "66vw" : "(min-width:1024px) 33vw, 100vw"} />
                </div>
                <div className={i === 0 ? "lg:col-span-4" : ""}>
                  <p className="t-label flex flex-wrap gap-3 text-muted">
                    <span className="text-ink">{a.category}</span>
                    <span>{formatDate(a.date)}</span>
                    <span>{a.minutes} min read</span>
                  </p>
                  <h2 className={`mt-3 font-medium tracking-[-0.03em] ${i === 0 ? "text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.02]" : "text-[1.4rem] leading-tight"}`}>
                    <span className="link-u">{a.title}</span>
                  </h2>
                  <p className="mt-3 text-muted">{a.dek}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
