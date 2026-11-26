import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "The Umami Labs — From first formulation to full-scale production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const jar = await readFile(join(process.cwd(), "public/brand/the-umami-labs-logo.png"));
  const src = `data:image/png;base64,${jar.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: "56px 80px", background: "#f6f4f0", color: "#1f2419", fontFamily: "serif" }}>
        { }
        <img src={src} width={520} height={436} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 46, maxWidth: 520, lineHeight: 1.2 }}>From first formulation to full-scale production.</div>
          <div style={{ fontSize: 26, marginTop: 24, color: "#5f6656" }}>Formulation · FSSAI compliance · Plant setup · Manufacturing · Branding</div>
        </div>
      </div>
    ),
    size,
  );
}
