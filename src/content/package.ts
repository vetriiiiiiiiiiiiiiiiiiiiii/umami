/**
 * THE LAUNCH-READY PACKAGE
 *
 * PROPOSED STRUCTURE — confirm scope, timeline and pricing with the business
 * before publishing. Set `confirmed: true` on each item once it is part of the
 * actual offer. Unconfirmed items are labelled "Proposed" in the UI.
 */
export const launchPackage = {
  name: "The Launch-Ready Package",
  summary:
    "A structured engagement designed to help founders move from a product concept toward a validated, commercially prepared product.",
  /** e.g. "12–16 weeks". Leave empty to show "Confirmed during discovery". */
  timeline: "",
  /** Leave empty — pricing is discussed after discovery. */
  price: "",
  deliverables: [
    { title: "Project discovery & feasibility", detail: "Your product, market, volumes and constraints — mapped before anything is developed.", confirmed: false },
    { title: "Product concept development", detail: "A defined concept with target consumer, format and positioning.", confirmed: false },
    { title: "Formulation scope", detail: "Target attributes, ingredient direction and the boundaries the formulation must respect.", confirmed: false },
    { title: "Prototype & trial planning", detail: "What will be made, how it will be evaluated and what success looks like.", confirmed: false },
    { title: "Compliance review", detail: "Applicable category, labelling and claims considerations reviewed before trials.", confirmed: false },
    { title: "Product costing", detail: "An itemised cost model linking formulation, packaging and process.", confirmed: false },
    { title: "Packaging guidance", detail: "Material and format direction connected to shelf life and cost.", confirmed: false },
    { title: "Manufacturing feasibility", detail: "Whether, where and how the product can be produced at your target volumes.", confirmed: false },
    { title: "Scale-up roadmap", detail: "The sequence of steps, decisions and investments from pilot to production.", confirmed: false },
    { title: "Final technical documentation", detail: "A consolidated technical dossier for your team, partners and lenders.", confirmed: false },
  ],
  process: [
    { title: "Discover", detail: "Workshop and information review." },
    { title: "Define", detail: "Concept, scope and compliance direction." },
    { title: "Develop", detail: "Formulation, costing and packaging work." },
    { title: "Document", detail: "Feasibility, roadmap and technical dossier." },
  ],
  addOns: [
    "Pilot batch coordination",
    "Shelf-life study coordination",
    "FSSAI licensing support",
    "Brand & packaging design direction",
    "Co-packer identification",
    "Go-to-market planning",
  ],
  faq: [
    {
      q: "Who is the package designed for?",
      a: "Founders and food businesses who have a product idea or early recipe and want to understand — in one structured engagement — what it will take to make, label, cost and produce it.",
    },
    {
      q: "Does the package guarantee regulatory approval or a launch date?",
      a: "No. We review applicable requirements early and plan around them, but approvals rest with the relevant authorities and timelines depend on factors such as testing, trials and partner availability. We will be clear about these dependencies from the start.",
    },
    {
      q: "Can the scope be adjusted?",
      a: "Yes. The deliverables are a starting structure. We confirm the exact scope after discovery so the engagement fits your product and stage.",
    },
    {
      q: "What happens after the package?",
      a: "You can take the documentation to your own team or manufacturer, or continue with us on pilots, licensing, plant setup, manufacturing partnerships or brand and launch work.",
    },
  ],
};
