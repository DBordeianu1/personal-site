import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#f5f0e8",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        gap: 16,
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, color: "#171717", letterSpacing: "-1px" }}>
        Daniela Bordeianu
      </div>
      <div style={{ fontSize: 30, color: "#78716c" }}>
        Software Developer · Computer Science Student
      </div>
    </div>,
    { ...size }
  );
}
