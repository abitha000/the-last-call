import { randomUUID } from "node:crypto";
import { redis } from "./redis.js";
import { lockKey } from "./keys.js";

export async function withGameLock<T>(gameId: string, fn: () => Promise<T>, ttlMs = 8000): Promise<T> {
  const key = lockKey(gameId);
  const token = randomUUID();
  const acquired = await redis.set(key, token, "PX", ttlMs, "NX");
  if (acquired !== "OK") throw new Error("GAME_BUSY");
  try { return await fn(); }
  finally {
    const script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
    await redis.eval(script, 1, key, token);
  }
}
