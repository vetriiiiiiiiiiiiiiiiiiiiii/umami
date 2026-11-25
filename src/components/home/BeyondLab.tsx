import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";

const cards: { label: string; title: string; text: string; cta: string; href: string; image: ImageKey }[] = [
  {
    label: "Manufacturing partnerships",
    title: "Don’t want to build a factory yet?",
    text: "We find and evaluate contract manufacturers and co-packers that fit your process, volumes and quality needs — and manage the technical transfer.",
    cta: "Find your manufacturing path",
    href: "/manufacturing",
    image: "processPlant",
  },
  {
    label: "Brand, marketing & digital",
    title: "Built in the lab. Built for the market.",
    text: "Positioning, packaging direction, launch strategy, e-commerce and digital marketing — grounded in what the product really is.",
    cta: "Build your food brand",
    href: "/marketing",
    image: "chips",
  },
];

export function BeyondLab() {
  return (
    <section aria-labelledby="beyond-title" className="section">
      <div className="wrap">
        <h2 id="beyond-title" className="t-h2 mt-4 max-w-[20ch]">
          From product to <span className="t-serif">market.</span>
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group zoom-img relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-panel p-6 text-[#f1f0e7] md:min-h-[520px] md:p-8 sketch-frame">
              <Photo name={c.image} sizes="(min-width:768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,14,0.94)] via-[rgba(12,18,14,0.6)] to-[rgba(12,18,14,0.1)]" />
              <div className="relative">
                <p className="t-label opacity-80">{c.label}</p>
                <p className="mt-3 max-w-[18ch] text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">{c.title}</p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] opacity-85">{c.text}</p>
                <span className="t-label mt-6 inline-flex items-center gap-2 text-lime">
                  <span className="link-u">{c.cta}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
