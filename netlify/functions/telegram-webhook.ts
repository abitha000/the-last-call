import { telegramBot } from "../../src/adapters/telegram.js";
export default async (req: any) => {
  if (!telegramBot) return {statusCode:503, body:JSON.stringify({error:"bot_not_configured"})};
  await telegramBot.handleUpdate(JSON.parse(req.body ?? "{}"));
  return {statusCode:200, body:JSON.stringify({ok:true})};
};
