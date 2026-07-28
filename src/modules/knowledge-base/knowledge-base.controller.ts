import type { Request, Response } from "express";

import * as knowledgeBaseService from "./knowledge-base.service.js";

type IdParams = {
  id: string;
};

export const createKnowledgeBase = async (req: Request, res: Response) => {
  // temp user id
  const ownerId = "user_1";

  const knowledgeBase = await knowledgeBaseService.createKnowledgeBase(
    ownerId,
    req.body,
  );

  res.status(201).json(knowledgeBase);
};

export const getKnowledgeBases = async (req: Request, res: Response) => {
  const ownerId = "user_1";
  const kbs = await knowledgeBaseService.getKnowledgeBases(ownerId);

  res.status(200).json(kbs);
};

export const getKnowledgeBaseById = async (
  req: Request<IdParams>,
  res: Response,
) => {
  const ownerId = "user_1";
  const kb = await knowledgeBaseService.getKnowledgeBaseById(
    req.params.id,
    ownerId,
  );

  res.status(200).json(kb);
};

export const updateKnowledgeBase = async (
  req: Request<IdParams>,
  res: Response,
) => {
  const ownerId = "user_1";
  const kb = await knowledgeBaseService.updateKnowledgeBase(
    req.params.id,
    ownerId,
    req.body,
  );

  res.status(200).json(kb);
};

export const deleteKnowledgeBase = async (
  req: Request<IdParams>,
  res: Response,
) => {
  const ownerId = "user_1";
  await knowledgeBaseService.deleteKnowledgeBase(req.params.id, ownerId);

  res.status(204).send();
};
