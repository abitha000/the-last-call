import type { Request, Response, NextFunction } from "express";
import { redis } from "../storage/redis.js";
import { env } from "../server/config.js";

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? "unknown";
  const key = `rl:${ip}:${Math.floor(Date.now()/1000/env.RATE_LIMIT_WINDOW_SECONDS)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, env.RATE_LIMIT_WINDOW_SECONDS);
  if (count > env.RATE_LIMIT_MAX_REQUESTS) return res.status(429).json({error:"rate_limited"});
  next();
}
