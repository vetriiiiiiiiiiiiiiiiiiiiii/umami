import { marketingPillars } from "@/content/marketing";
import { Photo } from "@/components/ui/Photo";
import { MaskLines } from "@/components/ui/Text";
import { Cta } from "@/components/ui/Cta";

export function BrandMarketing() {
  const marquee = marketingPillars.flatMap((p) => p.items.slice(0, 4));
  return (
    <section aria-labelledby="brand-title" className="section relative overflow-hidden">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <MaskLines id="brand-title" className="t-h1" lines={["Built in the lab.", ["Built for the ", { serif: "market." }]]} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="t-lead text-muted">
            Great products need more than great recipes. Our brand and marketing work starts from what the product actually is —
            its formulation, its claims, its cost — so the story you tell is one the product can keep.
          </p>
          <div className="mt-8">
            <Cta href="/marketing">Build your food brand</Cta>
          </div>
        </div>
      </div>

      <div className="wrap mt-16 grid gap-3 md:grid-cols-4">
        {marketingPillars.slice(0, 4).map((p, i) => (
          <a
            key={p.n}
            href={`/marketing#${p.n.toLowerCase()}`}
            className={`zoom-img group relative block overflow-hidden bg-panel ${i === 0 ? "aspect-[4/5] md:row-span-2 md:aspect-auto" : "aspect-[16/10]"} ${i === 0 ? "md:col-span-2" : i === 3 ? "md:col-span-2" : ""}`}
            data-reveal="fade"
            style={{ ["--d" as string]: `${i * 90}ms` }}
          >
            <Photo name={p.image} sizes="(min-width:768px) 40vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,14,0.78)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-[#f1f0e7]">
              <p className="t-label opacity-75">{p.n}</p>
              <p className="mt-1 text-[1.4rem] font-medium tracking-[-0.025em]">{p.title}</p>
              <p className="mt-1 text-[0.85rem] opacity-80">{p.items.slice(0, 4).join(" · ")}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 overflow-hidden border-y border-rule py-5" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-[clamp(1.4rem,2.6vw,2.4rem)] tracking-[-0.03em]">
              {i % 3 === 1 ? <span className="t-serif">{m}</span> : m}
              <span className="h-2 w-2 rounded-full bg-terra" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
