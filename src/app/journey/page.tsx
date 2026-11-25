import { ProductJourney } from "@/components/journey/ProductJourney";
import { Cta } from "@/components/ui/Cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "From Formulation to Shelf — How a Food Product Is Made",
  description:
    "Follow a protein bar, a stick-pack drink mix or a sauce jar through every stage: idea, formulation, pilot batch, testing, compliance and label, packaging, manufacturing and launch.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <div className="pt-[calc(var(--nav-h)+2.5rem)] md:pt-[calc(var(--nav-h)+4rem)]">
        <ProductJourney headingLevel="h1" />
      </div>
      <section className="deep grain">
        <div className="wrap relative z-10 grid gap-8 py-20 md:grid-cols-12 md:items-center">
          <h2 className="t-h2 md:col-span-7">
            Have a product in mind? <span className="t-serif">Let’s map its journey.</span>
          </h2>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Cta href="/contact" variant="accent">
              Start a project
            </Cta>
            <Cta href="/navigator" variant="ghost" dir="right">
              Find your next step
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}
