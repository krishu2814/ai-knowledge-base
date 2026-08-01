import { Router } from "express";

import knowledgeBaseRouter from "../modules/knowledge-base/knowledge-base.routes.js";
import authRouter from "../modules/auth/auth.routes.js";

const router = Router();

// direct to modules
router.use("/knowledge-bases", knowledgeBaseRouter);
router.use("/auth", authRouter);

export default router;
