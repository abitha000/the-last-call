import { redis } from "../src/storage/redis.js";

const CURRENT_SCHEMA_VERSION = 1;
const key = "system:schema-version";
const raw = await redis.get(key);
const currentVersion = raw ? Number.parseInt(raw, 10) : 0;

if (!Number.isInteger(currentVersion) || currentVersion < 0)
  throw new Error(`Invalid schema version: ${raw}`);

if (currentVersion === CURRENT_SCHEMA_VERSION) {
  console.log(`Schema is already at version ${CURRENT_SCHEMA_VERSION}.`);
  await redis.quit();
  process.exit(0);
}

for (let version = currentVersion + 1; version <= CURRENT_SCHEMA_VERSION; version++) {
  switch (version) {
    case 1:
      await redis.set(key, "1");
      console.log("Applied Redis schema migration v1.");
      break;
    default:
      throw new Error(`No migration implementation for version ${version}`);
  }
}

console.log(`Schema migration complete: ${currentVersion} -> ${CURRENT_SCHEMA_VERSION}`);
await redis.quit();
