"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  budgetRanges, emptyEnquiry, productCategories, projectStages, projectTypes, serviceOptions, summarise, timelines,
  validateStep, type Enquiry, type Errors,
} from "@/lib/enquiry";
import { NAVIGATOR_STORAGE_KEY } from "@/lib/roadmap";
import { site } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";

const steps = ["About you", "Your project", "Details"];

/** map ?service= slugs to form service options */
const serviceFromSlug: Record<string, string> = {
  "product-development": "Formulation & R&D", "regulatory-compliance": "Regulatory & FSSAI", "food-safety-quality": "Food safety & quality",
  "plant-setup": "Plant setup", manufacturing: "Manufacturing partners", "cost-optimization": "Costing", "packaging-labeling": "Packaging & labelling",
  "testing-analytics": "Testing", "export-market-access": "Export", "startup-support": "Startup & funding", "brand-marketing": "Branding & marketing",
  "market-insights": "Branding & marketing", "food-service-hospitality": "Food service", training: "Training", "ongoing-advisory": "Ongoing advisory",
  "specialized-categories": "Formulation & R&D", sustainability: "Formulation & R&D",
};
const needToService: Record<string, string> = {
  formulation: "Formulation & R&D", regulatory: "Regulatory & FSSAI", manufacturing: "Manufacturing partners", costing: "Costing",
  packaging: "Packaging & labelling", testing: "Testing", branding: "Branding & marketing", marketing: "Branding & marketing",
  export: "Export", funding: "Startup & funding",
};

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

