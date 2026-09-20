import { describe, expect, it } from "vitest";
import { assignRoles } from "../../../src/game/roles.js";

describe("role assignment", () => {
  it("requires at least five players", () => {
    expect(() => assignRoles(["p1", "p2", "p3", "p4"])).toThrow();
  });

  it("assigns exactly one mafia in a five-player game", () => {
    const roles = assignRoles(["p1", "p2", "p3", "p4", "p5"]);
    const mafia = Object.values(roles).filter(role => role === "MAFIA");

    expect(mafia).toHaveLength(1);
  });

  it("assigns every player exactly one role", () => {
    const players = Array.from({ length: 10 }, (_, i) => `p${i + 1}`);
    const roles = assignRoles(players);

    expect(Object.keys(roles)).toHaveLength(players.length);
    expect(Object.keys(roles)).toEqual(expect.arrayContaining(players));
    expect(Object.values(roles).every(Boolean)).toBe(true);
  });

  it("adds detective and doctor roles when player count allows", () => {
    const roles = assignRoles([
      "p1", "p2", "p3", "p4",
      "p5", "p6", "p7"
    ]);

    expect(Object.values(roles)).toContain("MAFIA");
    expect(Object.values(roles)).toContain("DETECTIVE");
    expect(Object.values(roles)).toContain("DOCTOR");
  });

  it("adds the caller role for eight or more players", () => {
    const roles = assignRoles([
      "p1", "p2", "p3", "p4",
      "p5", "p6", "p7", "p8"
    ]);

    expect(Object.values(roles)).toContain("CALLER");
  });
});
