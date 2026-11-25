import Link from "next/link";
import { launchPackage as pkg } from "@/content/package";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";

export function LaunchPackage({ compact = false }: { compact?: boolean }) {
  const allConfirmed = pkg.deliverables.every((d) => d.confirmed);
  return (
    <section id="package" aria-labelledby="package-title" className="section bg-panel">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MaskLines
              id="package-title"
              className="t-h2"
              lines={["The", ["Launch-Ready ", { serif: "package" }]]}
            />
            <p className="t-lead mt-6 max-w-[42ch] text-muted">{pkg.summary}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="max-w-[52ch] text-muted">
              Designed for founders who want the whole picture before they commit — formulation, compliance, cost and
              manufacturing feasibility, considered together in one engagement.
            </p>
          </div>
        </div>

        {/* dossier */}
        <article
          data-reveal="fade"
          className="sketch-card relative mt-14 overflow-hidden"
          aria-label="Launch-Ready Package dossier"
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3 md:px-8">
            <span className="t-label text-ink">Dossier / LRP-01</span>
            <span className="t-label text-muted">{allConfirmed ? "Scope confirmed" : "Proposed scope — confirmed after discovery"}</span>
          </header>

          <div className="grid md:grid-cols-12">
            <dl className="border-b border-rule md:col-span-4 md:border-b-0 md:border-r">
              {[
                ["Scope", "Concept to commercially prepared product"],
                ["Format", "Structured, fixed-scope engagement"],
                ["Timeline", pkg.timeline || "Confirmed during discovery"],
                ["Investment", pkg.price || "Shared after discovery"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule px-5 py-4 last:border-b-0 md:px-8">
                  <dt className="t-label pt-0.5 text-muted">{k}</dt>
                  <dd className="text-[0.95rem]">{v}</dd>
                </div>
              ))}
              <div className={`px-5 py-6 md:px-8 ${compact ? "hidden md:block" : ""}`}>
                <p className="t-label mb-3 text-muted">Process</p>
                <ol className="space-y-3">
                  {pkg.process.map((p, i) => (
                    <li key={p.title} className="grid grid-cols-[2rem_1fr] items-baseline">
                      <span className="t-label text-terra">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="font-medium">{p.title}</span>
                        <span className="block text-[0.88rem] text-muted">{p.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </dl>

            <div className="md:col-span-8">
              <p className="t-label border-b border-rule px-5 py-3 text-muted md:px-8">Deliverables</p>
              <ol>
                {pkg.deliverables.map((d, i) => (
                  <li
                    key={d.title}
                    className="group grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-rule px-5 py-4 transition-colors last:border-b-0 hover:bg-panel md:grid-cols-[3.5rem_1fr_auto] md:px-8"
                  >
                    <span className="text-[1.6rem] font-medium leading-none tracking-[-0.04em] text-muted transition-colors group-hover:text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[1.08rem] tracking-[-0.01em]">{d.title}</span>
                      <span className="mt-0.5 block max-w-[60ch] text-[0.9rem] text-muted">{d.detail}</span>
                    </span>
                    {!d.confirmed && (
                      <span className="t-label col-start-2 mt-2 self-start justify-self-start border border-rule px-2 py-0.5 text-muted md:col-start-3 md:mt-0">
                        Proposed
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {compact ? (
            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-rule-strong px-5 py-5 md:px-8">
              <Link href="/approach#package" className="t-label link-u text-ink">
                Process, add-ons &amp; FAQ →
              </Link>
              <Cta href="/contact?type=launch-ready-package" variant="accent">
                Discuss the package
              </Cta>
            </footer>
          ) : (
          <footer className="grid border-t border-rule-strong md:grid-cols-12">
            <div className="border-b border-rule px-5 py-6 md:col-span-4 md:border-b-0 md:border-r md:px-8">
              <p className="t-label mb-3 text-muted">Optional add-ons</p>
              <ul className="space-y-1.5 text-[0.95rem]">
                {pkg.addOns.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span aria-hidden className="text-terra">+</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 py-6 md:col-span-8 md:px-8">
              <p className="t-label mb-2 text-muted">Questions</p>
              {pkg.faq.map((f) => (
                <details key={f.q} className="group border-b border-rule last:border-b-0">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[1rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="t-label shrink-0 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-4 text-[0.95rem] text-muted">{f.a}</p>
                </details>
              ))}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Cta href="/contact?type=launch-ready-package" variant="accent">
                  Discuss the package
                </Cta>
                <p className="text-[0.85rem] text-muted">No guarantees of approvals or launch dates — just a clear, honest plan.</p>
              </div>
            </div>
          </footer>
          )}
        </article>
      </div>
    </section>
  );
}
