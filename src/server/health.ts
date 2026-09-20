import type { Request, Response } from "express";
import { redis } from "../storage/redis.js";
export async function health(_req: Request, res: Response) {
  try { await redis.ping(); res.json({ok:true, redis:"ok", timestamp:new Date().toISOString()}); }
  catch { res.status(503).json({ok:false, redis:"unavailable"}); }
}
