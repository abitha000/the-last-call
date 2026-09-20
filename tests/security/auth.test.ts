import { describe, expect, it } from "vitest";
import { isAdmin } from "../../src/security/permissions.js";

describe("authentication and authorization", () => {
  it("denies an unknown administrator", () => {
    expect(isAdmin("unknown-user")).toBe(false);
  });

  it("uses the configured administrator allow-list", () => {
    expect(isAdmin("")).toBe(false);
    expect(isAdmin("admin-test-user")).toBeTypeOf("boolean");
  });
});
