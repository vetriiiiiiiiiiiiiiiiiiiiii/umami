import Image from "next/image";
import { caseStudies, caseStudySlots, testimonials, team, disciplines } from "@/content/proof";
import { Photo } from "@/components/ui/Photo";
import { MaskLines } from "@/components/ui/Text";
import { ArrowLink } from "@/components/ui/Cta";

/** Case studies — shows verified entries, otherwise an honest description of the format. */
export function Proof() {
  const hasCases = caseStudies.length > 0;
  return (
    <section aria-labelledby="proof-title" className="section">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <MaskLines id="proof-title" className="t-h2" lines={["Problem → Approach →", [{ serif: "Result." }]]} />
          </div>
          <p className="text-muted lg:col-span-4 lg:col-start-9">
            {hasCases
              ? "Selected projects, documented with the permission of the businesses involved."
              : "We publish case studies only when they are verified and approved by the businesses involved. Each will follow this format — the problem, the technical work and what actually changed."}
          </p>
        </div>

        {hasCases ? (
          <div className="mt-14 space-y-6">
            {caseStudies.map((cs) => (
              <article key={cs.slug} className="grid gap-6 border-t border-rule-strong pt-6 md:grid-cols-12">
                <div className="relative aspect-[4/3] overflow-hidden md:col-span-4">
                  <Photo name={cs.image} sizes="33vw" />
                </div>
                <div className="md:col-span-8">
                  <p className="t-label text-muted">
                    {cs.category} — {cs.client}
                  </p>
                  <dl className="mt-4 grid gap-6 md:grid-cols-3">
                    {[
                      ["Problem", cs.problem],
                      ["Approach", cs.approach],
                      ["Result", cs.result],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="t-label text-terra">{k}</dt>
                        <dd className="mt-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <ol className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3" aria-label="Case study formats in preparation">
            {caseStudySlots.map((s, i) => (
              <li key={s.kind} className="group relative bg-canvas p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="t-label text-muted">Case file {String(i + 1).padStart(2, "0")}</p>
                  <p className="t-label border border-dashed border-rule-strong px-2 py-0.5 text-muted">In documentation</p>
                </div>
                <p className="mt-6 text-[1.35rem] font-medium tracking-[-0.025em]">{s.kind}</p>
                <div className="relative mt-5 aspect-[16/9] overflow-hidden opacity-70 grayscale transition duration-700 group-hover:opacity-100 group-hover:grayscale-0">
                  <Photo name={s.image} sizes="30vw" decorative />
                </div>
                <dl className="mt-5 space-y-2 text-[0.88rem]">
                  {["Problem", "Approach", "Result"].map((k) => (
                    <div key={k} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
                      <dt className="t-label text-muted">{k}</dt>
                      <dd aria-label="To be published" className="h-px bg-[repeating-linear-gradient(90deg,var(--color-border-strong)_0_4px,transparent_4px_8px)]" />
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

/** Testimonials render only when real, approved quotes exist. In development an honest placeholder is shown. */
export function Testimonials() {
  if (!testimonials.length) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="wrap py-10" aria-label="Testimonials placeholder (development only)">
        <div className="border border-dashed border-terra p-6 text-center">
          <p className="t-label text-terra">Development preview only — hidden in production</p>
          <p className="mt-2 text-muted">Add approved client quotes to src/content/proof.ts to enable the testimonials section.</p>
        </div>
      </section>
    );
  }
  const t = testimonials[0];
  return (
    <section className="section bg-panel" aria-label="Testimonials">
      <figure className="wrap">
        <blockquote className="t-h2 max-w-[24ch]">
          <span className="t-serif">“</span>
          {t.quote}”
        </blockquote>
        <figcaption className="t-label mt-8 text-muted">
          {t.name} — {t.role}, {t.company}
        </figcaption>
      </figure>
    </section>
  );
}

/** Team & expertise — disciplines always; profiles when real members are added. */
export function Expertise() {
  return (
    <section aria-labelledby="team-title" className="section border-t border-rule">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <MaskLines id="team-title" className="t-h2" lines={["The people", ["behind the ", { serif: "process." }]]} />
          <p className="mt-6 max-w-[40ch] text-muted">
            Food technologists, regulatory specialists, engineers, quality professionals and brand strategists — working on the same
            project, at the same time.
          </p>
          <ArrowLink href="/about" className="mt-6">
            About Umami Labs
          </ArrowLink>
        </div>
        <div className="lg:col-span-8">
          {team.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-panel">
                    {m.photo && <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover grayscale" />}
                  </div>
                  <p className="mt-3 text-[1.1rem] font-medium">{m.name}</p>
                  <p className="t-label text-muted">{m.role}</p>
                  <p className="mt-2 text-[0.92rem] text-muted">{m.bio}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ol className="border-t border-rule-strong">
              {disciplines.map((d, i) => (
                <li key={d.title} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-rule py-5 md:grid-cols-[4rem_1fr_1fr]" data-reveal="fade" style={{ ["--d" as string]: `${i * 50}ms` }}>
                  <span className="t-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">{d.title}</span>
                  <span className="col-start-2 text-[0.92rem] text-muted md:col-start-3">{d.note}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
