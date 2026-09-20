import type { GameState } from "./game-state.js";
export function callerAlive(state: GameState) {
  return Object.values(state.players).some(p => p.alive && p.role === "CALLER");
}
