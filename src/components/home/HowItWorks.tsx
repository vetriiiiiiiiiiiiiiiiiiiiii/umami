import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";

const steps: { n: string; title: string; text: string; items: string[]; href: string; image: ImageKey }[] = [
  {
    n: "01",
    title: "Develop",
    text: "We turn your idea into a recipe that tastes right, costs right and runs on a real line.",
    items: ["Formulation & R&D", "Prototypes & pilot batches", "Shelf-life & testing"],
    href: "/services/product-development",
    image: "labPipette",
  },
  {
    n: "02",
    title: "Comply",
    text: "Category, labels and claims are checked before trials — not discovered at the end.",
    items: ["FSSAI licensing", "Label & claims review", "Food safety systems"],
    href: "/services/regulatory-compliance",
    image: "labGlass",
  },
  {
    n: "03",
    title: "Produce",
    text: "Your own plant or the right contract manufacturer — planned, costed and commissioned.",
    items: ["Plant setup & DPR", "Co-packers & partners", "Cost optimisation"],
    href: "/services/plant-setup",
    image: "processPlant",
  },
  {
    n: "04",
    title: "Launch",
    text: "Packaging, positioning and channels that fit what the product actually is.",
    items: ["Packaging & labelling", "Brand & go-to-market", "E-commerce & D2C"],
    href: "/marketing",
    image: "chips",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="how-title" className="t-h2">
              One team. <span className="t-serif">The entire journey.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-muted">
              Most founders hire separate consultants for recipe, compliance, factory and branding — and lose time in every
              handoff. We plan all of it together from day one, so nothing has to be redone later.
            </p>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="group flex flex-col bg-canvas" data-reveal="fade" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <Link href={s.href} className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-baseline justify-between">
                  <span className="t-label text-terra">Step {s.n}</span>
                  <span aria-hidden className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
                    ↗
                  </span>
                </div>
                <div className="zoom-img relative mt-5 aspect-[4/3] overflow-hidden bg-panel">
                  <Photo name={s.image} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
                <h3 className="mt-5 text-[1.5rem] font-medium tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
                <ul className="mt-auto space-y-1 pt-5 text-[0.9rem]">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span aria-hidden className="text-terra">—</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.92rem] text-muted">
          <span>
            <span className="font-medium text-ink">Compliance-first:</span> every formulation is checked against applicable
            regulations before trials.
          </span>
          <Link href="/approach" className="t-label link-u text-ink">
            Read our approach →
          </Link>
        </p>
      </div>
    </section>
  );
}