export function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [fromNavigator, setFromNavigator] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Prefill from URL (?service=, ?type=, ?category=) and from the Navigator.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const patch: Partial<Enquiry> = {};
    const svc = p.get("service");
    if (svc && serviceFromSlug[svc]) patch.services = [serviceFromSlug[svc]];
    if (svc === "manufacturing") patch.projectType = "Manufacturing partner search";
    const cat = p.get("category");
    if (cat) {
      const m = productCategories.find((c) => c.toLowerCase().startsWith(cat.toLowerCase().split(" ")[0]));
      if (m) patch.category = m;
    }
    if (p.get("type") === "launch-ready-package") {
      patch.projectType = "New food product";
      patch.description = "I'm interested in the Launch-Ready Package. ";
    }
    if (p.get("from") === "navigator") {
      try {
        const nav = JSON.parse(sessionStorage.getItem(NAVIGATOR_STORAGE_KEY) || "null");
        if (nav) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFromNavigator(true);
          patch.navigator = nav.summary;
          patch.stage = projectStages.find((s) => s === nav.stage) || "";
          const typeMap: Record<string, string> = {
            "A new food product": "New food product", "A food brand": "Food brand", "A manufacturing facility": "Manufacturing facility",
            "A restaurant or cloud kitchen": "Restaurant / cloud kitchen", "A functional food": "Functional food or supplement",
            "A supplement": "Functional food or supplement", "An existing product improvement": "Existing product improvement",
          };
          patch.projectType = typeMap[nav.build] || "Something else";
          patch.services = Array.from(new Set((nav.needs as string[]).map((n) => needToService[n]).filter(Boolean)));
          if (nav.details) patch.description = nav.details;
        }
      } catch {}
    }
    // URL/sessionStorage are browser-only, so prefill must happen after hydration.
     
    if (Object.keys(patch).length) setData((d) => ({ ...d, ...patch }));
  }, []);

  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const focusFirstError = (errs: Errors) => {
    const k = Object.keys(errs)[0];
    if (k) window.setTimeout(() => formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`)?.focus(), 30);
  };

  const next = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setStep((s) => s + 1);
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>("[data-step-title]")?.focus(), 60);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    const errs = { ...validateStep(0, data), ...validateStep(1, data), ...validateStep(2, data) };
    setErrors(errs);
    if (Object.keys(errs).length) {
      const firstStep = validateStep(0, data) && Object.keys(validateStep(0, data)).length ? 0 : Object.keys(validateStep(1, data)).length ? 1 : 2;
      setStep(firstStep);
      return focusFirstError(errs);
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setStatus("sent");
        try {
          sessionStorage.removeItem(NAVIGATOR_STORAGE_KEY);
        } catch {}
      } else if (r.status === 503) setStatus("unconfigured");
      else {
        if (j.errors) setErrors(j.errors);
        setErrMsg(j.error || "Something went wrong. Please check your details and try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summarise(data));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status === "sent" || status === "unconfigured") {
    const mailto = site.email
      ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${data.name}`)}&body=${encodeURIComponent(summarise(data))}`
      : "";
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }} role="status" className="border border-rule-strong bg-raised p-6 md:p-10">
        {status === "sent" ? (
          <>
            <p className="t-label text-muted">Enquiry received</p>
            <p className="t-h2 mt-4">
              Thank you, <span className="t-serif">{data.name.split(" ")[0]}.</span>
            </p>
            <p className="mt-5 max-w-[50ch] text-muted">
              Your project details have reached our team. We’ll review them and reply to {data.email}. If anything changes in the
              meantime, simply reply to that email.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="cta">
                <span>Back to home</span>
                <span aria-hidden className="cta-arrow">↗</span>
              </Link>
              <Link href="/insights" className="cta cta--ghost">
                <span>Read our insights</span>
                <span aria-hidden className="cta-arrow">→</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="t-label text-terra">Online submission isn’t connected yet</p>
            <p className="t-h3 mt-4 max-w-[28ch]">Your enquiry is ready — it just needs one more step to reach us.</p>
            <p className="mt-4 max-w-[56ch] text-muted">
              This website’s form delivery hasn’t been configured, so nothing has been sent. {site.email ? "Send it by email with one click — the message is pre-filled — or copy it." : "Copy your enquiry below to send it through your preferred channel."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {mailto && (
                <a href={mailto} className="cta cta--accent">
                  <span>Send by email</span>
                  <span aria-hidden className="cta-arrow">↗</span>
                </a>
              )}
              <button type="button" onClick={copy} className="cta cta--ghost">
                <span>{copied ? "Copied to clipboard" : "Copy my enquiry"}</span>
                <span aria-hidden className="cta-arrow">⧉</span>
              </button>
              <button type="button" onClick={() => setStatus("idle")} className="t-label h-12 px-2 text-muted hover:text-ink">
                ← Edit enquiry
              </button>
            </div>
            <pre className="thin-scroll mt-8 max-h-64 overflow-auto whitespace-pre-wrap border border-rule bg-panel p-4 font-mono text-[0.8rem] text-muted">{summarise(data)}</pre>
          </>
        )}
      </motion.div>
    );
  }

  const field = (k: keyof Enquiry) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });
  return (
    <form ref={formRef} onSubmit={submit} noValidate className="border border-rule-strong bg-raised" aria-describedby={`${uid}-privacy`}>
      {/* step indicator */}
      <ol className="grid grid-cols-3 border-b border-rule">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`border-r border-rule px-4 py-3 last:border-r-0 md:px-6 ${i === step ? "bg-canvas" : ""}`}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => setStep(i)}
              className="w-full text-left disabled:cursor-default"
            >
              <span className={`t-label block ${i <= step ? "text-ink" : "text-muted"}`}>0{i + 1}</span>
              <span className={`mt-0.5 hidden text-[0.95rem] sm:block ${i <= step ? "text-ink" : "text-muted"}`}>{s}</span>
            </button>
            <span aria-hidden className="mt-2 block h-[2px] bg-rule">
              <span className={`block h-full origin-left bg-lime transition-transform duration-500 ${i < step ? "scale-x-100" : i === step ? "scale-x-50" : "scale-x-0"}`} />
            </span>
          </li>
        ))}
      </ol>

      {fromNavigator && step === 0 && (
        <p className="border-b border-rule bg-lime/20 px-5 py-3 text-[0.9rem] md:px-8">
          Your Navigator roadmap is attached to this enquiry. Just add your contact details.
        </p>
      )}

      <div className="p-5 md:p-8">
        {/* honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        <AnimatePresence mode="wait">
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <legend data-step-title tabIndex={-1} className="t-h3 mb-8 outline-none">
              {step === 0 ? "First, who are we talking to?" : step === 1 ? "Tell us about the project." : "A little more detail."}
            </legend>

            {step === 0 && (
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <Lbl uid={uid} k="name">Name</Lbl>
                  <input {...field("name")} className="field" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
                  <Err errors={errors} uid={uid} k="name" />
                </div>
                <div>
                  <Lbl uid={uid} k="email">Email</Lbl>
                  <input {...field("email")} type="email" inputMode="email" className="field" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
                  <Err errors={errors} uid={uid} k="email" />
                </div>
                <div>
                  <Lbl uid={uid} k="phone" optional>
                    Phone
                  </Lbl>
                  <input {...field("phone")} type="tel" inputMode="tel" className="field" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                  <Err errors={errors} uid={uid} k="phone" />
                </div>
                <div>
                  <Lbl uid={uid} k="company" optional>
                    Company / brand
                  </Lbl>
                  <input {...field("company")} className="field" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-7">
                <div className="grid gap-7 md:grid-cols-3">
                  <div>
                    <Lbl uid={uid} k="projectType">Project type</Lbl>
                    <select {...field("projectType")} className="field" value={data.projectType} onChange={(e) => set("projectType", e.target.value)}>
                      <option value="">Select…</option>
                      {projectTypes.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <Err errors={errors} uid={uid} k="projectType" />
                  </div>
                  <div>
                    <Lbl uid={uid} k="category" optional>
                      Product category
                    </Lbl>
                    <select {...field("category")} className="field" value={data.category} onChange={(e) => set("category", e.target.value)}>
                      <option value="">Select…</option>
                      {productCategories.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Lbl uid={uid} k="stage">Project stage</Lbl>
                    <select {...field("stage")} className="field" value={data.stage} onChange={(e) => set("stage", e.target.value)}>
                      <option value="">Select…</option>
                      {projectStages.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <Err errors={errors} uid={uid} k="stage" />
                  </div>
                </div>
                <fieldset aria-describedby={errors.services ? `${uid}-services-err` : undefined}>
                  <legend className="t-label mb-3 block text-muted">
                    Services required <span aria-hidden className="text-terra">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((o, i) => (
                      <label key={o} className="chip cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
                        <input
                          type="checkbox"
                          name={i === 0 ? "services" : undefined}
                          className="sr-only"
                          checked={data.services.includes(o)}
                          onChange={() => set("services", data.services.includes(o) ? data.services.filter((x) => x !== o) : [...data.services, o])}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                  <Err errors={errors} uid={uid} k="services" />
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-7">
                <div>
                  <Lbl uid={uid} k="description">Project description</Lbl>
                  <textarea
                    {...field("description")}
                    rows={6}
                    className="field resize-y"
                    placeholder="What are you making, who is it for, and where are you stuck?"
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                  <div className="flex justify-between">
                    <Err errors={errors} uid={uid} k="description" />
                    <span className="t-label ml-auto mt-2 text-muted">{data.description.length}/4000</span>
                  </div>
                </div>
                <div className="grid gap-7 md:grid-cols-2">
                  <div>
                    <Lbl uid={uid} k="budget" optional>
                      Budget range
                    </Lbl>
                    <select {...field("budget")} className="field" value={data.budget} onChange={(e) => set("budget", e.target.value)}>
                      <option value="">Prefer not to say</option>
                      {budgetRanges.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Lbl uid={uid} k="timeline" optional>
                      Expected timeline
                    </Lbl>
                    <select {...field("timeline")} className="field" value={data.timeline} onChange={(e) => set("timeline", e.target.value)}>
                      <option value="">Select…</option>
                      {timelines.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {data.navigator && (
                  <div className="border border-rule bg-panel p-4">
                    <p className="t-label text-muted">Attached from the Navigator</p>
                    <p className="mt-1 text-[0.9rem]">{data.navigator}</p>
                    <button type="button" className="t-label mt-2 text-muted underline" onClick={() => set("navigator", "")}>
                      Remove
                    </button>
                  </div>
                )}
                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={data.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-brand)]"
                    />
                    <span className="text-[0.95rem]">
                      I’ve read the{" "}
                      <Link href="/privacy" className="underline">
                        privacy notice
                      </Link>{" "}
                      and agree to The Umami Labs using these details to respond to my enquiry.
                    </span>
                  </label>
                  <Err errors={errors} uid={uid} k="consent" />
                </div>
              </div>
            )}
          </motion.fieldset>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="mt-6 border-l-2 border-terra pl-4 text-terra">
            {errMsg}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`t-label h-11 text-muted hover:text-ink ${step === 0 ? "invisible" : ""}`}>
            ← Back
          </button>
          <button type="submit" disabled={status === "sending"} className="cta cta--accent disabled:opacity-60">
            <span>{step < 2 ? "Continue" : status === "sending" ? "Sending…" : "Send enquiry"}</span>
            <span aria-hidden className="cta-arrow">{step < 2 ? "→" : "↗"}</span>
          </button>
        </div>
        <p id={`${uid}-privacy`} className="mt-6 text-[0.82rem] text-muted">
          We use your details only to respond to this enquiry. We don’t sell your data or add you to marketing lists without asking.
          See our <Link href="/privacy" className="underline">privacy notice</Link>.
        </p>
      </div>
    </form>
  );
}

function Err({ k, errors, uid }: { k: keyof Enquiry; errors: Errors; uid: string }) {
  return errors[k] ? (
    <p id={`${uid}-${k}-err`} className="mt-2 text-[0.85rem] text-terra" role="alert">
      {errors[k]}
    </p>
  ) : null;
}

function Lbl({ k, uid, children, optional }: { k: keyof Enquiry; uid: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={`${uid}-${k}`} className="t-label block text-muted">
      {children} {optional ? <span className="normal-case tracking-normal opacity-70">(optional)</span> : <span aria-hidden className="text-terra">*</span>}
    </label>
  );
}
