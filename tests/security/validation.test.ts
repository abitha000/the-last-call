import { describe, expect, it } from "vitest";
import { gameIdSchema, telegramUserSchema } from "../../src/security/validation.js";

describe("security validation", () => {
  it("accepts safe game identifiers", () => {
    expect(gameIdSchema.parse("game_123-abc")).toBe("game_123-abc");
  });

  it("rejects path traversal and unsafe identifiers", () => {
    expect(() => gameIdSchema.parse("../secret")).toThrow();
    expect(() => gameIdSchema.parse("game/id")).toThrow();
  });

  it("validates Telegram user payloads", () => {
    expect(telegramUserSchema.parse({
      id: 12345,
      first_name: "Player",
      username: "player"
    }).id).toBe(12345);
  });
});
