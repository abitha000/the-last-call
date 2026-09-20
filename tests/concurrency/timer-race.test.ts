import { describe, expect, it, vi } from "vitest";
import { phaseExpired } from "../../src/game/timers.js";

describe("timer race protection", () => {
  it("reports an expired phase only after its deadline", () => {
    vi.useFakeTimers();
    const now = Date.now();

    expect(phaseExpired(now + 1000)).toBe(false);

    vi.advanceTimersByTime(1000);

    expect(phaseExpired(now + 1000)).toBe(true);
    vi.useRealTimers();
  });

  it("handles an undefined deadline as not expired", () => {
    expect(phaseExpired(undefined)).toBe(false);
  });
});
