import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Umami Labz — From first formulation to full-scale production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const jar = await readFile(join(process.cwd(), "public/brand/umami-labz-jar.png"));
  const src = `data:image/png;base64,${jar.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: "56px 80px", background: "#f6f4f0", color: "#231b1f", fontFamily: "serif" }}>
        { }
        <img src={src} width={480} height={381} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, color: "#7a1232", letterSpacing: 2, textShadow: "5px 5px 0 #231b1f" }}>UMAMI</div>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: 6, color: "#a64a2a", marginTop: -4 }}>LABZ</div>
          <div style={{ fontSize: 40, marginTop: 36, maxWidth: 620, lineHeight: 1.2 }}>From first formulation to full-scale production.</div>
          <div style={{ fontSize: 26, marginTop: 20, color: "#5d5f72" }}>Formulation · FSSAI compliance · Plant setup · Manufacturing · Branding</div>
        </div>
      </div>
    ),
    size,
  );
}
