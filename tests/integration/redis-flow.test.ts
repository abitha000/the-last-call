import { describe, expect, it } from "vitest";
import { eventKey, gameKey, lockKey } from "../../src/storage/keys.js";

describe("Redis storage integration", () => {
  it("generates isolated keys for a game", () => {
    expect(gameKey("game-123")).toBe("game:game-123");
    expect(lockKey("game-123")).toBe("game:game-123:lock");
    expect(eventKey("game-123")).toBe("game:game-123:events");
  });

  it("keeps storage namespaces distinct", () => {
    const keys = new Set([gameKey("abc"), lockKey("abc"), eventKey("abc")]);
    expect(keys.size).toBe(3);
  });
});
