import type { Request, Response } from "express";
import { telegramBot } from "../src/adapters/telegram.js";
export default async function handler(req: Request, res: Response) {
  if (!telegramBot) return res.status(503).json({error:"bot_not_configured"});
  await telegramBot.handleUpdate(req.body);
  res.status(200).json({ok:true});
}
