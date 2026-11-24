export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <article className="pb-24 pt-[calc(var(--nav-h)+4rem)]">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="t-label text-muted">Legal</p>
          <h1 className="t-h2 mt-6">{title}</h1>
          <p className="t-label mt-6 text-terra">Draft — to be reviewed by Umami Labs before publication</p>
        </div>
        <div className="max-w-[64ch] lg:col-span-7 lg:col-start-6">
          {sections.map((s) => (
            <section key={s.h} className="border-t border-rule py-8">
              <h2 className="text-[1.3rem] font-medium tracking-[-0.02em]">{s.h}</h2>
              <p className="mt-3 text-muted">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
