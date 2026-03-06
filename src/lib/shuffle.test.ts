import { describe, it, expect } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("even split: 6 names into 2 teams gives 3 each", () => {
    const names = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank"];
    const { teams } = shuffle(names, 2);
    expect(teams).toHaveLength(2);
    expect(teams[0]).toHaveLength(3);
    expect(teams[1]).toHaveLength(3);
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("uneven split: 7 names into 3 teams, max size diff = 1", () => {
    const names = ["A", "B", "C", "D", "E", "F", "G"];
    const { teams } = shuffle(names, 3);
    expect(teams).toHaveLength(3);
    const sizes = teams.map((t) => t.length);
    const maxSize = Math.max(...sizes);
    const minSize = Math.min(...sizes);
    expect(maxSize - minSize).toBeLessThanOrEqual(1);
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("more teams than names: 2 names, 5 teams → 2 non-empty, 3 empty", () => {
    const names = ["Alice", "Bob"];
    const { teams } = shuffle(names, 5);
    expect(teams).toHaveLength(5);
    const nonEmpty = teams.filter((t) => t.length > 0);
    expect(nonEmpty).toHaveLength(2);
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("all names locked: reshuffle preserves all assignments", () => {
    const names = ["Alice", "Bob", "Carol"];
    const lockedAssignments = { Alice: 0, Bob: 1, Carol: 0 };
    const { teams } = shuffle(names, 2, { lockedAssignments });
    expect(teams[0]).toContain("Alice");
    expect(teams[0]).toContain("Carol");
    expect(teams[1]).toContain("Bob");
  });

  it("partial lock: locked names stay, unlocked redistribute", () => {
    const names = ["Alice", "Bob", "Carol", "Dave"];
    const lockedAssignments = { Alice: 0 };
    const { teams } = shuffle(names, 2, { lockedAssignments });
    expect(teams[0]).toContain("Alice");
    // All names should appear exactly once
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("teamCount < 2 clamps to 2", () => {
    const names = ["Alice", "Bob", "Carol"];
    const { teams } = shuffle(names, 1);
    expect(teams).toHaveLength(2);
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("teamCount of 0 clamps to 2", () => {
    const names = ["Alice", "Bob"];
    const { teams } = shuffle(names, 0);
    expect(teams).toHaveLength(2);
    expect(teams.flat().sort()).toEqual(names.slice().sort());
  });

  it("empty names array returns empty teams", () => {
    const { teams } = shuffle([], 3);
    expect(teams).toHaveLength(3);
    expect(teams.every((t) => t.length === 0)).toBe(true);
  });

  it("results are randomised: repeated calls produce different orderings", () => {
    const names = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const results = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const { teams } = shuffle(names, 2);
      results.add(JSON.stringify(teams));
    }
    // With 8 names and 20 trials, at least 2 distinct orderings are expected
    expect(results.size).toBeGreaterThan(1);
  });
});
