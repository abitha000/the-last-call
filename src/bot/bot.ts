import { telegramBot } from "../adapters/telegram.js";
import { registerCommands } from "./commands.js";
import { logger } from "../adapters/logger.js";

export function configureBot() {
  if (!telegramBot) {
    logger.warn("BOT_TOKEN is not configured; bot transport is disabled.");
    return null;
  }
  registerCommands();
  return telegramBot;
}
