import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Giovanni Venditto | Fullstack & AI-Ready Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#14100b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(202,164,86, 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(202, 164, 86, 0.12) 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(202,164,86, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(202,164,86, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              fontSize: "13px",
              color: "#caa456",
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(202,164,86, 0.4)",
              background: "rgba(202,164,86, 0.08)",
              fontWeight: "600",
            }}
          >
            Anthropic Claude Certified · Fullstack & AI-Ready
          </div>

          <div
            style={{
              fontSize: "82px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: "0.88",
              textAlign: "center",
            }}
          >
            GIOVANNI
          </div>
          <div
            style={{
              fontSize: "82px",
              fontWeight: "bold",
              color: "#caa456",
              letterSpacing: "-2px",
              lineHeight: "0.88",
              textAlign: "center",
            }}
          >
            VENDITTO
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#d6d2c9",
              marginTop: "16px",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: "1.4",
              fontWeight: "500",
            }}
          >
            Fullstack Engineer · React 19, Next.js 16, Node.js & AI Automations
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {["Next.js 16", "React 19", "Node.js", "Anthropic Claude", "AI Process Automation"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: "12px",
                  color: "#ece9e4",
                  padding: "6px 14px",
                  border: "1px solid rgba(202,164,86, 0.3)",
                  borderRadius: "9999px",
                  background: "rgba(20, 16, 11, 0.7)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
