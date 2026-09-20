import { randomUUID } from "node:crypto";
import type { GameState, Phase, Role } from "./game-state.js";
import { assignRoles } from "./roles.js";
import { getWinner } from "./win-conditions.js";

const transitions: Record<Phase, Phase[]> = {
  LOBBY: ["NIGHT", "ENDED"],
  NIGHT: ["DAY", "ENDED"],
  DAY: ["VOTING", "ENDED"],
  VOTING: ["RESOLUTION", "ENDED"],
  RESOLUTION: ["NIGHT", "DAY", "ENDED"],
  ENDED: []
};

export function createGame(id: string, chatId: string, hostId: string): GameState {
  const now = Date.now();
  return {
    id, chatId, hostId, phase: "LOBBY", round: 0, createdAt: now, updatedAt: now,
    players: {}, votes: {}, nightActions: {}, evidence: []
  };
}

export function addPlayer(state: GameState, player: Omit<GameState["players"][string], "role" | "alive" | "joinedAt">) {
  if (state.phase !== "LOBBY") throw new Error("Game is not accepting players");
  if (state.players[player.id]) return state;
  state.players[player.id] = {...player, alive: true, joinedAt: Date.now()};
  state.updatedAt = Date.now();
  return state;
}

export function startGame(state: GameState, seconds = 600): GameState {
  if (state.phase !== "LOBBY") throw new Error("Game already started");
  const ids = Object.keys(state.players);
  if (ids.length < 5) throw new Error("At least 5 players are required");
  const roles = assignRoles(ids);
  for (const id of ids) state.players[id].role = roles[id];
  transition(state, "NIGHT", seconds);
  state.round = 1;
  return state;
}

export function transition(state: GameState, next: Phase, seconds?: number) {
  if (!transitions[state.phase].includes(next)) throw new Error(`Invalid transition ${state.phase} -> ${next}`);
  state.phase = next;
  state.updatedAt = Date.now();
  state.phaseEndsAt = seconds ? Date.now() + seconds * 1000 : undefined;
}

export function castVote(state: GameState, voterId: string, targetId: string) {
  const voter = state.players[voterId], target = state.players[targetId];
  if (state.phase !== "VOTING") throw new Error("Voting is closed");
  if (!voter?.alive || !target?.alive) throw new Error("Only living players can vote");
  state.votes[voterId] = targetId;
  state.updatedAt = Date.now();
}

export function resolveVotes(state: GameState) {
  const counts = new Map<string, number>();
  for (const target of Object.values(state.votes)) counts.set(target, (counts.get(target) ?? 0) + 1);
  const top = [...counts.entries()].sort((a,b) => b[1] - a[1]);
  if (top.length && (top.length === 1 || top[0][1] > top[1][1])) {
    state.players[top[0][0]].alive = false;
    state.evidence.push({id: randomUUID(), round: state.round, type:"VOTE", targetId:top[0][0], text:"Player eliminated by vote.", createdAt:Date.now()});
  }
  state.votes = {};
  const winner = getWinner(state);
  if (winner) { state.winner = winner; state.phase = "ENDED"; }
  else { state.round += 1; transition(state, "NIGHT", 600); }
  state.updatedAt = Date.now();
  return state;
}

export function executeNight(state: GameState) {
  const mafia = Object.values(state.players).find(p => p.role === "MAFIA" && p.alive);
  const targetId = mafia ? state.nightActions[mafia.id] : undefined;
  if (targetId && state.players[targetId]?.alive) state.players[targetId].alive = false;
  state.nightActions = {};
  const winner = getWinner(state);
  if (winner) { state.winner = winner; state.phase = "ENDED"; }
  else transition(state, "DAY", 300);
  state.updatedAt = Date.now();
  return state;
}

export function roleFor(state: GameState, playerId: string): Role | undefined {
  return state.players[playerId]?.role;
}
