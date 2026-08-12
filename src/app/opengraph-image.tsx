import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Giovanni Venditto | Creative Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b1410",
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
            background: "radial-gradient(circle, rgba(184, 255, 60, 0.15) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(132, 199, 15, 0.10) 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(184, 255, 60, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 255, 60, 0.03) 1px, transparent 1px)",
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
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#b8ff3c",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Creative Engineering
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: "0.9",
              textAlign: "center",
            }}
          >
            GIOVANNI
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#b8ff3c",
              letterSpacing: "-2px",
              lineHeight: "0.9",
              textAlign: "center",
            }}
          >
            VENDITTO
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#b4c7bb",
              marginTop: "24px",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Senior Frontend Developer & Creative Engineer
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["React", "Next.js", "TypeScript", "WebGL"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: "12px",
                  color: "#b4c7bb",
                  padding: "6px 12px",
                  border: "1px solid rgba(184, 255, 60, 0.2)",
                  borderRadius: "9999px",
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
