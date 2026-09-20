export type Phase = "LOBBY" | "NIGHT" | "DAY" | "VOTING" | "RESOLUTION" | "ENDED";
export type Role = "CITIZEN" | "DETECTIVE" | "DOCTOR" | "MAFIA" | "CALLER";

export interface Player {
  id: string;
  username?: string;
  displayName: string;
  role?: Role;
  alive: boolean;
  dmReady: boolean;
  joinedAt: number;
}

export interface GameState {
  id: string;
  chatId: string;
  phase: Phase;
  round: number;
  createdAt: number;
  updatedAt: number;
  phaseEndsAt?: number;
  hostId: string;
  players: Record<string, Player>;
  votes: Record<string, string>;
  nightActions: Record<string, string>;
  evidence: EvidenceItem[];
  winner?: "TOWN" | "MAFIA" | "CALLER";
}

export interface EvidenceItem {
  id: string;
  round: number;
  type: "OBSERVATION" | "VOTE" | "ACTION" | "SYSTEM";
  actorId?: string;
  targetId?: string;
  text: string;
  createdAt: number;
}
