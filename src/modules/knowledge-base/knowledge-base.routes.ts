import { Router } from "express";

import * as knowledgeBaseController from "./knowledge-base.controller.js";

const router = Router();

router.post("/", knowledgeBaseController.createKnowledgeBase);

router.get("/", knowledgeBaseController.getKnowledgeBases);

router.get("/:id", knowledgeBaseController.getKnowledgeBaseById);

router.patch("/:id", knowledgeBaseController.updateKnowledgeBase);

router.delete("/:id", knowledgeBaseController.deleteKnowledgeBase);

export default router;
