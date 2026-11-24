import { Navigator } from "@/components/navigator/Navigator";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Food Venture Navigator",
  description: "Answer four questions and get a roadmap of the likely next steps for your food product, brand, factory or kitchen.",
  path: "/navigator",
});

export default function NavigatorPage() {
  return <Navigator standalone />;
}
