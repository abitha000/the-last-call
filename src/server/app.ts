import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes.js";
export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({origin:false}));
  app.use(express.json({limit:"64kb"}));
  app.use(router);
  app.use((_req,res) => res.status(404).json({error:"not_found"}));
  app.use((err:any,_req:any,res:any,_next:any) => {
    console.error(err);
    res.status(500).json({error:"internal_error"});
  });
  return app;
}
