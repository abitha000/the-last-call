import { Bot } from "grammy";
import { env } from "../server/config.js";
export const telegramBot = env.BOT_TOKEN ? new Bot(env.BOT_TOKEN) : null;
