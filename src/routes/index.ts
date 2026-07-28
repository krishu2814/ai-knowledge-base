import { Router } from "express";

import knowledgeBaseRouter from "../modules/knowledge-base/knowledge-base.routes.js";

const router = Router();

// direct to modules
router.use("/knowledge-bases", knowledgeBaseRouter);

export default router;
