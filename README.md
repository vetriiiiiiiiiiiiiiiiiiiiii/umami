# Umami Labs — website

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Framer Motion · React Three Fiber · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and schema (e.g. `https://umamilabs.com`). |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE` | Public contact details. Hidden everywhere while empty. |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` / `_INSTAGRAM` / `_YOUTUBE` | Social links. Only set ones render. |
| `ENQUIRY_WEBHOOK_URL` | Enquiry delivery: POSTs JSON to any webhook (Zapier, Make, CRM, Slack…). |
| `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` (+ `ENQUIRY_FROM_EMAIL`) | Alternative delivery: sends an email via Resend. |

With no delivery configured, `/api/enquiry` answers 503 and the form honestly says nothing was sent, offering email (if configured) or copy-to-clipboard.

## Content to confirm before launch

All content lives in `src/content/`:

- `site.ts` — legal name, contact, socials. **No address is published until verified.**
- `services.ts` — 15 service categories (+ manufacturing & marketing pages), copy, FAQs per service.
- `package.ts` — Launch-Ready Package. Every deliverable is marked **Proposed** until `confirmed: true`; timeline/price stay "confirmed during discovery" while empty.
- `proof.ts` — case studies, testimonials and team. **Empty by design.** Sections show honest states (case-study format "in documentation"; disciplines instead of invented people; testimonials hidden in production). Add only verified, approved entries.
- `insights.ts` — four evergreen starter articles (no regulatory claims). Review authorship/dates; set `published: false` to hide.
- `images.ts` — Unsplash photography (Unsplash License). Swap for commissioned photography when available.
- `/privacy` and `/terms` are drafts marked for legal review.

## Notes

- Theme: light "Botanical Lab" / dark "After Hours Lab", tokens in `src/app/globals.css`; preference persists in `localStorage`, defaults to the OS, applied before paint (no flash).
- Loader "Formula 001" shows once per session and only advances on real milestones (hydration → fonts → load/hero ready), capped at 3.6 s; skipped for reduced motion.
- Reduced motion disables smooth scroll, 3D motion, pinned sequences (replaced with static layouts) and reveal animations.
