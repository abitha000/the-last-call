export function phaseExpired(phaseEndsAt?: number): boolean {
  return Boolean(phaseEndsAt && Date.now() >= phaseEndsAt);
}
