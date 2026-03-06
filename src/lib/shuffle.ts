export interface ShuffleOptions {
  lockedAssignments?: Record<string, number>; // name -> teamIndex (0-based)
}

export interface ShuffleResult {
  teams: string[][];
}

export function shuffle(names: string[], teamCount: number, options?: ShuffleOptions): ShuffleResult {
  const clampedTeamCount = Math.max(2, teamCount);
  const locked = options?.lockedAssignments ?? {};

  const teams: string[][] = Array.from({ length: clampedTeamCount }, () => []);

  if (names.length === 0) {
    return { teams };
  }

  // Place locked names first
  for (const name of names) {
    if (name in locked) {
      const idx = locked[name];
      if (idx >= 0 && idx < clampedTeamCount) {
        teams[idx].push(name);
      }
    }
  }

  // Fisher-Yates shuffle on unlocked names
  const unlocked = names.filter((name) => !(name in locked));
  for (let i = unlocked.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unlocked[i], unlocked[j]] = [unlocked[j], unlocked[i]];
  }

  // Determine target sizes: spread extras across teams fairly (not front-loaded)
  const total = names.length;
  const baseSize = Math.floor(total / clampedTeamCount);
  const extras = total % clampedTeamCount;

  // Teams with index >= (clampedTeamCount - extras) get one extra member
  // This distributes extras to the last `extras` teams rather than the first,
  // avoiding front-loading.
  const targetSize = (teamIdx: number) =>
    baseSize + (teamIdx >= clampedTeamCount - extras ? 1 : 0);

  // Fill each team up to its target size with unlocked names
  let unlockedIdx = 0;
  for (let t = 0; t < clampedTeamCount; t++) {
    const needed = targetSize(t) - teams[t].length;
    for (let i = 0; i < needed && unlockedIdx < unlocked.length; i++) {
      teams[t].push(unlocked[unlockedIdx++]);
    }
  }

  // If any unlocked names remain (e.g. locked names overfilled some teams),
  // append them to teams that are still below their target, then overflow
  for (let t = 0; t < clampedTeamCount && unlockedIdx < unlocked.length; t++) {
    teams[t].push(unlocked[unlockedIdx++]);
  }

  return { teams };
}
