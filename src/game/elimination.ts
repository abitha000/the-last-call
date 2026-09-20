import type { GameState } from "./game-state.js";
export function eliminate(state: GameState, playerId: string) {
  const p = state.players[playerId];
  if (!p) throw new Error("Unknown player");
  p.alive = false;
}
