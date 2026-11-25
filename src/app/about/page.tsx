import { PageHeader } from "@/components/ui/PageHeader";
import { Expertise } from "@/components/home/Proof";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Umami Labs",
  description:
    "Umami Labs exists to close the gap between food product innovation and commercialisation — combining food science, compliance and commercial reality in one team.",
  path: "/about",
});

const values = [
  { t: "Science + taste", d: "Products should be delicious and technically sound. One without the other doesn’t last." },
  { t: "Commercial reality", d: "Cost, yield and scale are design inputs, not afterthoughts." },
  { t: "Compliance from day one", d: "We consider regulation before trials, not after launch plans." },
  { t: "Founder-friendly", d: "Clear language, honest feasibility and plans sized to your stage." },
  { t: "Long-term partnership", d: "We stay available for the questions that come after launch." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Umami Labs"
        title={["We believe good food", ["deserves good ", { serif: "engineering." }]]}
        image="dough"
      />

      <section aria-labelledby="why" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <p className="t-label text-muted lg:col-span-3">01 — Why we exist</p>
          <div className="lg:col-span-8">
            <h2 id="why" className="t-h3 max-w-[26ch]">
              Between a great recipe and a product on a shelf sits a gap most food ideas fall into.
            </h2>
            <div className="mt-8 grid gap-6 text-muted md:grid-cols-2">
              <p>
                Food entrepreneurs and businesses usually meet that gap one specialist at a time: a formulator, then a regulatory
                consultant, then an engineer, then a costing advisor, then a manufacturer, then an agency. Each does good work. But
                decisions made in isolation collide later — in the label, on the line or in the margin.
              </p>
              <p>
                Umami Labs brings those disciplines into one coordinated team. The product, its compliance, its costing, its
                manufacturing feasibility and its commercial strategy are considered together from the beginning — so ideas become
                products that can actually be made, registered and sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="deep grain" aria-labelledby="philosophy">
        <div className="wrap relative z-10 grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="t-label text-band-muted">02 — Philosophy</p>
            <MaskLines id="philosophy" className="t-h1 mt-6" lines={["Science.", [{ serif: "Taste." }], "Commercial reality."]} />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9 sketch-frame" data-reveal="image">
            <Photo name="spicesDark" sizes="33vw" />
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="section">
        <div className="wrap">
          <p className="t-label text-muted">03 — Values</p>
          <h2 id="values" className="sr-only">
            Values
          </h2>
          <ol className="mt-8">
            {values.map((v, i) => (
              <li key={v.t} className="grid items-baseline gap-4 border-t border-rule py-6 md:grid-cols-12" data-reveal="fade">
                <span className="t-label text-terra md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.7rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.04em] md:col-span-6">{v.t}</span>
                <span className="text-muted md:col-span-5">{v.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Expertise />

      <section aria-labelledby="vision" className="section bg-panel">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <p className="t-label text-muted lg:col-span-3">05 — Vision</p>
          <div className="lg:col-span-8">
            <h2 id="vision" className="t-h2 max-w-[20ch]">
              More good food ideas, <span className="t-serif">made real.</span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-muted">
              Our long-term aim is simple: to make the path from idea to commercial food product clearer, faster and less wasteful
              for the businesses who take it — and to help build products people trust.
            </p>
            {/* Facilities and partners: add only verified information here. */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Cta href="/contact" variant="accent">
                Start a project
              </Cta>
              <Cta href="/approach" variant="ghost" dir="right">
                Our approach
              </Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
