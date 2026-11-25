import type { ExampleProduct, ProductKind } from "@/content/journey";

/**
 * Hand-drawn scenes for the "Formulation to shelf" journey.
 * Pure SVG in a 600 × 400 box, inked with the shared #ink filter.
 */

const INK = {
  stroke: "var(--color-text-primary)",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const PAPER = "var(--color-surface-elevated)";
const MUTED = "var(--color-text-secondary)";
const HAND = { fontFamily: "var(--ff-hand), cursive", fill: "var(--color-text-primary)" };

type PState = "sketch" | "raw" | "labelled";

function LabelLines({ x, y, w, h, seal = true }: { x: number; y: number; w: number; h: number; seal?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={PAPER} {...INK} strokeWidth={1.8} />
      <line x1={x + w * 0.14} y1={y + h * 0.24} x2={x + w * 0.86} y2={y + h * 0.24} {...INK} strokeWidth={3} />
      <line x1={x + w * 0.14} y1={y + h * 0.46} x2={x + w * 0.62} y2={y + h * 0.46} {...INK} strokeWidth={1.4} />
      <line x1={x + w * 0.14} y1={y + h * 0.62} x2={x + w * 0.52} y2={y + h * 0.62} {...INK} strokeWidth={1.4} />
      {seal && (
        <g>
          <circle cx={x + w * 0.78} cy={y + h * 0.62} r={Math.min(w, h) * 0.17} fill="var(--color-accent)" {...INK} strokeWidth={1.6} />
          <path
            d={`M${x + w * 0.72} ${y + h * 0.62} l${w * 0.04} ${h * 0.07} l${w * 0.08} -${h * 0.14}`}
            {...INK}
            strokeWidth={1.8}
          />
        </g>
      )}
    </g>
  );
}

/** One product drawn at (x, y) — centre — with scale s. */
export function Product({ kind, x, y, s = 1, state, colors }: { kind: ProductKind; x: number; y: number; s?: number; state: PState; colors: ExampleProduct["colors"] }) {
  const dashed = state === "sketch" ? { strokeDasharray: "7 7" } : {};
  const fillBody = state === "sketch" ? "none" : colors.body;
  const fillPack = state === "sketch" ? "none" : colors.pack;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none">
      {kind === "bar" &&
        (state === "raw" ? (
          <g filter="url(#ink)">
            <rect x={-105} y={-30} width={210} height={60} rx={12} fill={fillBody} {...INK} />
            {[-80, -50, -15, 20, 55, 85].map((cx, i) => (
              <circle key={i} cx={cx} cy={i % 2 ? -8 : 10} r={4} fill="#e8d2a4" stroke="none" />
            ))}
            <path d="M-95 -12 q 20 -8 40 0 M10 14 q 20 -8 40 0" {...INK} strokeWidth={1.4} opacity={0.6} />
          </g>
        ) : (
          <g filter="url(#ink)">
            <path d="M-118 -36 h236 l10 9 -10 9 10 9 -10 9 10 9 -10 9 10 9 -10 9 h-236 l-10 -9 10 -9 -10 -9 10 -9 -10 -9 10 -9 -10 -9 z" fill={fillPack} {...INK} {...dashed} />
            {state === "labelled" && <LabelLines x={-62} y={-28} w={124} h={56} />}
          </g>
        ))}

      {kind === "stick" &&
        (state === "raw" ? (
          <g filter="url(#ink)">
            <path d="M-80 40 C -60 -10, -20 -38, 0 -40 C 20 -38, 60 -10, 80 40 Z" fill={fillBody} {...INK} />
            {[-40, -10, 25, 50].map((cx, i) => (
              <circle key={i} cx={cx} cy={20 - i * 6} r={2.5} fill="#fff" stroke="none" opacity={0.7} />
            ))}
            <path d="M-100 42 h200" {...INK} />
          </g>
        ) : (
          <g filter="url(#ink)">
            <path d="M-28 -112 h56 v16 h-56 z M-28 96 h56 v16 h-56 z" fill={fillPack} {...INK} {...dashed} />
            <path d="M-28 -112 l7 -6 7 6 7 -6 7 6 7 -6 7 6 7 -6 7 6 M-28 112 l7 6 7 -6 7 6 7 -6 7 6 7 -6 7 6 7 -6" {...INK} strokeWidth={1.6} {...dashed} />
            <rect x={-28} y={-96} width={56} height={192} fill={fillPack} {...INK} {...dashed} />
            {state === "labelled" && <LabelLines x={-22} y={-62} w={44} h={104} />}
          </g>
        ))}

      {kind === "jar" && (
        <g filter="url(#ink)">
          {/* lid */}
          <rect x={-48} y={-98} width={96} height={22} rx={5} fill={state === "sketch" ? "none" : "var(--color-surface)"} {...INK} {...dashed} />
          {/* glass */}
          <path d="M-46 -76 C -66 -66, -70 -50, -70 -30 V 70 C -70 88, -58 98, -40 98 H 40 C 58 98, 70 88, 70 70 V -30 C 70 -50, 66 -66, 46 -76 Z" fill={state === "sketch" ? "none" : "rgba(255,255,255,0.35)"} {...INK} {...dashed} />
          {state !== "sketch" && <path d="M-64 -40 H 64 V 70 C 64 84, 54 92, 40 92 H -40 C -54 92, -64 84, -64 70 Z" fill={fillBody} stroke="none" opacity={0.92} />}
          {state !== "sketch" && <path d="M-50 -60 q -8 30 0 60" stroke="#fff" strokeWidth={4} fill="none" opacity={0.5} strokeLinecap="round" />}
          {state === "labelled" && <LabelLines x={-56} y={-22} w={112} h={74} />}
        </g>
      )}
    </g>
  );
}

