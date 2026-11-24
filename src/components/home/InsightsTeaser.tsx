import Link from "next/link";
import { getArticles, formatDate, readingTime } from "@/content/insights";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/Cta";

export function ArticleCard({ slug, large = false }: { slug: string; large?: boolean }) {
  const a = getArticles().find((x) => x.slug === slug)!;
  return (
    <article className="group">
      <Link href={`/insights/${a.slug}`} className="block">
        <div className={`zoom-img relative overflow-hidden bg-panel ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Photo name={a.image} sizes={large ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 100vw"} />
        </div>
        <p className="t-label mt-4 flex gap-3 text-muted">
          <span className="text-ink">{a.category}</span> <span>{formatDate(a.date)}</span> <span>{readingTime(a)} min</span>
        </p>
        <h3 className={`mt-2 font-medium tracking-[-0.025em] ${large ? "text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.05]" : "text-[1.3rem] leading-tight"}`}>
          <span className="link-u">{a.title}</span>
        </h3>
        <p className="mt-2 max-w-[52ch] text-[0.95rem] text-muted">{a.dek}</p>
      </Link>
    </article>
  );
}

export function InsightsTeaser() {
  const list = getArticles().slice(0, 3);
  if (!list.length) return null;
  return (
    <section aria-labelledby="insights-title" className="section bg-panel">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="insights-title" className="t-h2">
              Notes from the <span className="t-serif">lab floor.</span>
            </h2>
          </div>
          <ArrowLink href="/insights">All insights</ArrowLink>
        </div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ArticleCard slug={list[0].slug} large />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            {list.slice(1).map((a) => (
              <ArticleCard key={a.slug} slug={a.slug} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
