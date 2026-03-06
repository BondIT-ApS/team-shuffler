import { useState } from "react";
import { shuffle } from "@/lib/shuffle";

export function useShuffler() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(3);
  const [result, setResult] = useState<string[][] | null>(null);
  const [copyConfirmed, setCopyConfirmed] = useState(false);

  function handleShuffle() {
    const nameList = names
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    const { teams } = shuffle(nameList, teamCount);
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
  };
}
