"use client";

import { useEffect, useState } from "react";
import { legoTheme } from "@/styles/themes/lego";

interface PresentationData {
  teams: string[][];
  teamNames: string[];
  useTeamNames: boolean;
}

function getColumnCount(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 3;
  if (n === 4) return 2;
  if (n <= 6) return 3;
  return 4;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function PresentPage() {
  const [data, setData] = useState<PresentationData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("team-shuffler-presentation");
      if (!raw) {
        setError(true);
        return;
      }
      setData(JSON.parse(raw));
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100dvh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: legoTheme.colors.gray,
          fontFamily: legoTheme.fontFamily,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            border: `3px solid ${legoTheme.colors.black}`,
            borderRadius: legoTheme.borderRadius,
            boxShadow: legoTheme.shadow,
            backgroundColor: legoTheme.colors.white,
          }}
        >
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: legoTheme.colors.red,
            }}
          >
            No team data found
          </p>
          <p style={{ marginTop: "8px", fontSize: "0.875rem", fontWeight: 700, color: "#666" }}>
            Go back to the shuffler and click &quot;Show Teams&quot; to open this page.
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { teams, teamNames, useTeamNames } = data;
  const cols = getColumnCount(teams.length);
  const rows = Math.ceil(teams.length / cols);
  const maxMembers = Math.max(...teams.map((t) => t.length));
  const totalMembers = teams.reduce((s, t) => s + t.length, 0);

  // Dynamic font sizes via CSS calc + custom properties so everything fits
  // in exactly 100dvh without any scrolling, regardless of team/member count.
  //
  // Layout budget:
  //   100dvh
  //   - outer padding:  24px  (12px top + bottom)
  //   - header:         40px
  //   - header gap:      8px
  //   - grid row gaps:  10px × (rows − 1)
  //   ─────────────────────────────────────
  //   per card height:  (100dvh − 72px − 10px × rows) / rows
  //
  //   per card:
  //   - card borders:    6px  (3px × 2)
  //   - team header:    ~44px (padding 10px×2 + text + border)
  //   - member padding: 16px  (8px × 2)
  //   ─────────────────────────────────────
  //   member area:  card − 66px
  //   per member:   member area / maxMembers  (flex:1 distributes equally)
  //   font size:    per member × 0.55  (line-height headroom)
  //
  // Expressed as CSS calc (CSS vars carry rows + maxMembers):
  //   memberFontSize = clamp(0.5rem,
  //     ((100dvh − 72px) / var(--rows) − 10px − 66px) / var(--max-members) * 0.55,
  //     1.6rem)

  const cssVars = {
    "--rows": rows,
    "--max-members": maxMembers,
  } as React.CSSProperties;

  const memberFontSize =
    "clamp(0.5rem, calc(((100dvh - 72px) / var(--rows) - 76px) / var(--max-members) * 0.55), 1.6rem)";

  const teamNameFontSize =
    "clamp(0.85rem, calc((100dvh - 72px) / var(--rows) * 0.13), 1.8rem)";

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: legoTheme.colors.black,
        fontFamily: legoTheme.fontFamily,
        padding: "12px",
        boxSizing: "border-box",
        gap: "8px",
        ...cssVars,
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            backgroundColor: legoTheme.colors.yellow,
            color: legoTheme.colors.black,
            border: `2px solid ${legoTheme.colors.black}`,
            borderRadius: legoTheme.borderRadius,
            padding: "3px 12px",
            fontSize: "11px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            boxShadow: "2px 2px 0px #fff",
          }}
        >
          Team Shuffler — Presentation
        </span>
        <span style={{ color: "#888", fontSize: "11px", fontWeight: 700 }}>
          {totalMembers} members · {teams.length} teams
        </span>
      </div>

      {/* ── Team grid ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "10px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {teams.map((members, i) => {
          const color = legoTheme.teamColors[i % legoTheme.teamColors.length];
          const isLight = isLightColor(color);
          const textColor = isLight ? legoTheme.colors.black : legoTheme.colors.white;
          const label = useTeamNames ? (teamNames[i] ?? `Team ${i + 1}`) : `Team ${i + 1}`;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: `3px solid ${legoTheme.colors.white}`,
                borderRadius: legoTheme.borderRadius,
                boxShadow: `4px 4px 0px ${color}`,
              }}
            >
              {/* Team header */}
              <div
                style={{
                  backgroundColor: color,
                  borderBottom: `3px solid ${legoTheme.colors.white}`,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                {useTeamNames && (
                  <span
                    style={{
                      fontSize: "clamp(0.5rem, 1vw, 0.7rem)",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: 0.7,
                      color: textColor,
                    }}
                  >
                    Team {i + 1}
                  </span>
                )}
                <span
                  style={{
                    fontSize: teamNameFontSize,
                    fontWeight: 900,
                    color: textColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
                    fontWeight: 900,
                    color: textColor,
                    opacity: 0.8,
                    flexShrink: 0,
                  }}
                >
                  {members.length}
                </span>
              </div>

              {/* Member list — fills remaining card height with equal rows */}
              <div
                style={{
                  backgroundColor: "#1e1e1e",
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {members.map((name) => (
                  <div
                    key={name}
                    style={{
                      flex: 1,
                      minHeight: 0,
                      display: "flex",
                      alignItems: "center",
                      fontSize: memberFontSize,
                      fontWeight: 900,
                      color: legoTheme.colors.white,
                      padding: "0 10px",
                      borderLeft: `4px solid ${color}`,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
