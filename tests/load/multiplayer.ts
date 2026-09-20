/**
 * Lightweight load-test scenario definition.
 *
 * Run this against a deployed environment with a real load generator.
 * The script intentionally does not create uncontrolled traffic by itself.
 */

export interface MultiplayerLoadProfile {
  concurrentGames: number;
  playersPerGame: number;
  durationSeconds: number;
  requestsPerSecond: number;
}

export const defaultLoadProfile: MultiplayerLoadProfile = {
  concurrentGames: 100,
  playersPerGame: 8,
  durationSeconds: 300,
  requestsPerSecond: 50
};

export function validateLoadProfile(profile: MultiplayerLoadProfile): void {
  if (profile.concurrentGames < 1) throw new Error("concurrentGames must be positive");
  if (profile.playersPerGame < 2) throw new Error("playersPerGame must be at least 2");
  if (profile.durationSeconds < 1) throw new Error("durationSeconds must be positive");
  if (profile.requestsPerSecond < 1) throw new Error("requestsPerSecond must be positive");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateLoadProfile(defaultLoadProfile);
  console.log("Load profile:", defaultLoadProfile);
  console.log("Use this profile with your preferred production load-testing tool.");
}
