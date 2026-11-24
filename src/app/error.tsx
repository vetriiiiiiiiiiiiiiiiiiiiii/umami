"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[70svh] items-center pt-[var(--nav-h)]">
      <div className="wrap">
        <p className="t-label text-muted">Something went wrong</p>
        <h1 className="t-h1 mt-6">
          An unexpected <span className="t-serif">reaction.</span>
        </h1>
        <p className="mt-6 max-w-[44ch] text-muted">This section failed to load. Please try again.</p>
        <button type="button" onClick={reset} className="cta cta--accent mt-10">
          <span>Try again</span>
          <span aria-hidden className="cta-arrow">↻</span>
        </button>
      </div>
    </section>
  );
}
