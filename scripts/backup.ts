import fs from "node:fs/promises";
import { redis } from "../src/storage/redis.js";
const out = process.env.BACKUP_FILE ?? `backups/redis-${Date.now()}.txt`;
await fs.mkdir("backups", {recursive:true});
const keys = await redis.keys("game:*");
const rows = [];
for (const key of keys) {
  const value = await redis.get(key);
  rows.push(JSON.stringify({key,value}));
}
await fs.writeFile(out, rows.join("\n"));
console.log(`Backup written: ${out}`);
