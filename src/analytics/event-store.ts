import { redis } from "../storage/redis.js";
import { eventKey } from "../storage/keys.js";
import type { AnalyticsEvent } from "./events.js";
export async function appendEvent(gameId: string, event: AnalyticsEvent) {
  await redis.rpush(eventKey(gameId), JSON.stringify(event));
}
