import { randomUUID } from "node:crypto";
import type { GameState, EvidenceItem } from "./game-state.js";
export function addEvidence(state: GameState, item: Omit<EvidenceItem, "id"|"createdAt">) {
  state.evidence.push({...item, id: randomUUID(), createdAt: Date.now()});
}
