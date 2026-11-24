import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/services";
import { ServiceTemplate } from "@/components/service/ServiceTemplate";
import { JsonLd, pageMeta, serviceSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return pageMeta({ title: `${c.title} Consultancy`, description: `${c.summary} ${c.intro}`.slice(0, 300), path: `/services/${c.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  return (
    <>
      <ServiceTemplate c={c} />
      <JsonLd data={serviceSchema(c.title, c.summary, `/services/${c.slug}`)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: c.title, path: `/services/${c.slug}` },
        ])}
      />
    </>
  );
}
