import { useState } from "react";
import { shuffle } from "@/lib/shuffle";

interface ValidationResult {
  nameList: string[];
  duplicates: string[];
  error: string | null;
  warning: string | null;
}

function validate(names: string, teamCount: number): ValidationResult {
  const nameList = names.split("\n").map((n) => n.trim()).filter(Boolean);

  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const n of nameList) {
    if (seen.has(n)) duplicates.push(n);
    else seen.add(n);
  }

  let error: string | null = null;
  if (nameList.length === 1) error = "Add at least 2 names to create teams";
  else if (nameList.length > 1 && teamCount > nameList.length)
    error = `Not enough names for ${teamCount} teams — add more names or reduce team count`;

  let warning: string | null = null;
  if (duplicates.length > 0)
    warning = `Duplicate names detected: ${[...new Set(duplicates)].join(", ")}`;

  return { nameList, duplicates, error, warning };
}

export function useShuffler() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(3);
  const [result, setResult] = useState<string[][] | null>(null);
  const [copyConfirmed, setCopyConfirmed] = useState(false);
  const [lockedNames, setLockedNames] = useState<Set<string>>(new Set());

  const validation = validate(names, teamCount);

  function toggleLock(name: string) {
    setLockedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function handleShuffle() {
    if (validation.error) return;
    const lockedAssignments: Record<string, number> = {};
    if (result) {
      result.forEach((team, idx) => {
        team.forEach((name) => {
          if (lockedNames.has(name)) lockedAssignments[name] = idx;
        });
      });
    }
    const { teams } = shuffle(validation.nameList, teamCount, { lockedAssignments });
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
    validation,
  };
}
