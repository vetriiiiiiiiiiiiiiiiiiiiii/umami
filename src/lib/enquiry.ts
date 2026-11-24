/** Shared enquiry schema + validation (used by the form and the API route). */

export const projectTypes = [
  "New food product",
  "Food brand",
  "Manufacturing facility",
  "Restaurant / cloud kitchen",
  "Functional food or supplement",
  "Existing product improvement",
  "Manufacturing partner search",
  "Something else",
];

export const productCategories = [
  "Functional foods", "Nutraceuticals & supplements", "Beverages", "Millets & grains", "Bakery",
  "Confectionery", "Dairy & alternatives", "Plant-based", "Snacks", "Sauces & condiments",
  "Frozen", "Ready-to-eat / cook", "Sports nutrition", "Infant & clinical nutrition", "Pet food", "Other / not sure",
];

export const projectStages = [
  "Just an idea", "Research stage", "Formulation underway", "Prototype ready",
  "Compliance underway", "Brand ready", "Already manufacturing", "Looking to scale",
];

export const serviceOptions = [
  "Formulation & R&D", "Regulatory & FSSAI", "Food safety & quality", "Plant setup", "Manufacturing partners",
  "Costing", "Packaging & labelling", "Testing", "Export", "Startup & funding", "Branding & marketing",
  "Food service", "Training", "Ongoing advisory",
];

export const budgetRanges = ["Not sure yet", "Under ₹5 lakh", "₹5–15 lakh", "₹15–50 lakh", "₹50 lakh+"];
export const timelines = ["Not sure yet", "As soon as possible", "1–3 months", "3–6 months", "6+ months"];

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  category: string;
  stage: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  consent: boolean;
  navigator?: string;
  /** honeypot — must stay empty */
  website?: string;
};

export const emptyEnquiry: Enquiry = {
  name: "", email: "", phone: "", company: "", projectType: "", category: "", stage: "",
  services: [], description: "", budget: "", timeline: "", consent: false, navigator: "", website: "",
};

export type Errors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export function validateStep(step: number, e: Enquiry): Errors {
  const err: Errors = {};
  if (step === 0) {
    if (e.name.trim().length < 2) err.name = "Please tell us your name.";
    if (!EMAIL.test(e.email.trim())) err.email = "Please enter a valid email address.";
    if (e.phone.trim() && !PHONE.test(e.phone.trim())) err.phone = "Please check this phone number.";
  }
  if (step === 1) {
    if (!e.projectType) err.projectType = "Choose the option closest to your project.";
    if (!e.stage) err.stage = "Let us know where you are now.";
    if (!e.services.length) err.services = "Pick at least one area — you can change this later.";
  }
  if (step === 2) {
    if (e.description.trim().length < 20) err.description = "A few sentences help us prepare (20 characters minimum).";
    if (e.description.length > 4000) err.description = "Please keep this under 4,000 characters.";
    if (!e.consent) err.consent = "Please confirm you've read the privacy notice.";
  }
  return err;
}

export function validateAll(e: Enquiry): Errors {
  return { ...validateStep(0, e), ...validateStep(1, e), ...validateStep(2, e) };
}

/** Coerce unknown JSON into an Enquiry with length limits. */
export function sanitize(input: unknown): Enquiry {
  const o = (typeof input === "object" && input ? input : {}) as Record<string, unknown>;
  const s = (k: string, max = 200) => (typeof o[k] === "string" ? (o[k] as string).slice(0, max) : "");
  return {
    name: s("name"), email: s("email"), phone: s("phone", 30), company: s("company"),
    projectType: s("projectType"), category: s("category"), stage: s("stage"),
    services: Array.isArray(o.services) ? o.services.filter((x): x is string => typeof x === "string").slice(0, 20).map((x) => x.slice(0, 80)) : [],
    description: s("description", 4000), budget: s("budget"), timeline: s("timeline"),
    consent: o.consent === true, navigator: s("navigator", 2000), website: s("website"),
  };
}

export function summarise(e: Enquiry) {
  return [
    `Name: ${e.name}`, `Email: ${e.email}`, e.phone && `Phone: ${e.phone}`, e.company && `Company: ${e.company}`,
    `Project type: ${e.projectType}`, e.category && `Category: ${e.category}`, `Stage: ${e.stage}`,
    `Services: ${e.services.join(", ")}`, e.budget && `Budget: ${e.budget}`, e.timeline && `Timeline: ${e.timeline}`,
    e.navigator && `Navigator roadmap: ${e.navigator}`, "", e.description,
  ].filter(Boolean).join("\n");
}
