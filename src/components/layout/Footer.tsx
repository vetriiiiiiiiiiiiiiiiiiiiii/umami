import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { categories } from "@/content/services";
import { ThemeToggle } from "./ThemeToggle";
import { BackToTop } from "./BackToTop";
import { MaskLines } from "@/components/ui/Text";

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  const year = 2026;
  return (
    <footer className="deep grain relative overflow-hidden" aria-labelledby="footer-heading">
      {/* animated formula line */}
      <svg aria-hidden className="absolute inset-x-0 top-0 h-24 w-full" viewBox="0 0 1440 96" preserveAspectRatio="none">
        <path
          d="M0 48 C 180 48, 220 12, 360 12 S 560 84, 720 84 S 940 12, 1080 12 S 1300 48, 1440 48"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          pathLength={1}
          className="draw"
          data-reveal="draw"
          style={{ opacity: 0.6 }}
        />
      </svg>

      <div className="wrap relative z-10 pb-10 pt-28 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-label mb-8 text-band-muted">Next step / Start a project</p>
            <MaskLines
              as="h2"
              id="footer-heading"
              className="t-h1"
              lines={["Let’s make", ["something ", { serif: "matter." }]]}
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="cta cta--accent">
                <span>Start a project</span>
                <span aria-hidden className="cta-arrow">↗</span>
              </Link>
              <Link href="/navigator" className="cta cta--ghost">
                <span>Find your next step</span>
                <span aria-hidden className="cta-arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="t-label mb-4 text-band-muted">Navigate</p>
              <ul className="space-y-2">
                {footerNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-u text-[0.95rem]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <p className="t-label mb-4 text-band-muted">Capabilities</p>
              <ul className="columns-1 gap-6 space-y-2 sm:columns-2">
                {categories.slice(0, 10).map((c) => (
                  <li key={c.slug} className="break-inside-avoid">
                    <Link href={`/services/${c.slug}`} className="link-u text-[0.95rem]">
                      {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <p className="t-label mb-3 text-band-muted">Contact</p>
              {site.email ? (
                <a href={`mailto:${site.email}`} className="link-u text-[1.1rem]">
                  {site.email}
                </a>
              ) : (
                <Link href="/contact" className="link-u text-[1.1rem]">
                  Send us your project brief
                </Link>
              )}
              {site.phone && <p className="mt-1 text-band-muted">{site.phone}</p>}
              {socials.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-4">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="t-label link-u">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* the logo, large */}
        <div className="mt-20 flex flex-col items-center gap-2 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/umami-labz-jar.png" alt="" width={760} height={604} className="float h-36 w-auto md:h-48" />
          <p aria-hidden className="select-none font-[family-name:var(--ff-display)] text-[clamp(3.6rem,13vw,11rem)] font-extrabold leading-[0.9] tracking-[0.02em] text-[#f4a9bd] [text-shadow:0.04em_0.04em_0_#070405]">
            UMAMI
          </p>
          <p aria-hidden className="font-[family-name:var(--ff-display)] text-[clamp(2rem,6vw,5rem)] font-extrabold leading-none tracking-[0.04em] text-[#f3b083] [text-shadow:0.04em_0.04em_0_#070405]">LABZ</p>
          <p aria-hidden className="mt-6 flex items-center gap-4 text-[0.85rem] font-bold tracking-[0.3em] text-band-muted">
            <span className="h-px w-16 bg-current opacity-60" />
            EST. 2026
            <span className="h-px w-16 bg-current opacity-60" />
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-rule pt-6 md:flex-row md:items-center md:justify-between">
          <p className="t-label text-band-muted">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="t-label link-u">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="t-label link-u">
                Terms
              </Link>
            </li>
            <li>
              <ThemeToggle showLabel />
            </li>
            <li>
              <BackToTop />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
