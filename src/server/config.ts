import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  BOT_TOKEN: z.string().optional(),
  WEBHOOK_URL: z.string().optional(),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  ADMIN_IDS: z.string().default(""),
  LOG_LEVEL: z.string().default("info"),
  GAME_MIN_PLAYERS: z.coerce.number().default(5),
  GAME_MAX_PLAYERS: z.coerce.number().default(20),
  GAME_DEFAULT_SECONDS: z.coerce.number().default(600),
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().default(60),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60)
});
const parsed = schema.parse(process.env);
export const env = {
  ...parsed,
  ADMIN_IDS: parsed.ADMIN_IDS.split(",").map(x => x.trim()).filter(Boolean)
};
