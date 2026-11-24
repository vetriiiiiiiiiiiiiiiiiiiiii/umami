import type { ImageKey } from "./images";

export const marketingPillars: { n: string; title: string; image: ImageKey; items: string[] }[] = [
  { n: "M1", title: "Brand & Positioning", image: "spicesFlat", items: ["Brand strategy", "Product positioning", "Naming", "Taglines", "Brand story", "Messaging", "Audience personas", "Competitor positioning"] },
  { n: "M2", title: "Packaging & Creative Direction", image: "chocolates", items: ["Packaging briefs", "Design direction", "Label inputs", "Claims hierarchy", "Shelf impact", "Pack format"] },
  { n: "M3", title: "Go-to-Market", image: "coldShelf", items: ["Launch strategy", "Pricing", "Margin strategy", "Channel selection", "D2C", "E-commerce", "Quick commerce", "Modern trade", "General trade", "B2B", "Pilot launches", "Distributor onboarding"] },
  { n: "M4", title: "Digital Marketing", image: "lemonade", items: ["Website development", "Landing pages", "Social media", "Meta advertising", "Google advertising", "SEO", "Content marketing", "Email marketing", "WhatsApp marketing", "Influencer marketing"] },
  { n: "M5", title: "E-commerce", image: "chips", items: ["Amazon", "Flipkart", "Quick-commerce platforms", "Listing setup", "Product descriptions", "Product images", "Marketplace onboarding", "Marketplace compliance", "Review strategy"] },
  { n: "M6", title: "Content & Creative", image: "honey", items: ["Photography", "Video direction", "Recipes", "Usage content", "Ingredient education", "Product benefits", "Brand collateral", "Sales decks"] },
  { n: "M7", title: "Sales Enablement", image: "warehouse", items: ["B2B presentations", "Product sheets", "Sample kits", "Trade presentations", "Distributor pitches"] },
  { n: "M8", title: "Market Research", image: "market", items: ["Consumer research", "Concept testing", "Trend analysis", "Competitor analysis", "Sensory panels"] },
];

export const manufacturingServices = [
  "Manufacturer identification",
  "Co-packer search",
  "Production capability evaluation",
  "Process compatibility",
  "MOQ considerations",
  "Manufacturing feasibility",
  "Trial coordination",
  "Technical transfer",
  "Agreement guidance",
  "Scale-up",
];
