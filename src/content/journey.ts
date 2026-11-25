/**
 * "Formulation to shelf" — one product followed through every stage.
 *
 * The products and figures below are ILLUSTRATIVE examples written to explain
 * the process. They are not client projects or results. Edit freely.
 */

export type ProductKind = "bar" | "stick" | "jar";

export type Stage = {
  id: string;
  n: number;
  title: string;
  short: string;
  happens: string;
  decisions: string[];
  deliverables: string[];
  service: { label: string; href: string };
};

export const stages: Stage[] = [
  {
    id: "idea",
    n: 1,
    title: "Idea",
    short: "Idea",
    happens: "We pin down what the product is, who it is for and why it should exist — before anything is cooked.",
    decisions: ["Target consumer", "Format & pack size", "Positioning & price range"],
    deliverables: ["Concept brief", "Early feasibility check"],
    service: { label: "Market & consumer insights", href: "/services/market-insights" },
  },
  {
    id: "formulation",
    n: 2,
    title: "Formulation",
    short: "Formula",
    happens: "The recipe is developed against taste, texture, cost and shelf life — with the factory line in mind.",
    decisions: ["Ingredients & levels", "Cost per unit", "Clean-label or functional claims"],
    deliverables: ["Formulation sheet", "Ingredient specifications", "First costing"],
    service: { label: "Product development & R&D", href: "/services/product-development" },
  },
  {
    id: "pilot",
    n: 3,
    title: "Pilot batch",
    short: "Pilot",
    happens: "The recipe leaves the kitchen and runs on pilot equipment, so we learn how it behaves at volume.",
    decisions: ["Process steps & settings", "Batch size", "Yield and losses"],
    deliverables: ["Pilot trial report", "Process flow"],
    service: { label: "Product development & R&D", href: "/services/product-development" },
  },
  {
    id: "testing",
    n: 4,
    title: "Testing & shelf life",
    short: "Testing",
    happens: "Samples go through the tests that matter for this product, and a shelf-life study shows how it ages.",
    decisions: ["Which tests are needed", "Shelf-life target", "Storage conditions"],
    deliverables: ["Test plan", "Lab results reviewed", "Shelf-life study"],
    service: { label: "Testing & analytics", href: "/services/testing-analytics" },
  },
  {
    id: "compliance",
    n: 5,
    title: "Compliance & label",
    short: "Label",
    happens: "Category, claims and every word on the label are checked against the applicable regulations.",
    decisions: ["Product category", "Claims you can make", "Licences needed"],
    deliverables: ["Compliant label content", "FSSAI licensing guidance"],
    service: { label: "Regulatory & compliance", href: "/services/regulatory-compliance" },
  },
  {
    id: "packaging",
    n: 6,
    title: "Packaging",
    short: "Pack",
    happens: "We choose the material and format that protect the product, carry the label and fit the budget.",
    decisions: ["Material & barrier", "Pack format & size", "Packaging cost"],
    deliverables: ["Packaging specification", "Supplier options"],
    service: { label: "Packaging & labelling", href: "/services/packaging-labeling" },
  },
  {
    id: "manufacturing",
    n: 7,
    title: "Manufacturing",
    short: "Factory",
    happens: "Production moves to your own plant or a contract manufacturer, with trials before full runs.",
    decisions: ["Own plant or co-packer", "Line & capacity", "Quality checks"],
    deliverables: ["Technical transfer file", "Production trial", "QC plan"],
    service: { label: "Manufacturing partnerships", href: "/manufacturing" },
  },
  {
    id: "shelf",
    n: 8,
    title: "On the shelf",
    short: "Shelf",
    happens: "The product launches into the channels that suit it, with a brand story it can actually live up to.",
    decisions: ["Sales channels", "Launch plan", "Brand & positioning"],
    deliverables: ["Go-to-market plan", "Listings & launch content"],
    service: { label: "Brand & marketing", href: "/marketing" },
  },
];

export type ExampleProduct = {
  kind: ProductKind;
  name: string;
  short: string;
  /** one handwritten example line per stage, in stage order */
  notes: string[];
  /** illustrative recipe, shown on the formulation card */
  recipe: { name: string; pct: number }[];
  colors: { body: string; pack: string };
};

export const products: ExampleProduct[] = [
  {
    kind: "bar",
    name: "Millet protein bar",
    short: "Protein bar",
    notes: [
      "a high-protein millet bar for people who train",
      "crunch from millet crisps, bite from dates",
      "cold-formed slab, cut into 40 g bars",
      "watch moisture, hardening & rancidity",
      "protein claim needs nutrition data — milk & nut allergens declared",
      "flow-wrap in a moisture-barrier film",
      "co-packer with forming + flow-wrap line",
      "gyms, modern trade & quick commerce",
    ],
    recipe: [
      { name: "Millet crisps", pct: 28 },
      { name: "Dates", pct: 22 },
      { name: "Protein blend", pct: 20 },
      { name: "Nuts", pct: 15 },
      { name: "Binder syrup", pct: 12 },
      { name: "Salt & flavour", pct: 3 },
    ],
    colors: { body: "#9a6a3c", pack: "var(--color-brand)" },
  },
  {
    kind: "stick",
    name: "Electrolyte drink mix",
    short: "Stick pack",
    notes: [
      "an instant hydration drink, one stick per bottle",
      "dissolves fast, tastes clean, no clumps",
      "dry blend, trial run on a stick-pack machine",
      "check caking, dissolving & vitamin stability",
      "food or health supplement? category sets the label",
      "three-layer laminate sticks, carton of ten",
      "blender + multi-lane stick-pack line",
      "pharmacies, e-commerce & gyms",
    ],
    recipe: [
      { name: "Dextrose", pct: 60 },
      { name: "Electrolyte salts", pct: 18 },
      { name: "Citric acid", pct: 10 },
      { name: "Flavour", pct: 8 },
      { name: "Vitamin premix", pct: 4 },
    ],
    colors: { body: "#7fb153", pack: "#4f8a3a" },
  },
  {
    kind: "jar",
    name: "Umami chilli sauce",
    short: "Sauce jar",
    notes: [
      "a chilli sauce with deep umami for home cooks",
      "heat, tang & body balanced in 200 g",
      "kettle-cooked and hot-filled on pilot scale",
      "check pH, microbiology & colour over time",
      "preservative limits and veg mark on the label",
      "glass jar, lug cap & tamper band",
      "cooking kettles + hot-fill line",
      "retail shelves, restaurants & D2C",
    ],
    recipe: [
      { name: "Tomato & chilli", pct: 45 },
      { name: "Onion & garlic", pct: 18 },
      { name: "Vinegar", pct: 12 },
      { name: "Oil", pct: 10 },
      { name: "Sugar", pct: 8 },
      { name: "Spices & salt", pct: 7 },
    ],
    colors: { body: "#c0432b", pack: "#7fb153" },
  },
];
