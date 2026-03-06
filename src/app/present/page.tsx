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
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: legoTheme.colors.gray, fontFamily: legoTheme.fontFamily }}
      >
        <div
          className="text-center p-8"
          style={{
            border: `3px solid ${legoTheme.colors.black}`,
            borderRadius: legoTheme.borderRadius,
            boxShadow: legoTheme.shadow,
            backgroundColor: legoTheme.colors.white,
          }}
        >
          <p
            className="text-xl font-black uppercase tracking-widest"
            style={{ color: legoTheme.colors.red }}
          >
            No team data found
          </p>
          <p className="mt-2 text-sm font-bold" style={{ color: "#666" }}>
            Go back to the shuffler and click &quot;Show Teams&quot; to open this page.
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { teams, teamNames, useTeamNames } = data;
  const cols = getColumnCount(teams.length);

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundColor: legoTheme.colors.black,
        fontFamily: legoTheme.fontFamily,
      }}
    >
      {/* Header bar */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-xs font-black uppercase tracking-widest px-3 py-1"
          style={{
            backgroundColor: legoTheme.colors.yellow,
            color: legoTheme.colors.black,
            border: `2px solid ${legoTheme.colors.black}`,
            borderRadius: legoTheme.borderRadius,
            boxShadow: "2px 2px 0px #fff",
          }}
        >
          🧱 Team Shuffler — Presentation
        </span>
        <span className="text-xs font-bold" style={{ color: "#888" }}>
          {teams.reduce((s, t) => s + t.length, 0)} members · {teams.length} teams
        </span>
      </div>

      {/* Team grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
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
              className="flex flex-col overflow-hidden"
              style={{
                border: `3px solid ${legoTheme.colors.white}`,
                borderRadius: legoTheme.borderRadius,
                boxShadow: `4px 4px 0px ${color}`,
              }}
            >
              {/* Team header */}
              <div
                className="px-5 py-3 flex items-baseline gap-3"
                style={{
                  backgroundColor: color,
                  borderBottom: `3px solid ${legoTheme.colors.white}`,
                }}
              >
                {useTeamNames && (
                  <span
                    className="font-black uppercase tracking-widest opacity-70"
                    style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)", color: textColor }}
                  >
                    Team {i + 1}
                  </span>
                )}
                <span
                  className="font-black truncate"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: textColor }}
                >
                  {label}
                </span>
                <span
                  className="ml-auto font-black shrink-0"
                  style={{
                    fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
                    color: textColor,
                    opacity: 0.8,
                  }}
                >
                  {members.length}
                </span>
              </div>

              {/* Members */}
              <div
                className="flex flex-col gap-2 p-4"
                style={{ backgroundColor: "#1e1e1e", flex: 1 }}
              >
                {members.map((name) => (
                  <div
                    key={name}
                    className="font-black truncate"
                    style={{
                      fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)",
                      color: legoTheme.colors.white,
                      padding: "6px 10px",
                      borderLeft: `4px solid ${color}`,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "2px",
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

      {/* Footer hint */}
      <p
        className="mt-4 text-center text-xs font-bold uppercase tracking-widest"
        style={{ color: "#444" }}
      >
        Press F11 for fullscreen
      </p>
    </div>
  );
}
