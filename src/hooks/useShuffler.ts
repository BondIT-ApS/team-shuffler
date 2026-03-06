import { useState } from "react";
import { shuffle } from "@/lib/shuffle";

export function useShuffler() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(3);
  const [result, setResult] = useState<string[][] | null>(null);

  function handleShuffle() {
    const nameList = names
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    const shuffled = shuffle(nameList);
    const teams: string[][] = Array.from({ length: teamCount }, () => []);
    shuffled.forEach((name, i) => {
      teams[i % teamCount].push(name);
    });
    setResult(teams);
  }

  return { names, setNames, teamCount, setTeamCount, result, handleShuffle };
}
