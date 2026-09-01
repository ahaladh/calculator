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
          backgroundColor: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 20,
              backgroundColor: "#2563eb",
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="8" y2="10.01" />
              <line x1="12" y1="10" x2="12" y2="10.01" />
              <line x1="16" y1="10" x2="16" y2="10.01" />
              <line x1="8" y1="14" x2="8" y2="14.01" />
              <line x1="12" y1="14" x2="12" y2="14.01" />
              <line x1="16" y1="14" x2="16" y2="14.01" />
              <line x1="8" y1="18" x2="16" y2="18" />
            </svg>
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#0f172a" }}>
            Calculator Hub
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#64748b" }}>
          Finance, health &amp; AI-cost calculators — no sign-up required
        </div>
      </div>
    ),
    { ...size },
  );
}
