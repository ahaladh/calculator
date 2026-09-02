import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#faf9f6",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 68, color: "#1c1a17" }}>
          World of the Developers
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            fontSize: 28,
            fontFamily: "sans-serif",
            color: "#6f6a5e",
          }}
        >
          IT development &amp; free calculators — no sign-up required
        </div>
      </div>
    ),
    { ...size },
  );
}
