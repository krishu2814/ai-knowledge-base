import { Router } from "express";

import { KnowledgeBaseController } from "./knowledge-base.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

const knowledgeBaseController = new KnowledgeBaseController();

router.post("/", authMiddleware, asyncHandler(knowledgeBaseController.create));

router.get("/", authMiddleware, asyncHandler(knowledgeBaseController.findAll));

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(knowledgeBaseController.findById),
);

router.patch(
  "/:id",
  authMiddleware,
  asyncHandler(knowledgeBaseController.update),
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(knowledgeBaseController.delete),
);

export default router;
