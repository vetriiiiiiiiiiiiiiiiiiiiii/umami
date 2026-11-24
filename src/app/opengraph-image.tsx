import { ImageResponse } from "next/og";

export const alt = "Umami Labs — One team. The entire journey.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#203b2e", color: "#f1f0e7", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#aab9a2" }}>
          <span>UMAMI LABS</span>
          <span>CONCEPT → COMPLIANT → COMMERCIAL</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>ONE TEAM.</span>
          <span style={{ color: "#c6de55" }}>THE ENTIRE JOURNEY.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, color: "#aab9a2" }}>
          <div style={{ width: 120, height: 2, background: "#c6de55" }} />
          Food innovation · Regulatory · Manufacturing · Brand
        </div>
      </div>
    ),
    size,
  );
}
