import { NextResponse } from "next/server";
import { sanitize, summarise, validateAll } from "@/lib/enquiry";

/**
 * Project enquiry endpoint.
 *
 * Delivery is configured with environment variables (never exposed to the client):
 *   ENQUIRY_WEBHOOK_URL   — POST JSON to any webhook (Zapier, Make, Slack, a CRM, your own API)
 *   RESEND_API_KEY + ENQUIRY_TO_EMAIL (+ ENQUIRY_FROM_EMAIL) — send an email via Resend
 * If neither is configured the endpoint answers 503 and the form offers an honest fallback.
 */

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const e = sanitize(body);
  // honeypot: pretend success for bots
  if (e.website) return NextResponse.json({ ok: true });

  const errors = validateAll(e);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const payload = { ...e, website: undefined, receivedAt: new Date().toISOString(), source: "umamilabs-website" };

  try {
    if (webhook) {
      const r = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
      return NextResponse.json({ ok: true });
    }
    if (resendKey && to) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL || "Umami Labz Website <onboarding@resend.dev>",
          to: [to],
          reply_to: e.email,
          subject: `New project enquiry — ${e.name}${e.company ? ` (${e.company})` : ""}`,
          text: summarise(e),
        }),
      });
      if (!r.ok) throw new Error(`Email provider responded ${r.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json({ ok: false, error: "We couldn't deliver your enquiry right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: false, configured: false }, { status: 503 });
}
