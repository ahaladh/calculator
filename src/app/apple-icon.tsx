import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2563eb",
        }}
      >
        <svg
          width="110"
          height="110"
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
    ),
    { ...size },
  );
}
