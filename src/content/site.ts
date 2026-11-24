/**
 * Site-wide configuration.
 *
 * Everything here is business information that Umami Labs must confirm before launch.
 * Values left empty are hidden in the UI rather than replaced with invented details.
 */
export const site = {
  name: "Umami Labs",
  legalName: "Umami Labs", // REPLACE with registered entity name
  tagline: "One team. The entire journey.",
  description:
    "Umami Labs is a food innovation consultancy covering product formulation, R&D, regulatory compliance, food safety, plant setup, manufacturing partnerships and brand strategy — planned together from concept to commercial production.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Public enquiry email. Leave empty until confirmed — the UI hides mail links when empty. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Public phone number, e.g. "+91 ..." — hidden when empty. */
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  /** Business address — intentionally empty. Do not publish an unverified location. */
  address: "",
  /** Social profiles. Only entries with a URL are rendered. */
  socials: [
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "" },
    { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "" },
  ],
} as const;

export const primaryNav = [
  { label: "Services", href: "/services", mega: true },
  { label: "Our Approach", href: "/approach" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  { label: "Services", href: "/services" },
  { label: "Our Approach", href: "/approach" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Marketing", href: "/marketing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
