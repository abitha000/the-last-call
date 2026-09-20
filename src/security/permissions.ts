import { env } from "../server/config.js";
export function isAdmin(userId: string | number): boolean {
  return env.ADMIN_IDS.includes(String(userId));
}
