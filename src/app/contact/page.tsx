import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { MaskLines } from "@/components/ui/Text";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start a Project",
  description: "Tell us about your food product, brand, factory or kitchen. A short multi-step enquiry — we’ll reply with next steps.",
  path: "/contact",
});

const expect = [
  { t: "We read it properly", d: "A member of the technical team reviews your enquiry — not an autoresponder." },
  { t: "We reply with questions", d: "Usually a few clarifying questions, and whether we’re the right fit." },
  { t: "We suggest a first step", d: "A discovery call, a scoped engagement or a pointer elsewhere if that serves you better." },
];

export default function ContactPage() {
  return (
    <section className="grain relative pb-24 pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+5rem)]">
      <div className="wrap relative z-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="t-label flex items-center gap-3 text-muted">
            <span aria-hidden className="h-2 w-2 rounded-full bg-lime ring-1 ring-forest/30" /> Start a project
          </p>
          <MaskLines as="h1" className="t-h1 mt-8" lines={["Let’s turn", "your idea into", ["something ", { serif: "real." }]]} />
          <ol className="mt-12 border-t border-rule">
            {expect.map((e, i) => (
              <li key={e.t} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-5">
                <span className="t-label pt-1 text-terra">0{i + 1}</span>
                <span>
                  <span className="block text-[1.1rem] font-medium tracking-[-0.015em]">{e.t}</span>
                  <span className="mt-1 block text-[0.95rem] text-muted">{e.d}</span>
                </span>
              </li>
            ))}
          </ol>
          {(site.email || site.phone) && (
            <div className="mt-10">
              <p className="t-label text-muted">Prefer to write directly?</p>
              {site.email && (
                <a href={`mailto:${site.email}`} className="link-u mt-2 inline-block text-[1.3rem]">
                  {site.email}
                </a>
              )}
              {site.phone && <p className="mt-1 text-muted">{site.phone}</p>}
            </div>
          )}
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
