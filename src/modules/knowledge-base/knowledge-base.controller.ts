import type { Response } from "express";

import type { AuthRequest } from "../auth/auth.middleware.js";
import { KnowledgeBaseService } from "./knowledge-base.service.js";
import { ApiError } from "../../utils/ApiError.js";

export class KnowledgeBaseController {
  private readonly knowledgeBaseService: KnowledgeBaseService;

  constructor() {
    this.knowledgeBaseService = new KnowledgeBaseService();
  }

  create = async (req: AuthRequest, res: Response) => {
    const ownerId = req.user!.userId;

    const knowledgeBase = await this.knowledgeBaseService.create(
      ownerId,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: knowledgeBase,
    });
  };

  findAll = async (req: AuthRequest, res: Response) => {
    const ownerId = req.user!.userId;

    const knowledgeBases = await this.knowledgeBaseService.findAll(ownerId);

    res.status(200).json({
      success: true,
      data: knowledgeBases,
    });
  };

  findById = async (req: AuthRequest, res: Response) => {
    const ownerId = req.user!.userId;
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Invalid knowledge base ID");
    }
    const knowledgeBase = await this.knowledgeBaseService.findById(id, ownerId);

    res.status(200).json({
      success: true,
      data: knowledgeBase,
    });
  };

  update = async (req: AuthRequest, res: Response) => {
    const ownerId = req.user!.userId;
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Invalid knowledge base ID");
    }
    const knowledgeBase = await this.knowledgeBaseService.update(
      id,
      ownerId,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: knowledgeBase,
    });
  };

  delete = async (req: AuthRequest, res: Response) => {
    const ownerId = req.user!.userId;
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Invalid knowledge base ID");
    }

    await this.knowledgeBaseService.delete(id, ownerId);

    res.status(204).send();
  };
}
