import { describe, expect, it } from "vitest";
import { withGameLock } from "../../src/storage/lock-manager.js";

describe("distributed game locking", () => {
  it("exports the lock primitive", () => {
    expect(withGameLock).toBeTypeOf("function");
  });

  it("accepts a game id and async critical section", () => {
    expect(withGameLock.length).toBeGreaterThanOrEqual(2);
  });
});
