import { PageHeader } from "@/components/ui/PageHeader";
import { NetworkMap } from "@/components/home/Manufacturing";
import { manufacturingServices } from "@/content/marketing";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";
import { JsonLd, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Third-Party Food Manufacturing & Co-Packing Support",
  description:
    "Support identifying and evaluating contract food manufacturers and co-packers: capability evaluation, process compatibility, MOQ considerations, trial coordination, technical transfer and scale-up.",
  path: "/manufacturing",
});

const path = [
  { t: "Define the requirement", d: "Your formulation, process steps, volumes, packaging and quality expectations — written down clearly." },
  { t: "Identify candidates", d: "Manufacturers and co-packers whose equipment and categories plausibly fit your product." },
  { t: "Evaluate fit", d: "Process compatibility, capacity, MOQs, hygiene standards, licences and documentation." },
  { t: "Trial", d: "Coordinated trials to confirm the product can be made to specification on their line." },
  { t: "Transfer & agree", d: "Technical transfer documentation and guidance on the points your agreement should cover." },
  { t: "Scale", d: "Production ramp-up, quality checks and a plan for what changes as volumes grow." },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHeader
        tone="deep"
        label="Manufacturing partnerships"
        title={["Your product.", ["The right ", { serif: "production" }], "partner."]}
        intro={
          <p>
            Building a factory isn’t always the right first move. We help you find and evaluate contract manufacturers and
            co-packers, and manage the technical transfer so the product made at scale matches the one you developed.
          </p>
        }
      />
      <section className="deep pb-20">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="text-band-ink lg:col-span-7">
            <NetworkMap />
          </div>
          <ul className="lg:col-span-5">
            {manufacturingServices.map((s, i) => (
              <li key={s} className="grid grid-cols-[3rem_1fr] border-t border-rule py-3.5 text-[1.1rem]">
                <span className="t-label pt-1 text-lime">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="mfg-path" className="section">
        <div className="wrap">
          <MaskLines id="mfg-path" className="t-h2" lines={["From formulation", ["to someone else’s ", { serif: "line." }]]} />
          <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {path.map((p, i) => (
              <li key={p.t} className="border-t border-rule-strong pt-5" data-reveal="fade" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
                <p className="t-label text-terra">Step {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-[1.5rem] font-medium tracking-[-0.03em]">{p.t}</p>
                <p className="mt-2 text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="pb-24">
        <div className="wrap grid gap-3 md:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden md:col-span-2 sketch-frame" data-reveal="image">
            <Photo name="processPlant" sizes="66vw" />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-panel p-6 md:p-8">
            <p className="t-serif text-[1.8rem] leading-tight">
              Start where you can learn fastest — then build when volume makes the case.
            </p>
            <div className="flex flex-col gap-3">
              <Cta href="/contact?service=manufacturing" variant="accent">
                Find your manufacturing path
              </Cta>
              <Cta href="/services/plant-setup" variant="ghost" dir="right">
                Or plan your own factory
              </Cta>
            </div>
          </div>
        </div>
        <p className="wrap t-label mt-6 text-muted">
          We do not publish a partner directory. Candidate manufacturers are identified and evaluated for each project.
        </p>
      </section>
      <JsonLd data={serviceSchema("Third-party food manufacturing support", "Contract manufacturer and co-packer identification, evaluation and technical transfer.", "/manufacturing")} />
    </>
  );
}
