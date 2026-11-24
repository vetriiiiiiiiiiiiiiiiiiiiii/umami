import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] items-center pt-[var(--nav-h)]">
      <div className="wrap">
        <p className="t-label text-muted">Error 404 — Sample not found</p>
        <h1 className="t-display mt-6">
          This batch <span className="t-serif">didn’t</span>
          <br /> make it.
        </h1>
        <p className="mt-6 max-w-[44ch] text-muted">The page you’re looking for has moved or never existed.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="cta cta--accent">
            <span>Back to home</span>
            <span aria-hidden className="cta-arrow">↗</span>
          </Link>
          <Link href="/services" className="cta cta--ghost">
            <span>Explore services</span>
            <span aria-hidden className="cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
