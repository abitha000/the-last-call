import type { Request, Response } from "express";
import { registry } from "../analytics/metrics.js";
export async function metrics(_req: Request, res: Response) {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
}
