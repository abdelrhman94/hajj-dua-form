import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "دعواتكم أمانة عندي - سأحملها معي إلى البيت الحرام";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "radial-gradient(ellipse at top, #2d1a00 0%, #1a1208 60%)",
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
          position: "relative",
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            border: "2px solid rgba(201, 168, 76, 0.3)",
            borderRadius: 24,
            display: "flex",
          }}
        />

        {/* Mosque emoji */}
        <div style={{ fontSize: 80, marginBottom: 16, display: "flex" }}>
          🕌
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#C9A84C",
            textAlign: "center",
            marginBottom: 16,
            display: "flex",
          }}
        >
          دعواتكم أمانة عندي
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(212, 184, 106, 0.6)",
            textAlign: "center",
            display: "flex",
          }}
        >
          سأحملها معي إلى البيت الحرام إن شاء الله ❤️
        </div>

        {/* Gold line */}
        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            marginTop: 32,
            display: "flex",
          }}
        />

        {/* Dua hands */}
        <div
          style={{
            fontSize: 36,
            color: "rgba(201, 168, 76, 0.4)",
            marginTop: 24,
            display: "flex",
          }}
        >
          🤲 أرسل دعواتك الآن 🤲
        </div>
      </div>
    ),
    { ...size }
  );
}
