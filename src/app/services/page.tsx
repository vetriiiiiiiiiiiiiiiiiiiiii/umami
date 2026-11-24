import { categories, featureServices, serviceGroups } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { HoverList, type HoverItem } from "@/components/service/HoverList";
import { Cta } from "@/components/ui/Cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Food Consultancy Services",
  description:
    "Food product development, R&D, FSSAI and regulatory compliance, food safety, plant setup, costing, packaging, testing, export, manufacturing partnerships and brand strategy — from one coordinated team.",
  path: "/services",
});

const itemFor = (slug: string): HoverItem => {
  const c = categories.find((x) => x.slug === slug);
  if (c) return { n: c.n, title: c.title, summary: c.summary, href: `/services/${c.slug}`, image: c.image };
  const f = featureServices.find((x) => x.slug === slug)!;
  return { n: f.n, title: f.title, summary: f.summary, href: f.href, image: f.image };
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services / 17 disciplines"
        title={["Seventeen ways in.", ["One way ", { serif: "through." }]]}
        intro={
          <p>
            Most food projects need several of these at once. We organise them as one team, so formulation, compliance,
            manufacturing and market decisions are made together — and nothing is lost between handoffs.
          </p>
        }
      />
      {serviceGroups.map((g, gi) => (
        <section key={g.label} aria-labelledby={`grp-${g.n}`} className={`pb-20 md:pb-28 ${gi === 0 ? "" : "pt-4"}`}>
          <div className="wrap grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-[clamp(3.5rem,7vw,6rem)] font-medium leading-[0.8] tracking-[-0.06em] text-terra">{g.n}</p>
                <h2 id={`grp-${g.n}`} className="t-h3 mt-4">
                  {g.label}
                </h2>
                <p className="mt-2 max-w-[30ch] text-[0.95rem] text-muted">{g.blurb}</p>
              </div>
            </div>
            <div className="lg:col-span-9">
              <HoverList items={g.items.map(itemFor)} />
            </div>
          </div>
        </section>
      ))}
      <section className="deep grain">
        <div className="wrap relative z-10 grid gap-8 py-20 md:grid-cols-12 md:items-center md:py-28">
          <h2 className="t-h2 md:col-span-7">
            Not sure where to start? <span className="t-serif text-lime">That’s normal.</span>
          </h2>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Cta href="/navigator" variant="accent">
              Use the navigator
            </Cta>
            <Cta href="/contact" variant="ghost">
              Start a project
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}
