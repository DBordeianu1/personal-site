import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const imgBuffer = await readFile(join(process.cwd(), "public/photos/from-gibraltar.jpg"));
  const base64 = imgBuffer.toString("base64");
  const src = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      {/* Background photo */}
      <img
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.0) 100%)",
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 72,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-1px",
            fontFamily: "sans-serif",
          }}
        >
          Daniela Bordeianu
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "sans-serif",
          }}
        >
          Software Developer · Computer Science Student
        </div>
      </div>
    </div>,
    { ...size }
  );
}
