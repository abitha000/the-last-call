import { Router } from "express";
import { isAdmin } from "../security/permissions.js";
export const adminRouter = Router();
adminRouter.get("/health", (req, res) => {
  const id = String(req.header("x-admin-id") ?? "");
  if (!isAdmin(id)) return res.status(403).json({error:"forbidden"});
  res.json({ok:true});
});
