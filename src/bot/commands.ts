import { randomUUID } from "node:crypto";
import { telegramBot } from "../adapters/telegram.js";
import { createGame, addPlayer, startGame } from "../game/game-engine.js";
import { saveGame } from "../storage/game-repository.js";
import { env } from "../server/config.js";

export function registerCommands() {
  if (!telegramBot) return;
  telegramBot.command("start", ctx => ctx.reply("The Last Call is online. Use /newgame to create a game."));
  telegramBot.command("newgame", async ctx => {
    const id = randomUUID();
    const hostId = String(ctx.from.id);
    const state = createGame(id, String(ctx.chat.id), hostId);
    addPlayer(state, {id: hostId, username: ctx.from.username, displayName: ctx.from.first_name ?? "Host", dmReady: true});
    await saveGame(state);
    await ctx.reply(`Game created.\nID: ${id}\nPlayers: 1\nNeed at least ${env.GAME_MIN_PLAYERS} players.`);
  });
}
