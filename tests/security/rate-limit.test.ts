import { describe, expect, it } from "vitest";
import { rateLimit } from "../../src/security/rate-limit.js";

describe("rate limiting", () => {
  it("exports the HTTP rate-limit middleware", () => {
    expect(rateLimit).toBeTypeOf("function");
  });

  it("uses the Express middleware contract", () => {
    expect(rateLimit.length).toBe(3);
  });
});
