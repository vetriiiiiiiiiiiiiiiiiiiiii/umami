import { PageHeader } from "@/components/ui/PageHeader";
import { marketingPillars } from "@/content/marketing";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";
import { JsonLd, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Food Branding, Marketing & E-commerce",
  description:
    "Food brand strategy, positioning, packaging direction, go-to-market, digital marketing, e-commerce and quick-commerce, content and sales enablement — grounded in food science.",
  path: "/marketing",
});

export default function MarketingPage() {
  return (
    <>
      <PageHeader
        label="Brand, marketing & digital"
        title={["Built in the lab.", ["Built for the ", { serif: "market." }]]}
        intro={
          <p>
            A creative studio with food-science credibility. We build brands, packs and launches around what the product really
            is — its formulation, its claims and its cost — so the promise on the front of pack holds up on the back.
          </p>
        }
        aside={
          <div className="flex flex-wrap gap-3">
            <Cta href="/contact?service=brand-marketing" variant="accent">
              Build your food brand
            </Cta>
          </div>
        }
      />
      <nav aria-label="Marketing disciplines" className="wrap sticky top-[var(--nav-h)] z-30 -mt-4 mb-10 hidden border-y border-rule bg-[var(--nav-surface)] backdrop-blur-md md:block">
        <ul className="flex gap-6 overflow-x-auto py-3">
          {marketingPillars.map((p) => (
            <li key={p.n}>
              <a href={`#${p.n.toLowerCase()}`} className="t-label link-u whitespace-nowrap text-muted hover:text-ink">
                {p.n} {p.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {marketingPillars.map((p, i) => (
        <section key={p.n} id={p.n.toLowerCase()} aria-labelledby={`${p.n}-t`} className="scroll-mt-32 border-t border-rule py-16 md:py-24">
          <div className={`wrap grid items-center gap-10 lg:grid-cols-12 ${i % 2 ? "" : ""}`}>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <p className="t-label text-terra">{p.n}</p>
              <MaskLines id={`${p.n}-t`} className="t-h2 mt-4" lines={[p.title]} />
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.items.map((it) => (
                  <li key={it} className="border border-rule-strong px-3 py-1.5 text-[0.92rem]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative overflow-hidden lg:col-span-6 ${i % 2 ? "lg:order-1 aspect-[4/3]" : "lg:col-start-7 aspect-[16/11]"}`} data-reveal="image">
              <Photo name={p.image} sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          </div>
        </section>
      ))}
      <section className="deep grain">
        <div className="wrap relative z-10 grid gap-8 py-20 md:grid-cols-12 md:items-end md:py-28">
          <MaskLines className="t-h1 md:col-span-8" lines={["Great products need", ["more than great ", { serif: "recipes." }]]} />
          <div className="md:col-span-4 md:justify-self-end">
            <Cta href="/contact?service=brand-marketing" variant="accent">
              Build your food brand
            </Cta>
          </div>
        </div>
      </section>
      <JsonLd data={serviceSchema("Food branding and marketing", "Brand strategy, packaging direction, go-to-market, digital marketing and e-commerce for food brands.", "/marketing")} />
    </>
  );
}
