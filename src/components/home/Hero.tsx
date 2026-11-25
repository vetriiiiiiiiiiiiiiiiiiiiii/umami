import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Arrow, Note, Scribble, SketchIcon, Wash } from "@/components/ui/Sketch";

const SERVICES = [
  { label: "Product formulation", href: "/services/product-development" },
  { label: "FSSAI & compliance", href: "/services/regulatory-compliance" },
  { label: "Plant setup", href: "/services/plant-setup" },
  { label: "Manufacturing partners", href: "/manufacturing" },
  { label: "Branding & marketing", href: "/marketing" },
];

const d = (ms: number) => ({ ["--hd" as string]: `${ms}ms` }) as CSSProperties;

/** Server-rendered; its entrance is pure CSS so it plays on first paint. */
export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="grain relative overflow-hidden pt-[var(--nav-h)]">
      <div className="wrap relative z-10 grid items-center gap-6 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-4">
        {/* message */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <p data-h="fade" style={d(0)} className="t-hand text-[1.2rem] text-terra sm:text-[clamp(1.35rem,1.9vw,1.8rem)]">
            food product consultancy —
          </p>
          <h1
            id="hero-title"
            className="t-display mt-3 text-ink"
            aria-label="From first formulation to full-scale production."
          >
            {[["From first"], ["formulation to"], ["full-scale"], ["production."]].map((line, i) => (
              <span key={i} data-h="line" className="mask-line" aria-hidden style={{ ...d(60 + i * 70), ...(line[0] === "full-scale" ? { paddingBottom: "0.24em", marginBottom: "-0.18em" } : {}) }}>
                <span>
                  {line[0] === "full-scale" ? (
                    <span className="t-inked relative inline-block">
                      full-scale
                      <Scribble className="absolute -bottom-[0.16em] left-0 h-[0.2em] w-full" />
                    </span>
                  ) : (
                    line[0]
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p data-h="fade" style={d(320)} className="t-lead mt-6 max-w-[46ch] text-muted">
            We help food founders and brands develop products, get them compliant and get them made — one team for recipe,
            regulation, factory and launch.
          </p>
          <div data-h="fade" style={d(400)} className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="cta">
              <span>Start a project</span>
              <span aria-hidden className="cta-arrow">↗</span>
            </Link>
            <Link href="/journey" className="cta cta--ghost">
              <span>See how a product is made</span>
              <span aria-hidden className="cta-arrow">→</span>
            </Link>
          </div>
          <ul data-h="fade" style={d(480)} className="mt-10 flex flex-wrap gap-2" aria-label="Core services">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="sketch-soft inline-block bg-raised px-3 py-1.5 text-[0.9rem] font-semibold transition-colors hover:border-ink">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* the jar, annotated like a page from a sketchbook */}
        <div className="relative order-1 mx-auto w-full max-w-[560px] lg:order-2 lg:col-span-6">
          <div className="relative aspect-[1/1.02]">
            <Wash tone="green" className="absolute inset-[6%] h-[88%] w-[88%]" opacity={0.5} />
            <Wash tone="blue" className="absolute bottom-[6%] right-[2%] h-[38%] w-[46%]" opacity={0.35} />

            <div data-h="visual" className="absolute inset-x-[4%] inset-y-[12%]">
              <div className="float relative h-full w-full">
                <Image
                  src="/brand/umami-labz-jar.png"
                  alt="Hand-drawn jar of green umami sauce between two laurel sprigs, labelled ‘Trends fade. Experiences remain. Contains umami.’"
                  fill
                  priority
                  sizes="(min-width:1024px) 40vw, 80vw"
                  className="object-contain drop-shadow-[0_18px_18px_rgba(27,30,52,0.18)]"
                />
              </div>
            </div>

            {/* annotations */}
            <div data-h="note" style={d(560)} className="absolute left-0 top-[6%] hidden w-[38%] sm:block">
              <Note>
                <span className="text-terra">1.</span> your idea
              </Note>
              <Arrow className="ml-[30%] mt-1 h-10 w-24 rotate-[18deg] text-ink" />
            </div>
            <div data-h="note" style={d(680)} className="absolute right-0 top-[2%] hidden w-[40%] text-right sm:block">
              <Note>
                <span className="text-terra">2.</span> a recipe that works
              </Note>
              <Arrow className="ml-auto mr-[38%] mt-1 h-10 w-24 -scale-x-100 rotate-[-14deg] text-ink" />
            </div>
            <div data-h="note" style={d(800)} className="absolute -right-2 bottom-[4%] hidden w-[30%] sm:block">
              <Arrow className="mb-1 h-10 w-16 -scale-x-100 rotate-[160deg] text-ink" />
              <Note>
                <span className="text-terra">3.</span> label checked
                <br />
                FSSAI ✓
              </Note>
            </div>
            <div data-h="note" style={d(920)} className="absolute bottom-[2%] left-[2%] hidden w-[42%] sm:block">
              <Arrow className="mb-1 ml-[44%] h-10 w-20 rotate-[-150deg] text-ink" />
              <Note>
                <span className="text-terra">4.</span> ready for the factory
              </Note>
            </div>

            {/* little doodles */}
            <SketchIcon name="flask" tone="purple" className="absolute left-[2%] top-[20%] hidden h-12 w-12 -rotate-12 sm:block" />
            <SketchIcon name="factory" tone="blue" className="absolute bottom-[2%] right-[34%] hidden h-12 w-12 rotate-6 sm:block" />
          </div>
          {/* compact story for phones */}
          <p className="t-hand -mt-2 text-center text-[1.05rem] text-ink sm:hidden">
            idea → recipe → label checked ✓ → factory
          </p>
        </div>
      </div>
    </section>
  );
}
