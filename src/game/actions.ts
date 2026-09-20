import type { GameState } from "./game-state.js";
export function setNightAction(state: GameState, actorId: string, targetId: string) {
  if (state.phase !== "NIGHT") throw new Error("Night actions are closed");
  if (!state.players[actorId]?.alive || !state.players[targetId]?.alive) throw new Error("Invalid player");
  state.nightActions[actorId] = targetId;
}
