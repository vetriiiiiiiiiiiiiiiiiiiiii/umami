import Link from "next/link";
import { Arrow, SketchIcon, type IconName } from "@/components/ui/Sketch";

const steps: { n: string; title: string; text: string; items: string[]; href: string; icon: IconName; tone: "green" | "blue" | "purple" }[] = [
  {
    n: "1",
    title: "Develop",
    text: "We turn your idea into a recipe that tastes right, costs right and runs on a real line.",
    items: ["Formulation & R&D", "Prototypes & pilot batches", "Shelf-life & testing"],
    href: "/services/product-development",
    icon: "flask",
    tone: "green",
  },
  {
    n: "2",
    title: "Comply",
    text: "Category, labels and claims are checked before trials — not discovered at the end.",
    items: ["FSSAI licensing", "Label & claims review", "Food safety systems"],
    href: "/services/regulatory-compliance",
    icon: "shield",
    tone: "blue",
  },
  {
    n: "3",
    title: "Produce",
    text: "Your own plant or the right contract manufacturer — planned, costed and commissioned.",
    items: ["Plant setup & DPR", "Co-packers & partners", "Cost optimisation"],
    href: "/services/plant-setup",
    icon: "factory",
    tone: "purple",
  },
  {
    n: "4",
    title: "Launch",
    text: "Packaging, positioning and channels that fit what the product actually is.",
    items: ["Packaging & labelling", "Brand & go-to-market", "E-commerce & D2C"],
    href: "/marketing",
    icon: "megaphone",
    tone: "green",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="how-title" className="t-h2">
              One team. <span className="t-serif">the entire journey.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-muted">
              Most founders hire separate consultants for recipe, compliance, factory and branding — and lose time in every
              handoff. We plan all of it together from day one, so nothing has to be redone later.
            </p>
          </div>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.n} className="relative" data-reveal="fade" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <Link
                href={s.href}
                className={`sketch-card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 ${i % 2 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.6deg]"}`}
              >
                <div className="flex items-start justify-between">
                  <span className="t-hand text-[2.6rem] leading-none text-terra">{s.n}.</span>
                  <SketchIcon name={s.icon} tone={s.tone} className="h-20 w-20 transition-transform duration-500 group-hover:rotate-6" />
                </div>
                <h3 className="t-h3 mt-4">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
                <ul className="mt-auto space-y-1 pt-5 text-[0.92rem] font-semibold">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span aria-hidden className="text-forest">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Link>
              {i < steps.length - 1 && (
                <Arrow className="absolute -right-7 top-1/2 z-10 hidden h-8 w-12 text-ink lg:block" d="M6 30 C 30 18, 70 18, 110 26" />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="t-hand text-[1.1rem] text-ink sm:text-[1.4rem]">
            psst — compliance is checked <span className="text-terra">before</span> trials, not after.
          </span>
          <Link href="/approach" className="t-label link-u text-ink">
            Read our approach →
          </Link>
        </p>
      </div>
    </section>
  );
}
