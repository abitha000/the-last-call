import { z } from "zod";
export const telegramUserSchema = z.object({
  id: z.union([z.string(), z.number()]),
  username: z.string().optional(),
  first_name: z.string().optional()
});
export const gameIdSchema = z.string().min(1).max(128).regex(/^[a-zA-Z0-9_-]+$/);
