import { describe, expect, it } from "vitest";
import {
  addPlayer,
  castVote,
  createGame,
  resolveVotes,
  startGame,
  transition
} from "../../../src/game/game-engine.js";

function votingGame() {
  const state = createGame("vote-game", "chat", "p1");

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
  return state;
}

describe("voting", () => {
  it("records a valid vote", () => {
    const state = votingGame();

    castVote(state, "p1", "p2");

    expect(state.votes.p1).toBe("p2");
  });

  it("allows a voter to change their vote", () => {
    const state = votingGame();

    castVote(state, "p1", "p2");
    castVote(state, "p1", "p3");

    expect(state.votes.p1).toBe("p3");
  });

  it("rejects voting outside the voting phase", () => {
    const state = createGame("vote-closed", "chat", "p1");

    expect(() => castVote(state, "p1", "p2")).toThrow("Voting is closed");
  });

  it("rejects votes from dead players", () => {
    const state = votingGame();
    state.players.p1.alive = false;

    expect(() => castVote(state, "p1", "p2")).toThrow();
  });

  it("rejects voting for a dead target", () => {
    const state = votingGame();
    state.players.p2.alive = false;

    expect(() => castVote(state, "p1", "p2")).toThrow();
  });

  it("clears votes after resolution", () => {
    const state = votingGame();

    for (const voter of Object.keys(state.players)) {
      castVote(state, voter, "p5");
    }

    resolveVotes(state);

    expect(Object.keys(state.votes)).toHaveLength(0);
  });
});
