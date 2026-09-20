import Redis from "ioredis";
import { env } from "../server/config.js";
export const redis = new Redis(env.REDIS_URL, {maxRetriesPerRequest: 3, enableReadyCheck: true});
