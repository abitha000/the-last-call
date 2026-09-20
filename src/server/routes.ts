import { Router } from "express";
import { health } from "./health.js";
import { metrics } from "./metrics.js";
import { rateLimit } from "../security/rate-limit.js";
import { adminRouter } from "../admin/admin-router.js";
export const router = Router();
router.get("/health", health);
router.get("/metrics", metrics);
router.use("/admin", rateLimit, adminRouter);
