import type { Role } from "./game-state.js";

export const ROLE_WEIGHTS: Record<Role, number> = {
  CITIZEN: 50, DETECTIVE: 15, DOCTOR: 15, MAFIA: 15, CALLER: 5
};

export function assignRoles(playerIds: string[]): Record<string, Role> {
  if (playerIds.length < 5) throw new Error("At least 5 players are required");
  const shuffled = [...playerIds].sort(() => Math.random() - 0.5);
  const result: Record<string, Role> = {};
  result[shuffled[0]] = "MAFIA";
  if (shuffled.length >= 6) result[shuffled[1]] = "DETECTIVE";
  if (shuffled.length >= 7) result[shuffled[2]] = "DOCTOR";
  if (shuffled.length >= 8) result[shuffled[3]] = "CALLER";
  for (const id of shuffled) result[id] ??= "CITIZEN";
  return result;
}