function Hand({ x, y, children, size = 22, anchor = "start", rotate = 0, color }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; rotate?: number; color?: string }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} {...HAND} fill={color ?? HAND.fill} transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}>
      {children}
    </text>
  );
}

function Tick({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y} l6 7 l13 -16`} {...INK} stroke="var(--color-accent-2)" strokeWidth={3} filter="url(#ink)" />;
}

/* ───────────── stage scenes ───────────── */

export function Scene({ stage, product }: { stage: number; product: ExampleProduct }) {
  return <g fill="none">{renderScene(stage, product)}</g>;
}

function renderScene(stage: number, product: ExampleProduct) {
  const p = product;
  const k = p.kind;
  switch (stage) {
    case 0: // idea
      return (
        <g>
          <g filter="url(#ink)">
            <path d="M150 210 c-30 -22 -36 -78 4 -98 c40 -20 84 8 80 52 c-2 22 -14 34 -26 46 v18 h-58 z" fill="#fde9a8" {...INK} />
            <path d="M152 240 h56 M156 254 h48 M166 268 h28" {...INK} />
            <path d="M112 96 l-16 -16 M180 70 v-22 M246 96 l16 -16 M98 150 h-22 M262 150 h22" {...INK} stroke="var(--color-accent-2)" />
          </g>
          <ellipse cx={420} cy={200} rx={150} ry={130} fill="none" {...INK} strokeDasharray="4 10" opacity={0.7} filter="url(#ink)" />
          <Product kind={k} x={420} y={205} s={k === "stick" ? 0.9 : 0.95} state="sketch" colors={p.colors} />
          <Hand x={420} y={360} anchor="middle" size={26}>
            what if…?
          </Hand>
        </g>
      );

    case 1: // formulation
      return (
        <g>
          <g filter="url(#ink)">
            <rect x={36} y={52} width={330} height={300} rx={10} fill={PAPER} {...INK} transform="rotate(-2 200 200)" />
          </g>
          <g transform="rotate(-2 200 200)">
            <Hand x={60} y={92} size={28}>
              {p.short} — formula v3
            </Hand>
            {p.recipe.map((r, i) => {
              const y = 130 + i * 36;
              return (
                <g key={r.name}>
                  <Hand x={60} y={y} size={20}>
                    {r.name}
                  </Hand>
                  <rect x={200} y={y - 14} width={Math.max(8, r.pct * 2)} height={14} rx={3} fill={i % 2 ? "var(--wash-green)" : "var(--wash-purple)"} {...INK} strokeWidth={1.4} filter="url(#ink)" />
                  <Hand x={340} y={y} size={20} anchor="end">
                    {r.pct}%
                  </Hand>
                </g>
              );
            })}
          </g>
          <g filter="url(#ink)">
            <path d="M462 110 h36 M470 110 v58 l-46 96 c-6 14 2 24 16 24 h92 c14 0 22 -10 16 -24 l-46 -96 v-58" fill="none" {...INK} />
            <path d="M436 236 c22 -12 40 10 66 0 s 40 -6 48 0 l12 26 c6 14 -2 24 -16 24 h-92 c-14 0 -22 -10 -16 -24 z" fill={p.colors.body} opacity={0.85} stroke="none" />
            <circle cx={480} cy={220} r={5} {...INK} strokeWidth={1.6} />
            <circle cx={500} cy={196} r={4} {...INK} strokeWidth={1.6} />
          </g>
          <Hand x={490} y={340} anchor="middle" size={20} color={MUTED}>
            illustrative
          </Hand>
        </g>
      );

    case 2: // pilot batch
      return (
        <g>
          <g filter="url(#ink)">
            <path d="M70 150 h170 l-14 120 c-2 16 -14 26 -30 26 h-82 c-16 0 -28 -10 -30 -26 z" fill="var(--color-surface)" {...INK} />
            <path d="M84 188 c30 -14 60 14 90 0 s 44 -8 52 0" fill="none" {...INK} stroke={p.colors.body} strokeWidth={5} />
            <path d="M155 90 v110 M125 200 h60" {...INK} />
            <rect x={140} y={70} width={30} height={22} rx={4} fill={PAPER} {...INK} />
            <path d="M100 296 v40 M210 296 v40 M84 336 h142" {...INK} />
          </g>
          <g filter="url(#ink)">
            <path d="M260 200 c30 -30 60 -30 90 -10" {...INK} />
            <path d="M340 180 l12 12 -16 6" {...INK} />
          </g>
          <g filter="url(#ink)">
            <rect x={330} y={250} width={240} height={26} rx={4} fill="var(--color-border)" {...INK} />
          </g>
          {[380, 450, 520].map((x) => (
            <Product key={x} kind={k} x={x} y={k === "stick" ? 205 : 222} s={k === "bar" ? 0.28 : k === "stick" ? 0.38 : 0.36} state={k === "jar" ? "raw" : k === "stick" ? "labelled" : "raw"} colors={p.colors} />
          ))}
          <Hand x={450} y={326} anchor="middle" size={24}>
            pilot batch #1
          </Hand>
        </g>
      );

    case 3: // testing & shelf life
      return (
        <g>
          {[
            { x: 130, d: "day 0" },
            { x: 300, d: "day 30" },
            { x: 470, d: "day 90" },
          ].map((t, i) => (
            <g key={t.d}>
              <Product kind={k} x={t.x} y={k === "stick" ? 190 : 200} s={k === "bar" ? 0.55 : k === "stick" ? 0.7 : 0.75} state="labelled" colors={p.colors} />
              <g filter="url(#ink)">
                <rect x={t.x - 44} y={298} width={88} height={34} rx={6} fill={PAPER} {...INK} transform={`rotate(${i - 1} ${t.x} 315)`} />
              </g>
              <Hand x={t.x} y={322} anchor="middle" size={22}>
                {t.d}
              </Hand>
              <Tick x={t.x + 34} y={104} />
            </g>
          ))}
          <g filter="url(#ink)">
            <circle cx={330} cy={178} r={54} fill="rgba(255,255,255,0.18)" {...INK} strokeWidth={3} />
            <path d="M368 216 l46 46" {...INK} strokeWidth={8} />
          </g>
          <Hand x={300} y={60} anchor="middle" size={24}>
            moisture · micro · taste · texture
          </Hand>
        </g>
      );

    case 4: // compliance & label
      return (
        <g>
          <Product kind={k} x={190} y={205} s={k === "bar" ? 1.05 : k === "stick" ? 1.25 : 1.4} state="labelled" colors={p.colors} />
          <g filter="url(#ink)">
            <rect x={370} y={60} width={200} height={290} rx={10} fill={PAPER} {...INK} transform="rotate(2 470 200)" />
          </g>
          <g transform="rotate(2 470 200)">
            <Hand x={392} y={98} size={26}>
              label check
            </Hand>
            {["Category", "Ingredients", "Nutrition panel", "Allergens", "Claims", "FSSAI licence no."].map((t, i) => (
              <g key={t}>
                <rect x={392} y={118 + i * 36} width={18} height={18} rx={3} fill="none" {...INK} strokeWidth={1.6} />
                <Tick x={392} y={130 + i * 36} />
                <Hand x={420} y={133 + i * 36} size={20}>
                  {t}
                </Hand>
              </g>
            ))}
          </g>
        </g>
      );

    case 5: {
      // packaging
      const notes =
        k === "bar"
          ? ["barrier film", "crimp seal", "label panel"]
          : k === "stick"
            ? ["3-layer laminate", "heat seal", "carton of 10"]
            : ["glass jar", "lug cap", "tamper band"];
      return (
        <g>
          <Product kind={k} x={k === "bar" ? 190 : 250} y={205} s={k === "bar" ? 1.1 : k === "stick" ? 1.3 : 1.45} state="labelled" colors={p.colors} />
          {k === "stick" && (
            <g filter="url(#ink)" transform="translate(-60 0)">
              <path d="M90 250 l40 -20 h120 l-40 20 z M90 250 v80 h120 v-80 M210 250 l40 -20 v80 l-40 20" fill="var(--color-surface)" {...INK} />
            </g>
          )}
          {notes.map((t, i) => (
            <g key={t} filter="url(#ink)">
              <path d={`M${k === "bar" ? 290 : 300} ${150 + i * 60} C 340 ${140 + i * 60}, 370 ${130 + i * 60}, 400 ${120 + i * 60}`} {...INK} strokeWidth={1.6} />
              <circle cx={k === "bar" ? 290 : 300} cy={150 + i * 60} r={4} fill="var(--color-accent-2)" stroke="none" />
            </g>
          ))}
          {notes.map((t, i) => (
            <Hand key={t} x={408} y={126 + i * 60} size={22}>
              {t}
            </Hand>
          ))}
        </g>
      );
    }

    case 6: // manufacturing
      return (
        <g>
          <g filter="url(#ink)">
            <rect x={70} y={60} width={150} height={110} rx={8} fill="var(--color-surface)" {...INK} />
            <path d="M145 170 v40 M135 210 h20" {...INK} strokeWidth={4} />
            <circle cx={110} cy={100} r={14} fill="none" {...INK} />
            <path d="M110 86 v-6 M110 120 v-6 M96 100 h-6 M130 100 h-6" {...INK} />
            <rect x={150} y={88} width={52} height={26} rx={4} fill={PAPER} {...INK} strokeWidth={1.6} />
          </g>
          <g className="conveyor-items">
            {[-1, 0, 1, 2, 3, 4].map((i) => (
              <Product key={i} kind={k} x={60 + i * 130} y={k === "stick" ? 232 : k === "bar" ? 280 : 250} s={k === "bar" ? 0.4 : k === "stick" ? 0.5 : 0.55} state="labelled" colors={p.colors} />
            ))}
          </g>
          <g filter="url(#ink)">
            <path d="M20 300 h560 M20 322 h560" {...INK} />
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={40 + i * 58} cy={311} r={9} fill="none" {...INK} strokeWidth={1.8} />
            ))}
            <path d="M60 322 v40 M540 322 v40" {...INK} />
          </g>
          <Hand x={250} y={52} size={24}>
            trial run → full production
          </Hand>
        </g>
      );

    default: // on the shelf
      return (
        <g>
          <g filter="url(#ink)">
            <rect x={60} y={40} width={480} height={320} rx={6} fill="none" {...INK} />
            <path d="M60 200 h480 M60 214 h480 M60 346 h480" {...INK} />
          </g>
          {[0, 1].map((row) =>
            [0, 1, 2].map((col) => (
              <Product
                key={`${row}-${col}`}
                kind={k}
                x={150 + col * 150}
                y={row === 0 ? (k === "stick" ? 124 : k === "bar" ? 170 : 140) : k === "stick" ? 284 : k === "bar" ? 328 : 286}
                s={k === "bar" ? 0.5 : k === "stick" ? 0.56 : 0.62}
                state="labelled"
                colors={p.colors}
              />
            )),
          )}
          <g filter="url(#ink)" transform="rotate(-8 500 70)">
            <path d="M460 52 h80 v40 h-80 l-14 -20 z" fill="var(--color-accent)" {...INK} />
            <circle cx={460} cy={72} r={4} fill={PAPER} {...INK} strokeWidth={1.4} />
          </g>
          <Hand x={502} y={80} anchor="middle" size={24} rotate={-8}>
            new!
          </Hand>
        </g>
      );
  }
}
