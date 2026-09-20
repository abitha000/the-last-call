import { createApp } from "./app.js";
import { env } from "./config.js";
import { configureBot } from "../bot/bot.js";
import { logger } from "../adapters/logger.js";
const app = createApp();
app.listen(env.PORT, () => logger.info({port:env.PORT}, "HTTP server started"));
const bot = configureBot();
if (bot && env.WEBHOOK_URL) bot.api.setWebhook(env.WEBHOOK_URL).catch(err => logger.error(err));
