import pino from "pino";
import { env } from "../server/config.js";
export const logger = pino({level: env.LOG_LEVEL});
