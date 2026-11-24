import { PageHeader } from "@/components/ui/PageHeader";
import { IndustryGrid } from "@/components/home/Industries";
import { getCategory } from "@/content/services";
import { Cta } from "@/components/ui/Cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Food Industries & Product Categories",
  description:
    "Category-specific food product development and compliance support for functional foods, nutraceuticals, beverages, millets, bakery, dairy, plant-based, snacks, sauces, frozen, ready-to-eat, sports nutrition, infant and clinical nutrition, and pet food.",
  path: "/industries",
});

export default function IndustriesPage() {
  const spec = getCategory("specialized-categories")!;
  return (
    <>
      <PageHeader
        label="Industries / 14 categories"
        title={["Every category", ["has its own ", { serif: "rules." }]]}
        intro={
          <p>
            A millet snack, a probiotic beverage and a pet food share almost nothing — not the process, not the regulation, not
            the consumer. We bring category-specific technical thinking to each.
          </p>
        }
      />
      <section aria-label="Categories" className="pb-20">
        <div className="wrap">
          <IndustryGrid />
          <p className="t-label mt-4 text-muted">Select a category to start an enquiry about it.</p>
        </div>
      </section>
      <section aria-labelledby="all-cats" className="section bg-panel">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="all-cats" className="t-h2">
              The full <span className="t-serif">index.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-muted">{spec.intro}</p>
            <div className="mt-8">
              <Cta href="/contact?service=specialized-categories" variant="accent">
                Discuss your category
              </Cta>
            </div>
          </div>
          <ul className="columns-2 gap-8 lg:col-span-8 lg:columns-3">
            {spec.services.map((s, i) => (
              <li key={s} className="flex break-inside-avoid gap-3 border-t border-rule py-3">
                <span className="t-label w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
