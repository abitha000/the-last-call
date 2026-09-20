import type { GameState } from "../game/game-state.js";
import { redis } from "./redis.js";
import { gameKey } from "./keys.js";

export async function getGame(id: string): Promise<GameState | null> {
  const raw = await redis.get(gameKey(id));
  return raw ? JSON.parse(raw) as GameState : null;
}
export async function saveGame(state: GameState): Promise<void> {
  await redis.set(gameKey(state.id), JSON.stringify(state));
}
export async function deleteGame(id: string): Promise<void> {
  await redis.del(gameKey(id));
}
