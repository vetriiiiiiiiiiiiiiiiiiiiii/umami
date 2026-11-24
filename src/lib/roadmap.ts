/**
 * Food Venture Navigator — roadmap engine.
 * Pure functions: answers in, roadmap out. No hidden or random output.
 */

export type BuildId =
  | "product" | "brand" | "facility" | "foodservice" | "functional" | "supplement" | "improve" | "other";
export type StageId =
  | "idea" | "research" | "formulation" | "prototype" | "compliance" | "brand" | "manufacturing" | "scale";
export type NeedId =
  | "formulation" | "regulatory" | "manufacturing" | "costing" | "packaging" | "testing"
  | "branding" | "marketing" | "export" | "funding" | "other";

export const buildOptions: { id: BuildId; label: string }[] = [
  { id: "product", label: "A new food product" },
  { id: "brand", label: "A food brand" },
  { id: "facility", label: "A manufacturing facility" },
  { id: "foodservice", label: "A restaurant or cloud kitchen" },
  { id: "functional", label: "A functional food" },
  { id: "supplement", label: "A supplement" },
  { id: "improve", label: "An existing product improvement" },
  { id: "other", label: "Something else" },
];

export const stageOptions: { id: StageId; label: string }[] = [
  { id: "idea", label: "Just an idea" },
  { id: "research", label: "Research stage" },
  { id: "formulation", label: "Formulation underway" },
  { id: "prototype", label: "Prototype ready" },
  { id: "compliance", label: "Compliance underway" },
  { id: "brand", label: "Brand ready" },
  { id: "manufacturing", label: "Already manufacturing" },
  { id: "scale", label: "Looking to scale" },
];

export const needOptions: { id: NeedId; label: string }[] = [
  { id: "formulation", label: "Formulation" },
  { id: "regulatory", label: "Regulatory" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "costing", label: "Costing" },
  { id: "packaging", label: "Packaging" },
  { id: "testing", label: "Testing" },
  { id: "branding", label: "Branding" },
  { id: "marketing", label: "Marketing" },
  { id: "export", label: "Export" },
  { id: "funding", label: "Funding" },
  { id: "other", label: "Other" },
];

type PipelineStage = { key: string; label: string; detail: string };
type Pipeline = { id: string; stages: PipelineStage[]; position: Record<StageId, number> };

const productPipeline: Pipeline = {
  id: "product",
  stages: [
    { key: "idea", label: "Idea", detail: "Define the product, the consumer and the problem it solves." },
    { key: "feasibility", label: "Feasibility", detail: "Test the idea against market, cost, regulation and production realities." },
    { key: "formulation", label: "Formulation", detail: "Develop a recipe that meets taste, texture, cost and shelf-life targets." },
    { key: "compliance", label: "Compliance review", detail: "Confirm category, labelling and claims direction before trials." },
    { key: "validation", label: "Validation", detail: "Testing, sensory evaluation and shelf-life work on the prototype." },
    { key: "pilot", label: "Pilot", detail: "Run the product on real equipment and learn how it behaves at volume." },
    { key: "manufacturing", label: "Manufacturing", detail: "Own facility or partner — set up production and quality systems." },
    { key: "launch", label: "Market launch", detail: "Brand, packaging, channels and a launch plan that fits your stage." },
  ],
  position: { idea: 0, research: 1, formulation: 2, prototype: 4, compliance: 3, brand: 5, manufacturing: 6, scale: 7 },
};

const facilityPipeline: Pipeline = {
  id: "facility",
  stages: [
    { key: "concept", label: "Concept", detail: "Products, volumes and the case for building." },
    { key: "dpr", label: "Feasibility & DPR", detail: "A detailed project report with costs, capacity and returns." },
    { key: "layout", label: "Site & layout", detail: "Site evaluation, process flow and hygienic plant layout." },
    { key: "equipment", label: "Equipment & utilities", detail: "Equipment selection, water, power, steam and cold chain." },
    { key: "licensing", label: "Licensing & compliance", detail: "Licences, food safety systems and documentation." },
    { key: "commissioning", label: "Commissioning", detail: "Installation, commissioning and trial runs." },
    { key: "production", label: "Commercial production", detail: "Production planning, capacity optimisation and QA/QC." },
  ],
  position: { idea: 0, research: 1, formulation: 1, prototype: 2, compliance: 4, brand: 2, manufacturing: 6, scale: 6 },
};

const foodservicePipeline: Pipeline = {
  id: "foodservice",
  stages: [
    { key: "concept", label: "Concept", detail: "Format, cuisine, audience and the economics of the kitchen." },
    { key: "menu", label: "Menu development", detail: "Recipes, costing and standardisation for consistency." },
    { key: "kitchen", label: "Kitchen design", detail: "Layout, equipment and workflow — outlet or central kitchen." },
    { key: "licensing", label: "Licensing", detail: "Registrations, licences and food safety basics." },
    { key: "sops", label: "SOPs & training", detail: "Procedures and training so every shift delivers the same plate." },
    { key: "launch", label: "Soft launch", detail: "Test the operation, refine and open." },
    { key: "scale", label: "Scale & standardise", detail: "New outlets, cloud brands or private-label products." },
  ],
  position: { idea: 0, research: 0, formulation: 1, prototype: 2, compliance: 3, brand: 4, manufacturing: 5, scale: 6 },
};

