import { describe, expect, it } from "vitest";
import {
  addPlayer,
  createGame,
  startGame,
  transition,
  castVote,
  resolveVotes
} from "../../../src/game/game-engine.js";

function lobby() {
  const state = createGame("test-game", "test-chat", "p1");
  for (let i = 1; i <= 5; i++) {
    addPlayer(state, {
      id: `p${i}`,
      displayName: `Player ${i}`,
      username: `player${i}`,
      dmReady: true
    });
  }
  return state;
}

describe("game engine", () => {
  it("creates a lobby", () => {
    const state = lobby();
    expect(state.phase).toBe("LOBBY");
    expect(Object.keys(state.players)).toHaveLength(5);
  });

  it("starts a valid game and assigns roles", () => {
    const state = lobby();
    startGame(state, 600);

    expect(state.phase).toBe("NIGHT");
    expect(state.round).toBe(1);
    expect(Object.values(state.players).every(p => p.role)).toBe(true);
  });

  it("rejects starting with fewer than five players", () => {
    const state = createGame("small", "chat", "p1");
    addPlayer(state, {
      id: "p1",
      displayName: "Player 1",
      dmReady: true
    });

    expect(() => startGame(state)).toThrow("At least 5 players are required");
  });

  it("supports the normal phase transition path", () => {
    const state = lobby();
    startGame(state);

    transition(state, "DAY");
    expect(state.phase).toBe("DAY");

    transition(state, "VOTING");
    expect(state.phase).toBe("VOTING");
  });

  it("rejects invalid phase transitions", () => {
    const state = lobby();
    expect(() => transition(state, "VOTING")).toThrow();
  });

  it("eliminates a player after a majority vote", () => {
    const state = lobby();
    startGame(state);
    transition(state, "DAY");
    transition(state, "VOTING");

    for (const voter of Object.keys(state.players)) {
      castVote(state, voter, "p5");
    }

    resolveVotes(state);
    expect(state.players.p5.alive).toBe(false);
  });
});
