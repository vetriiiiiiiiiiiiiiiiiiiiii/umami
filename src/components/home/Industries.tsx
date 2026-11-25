import Link from "next/link";
import { industries } from "@/content/industries";
import { Photo } from "@/components/ui/Photo";
import { MaskLines } from "@/components/ui/Text";
import { ArrowLink } from "@/components/ui/Cta";

const span = {
  lg: "col-span-2 row-span-2 md:col-span-6 md:row-span-2",
  md: "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  sm: "col-span-1 row-span-1 md:col-span-3 md:row-span-1",
};

export function IndustryGrid({ linkTo = "category" }: { linkTo?: "category" | "page" }) {
  return (
    <ul className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-2 md:auto-rows-[190px] md:grid-cols-12 md:gap-3">
      {industries.map((ind, i) => (
        <li key={ind.name} className={span[ind.size]} data-reveal="fade" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
          <Link
            href={linkTo === "page" ? "/industries" : `/contact?category=${encodeURIComponent(ind.name)}`}
            className="zoom-img group relative block h-full overflow-hidden bg-panel sketch-frame"
          >
            <Photo name={ind.image} sizes="(min-width: 768px) 40vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,14,0.82)] via-[rgba(12,18,14,0.15)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-[#f1f0e7] md:p-5">
              <p className="t-label opacity-70">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 flex items-baseline justify-between gap-3 text-[1.05rem] font-medium leading-tight tracking-[-0.02em] md:text-[1.35rem]">
                {ind.name}
                <span aria-hidden className="translate-x-[-6px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  ↗
                </span>
              </p>
              <p className="mt-1 hidden max-h-0 overflow-hidden text-[0.85rem] leading-snug opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out)] group-hover:max-h-20 group-hover:opacity-90 group-focus-visible:max-h-20 group-focus-visible:opacity-90 md:block [@media(hover:none)]:max-h-20 [@media(hover:none)]:opacity-90">
                {ind.note}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Industries() {
  return (
    <section aria-labelledby="ind-title" className="section bg-panel">
      <div className="wrap">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <MaskLines id="ind-title" className="t-h2" lines={["Every category", ["has its own ", { serif: "rules." }]]} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              Processing behaviour, regulatory pathways and consumer expectations change from one category to the next. We bring
              category-specific technical thinking to each.
            </p>
            <ArrowLink href="/industries" className="mt-5">
              All industries
            </ArrowLink>
          </div>
        </div>
        <IndustryGrid />
      </div>
    </section>
  );
}
