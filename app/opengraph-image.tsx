import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Whacko's Wash — Kid-Powered Car Detailing in Klamath Falls, Oregon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1628 0%, #00AAFF 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background bubbles */}
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: -60, left: -60, display: "flex" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: -100, right: -80, display: "flex" }} />
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,215,0,0.08)", top: 80, right: 120, display: "flex" }} />

        {/* Logo circle */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#00AAFF",
            border: "6px solid #FFD700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontSize: 80, fontWeight: 900, color: "#FFD700", lineHeight: 1 }}>W</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#00AAFF",
            textShadow: "4px 4px 0px #FFD700",
            letterSpacing: "-1px",
            marginBottom: 16,
            display: "flex",
          }}
        >
          WHACKO&apos;S WASH
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#FFD700",
            marginBottom: 40,
            display: "flex",
          }}
        >
          ✨ Kid-Powered Sparkle for Your Car! ✨
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 22, opacity: 0.9 }}>
            <span>📍</span>
            <span>Klamath Falls, Oregon</span>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", display: "flex" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 22, opacity: 0.9 }}>
            <span>📱</span>
            <span>(888) 230-6442</span>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", display: "flex" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 22, opacity: 0.9 }}>
            <span>🚗</span>
            <span>Book Online</span>
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 40,
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            display: "flex",
          }}
        >
          whackoswash.com
        </div>
      </div>
    ),
    { ...size }
  );
}
