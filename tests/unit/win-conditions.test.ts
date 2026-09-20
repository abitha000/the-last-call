import { describe, expect, it } from "vitest";
import { createGame } from "../../../src/game/game-engine.js";
import { getWinner } from "../../../src/game/win-conditions.js";

function stateWithRoles(roles: Array<"CITIZEN" | "DETECTIVE" | "DOCTOR" | "MAFIA" | "CALLER">) {
  const state = createGame("winner-game", "chat", "p1");

  roles.forEach((role, index) => {
    const id = `p${index + 1}`;
    state.players[id] = {
      id,
      displayName: id,
      role,
      alive: true,
      dmReady: true,
      joinedAt: Date.now()
    };
  });

  return state;
}

describe("win conditions", () => {
  it("returns town when no mafia remain", () => {
    const state = stateWithRoles([
      "CITIZEN",
      "DETECTIVE",
      "DOCTOR",
      "CITIZEN",
      "CITIZEN"
    ]);

    expect(getWinner(state)).toBe("TOWN");
  });

  it("returns mafia when mafia reaches parity with town", () => {
    const state = stateWithRoles([
      "MAFIA",
      "CITIZEN",
      "CITIZEN"
    ]);

    expect(getWinner(state)).toBe("MAFIA");
  });

  it("returns no winner while both sides remain viable", () => {
    const state = stateWithRoles([
      "MAFIA",
      "CITIZEN",
      "DETECTIVE",
      "DOCTOR",
      "CITIZEN"
    ]);

    expect(getWinner(state)).toBeUndefined();
  });

  it("ignores dead players when evaluating the win condition", () => {
    const state = stateWithRoles([
      "MAFIA",
      "CITIZEN",
      "DETECTIVE",
      "DOCTOR"
    ]);

    state.players.p1.alive = false;

    expect(getWinner(state)).toBe("TOWN");
  });

  it("does not automatically award Caller victory merely because Caller is alive", () => {
    const state = stateWithRoles([
      "CALLER",
      "MAFIA",
      "CITIZEN",
      "CITIZEN"
    ]);

    expect(getWinner(state)).toBeUndefined();
  });
});
