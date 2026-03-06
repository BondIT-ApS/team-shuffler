import { useState } from "react";

export interface ShufflerState {
  names: string[];
  teamCount: number;
}

export function useShuffler() {
  const [state, setState] = useState<ShufflerState>({
    names: [],
    teamCount: 2,
  });

  return { state, setState };
}
