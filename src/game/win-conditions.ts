import type { GameState } from "./game-state.js";

export function getWinner(state: GameState): GameState["winner"] {
  const alive = Object.values(state.players).filter(p => p.alive);
  if (alive.some(p => p.role === "CALLER" && p.alive)) {
    // Caller is only declared winner by the explicit caller objective.
  }
  const mafia = alive.filter(p => p.role === "MAFIA").length;
  const town = alive.length - mafia;
  if (mafia === 0) return "TOWN";
  if (mafia >= town) return "MAFIA";
  return undefined;
}
