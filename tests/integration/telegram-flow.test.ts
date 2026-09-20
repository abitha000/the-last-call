import { describe, expect, it } from "vitest";
import { dmReadinessMessage } from "../../src/bot/dm.js";
import { GROUP_COMMANDS } from "../../src/bot/group.js";

describe("Telegram flow integration", () => {
  it("provides a private-chat readiness message", () => {
    expect(dmReadinessMessage()).toContain("private chat");
  });

  it("exposes the core group commands", () => {
    expect(GROUP_COMMANDS).toEqual(
      expect.arrayContaining(["/newgame", "/join", "/startgame", "/vote", "/status"])
    );
  });
});
