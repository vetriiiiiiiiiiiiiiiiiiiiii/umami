import Link from "next/link";
import { categories, stageMeta, hrefFor, titleFor, type ServiceCategory } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";

function ServicesSplit({ c }: { c: ServiceCategory }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden" data-reveal="image">
            <Photo name={c.secondaryImage} sizes="(min-width:1024px) 38vw, 100vw" />
          </div>
          <p className="t-label mt-4 flex justify-between text-muted">
            <span>Fig. {c.n}</span>
            <span>{c.services.length} capabilities</span>
          </p>
        </div>
      </div>
      <ol className="border-t border-rule-strong lg:col-span-7">
        {c.services.map((s, i) => (
          <li key={s} className="group grid grid-cols-[3rem_1fr_auto] items-baseline border-b border-rule py-4" data-reveal="fade" style={{ ["--d" as string]: `${(i % 6) * 40}ms` }}>
            <span className="t-label text-muted">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[clamp(1.15rem,1.8vw,1.6rem)] tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-2">{s}</span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime opacity-0 transition-opacity group-hover:opacity-100" />
          </li>
        ))}
      </ol>
    </div>
  );
}

function ServicesIndex({ c }: { c: ServiceCategory }) {
  return (
    <div>
      <ul className="columns-1 gap-10 sm:columns-2 lg:columns-3">
        {c.services.map((s, i) => (
          <li key={s} className="mb-0 flex break-inside-avoid items-baseline gap-4 border-t border-rule py-3.5">
            <span className="t-label w-7 shrink-0 text-terra">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[1.1rem] tracking-[-0.015em]">{s}</span>
          </li>
        ))}
      </ul>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        <div className="relative aspect-[4/3] overflow-hidden md:col-span-2" data-reveal="image">
          <Photo name={c.secondaryImage} sizes="66vw" />
        </div>
        <div className="flex flex-col justify-between border border-rule p-6">
          <p className="t-label text-muted">In practice</p>
          <p className="t-serif mt-6 text-[1.7rem] leading-tight">{c.summary}</p>
        </div>
      </div>
    </div>
  );
}

function ServicesLedger({ c }: { c: ServiceCategory }) {
  const half = Math.ceil(c.services.length / 2);
  const cols = [c.services.slice(0, half), c.services.slice(half)];
  return (
    <div className="border border-rule-strong">
      <div className="grid grid-cols-[1fr_auto] border-b border-rule-strong bg-panel px-5 py-3">
        <span className="t-label">Ledger / {c.title}</span>
        <span className="t-label text-muted">{c.services.length} items</span>
      </div>
      <div className="grid md:grid-cols-2">
        {cols.map((col, ci) => (
          <ol key={ci} start={ci * half + 1} className={ci ? "md:border-l md:border-rule" : ""}>
            {col.map((s, i) => (
              <li key={s} className="grid grid-cols-[3rem_1fr] border-b border-rule px-5 py-3 last:border-b-0 md:last:border-b">
                <span className="t-label pt-1 text-muted">{String(ci * half + i + 1).padStart(2, "0")}</span>
                <span className="text-[1.02rem]">{s}</span>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </div>
  );
}

export function ServiceTemplate({ c }: { c: ServiceCategory }) {
  const stage = stageMeta[c.stage];
  const idx = categories.findIndex((x) => x.slug === c.slug);
  const next = categories[(idx + 1) % categories.length];
  return (
    <>
      <PageHeader
        label={`Service ${c.n} / ${stage.name} stage — ${stage.label}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: c.short, href: `/services/${c.slug}` },
        ]}
        title={[c.headline[0], [c.headline[1].replace(/\.$/, ""), { serif: "." }]]}
        aside={
          <div className="border-l border-rule pl-5">
            <p className="t-label text-muted">{c.title}</p>
            <p className="mt-2 text-[1.02rem]">{c.summary}</p>
          </div>
        }
        intro={<p>{c.intro}</p>}
        image={c.image}
      />

      <section aria-labelledby="svc-list" className="section">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="svc-list" className="t-h2">
              What we <span className="t-serif">cover</span>
            </h2>
            <Cta href={`/contact?service=${c.slug}`} variant="accent">
              {c.cta.label}
            </Cta>
          </div>
          {c.variant === "split" ? <ServicesSplit c={c} /> : c.variant === "index" ? <ServicesIndex c={c} /> : <ServicesLedger c={c} />}
        </div>
      </section>

      <section aria-labelledby="svc-q" className="deep grain section">
        <div className="wrap relative z-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label text-band-muted">Questions we help answer</p>
            <h2 id="svc-q" className="t-h3 mt-4 max-w-[18ch]">
              The decisions this work <span className="t-serif text-lime">informs.</span>
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {c.questions.map((q, i) => (
              <li key={q} className="grid grid-cols-[3rem_1fr] border-t border-rule py-6" data-reveal="fade" style={{ ["--d" as string]: `${i * 100}ms` }}>
                <span className="t-label pt-2 text-lime">Q{i + 1}</span>
                <p className="text-[clamp(1.3rem,2.4vw,2.1rem)] leading-[1.15] tracking-[-0.025em]">{q}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="svc-connect" className="section">
        <div className="wrap">
          <h2 id="svc-connect" className="t-h2 max-w-[18ch]">
            How it <span className="t-serif">connects.</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-muted">
            {c.title} is planned alongside the rest of your project — not handed off. These disciplines usually work on it together.
          </p>
          {/* stage strip */}
          <ol className="mt-12 grid grid-cols-2 border-t border-rule-strong md:grid-cols-4">
            {(Object.keys(stageMeta) as (keyof typeof stageMeta)[]).map((k) => {
              const s = stageMeta[k];
              const on = k === c.stage;
              return (
                <li key={k} className={`border-b border-r border-rule p-5 ${on ? "bg-lime text-lime-ink" : ""}`}>
                  <p className="t-label">{s.n}</p>
                  <p className="mt-6 text-[1.4rem] font-medium tracking-[-0.03em]">{s.name}</p>
                  <p className={`t-label mt-1 ${on ? "" : "text-muted"}`}>{on ? "This service" : s.label}</p>
                </li>
              );
            })}
          </ol>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {c.related.map((r) => (
              <li key={r}>
                <Link href={hrefFor(r)} className="group flex items-center justify-between border border-rule p-5 transition-colors hover:border-ink">
                  <span className="text-[1.1rem] tracking-[-0.015em]">{titleFor(r)}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
          <MaskLines className="t-h1 md:col-span-8" lines={["Ready when", ["you ", { serif: "are." }]]} />
          <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
            <Cta href={`/contact?service=${c.slug}`} variant="accent">
              {c.cta.label}
            </Cta>
            <Link href={`/services/${next.slug}`} className="t-label link-u text-muted">
              Next: {next.n} {next.short} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
