import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticle, formatDate, readingTime } from "@/content/insights";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";
import { ArticleCard } from "@/components/home/InsightsTeaser";
import { JsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { images } from "@/content/images";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const m = pageMeta({ title: a.title, description: a.dek, path: `/insights/${a.slug}` });
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: a.date, authors: [a.author] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const toc = a.body.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2");
  const related = getArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article>
      <header className="pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+5rem)]">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="t-label mb-8 flex gap-2 text-muted">
            <Link href="/insights" className="link-u">
              Insights
            </Link>
            <span aria-hidden>/</span>
            <span>{a.category}</span>
          </nav>
          <h1 className="t-h1 max-w-[18ch]" data-reveal="fade">
            {a.title}
          </h1>
          <p className="t-lead mt-6 max-w-[52ch] text-muted">{a.dek}</p>
          <dl className="t-label mt-10 grid grid-cols-2 gap-4 border-t border-rule pt-4 text-muted sm:grid-cols-4">
            {[
              ["Category", a.category],
              ["Published", formatDate(a.date)],
              ["Author", a.author],
              ["Reading time", `${readingTime(a)} min`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className="mt-1 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-12">
          <div className="relative aspect-[21/9] overflow-hidden" data-reveal="image">
            <Photo name={a.image} priority sizes="100vw" />
          </div>
        </div>
      </header>

      <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        {toc.length > 1 && (
          <aside className="lg:col-span-3">
            <nav aria-label="Table of contents" className="lg:sticky lg:top-28">
              <p className="t-label text-muted">Contents</p>
              <ol className="mt-4 space-y-2 border-l border-rule pl-4">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="link-u text-[0.95rem]">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
        <div className="max-w-[68ch] text-[1.1rem] leading-[1.7] lg:col-span-7 lg:col-start-5">
          {a.body.map((b, i) => {
            if (b.type === "h2")
              return (
                <h2 key={i} id={b.id} className="t-h3 mb-4 mt-14 scroll-mt-28 first:mt-0">
                  {b.text}
                </h2>
              );
            if (b.type === "list")
              return (
                <ul key={i} className="my-6 space-y-2 border-l-2 border-lime pl-5">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            if (b.type === "quote")
              return (
                <blockquote key={i} className="t-serif my-12 border-y border-rule py-8 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1]">
                  “{b.text}”
                </blockquote>
              );
            return (
              <p key={i} className="mb-5 text-pretty">
                {b.text}
              </p>
            );
          })}
          <div className="mt-14 border border-rule bg-panel p-6 md:p-8">
            <p className="t-label text-muted">Working on something similar?</p>
            <p className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.025em]">Talk to a team that plans the whole journey.</p>
            <div className="mt-6">
              <Cta href="/contact" variant="accent">
                Discuss your product
              </Cta>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-rule bg-panel py-20">
          <div className="wrap">
            <h2 id="related" className="t-h3 mb-10">
              Related <span className="t-serif">reading</span>
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} slug={r.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.dek,
          datePublished: a.date,
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          image: `https://images.unsplash.com/photo-${images[a.image].id}?w=1200&q=75&auto=format&fit=crop`,
          mainEntityOfPage: `${site.url}/insights/${a.slug}`,
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Insights", path: "/insights" }, { name: a.title, path: `/insights/${a.slug}` }])} />
    </article>
  );
}
