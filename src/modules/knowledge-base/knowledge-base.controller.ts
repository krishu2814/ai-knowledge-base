import type { Request, Response } from "express";

import * as knowledgeBaseService from "./knowledge-base.service.js";

type IdParams = {
  id: string;
};

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// Create knowledge base
export const createKnowledgeBase = async (req: AuthRequest, res: Response) => {
  const ownerId = req.user!.userId;

  const knowledgeBase = await knowledgeBaseService.createKnowledgeBase(
    ownerId,
    req.body,
  );

  res.status(201).json({
    success: true,
    data: knowledgeBase,
  });
};

// Get all knowledge bases
export const getKnowledgeBases = async (req: AuthRequest, res: Response) => {
  const ownerId = req.user!.userId;

  const kbs = await knowledgeBaseService.getKnowledgeBases(ownerId);

  res.status(200).json({
    success: true,
    data: kbs,
  });
};

// Get knowledge base by id
export const getKnowledgeBaseById = async (
  req: AuthRequest & Request<IdParams>,
  res: Response,
) => {
  const ownerId = req.user!.userId;

  const kb = await knowledgeBaseService.getKnowledgeBaseById(
    req.params.id,
    ownerId,
  );

  res.status(200).json({
    success: true,
    data: kb,
  });
};

// Update knowledge base
export const updateKnowledgeBase = async (
  req: AuthRequest & Request<IdParams>,
  res: Response,
) => {
  const ownerId = req.user!.userId;

  const kb = await knowledgeBaseService.updateKnowledgeBase(
    req.params.id,
    ownerId,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: kb,
  });
};

// Delete knowledge base
export const deleteKnowledgeBase = async (
  req: AuthRequest & Request<IdParams>,
  res: Response,
) => {
  const ownerId = req.user!.userId;

  await knowledgeBaseService.deleteKnowledgeBase(req.params.id, ownerId);

  res.status(204).send();
};