const improvePipeline: Pipeline = {
  id: "improve",
  stages: [
    { key: "current", label: "Current product", detail: "Understand what works, what doesn't and why change is needed." },
    { key: "benchmark", label: "Benchmark", detail: "Competitor and consumer benchmarking to set targets." },
    { key: "reformulation", label: "Reformulation", detail: "Cost, clean-label, nutrition or sensory improvements." },
    { key: "compliance", label: "Compliance review", detail: "Check label, claims and category implications of the change." },
    { key: "validation", label: "Validation", detail: "Sensory, shelf-life and laboratory testing." },
    { key: "trial", label: "Production trial", detail: "Confirm the change on your line or your partner's." },
    { key: "relaunch", label: "Relaunch", detail: "Packaging updates and communication of the improvement." },
  ],
  position: { idea: 0, research: 1, formulation: 2, prototype: 4, compliance: 3, brand: 6, manufacturing: 5, scale: 6 },
};

const pipelineFor = (b: BuildId): Pipeline =>
  b === "facility" ? facilityPipeline
  : b === "foodservice" ? foodservicePipeline
  : b === "improve" ? improvePipeline
  : productPipeline;

/** Which pipeline stage keys each need touches */
const needStages: Record<NeedId, string[]> = {
  formulation: ["formulation", "reformulation", "menu", "validation"],
  regulatory: ["compliance", "licensing"],
  manufacturing: ["pilot", "manufacturing", "equipment", "commissioning", "production", "trial", "kitchen", "layout"],
  costing: ["feasibility", "dpr", "menu", "reformulation", "formulation"],
  packaging: ["launch", "relaunch", "validation"],
  testing: ["validation"],
  branding: ["launch", "relaunch", "concept"],
  marketing: ["launch", "relaunch", "scale"],
  export: ["compliance", "launch"],
  funding: ["feasibility", "dpr", "concept"],
  other: [],
};

/** Capabilities recommended for each need (slugs into services) */
const needCapabilities: Record<NeedId, string[]> = {
  formulation: ["product-development", "specialized-categories"],
  regulatory: ["regulatory-compliance", "food-safety-quality"],
  manufacturing: ["manufacturing", "plant-setup"],
  costing: ["cost-optimization"],
  packaging: ["packaging-labeling"],
  testing: ["testing-analytics"],
  branding: ["brand-marketing"],
  marketing: ["brand-marketing", "market-insights"],
  export: ["export-market-access"],
  funding: ["startup-support"],
  other: ["ongoing-advisory"],
};

const buildCapabilities: Record<BuildId, string[]> = {
  product: ["product-development"],
  brand: ["brand-marketing"],
  facility: ["plant-setup", "food-safety-quality"],
  foodservice: ["food-service-hospitality"],
  functional: ["specialized-categories", "regulatory-compliance"],
  supplement: ["regulatory-compliance", "specialized-categories"],
  improve: ["product-development", "cost-optimization"],
  other: ["startup-support"],
};

const ctaFor = (primary: NeedId | undefined, build: BuildId) => {
  if (build === "facility") return "Plan your factory";
  if (build === "foodservice") return "Discuss your kitchen";
  switch (primary) {
    case "regulatory": return "Get regulatory guidance";
    case "manufacturing": return "Find your manufacturing path";
    case "branding":
    case "marketing": return "Build your food brand";
    case "export": return "Explore export readiness";
    case "funding": return "Talk to us as a founder";
    default: return "Discuss your product";
  }
};

export type RoadmapStage = PipelineStage & {
  status: "done" | "current" | "next" | "upcoming";
  relevant: boolean;
};

export type Roadmap = {
  stages: RoadmapStage[];
  current: RoadmapStage;
  nextSteps: RoadmapStage[];
  capabilities: string[];
  cta: string;
  headline: string;
};

export function buildRoadmap(build: BuildId, stage: StageId, needs: NeedId[]): Roadmap {
  const p = pipelineFor(build);
  const pos = Math.min(p.position[stage], p.stages.length - 1);
  const relevantKeys = new Set(needs.flatMap((n) => needStages[n]));

  const stages: RoadmapStage[] = p.stages.map((s, i) => ({
    ...s,
    status: i < pos ? "done" : i === pos ? "current" : i <= pos + 2 ? "next" : "upcoming",
    relevant: relevantKeys.has(s.key),
  }));

  // compliance-first: if regulatory work hasn't been reached, flag it as relevant for product pipelines
  if (p.id === "product" || p.id === "improve") {
    const c = stages.find((s) => s.key === "compliance");
    if (c && c.status !== "done") c.relevant = true;
  }

  const caps = Array.from(new Set([...buildCapabilities[build], ...needs.flatMap((n) => needCapabilities[n])]));
  const current = stages[pos];
  const nextSteps = stages.slice(pos + 1, pos + 3);
  const finalStage = stages[stages.length - 1];

  return {
    stages,
    current,
    nextSteps: nextSteps.length ? nextSteps : [finalStage],
    capabilities: caps.slice(0, 6),
    cta: ctaFor(needs.find((n) => n !== "other"), build),
    headline:
      pos >= stages.length - 1
        ? "You're in production. The next gains come from optimisation and growth."
        : `You're at ${current.label.toLowerCase()}. Here's what comes next.`,
  };
}

export const labelOf = <T extends { id: string; label: string }>(opts: T[], id: string) =>
  opts.find((o) => o.id === id)?.label ?? id;

export const NAVIGATOR_STORAGE_KEY = "umami:navigator";
