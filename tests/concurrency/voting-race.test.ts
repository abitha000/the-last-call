import { describe, expect, it } from "vitest";
import {
  addPlayer,
  castVote,
  createGame,
  startGame,
  transition
} from "../../src/game/game-engine.js";

describe("voting race protection", () => {
  it("keeps one canonical vote per voter", () => {
    const state = createGame("race-game", "chat", "p1");

    for (let i = 1; i <= 5; i++) {
      addPlayer(state, {
        id: `p${i}`,
        displayName: `Player ${i}`,
        dmReady: true
      });
    }

    startGame(state);
    transition(state, "DAY");
    transition(state, "VOTING");

    castVote(state, "p1", "p2");
    castVote(state, "p1", "p3");

    expect(state.votes.p1).toBe("p3");
    expect(Object.keys(state.votes)).toHaveLength(1);
  });
});
