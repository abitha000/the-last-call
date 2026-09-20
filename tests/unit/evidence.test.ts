import { describe, expect, it } from "vitest";
import { createGame } from "../../../src/game/game-engine.js";
import { addEvidence } from "../../../src/game/evidence.js";

describe("evidence", () => {
  it("adds an evidence item with generated identity and timestamp", () => {
    const state = createGame("evidence-game", "chat", "p1");

    addEvidence(state, {
      round: 1,
      type: "OBSERVATION",
      actorId: "p1",
      targetId: "p2",
      text: "Player 2 changed their vote."
    });

    expect(state.evidence).toHaveLength(1);
    expect(state.evidence[0].id).toBeTruthy();
    expect(state.evidence[0].createdAt).toBeTypeOf("number");
  });

  it("preserves evidence metadata", () => {
    const state = createGame("evidence-game-2", "chat", "p1");

    addEvidence(state, {
      round: 2,
      type: "VOTE",
      actorId: "p3",
      targetId: "p4",
      text: "Player 3 voted for Player 4."
    });

    const evidence = state.evidence[0];

    expect(evidence.round).toBe(2);
    expect(evidence.type).toBe("VOTE");
    expect(evidence.actorId).toBe("p3");
    expect(evidence.targetId).toBe("p4");
    expect(evidence.text).toBe("Player 3 voted for Player 4.");
  });

  it("keeps evidence entries append-only", () => {
    const state = createGame("evidence-game-3", "chat", "p1");

    addEvidence(state, {
      round: 1,
      type: "SYSTEM",
      text: "Game started."
    });

    addEvidence(state, {
      round: 1,
      type: "ACTION",
      actorId: "p2",
      targetId: "p3",
      text: "Night action recorded."
    });

    expect(state.evidence).toHaveLength(2);
    expect(state.evidence[0].text).toBe("Game started.");
    expect(state.evidence[1].text).toBe("Night action recorded.");
  });
});
