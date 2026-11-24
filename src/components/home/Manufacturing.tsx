import { manufacturingServices } from "@/content/marketing";
import { Cta } from "@/components/ui/Cta";
import { MaskLines } from "@/components/ui/Text";

/** Abstract capability map — deliberately generic: no real partners are depicted. */
export function NetworkMap() {
  const nodes = [
    { x: 120, y: 90, l: "Capability A" }, { x: 330, y: 60, l: "Capability B" }, { x: 520, y: 110, l: "Capability C" },
    { x: 80, y: 300, l: "Capability D" }, { x: 560, y: 320, l: "Capability E" }, { x: 210, y: 420, l: "Capability F" },
    { x: 420, y: 430, l: "Capability G" },
  ];
  const c = { x: 320, y: 250 };
  return (
    <svg viewBox="0 0 640 500" className="h-auto w-full" role="img" aria-labelledby="map-desc">
      <desc id="map-desc">
        Illustrative map: your product at the centre, connected to candidate manufacturing capabilities that are evaluated for fit.
        It does not represent specific partners.
      </desc>
      <defs>
        <pattern id="mgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="640" height="500" fill="url(#mgrid)" />
      {[70, 140, 210].map((r) => (
        <circle key={r} cx={c.x} cy={c.y} r={r} fill="none" stroke="var(--color-border-strong)" strokeDasharray="2 6" />
      ))}
      {nodes.map((n, i) => (
        <g key={n.l}>
          <line x1={c.x} y1={c.y} x2={n.x} y2={n.y} stroke={i === 2 || i === 4 ? "var(--color-accent)" : "var(--color-border-strong)"} strokeWidth={i === 2 || i === 4 ? 1.6 : 1}>
            {(i === 2 || i === 4) && <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="3s" repeatCount="indefinite" />}
          </line>
          <rect x={n.x - 6} y={n.y - 6} width="12" height="12" fill={i === 2 || i === 4 ? "var(--color-accent)" : "var(--color-deep)"} stroke="var(--color-border-strong)" />
          <text x={n.x} y={n.y - 14} textAnchor="middle" fontSize="10" fontFamily="var(--ff-mono)" letterSpacing="0.08em" fill="currentColor" opacity="0.75">
            {n.l.toUpperCase()}
          </text>
        </g>
      ))}
      <circle cx={c.x} cy={c.y} r="34" fill="var(--color-accent)" />
      <circle cx={c.x} cy={c.y} r="34" fill="none" stroke="var(--color-accent)" opacity="0.5">
        <animate attributeName="r" values="34;70" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <text x={c.x} y={c.y - 2} textAnchor="middle" fontSize="10" fontFamily="var(--ff-mono)" fill="var(--color-accent-ink)">
        YOUR
      </text>
      <text x={c.x} y={c.y + 11} textAnchor="middle" fontSize="10" fontFamily="var(--ff-mono)" fill="var(--color-accent-ink)">
        PRODUCT
      </text>
      <text x="16" y="488" fontSize="9" fontFamily="var(--ff-mono)" fill="currentColor" opacity="0.6">
        ILLUSTRATIVE — EVALUATED FOR PROCESS FIT, CAPACITY, MOQ, HYGIENE &amp; DOCUMENTATION
      </text>
    </svg>
  );
}

export function Manufacturing() {
  return (
    <section aria-labelledby="mfg-title" className="deep grain section relative overflow-hidden">
      <div className="wrap relative z-10 grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <MaskLines id="mfg-title" className="t-h2" lines={["Your product.", ["The right ", { serif: "production" }], "partner."]} />
          <p className="mt-6 max-w-[46ch] text-band-muted">
            Not every product needs a new factory. We help you identify suitable contract manufacturers and co-packers, assess
            feasibility and process compatibility, and manage the technical transfer from your formulation to their line.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-rule">
            {manufacturingServices.map((s, i) => (
              <li key={s} className="flex gap-3 border-b border-rule py-2.5 text-[0.92rem]">
                <span className="t-label pt-0.5 text-lime">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Cta href="/manufacturing" variant="accent">
              Find your manufacturing path
            </Cta>
          </div>
        </div>
        <div className="text-band-ink lg:col-span-6 lg:col-start-7" data-reveal="fade">
          <NetworkMap />
        </div>
      </div>
    </section>
  );
}
