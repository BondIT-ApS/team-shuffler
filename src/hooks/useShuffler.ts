import { useState, useCallback } from "react";
import { shuffle } from "@/lib/shuffle";
import { trackEvent } from "@/lib/analytics";

const HISTORY_LIMIT = 5;

interface HistoryEntry {
  teams: string[][];
  timestamp: string;
}

interface ValidationResult {
  nameList: string[];
  duplicates: string[];
  error: string | null;
  warning: string | null;
}

function validate(names: string, teamCount: number): ValidationResult {
  const nameList = names
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);

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

function pushHistory(history: HistoryEntry[], teams: string[][]): HistoryEntry[] {
  const entry: HistoryEntry = { teams, timestamp: new Date().toISOString() };
  const updated = [...history, entry];
  return updated.length > HISTORY_LIMIT ? updated.slice(updated.length - HISTORY_LIMIT) : updated;
}

export function useShuffler() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(3);
  const [result, setResult] = useState<string[][] | null>(null);
  const [copyConfirmed, setCopyConfirmed] = useState(false);
  const [lockedNames, setLockedNames] = useState<Set<string>>(new Set());
  const [useTeamNames, setUseTeamNames] = useState(true);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const validation = validate(names, teamCount);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  function toggleLock(name: string) {
    setLockedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function applyResult(teams: string[][], fromHistory?: boolean) {
    setResult(teams);
    if (!fromHistory) {
      setHistory((prev) => {
        const truncated = prev.slice(0, historyIndex + 1);
        const next = pushHistory(truncated, teams);
        setHistoryIndex(next.length - 1);
        return next;
      });
    }
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
    applyResult(teams);
    trackEvent("shuffle", {
      team_count: teamCount,
      participant_count: validation.nameList.length,
    });
  }

  function historyBack() {
    if (!canGoBack) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setResult(history[newIndex].teams);
  }

  function historyForward() {
    if (!canGoForward) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setResult(history[newIndex].teams);
  }

  const moveParticipant = useCallback(
    (fromTeam: number, fromIndex: number, toTeam: number) => {
      if (!result) return;
      if (fromTeam === toTeam) return;

      const next = result.map((team) => [...team]);
      const [member] = next[fromTeam].splice(fromIndex, 1);
      next[toTeam].push(member);
      applyResult(next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result, historyIndex]
  );

  function handleCopy() {
    if (!result) return;
    const text = result.map((team, i) => `Team ${i + 1}: ${team.join(", ")}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopyConfirmed(true);
    setTimeout(() => setCopyConfirmed(false), 2000);
    trackEvent("copy_teams");
  }

  function handleReset() {
    setNames("");
    setTeamCount(3);
    setResult(null);
    setLockedNames(new Set());
    setCopyConfirmed(false);
    setHistory([]);
    setHistoryIndex(-1);
    trackEvent("reset");
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
    useTeamNames,
    setUseTeamNames,
    history,
    historyIndex,
    canGoBack,
    canGoForward,
    historyBack,
    historyForward,
    moveParticipant,
  };
}
