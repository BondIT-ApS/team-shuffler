import { useState } from "react";
import { shuffle } from "@/lib/shuffle";

export function useShuffler() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(3);
  const [result, setResult] = useState<string[][] | null>(null);
  const [copyConfirmed, setCopyConfirmed] = useState(false);
  const [lockedNames, setLockedNames] = useState<Set<string>>(new Set());

  function toggleLock(name: string) {
    setLockedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) { next.delete(name); } else { next.add(name); }
      return next;
    });
  }

  function handleShuffle() {
    const nameList = names
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    const lockedAssignments: Record<string, number> = {};
    if (result) {
      result.forEach((team, idx) => {
        team.forEach((name) => {
          if (lockedNames.has(name)) lockedAssignments[name] = idx;
        });
      });
    }
    const { teams } = shuffle(nameList, teamCount, { lockedAssignments });
    setResult(teams);
  }

  function handleCopy() {
    if (!result) return;
    const text = result
      .map((team, i) => `Team ${i + 1}: ${team.join(", ")}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopyConfirmed(true);
    setTimeout(() => setCopyConfirmed(false), 2000);
  }

  function handleReset() {
    setNames("");
    setTeamCount(3);
    setResult(null);
    setLockedNames(new Set());
    setCopyConfirmed(false);
  }

  return {
    names,
    setNames,
    teamCount,
    setTeamCount,
    result,
    handleShuffle,
    handleCopy,
    handleReset,
    copyConfirmed,
    lockedNames,
    toggleLock,
  };
}
