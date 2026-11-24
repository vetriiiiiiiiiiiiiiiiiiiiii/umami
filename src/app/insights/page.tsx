import { PageHeader } from "@/components/ui/PageHeader";
import { InsightsIndex } from "@/components/service/InsightsIndex";
import { getArticles, insightCategories, readingTime } from "@/content/insights";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Insights — Food Innovation, Regulation & Manufacturing",
  description: "Practical notes on food product development, regulatory thinking, manufacturing, costing and starting a food business.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getArticles().map(({ body, ...rest }) => ({ ...rest, minutes: readingTime({ body, ...rest }) }));
  return (
    <>
      <PageHeader
        label="Insights / Knowledge hub"
        title={["Notes from the", ["lab ", { serif: "floor." }]]}
        intro={<p>Practical thinking on developing, registering, making and selling food products.</p>}
      />
      <InsightsIndex articles={articles} categories={[...insightCategories]} />
    </>
  );
}
