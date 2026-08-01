import { Router } from "express";

import * as knowledgeBaseController from "./knowledge-base.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, knowledgeBaseController.createKnowledgeBase);

router.get("/", authMiddleware, knowledgeBaseController.getKnowledgeBases);

// router.get(
//   "/:id",
//   authMiddleware,
//   knowledgeBaseController.getKnowledgeBaseById,
// );

// router.patch(
//   "/:id",
//   authMiddleware,
//   knowledgeBaseController.updateKnowledgeBase,
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   knowledgeBaseController.deleteKnowledgeBase,
// );

export default router;
