import { PageHeader } from "@/components/ui/PageHeader";
import { Problem } from "@/components/home/Problem";
import { Journey, JourneyCta } from "@/components/home/Journey";
import { CompliancePromise } from "@/components/home/CompliancePromise";
import { LaunchPackage } from "@/components/home/LaunchPackage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Approach — Concept to Compliant to Commercial",
  description:
    "How Umami Labz plans formulation, regulatory compliance, manufacturing feasibility and commercial strategy together — compliance-first, from concept to production.",
  path: "/approach",
});

const principles = [
  { t: "Plan together", d: "Formulation, compliance, cost and production feasibility are considered at the same table, from the first workshop." },
  { t: "Compliance first", d: "Regulatory direction is set before trials, so development effort goes into products that can be registered and sold." },
  { t: "Design for the line", d: "Every recipe is developed with the equipment, yields and hygiene of real production in mind." },
  { t: "Honest feasibility", d: "If an idea doesn’t work commercially, we say so early — and look for the version that does." },
];

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        label="Our approach"
        title={["Designed in the lab.", ["Built for ", { serif: "production." }]]}
        intro={
          <p>
            A food product has to work for taste, safety, cost and scale at the same time. Our approach is simple: consider all of
            them together, from the beginning.
          </p>
        }
        image="labCorridor"
      />
      <section aria-labelledby="principles" className="section">
        <div className="wrap">
          <h2 id="principles" className="t-label text-muted">
            Four working principles
          </h2>
          <ol className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.t} className="bg-canvas p-6 md:p-8" data-reveal="fade" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="text-[3.5rem] font-medium leading-none tracking-[-0.06em] text-terra">{i + 1}</p>
                <p className="mt-8 text-[1.45rem] font-medium tracking-[-0.025em]">{p.t}</p>
                <p className="mt-2 text-[0.95rem] text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Problem />
      <Journey />
      <JourneyCta />
      <CompliancePromise />
      <LaunchPackage />
    </>
  );
}
