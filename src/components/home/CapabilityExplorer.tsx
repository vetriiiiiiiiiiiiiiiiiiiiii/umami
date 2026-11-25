"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { categories, stageMeta } from "@/content/services";
import { Photo } from "@/components/ui/Photo";
import { EASE_OUT } from "@/lib/motion";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = norm(text).indexOf(q);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-lime text-lime-ink">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function CapabilityExplorer() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const q = norm(useDeferredValue(query).trim());
  const searchId = useId();

  const results = useMemo(
    () =>
      categories.map((c, i) => {
        const matches = q ? c.services.filter((s) => norm(s).includes(q)) : c.services;
        const titleHit = q ? norm(c.title).includes(q) : true;
        return { c, i, matches, visible: !q || titleHit || matches.length > 0 };
      }),
    [q],
  );
  const visible = results.filter((r) => r.visible);
  const totalMatches = q ? results.reduce((a, r) => a + (r.visible ? r.matches.length : 0), 0) : 0;
  const current = results[active]?.visible ? results[active] : visible[0];

  const onKeyList = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const pos = visible.findIndex((v) => v.i === idx);
    const next = visible[(pos + (e.key === "ArrowDown" ? 1 : -1) + visible.length) % visible.length];
    setActive(next.i);
    document.getElementById(`cap-tab-${next.i}`)?.focus();
  };

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="section scroll-mt-20">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cap-title" className="t-h2 text-balance">
              Fifteen disciplines. <span className="t-serif">One</span> coordinated team.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <label htmlFor={searchId} className="t-label mb-2 block text-muted">
              Search {categories.reduce((a, c) => a + c.services.length, 0)} capabilities
            </label>
            <div className="relative">
              <Search aria-hidden strokeWidth={1.5} className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. shelf life, HACCP, millets, DPR"
                className="field !pl-8 !pr-10"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="t-label mt-2 h-4 text-muted" aria-live="polite">
              {q ? (visible.length ? `${totalMatches} matching capabilities across ${visible.length} disciplines` : "No matches — try a broader term, or ask us directly") : ""}
            </p>
          </div>
        </div>

        {/* desktop split explorer */}
        <div className="mt-14 hidden border-t border-rule-strong lg:grid lg:grid-cols-12">
          <div role="tablist" aria-orientation="vertical" aria-label="Disciplines" className="col-span-4 border-r border-rule py-4 pr-6">
            {results.map(({ c, i, matches, visible: v }) =>
              v ? (
                <button
                  key={c.slug}
                  id={`cap-tab-${i}`}
                  role="tab"
                  aria-selected={current?.i === i}
                  aria-controls="cap-panel"
                  tabIndex={current?.i === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => onKeyList(e, i)}
                  className={`group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline py-2.5 text-left transition-colors ${
                    current?.i === i ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="t-label">{c.n}</span>
                  <span className={`text-[1.12rem] tracking-[-0.015em] transition-transform duration-300 ${current?.i === i ? "translate-x-2" : ""}`}>{c.title}</span>
                  <span className="t-label">{q ? matches.length : ""}</span>
                  {current?.i === i && (
                    <motion.span layoutId="cap-bar" className="absolute -left-[var(--gutter)] top-0 h-full w-[3px] bg-lime" transition={{ duration: 0.4, ease: EASE_OUT }} />
                  )}
                </button>
              ) : null,
            )}
          </div>

          <div id="cap-panel" role="tabpanel" aria-labelledby={current ? `cap-tab-${current.i}` : undefined} className="col-span-8 min-h-[640px] pl-10 pt-8">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.c.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="grid grid-cols-8 gap-8"
                >
                  <div className="col-span-5">
                    <p className="t-label text-muted">
                      {current.c.n} / {stageMeta[current.c.stage].name} stage
                    </p>
                    <h3 className="t-h3 mt-3">{current.c.title}</h3>
                    <p className="mt-4 max-w-[52ch] text-muted">{current.c.intro}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-6 border-t border-rule">
                      {(q ? current.matches.length ? current.matches : current.c.services : current.c.services).map((s) => (
                        <li key={s} className="border-b border-rule py-2 text-[0.92rem]">
                          <Highlight text={s} q={q} />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <Link href={`/contact?service=${current.c.slug}`} className="cta cta--accent">
                        <span>{current.c.cta.label}</span>
                        <span aria-hidden className="cta-arrow">↗</span>
                      </Link>
                      <Link href={`/services/${current.c.slug}`} className="t-label link-u text-ink">
                        Full details →
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="sketch-frame relative aspect-[3/4] overflow-hidden bg-panel">
                      <Photo name={current.c.image} sizes="22vw" />
                    </div>
                    <p className="mt-3 text-[0.85rem] italic text-muted">{current.c.summary}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* mobile accordions */}
        <ul className="mt-10 border-t border-rule-strong lg:hidden">
          {visible.map(({ c, i, matches }) => {
            const isOpen = open === i || (!!q && visible.length <= 3);
            return (
              <li key={c.slug} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`cap-m-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="grid min-h-14 w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-2 py-4 text-left"
                  >
                    <span className="t-label text-muted">{c.n}</span>
                    <span className="text-[1.1rem] tracking-[-0.015em]">{c.title}</span>
                    <span aria-hidden className={`t-label transition-transform ${isOpen ? "rotate-45" : ""}`}>
                      {q ? `${matches.length} ` : ""}+
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={`cap-m-${i}`} className="pb-6 pl-9">
                    <p className="text-[0.95rem] text-muted">{c.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {(q && matches.length ? matches : c.services).map((s) => (
                        <li key={s} className="border border-rule px-2.5 py-1 text-[0.85rem]">
                          <Highlight text={s} q={q} />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <Link href={`/contact?service=${c.slug}`} className="cta cta--accent !min-h-11">
                        <span>Enquire</span>
                        <span aria-hidden className="cta-arrow">↗</span>
                      </Link>
                      <Link href={`/services/${c.slug}`} className="t-label link-u">
                        Details →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
