import fs from "node:fs/promises";
import { redis } from "../src/storage/redis.js";
const file = process.env.BACKUP_FILE;
if (!file) throw new Error("BACKUP_FILE is required");
for (const line of (await fs.readFile(file,"utf8")).split("\n").filter(Boolean)) {
  const row = JSON.parse(line);
  await redis.set(row.key, row.value);
}
console.log("Restore complete");
