import type { ImageKey } from "./images";

/**
 * VERIFIED CONTENT ONLY.
 *
 * Case studies, testimonials and team profiles render only when real, approved
 * entries exist here. Never add invented clients, quotes, people or numbers.
 */

export type CaseStudy = {
  slug: string;
  category: string;
  client: string; // or an anonymised descriptor approved by the client
  problem: string;
  approach: string;
  work: string[];
  result: string;
  timeline?: string; // only if verified
  metrics?: { label: string; value: string }[]; // only if verified
  image: ImageKey;
};

export const caseStudies: CaseStudy[] = [];

/** The kinds of work case studies will document — used for the honest template state. */
export const caseStudySlots = [
  { kind: "Product formulation", image: "labPipette" as ImageKey },
  { kind: "Cost reduction", image: "flour" as ImageKey },
  { kind: "Manufacturing optimisation", image: "processPlant" as ImageKey },
  { kind: "Regulatory progress", image: "labGlass" as ImageKey },
  { kind: "Product launch", image: "chips" as ImageKey },
  { kind: "Shelf-life improvement", image: "sauce" as ImageKey },
];

export type Testimonial = { quote: string; name: string; role: string; company: string };
export const testimonials: Testimonial[] = [];

export type TeamMember = {
  name: string;
  role: string;
  discipline: string;
  bio: string;
  credentials?: string; // only verified
  photo?: string; // path in /public/team
};
export const team: TeamMember[] = [];

/** Disciplines the team brings together (from the service scope) */
export const disciplines = [
  { title: "Food technology", note: "Formulation, processing behaviour and shelf life." },
  { title: "Product development", note: "Concepts, prototypes and the path to a stable recipe." },
  { title: "Regulatory affairs", note: "Classification, licensing, labelling and claims." },
  { title: "Manufacturing engineering", note: "Process flow, equipment, utilities and plant design." },
  { title: "Quality assurance", note: "Food safety systems, audits and documentation." },
  { title: "Ayurvedic advisory", note: "Traditional formulations within modern regulatory frameworks." },
  { title: "Business consulting", note: "Feasibility, costing, financial models and funding guidance." },
  { title: "Brand & marketing", note: "Positioning, packaging direction and go-to-market." },
];
