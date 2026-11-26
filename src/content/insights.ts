import type { ImageKey } from "./images";

/**
 * Local content system for Insights.
 *
 * These are evergreen editorial pieces written as starting content. They make no
 * claims about specific regulations, clients or results. Review and approve each
 * article (and its author attribution) before publishing; set `published: false`
 * to hide an article.
 */

export const insightCategories = [
  "Food innovation",
  "Product development",
  "Regulatory",
  "Manufacturing",
  "Food safety",
  "Startup guides",
  "Marketing",
  "Industry trends",
  "Sustainability",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: InsightCategory;
  date: string; // ISO
  author: string;
  image: ImageKey;
  published: boolean;
  body: Block[];
};

const articles: Article[] = [
  {
    slug: "compliance-belongs-at-the-beginning",
    title: "Compliance belongs at the beginning",
    dek: "Why regulatory thinking should shape a formulation before the first trial — not after the last one.",
    category: "Regulatory",
    date: "2026-11-01",
    author: "The Umami Labs Editorial",
    image: "labGlass",
    published: true,
    body: [
      { type: "p", text: "Many food products are developed in a sequence: recipe first, trials next, then a late conversation about licences, labels and claims. It feels efficient. It often isn't. When regulatory questions arrive at the end, they can reopen decisions that everyone assumed were closed." },
      { type: "h2", id: "what-goes-wrong", text: "What goes wrong when compliance comes last" },
      { type: "p", text: "The issues are rarely dramatic, but they are expensive. An ingredient that works beautifully in the prototype may change how the product is categorised. A claim that anchors the brand story may need different wording, or supporting evidence that hasn't been planned for. A pack format chosen for shelf appeal may not leave room for mandatory declarations." },
      { type: "list", items: [
        "Reformulation after trials, repeating work already paid for",
        "Packaging artwork revised after printing decisions",
        "Positioning rebuilt around claims that can't be made as intended",
        "Delays while documentation is assembled under time pressure",
      ] },
      { type: "h2", id: "a-better-sequence", text: "A better sequence" },
      { type: "p", text: "A compliance-first approach doesn't mean slowing down creativity. It means asking a few structural questions early: what category is this product likely to fall under, which ingredients or additives carry conditions, which claims are central to the idea, and what the label will need to carry." },
      { type: "quote", text: "The cheapest time to change a formulation is before you've made it." },
      { type: "p", text: "Those answers then become design constraints for the formulation team — in the same way target cost or shelf life would be. Trials test something that can actually be registered, labelled and sold." },
      { type: "h2", id: "what-it-does-not-mean", text: "What it does not mean" },
      { type: "p", text: "Early review is not a guarantee of approval. Authorities make their own determinations, and requirements change over time. What early review does is reduce avoidable surprises and make sure everyone — founders, formulators, engineers and marketers — is working towards the same, realistic product." },
    ],
  },
  {
    slug: "what-a-pilot-batch-really-tells-you",
    title: "What a pilot batch really tells you",
    dek: "A pilot is not a bigger prototype. It is the first honest conversation between your recipe and a production process.",
    category: "Product development",
    date: "2026-10-14",
    author: "The Umami Labs Editorial",
    image: "dough",
    published: true,
    body: [
      { type: "p", text: "In a development kitchen, almost everything is controlled: small quantities, careful hands, precise timing. A pilot batch removes some of that control on purpose. That's what makes it valuable." },
      { type: "h2", id: "behaviour-not-taste", text: "Behaviour, not just taste" },
      { type: "p", text: "The obvious question after a pilot is whether the product still tastes right. The more useful questions are about behaviour: how does the mix handle in equipment, how long does each step really take, where is material lost, and how consistent is the output from start to finish?" },
      { type: "list", items: [
        "Process times and temperatures that hold at volume",
        "Yield and where losses occur",
        "Variation between the start and end of a run",
        "Cleaning and changeover implications",
        "Samples for shelf-life and laboratory testing",
      ] },
      { type: "h2", id: "plan-the-questions", text: "Plan the questions before the run" },
      { type: "p", text: "A pilot is most useful when it's designed to answer specific questions. Decide in advance what you'll measure, what you'll sample and what result would change a decision. Otherwise it becomes an expensive tasting session." },
      { type: "quote", text: "Every pilot should end with a decision, not just a product." },
      { type: "h2", id: "after-the-pilot", text: "After the pilot" },
      { type: "p", text: "The output of a good pilot is a short list of changes — to the formulation, the process, the packaging or the plan — and a clearer view of what full-scale production will require." },
    ],
  },
  {
    slug: "reading-your-cost-sheet-before-you-scale",
    title: "Reading your cost sheet before you scale",
    dek: "Margin is decided in formulation, process and packaging long before a product reaches a shelf.",
    category: "Manufacturing",
    date: "2026-09-22",
    author: "The Umami Labs Editorial",
    image: "flour",
    published: true,
    body: [
      { type: "p", text: "Founders often meet their real cost of goods for the first time when a manufacturer sends a quote. By then, many cost-driving decisions have already been made — in the recipe, the pack and the process." },
      { type: "h2", id: "where-cost-hides", text: "Where cost hides" },
      { type: "list", items: [
        "High-cost ingredients used at levels the consumer can't detect",
        "Yield losses that never appear in a kitchen recipe",
        "Packaging formats that are expensive to fill or ship",
        "Process steps that add time but little value",
        "Minimum order quantities that tie up cash",
      ] },
      { type: "h2", id: "build-the-model-early", text: "Build the model early" },
      { type: "p", text: "A simple, itemised cost model — ingredient by ingredient, plus packaging, processing, losses and overheads — turns cost into a design parameter. It lets you test decisions on paper before they become commitments." },
      { type: "quote", text: "Every gram has a cost. The question is whether it earns its place." },
      { type: "p", text: "Cost optimisation done well is invisible to the consumer. It improves margin by removing waste and over-specification, not by quietly making the product worse." },
    ],
  },
  {
    slug: "build-or-partner-first-production",
    title: "Build or partner? Choosing your first production path",
    dek: "Your own facility and a contract manufacturer solve different problems. The right answer depends on stage, volume and control.",
    category: "Startup guides",
    date: "2026-09-02",
    author: "The Umami Labs Editorial",
    image: "processPlant",
    published: true,
    body: [
      { type: "p", text: "One of the biggest early decisions for a food business is how the product will be made. Building a facility gives control but requires capital and time. Working with a contract manufacturer or co-packer reduces upfront investment but introduces dependencies." },
      { type: "h2", id: "questions-to-ask", text: "Questions worth asking" },
      { type: "list", items: [
        "What volumes can we confidently sell in the first year?",
        "How specialised is our process or equipment?",
        "How sensitive is our formulation or know-how?",
        "Can we meet a partner's minimum order quantities?",
        "What licences and certifications will each path require?",
      ] },
      { type: "h2", id: "evaluating-a-partner", text: "Evaluating a manufacturing partner" },
      { type: "p", text: "Process compatibility matters more than proximity or price alone. A partner should have the right equipment, hygiene standards and documentation for your category, and the willingness to run trials before committing to production." },
      { type: "quote", text: "Start where you can learn fastest — then build when volume makes the case." },
      { type: "p", text: "Many businesses start with a partner and move to their own facility once demand is proven. Planning for that transition early — in formulation, documentation and agreements — makes it far smoother." },
    ],
  },
];

export const getArticles = () =>
  articles.filter((a) => a.published).sort((a, b) => (a.date < b.date ? 1 : -1));

export const getArticle = (slug: string) => getArticles().find((a) => a.slug === slug);

export const readingTime = (a: Article) => {
  const words = a.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
};

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
};
