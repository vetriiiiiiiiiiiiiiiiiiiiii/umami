import { MaskLines } from "@/components/ui/Text";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";

const steps = [
  { t: "Formulation", d: "Ingredients, levels and processing are proposed." },
  { t: "Regulatory review", d: "Category, ingredient conditions, labelling and claims direction are checked.", key: true },
  { t: "Trials", d: "Prototypes are made against a formulation that can be registered." },
  { t: "Validation", d: "Testing, sensory and shelf-life work confirm performance." },
  { t: "Scale-up", d: "Pilot and production plans build on decisions already reviewed." },
];

export function CompliancePromise() {
  return (
    <section aria-labelledby="compliance-title" className="section relative overflow-hidden">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MaskLines
            id="compliance-title"
            className="t-h1"
            lines={["Compliance", "isn’t the final", "step. It’s the", [{ serif: "first." }]]}
          />
          <p className="t-lead mt-8 max-w-[50ch] text-muted">
            Every formulation should be checked against applicable regulatory requirements before trials and scale-up — so
            requirements are considered early rather than discovered at the end.
          </p>
          <div className="relative mt-12 hidden aspect-[16/9] max-w-[640px] overflow-hidden lg:block sketch-frame" data-reveal="image">
            <Photo name="capsules" sizes="45vw" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <ol className="relative" aria-label="Compliance-first sequence">
            <svg aria-hidden className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-px overflow-visible" preserveAspectRatio="none" viewBox="0 0 1 100">
              <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--color-border-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line
                x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--color-text-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke"
                pathLength={1} className="draw" data-reveal="draw"
              />
            </svg>
            {steps.map((s, i) => (
              <li key={s.t} className="relative grid grid-cols-[1.5rem_1fr] gap-5 pb-10 last:pb-0" data-reveal="fade" style={{ ["--d" as string]: `${i * 120}ms` }}>
                <span
                  aria-hidden
                  className={`relative z-10 mt-1.5 block h-6 w-6 rounded-full border ${
                    s.key ? "border-forest bg-lime dark:border-lime" : "border-rule-strong bg-canvas"
                  }`}
                />
                <div className={s.key ? "border border-rule-strong bg-raised p-5" : "pt-1"}>
                  <p className="t-label text-muted">
                    Step {String(i + 1).padStart(2, "0")} {s.key && <span className="ml-2 text-terra">— checkpoint</span>}
                  </p>
                  <p className={`mt-1 ${s.key ? "text-[1.6rem]" : "text-[1.35rem]"} font-medium tracking-[-0.025em]`}>{s.t}</p>
                  <p className="mt-1 max-w-[40ch] text-[0.95rem] text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 border-t border-rule pt-5 text-[0.85rem] text-muted">
            Regulatory decisions rest with the relevant authorities. Early review reduces avoidable surprises; it does not
            guarantee approval.
          </p>
          <div className="mt-6">
            <Cta href="/services/regulatory-compliance" variant="ghost" dir="right">
              Get regulatory guidance
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
