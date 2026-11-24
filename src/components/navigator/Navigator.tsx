"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  buildOptions, stageOptions, needOptions, buildRoadmap, labelOf, NAVIGATOR_STORAGE_KEY,
  type BuildId, type StageId, type NeedId,
} from "@/lib/roadmap";
import { hrefFor, titleFor } from "@/content/services";
import { EASE_OUT } from "@/lib/motion";

const steps = ["Building", "Stage", "Needs", "Details"];

export function Navigator({ standalone = false }: { standalone?: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [build, setBuild] = useState<BuildId | null>(null);
  const [stage, setStage] = useState<StageId | null>(null);
  const [needs, setNeeds] = useState<NeedId[]>([]);
  const [details, setDetails] = useState("");
  const [showResult, setShowResult] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const detailsId = useId();

  const roadmap = useMemo(() => (build && stage ? buildRoadmap(build, stage, needs) : null), [build, stage, needs]);

  const focusPanel = () => window.setTimeout(() => panel.current?.querySelector<HTMLElement>("h3, [data-focus]")?.focus(), 60);
  const go = (s: number) => {
    setStep(s);
    setShowResult(false);
    focusPanel();
  };
  const finish = () => {
    setShowResult(true);
    focusPanel();
  };
  const reset = () => {
    setBuild(null);
    setStage(null);
    setNeeds([]);
    setDetails("");
    go(0);
  };
  const canNext = step === 0 ? !!build : step === 1 ? !!stage : step === 2 ? needs.length > 0 : true;

  const submit = () => {
    if (!roadmap || !build || !stage) return;
    const summary = `${labelOf(buildOptions, build)} · ${labelOf(stageOptions, stage)} · Needs: ${needs
      .map((x) => labelOf(needOptions, x))
      .join(", ")} · Current stage: ${roadmap.current.label} · Next: ${roadmap.nextSteps.map((s) => s.label).join(" → ")}`;
    try {
      sessionStorage.setItem(
        NAVIGATOR_STORAGE_KEY,
        JSON.stringify({ build: labelOf(buildOptions, build), stage: labelOf(stageOptions, stage), needs, details, summary }),
      );
    } catch {}
    router.push("/contact?from=navigator");
  };

  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="navigator" aria-labelledby="nav-title" className={`deep grain relative overflow-hidden ${standalone ? "pb-24 pt-[calc(var(--nav-h)+4rem)]" : "section"}`}>
      <div className="wrap relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Heading id="nav-title" className="t-h2">
              The Food Venture <span className="t-serif text-lime">Navigator</span>
            </Heading>
            <p className="t-lead mt-5 text-band-muted">Find the next step for your food business.</p>
          </div>
          <p className="max-w-[44ch] text-[0.95rem] text-band-muted lg:col-span-4 lg:col-start-9">
            Four quick questions. Your roadmap is generated from your answers — nothing is stored until you choose to send it to
            us.
          </p>
        </div>

        {/* progress */}
        <ol className="mt-12 grid grid-cols-5 gap-2" aria-label="Progress">
          {[...steps, "Roadmap"].map((s, i) => {
            const done = showResult || i < step;
            const cur = showResult ? i === 4 : i === step;
            return (
              <li key={s} aria-current={cur ? "step" : undefined}>
                <div className="relative h-[3px] overflow-hidden bg-[var(--color-border)]">
                  <motion.div
                    className="absolute inset-0 origin-left bg-lime"
                    initial={false}
                    animate={{ scaleX: done ? 1 : cur ? 0.5 : 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  />
                </div>
                <p className={`t-label mt-2 hidden sm:block ${cur ? "text-band-ink" : "text-band-muted"}`}>
                  0{i + 1} {s}
                </p>
              </li>
            );
          })}
        </ol>

        <div ref={panel} className="mt-10 min-h-[420px] border border-rule bg-[color-mix(in_oklab,var(--color-deep)_80%,black)] p-5 md:p-10" aria-live="polite">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {step === 0 && (
                  <Choice
                    title="What are you building?"
                    options={buildOptions}
                    isOn={(id) => build === id}
                    onPick={(id) => setBuild(id as BuildId)}
                  />
                )}
                {step === 1 && (
                  <Choice
                    title="Where are you now?"
                    options={stageOptions}
                    isOn={(id) => stage === id}
                    onPick={(id) => setStage(id as StageId)}
                  />
                )}
                {step === 2 && (
                  <Choice
                    title="What are you looking for?"
                    hint="Select all that apply."
                    multi
                    options={needOptions}
                    isOn={(id) => needs.includes(id as NeedId)}
                    onPick={(id) =>
                      setNeeds((v) => (v.includes(id as NeedId) ? v.filter((x) => x !== id) : [...v, id as NeedId]))
                    }
                  />
                )}
                {step === 3 && (
                  <div>
                    <h3 tabIndex={-1} className="t-h3 outline-none">
                      Anything else we should know? <span className="t-serif text-band-muted">(optional)</span>
                    </h3>
                    <label htmlFor={detailsId} className="t-label mt-6 block text-band-muted">
                      Product, category, volumes, timelines…
                    </label>
                    <textarea
                      id={detailsId}
                      value={details}
                      onChange={(e) => setDetails(e.target.value.slice(0, 1200))}
                      rows={5}
                      className="field mt-2 resize-y"
                      placeholder="e.g. A millet-based breakfast cereal for D2C, currently a kitchen recipe."
                    />
                    <p className="t-label mt-2 text-right text-band-muted">{details.length}/1200</p>
                  </div>
                )}

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => go(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="t-label h-11 px-1 text-band-muted transition-opacity hover:text-band-ink disabled:opacity-0"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center gap-4">
                    {step > 0 && (
                      <button type="button" onClick={reset} className="t-label h-11 text-band-muted hover:text-band-ink">
                        Reset
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={!canNext}
                      onClick={() => (step < 3 ? go(step + 1) : finish())}
                      className="cta cta--accent disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>{step < 3 ? "Continue" : "Generate my roadmap"}</span>
                      <span aria-hidden className="cta-arrow">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              roadmap && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                >
                  <p className="t-label text-band-muted">
                    Your roadmap — {labelOf(buildOptions, build!)} / {labelOf(stageOptions, stage!)}
                  </p>
                  <h3 tabIndex={-1} className="t-h3 mt-3 max-w-[30ch] outline-none">
                    {roadmap.headline}
                  </h3>

                  {/* roadmap track */}
                  <ol className="relative mt-10 grid gap-0 md:grid-flow-col md:auto-cols-fr" aria-label="Roadmap stages">
                    {roadmap.stages.map((s, i) => (
                      <motion.li
                        key={s.key}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE_OUT }}
                        className="relative grid grid-cols-[1.75rem_1fr] gap-3 pb-6 md:block md:pb-0 md:pr-3"
                      >
                        {/* connector */}
                        <span
                          aria-hidden
                          className={`absolute left-[11px] top-6 h-full w-px md:left-6 md:top-[11px] md:h-px md:w-full ${
                            s.status === "done" || s.status === "current" ? "bg-lime" : "bg-[var(--color-border-strong)]"
                          } ${i === roadmap.stages.length - 1 ? "hidden" : ""}`}
                        />
                        <span
                          aria-hidden
                          className={`relative z-10 mt-0.5 block h-6 w-6 rounded-full border-2 ${
                            s.status === "done"
                              ? "border-lime bg-lime"
                              : s.status === "current"
                                ? "border-lime bg-band ring-4 ring-lime/25"
                                : s.status === "next"
                                  ? "border-band-ink bg-band"
                                  : "border-[var(--color-border-strong)] bg-band"
                          }`}
                        >
                          {s.status === "current" && <span className="pulse-dot absolute inset-1 rounded-full bg-lime" />}
                        </span>
                        <div className="md:mt-4">
                          <p className={`t-label ${s.status === "upcoming" ? "text-band-muted" : "text-band-ink"}`}>
                            {String(i + 1).padStart(2, "0")} {s.status === "current" ? "· You are here" : s.status === "next" ? "· Next" : s.status === "done" ? "· Done" : ""}
                          </p>
                          <p className={`mt-1 text-[1.05rem] font-medium leading-tight tracking-[-0.015em] ${s.status === "upcoming" ? "text-band-muted" : ""}`}>
                            {s.label}
                          </p>
                          {s.relevant && <p className="t-label mt-1.5 text-terra">Relevant to you</p>}
                          <span className="sr-only">{s.detail}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ol>

                  <div className="mt-12 grid gap-8 border-t border-rule pt-8 md:grid-cols-3">
                    <div>
                      <p className="t-label text-band-muted">Where you are</p>
                      <p className="mt-2 text-[1.2rem] font-medium">{roadmap.current.label}</p>
                      <p className="mt-1 text-[0.92rem] text-band-muted">{roadmap.current.detail}</p>
                    </div>
                    <div>
                      <p className="t-label text-band-muted">Likely next steps</p>
                      <ol className="mt-2 space-y-3">
                        {roadmap.nextSteps.map((s) => (
                          <li key={s.key}>
                            <p className="font-medium">→ {s.label}</p>
                            <p className="text-[0.92rem] text-band-muted">{s.detail}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="t-label text-band-muted">Relevant capabilities</p>
                      <ul className="mt-2 space-y-1.5">
                        {roadmap.capabilities.map((c) => (
                          <li key={c}>
                            <Link href={hrefFor(c)} className="link-u text-[0.98rem]">
                              {titleFor(c)} ↗
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
                    <button type="button" onClick={submit} className="cta cta--accent">
                      <span>{roadmap.cta} — send this roadmap</span>
                      <span aria-hidden className="cta-arrow">↗</span>
                    </button>
                    <button type="button" onClick={() => go(0)} className="t-label h-11 text-band-muted hover:text-band-ink">
                      Edit answers
                    </button>
                    <button type="button" onClick={reset} className="t-label h-11 text-band-muted hover:text-band-ink">
                      Start over
                    </button>
                  </div>
                  <p className="mt-4 text-[0.8rem] text-band-muted">
                    This roadmap is a general starting point based on your answers, not a project plan. We’ll refine it with you.
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Choice({
  title,
  hint,
  options,
  isOn,
  onPick,
  multi,
}: {
  title: string;
  hint?: string;
  options: { id: string; label: string }[];
  isOn: (id: string) => boolean;
  onPick: (id: string) => void;
  multi?: boolean;
}) {
  return (
    <fieldset>
      <legend className="contents">
        <h3 tabIndex={-1} className="t-h3 outline-none">
          {title}
        </h3>
      </legend>
      {hint && <p className="t-label mt-2 text-band-muted">{hint}</p>}
      <div role={multi ? "group" : "radiogroup"} aria-label={title} className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o, i) => (
          <button
            key={o.id}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={isOn(o.id)}
            onClick={() => onPick(o.id)}
            className="chip group min-h-16 justify-between !border-[var(--color-border-strong)] !px-4 !text-[1rem] aria-checked:!border-lime aria-checked:!bg-lime aria-checked:!text-lime-ink"
          >
            <span className="flex items-baseline gap-3">
              <span className="t-label opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {o.label}
            </span>
            <span aria-hidden className={`h-3 w-3 shrink-0 border ${multi ? "" : "rounded-full"} ${isOn(o.id) ? "border-lime-ink bg-lime-ink" : "border-current opacity-50"}`} />
          </button>
        ))}
      </div>
    </fieldset>
  );
}
