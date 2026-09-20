import { describe, expect, it } from "vitest";
import { addPlayer, castVote, createGame, resolveVotes, startGame, transition } from "../../src/game/game-engine.js";

describe("game flow integration", () => {
  it("runs lobby -> night -> day -> voting", () => {
    const state = createGame("integration-game", "chat-1", "p1");
    for (let i = 1; i <= 5; i++) {
      addPlayer(state, { id: `p${i}`, displayName: `Player ${i}`, dmReady: true });
    }

    startGame(state, 600);
    expect(state.phase).toBe("NIGHT");

    transition(state, "DAY");
    transition(state, "VOTING");

    for (const voterId of Object.keys(state.players)) {
      castVote(state, voterId, "p5");
    }

    resolveVotes(state);
    expect(state.players.p5.alive).toBe(false);
    expect(state.votes).toEqual({});
  });
});
