import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Team Shuffler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFD700",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            border: "8px solid #1A1A1A",
            borderRadius: "8px",
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFD700",
            boxShadow: "8px 8px 0px #1A1A1A",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#1A1A1A",
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            Team Shuffler
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#1A1A1A",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            Randomly shuffle people into teams — perfect for workshops and retrospectives
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
