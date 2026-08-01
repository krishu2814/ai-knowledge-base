import prisma from "../../lib/prisma.js";

import type {
  CreateKnowledgeBaseDto,
  UpdateKnowledgeBaseDto,
} from "./knowledge-base.types.js";

// Create knowledge base
export const createKnowledgeBase = async (
  ownerId: string,
  dto: CreateKnowledgeBaseDto,
) => {
  return prisma.knowledgeBase.create({
    data: {
      ...dto,
      ownerId,
    },
  });
};

// Get all knowledge bases of a user
export const getKnowledgeBases = async (ownerId: string) => {
  return prisma.knowledgeBase.findMany({
    where: {
      ownerId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get single knowledge base by id
export const getKnowledgeBaseById = async (id: string, ownerId: string) => {
  return prisma.knowledgeBase.findFirst({
    where: {
      id,
      ownerId,
      deletedAt: null,
    },
  });
};

// Update knowledge base
export const updateKnowledgeBase = async (
  id: string,
  ownerId: string,
  dto: UpdateKnowledgeBaseDto,
) => {
  return prisma.knowledgeBase.updateMany({
    where: {
      id,
      ownerId,
      deletedAt: null,
    },

    data: dto,
  });
};

// Soft delete knowledge base
export const deleteKnowledgeBase = async (id: string, ownerId: string) => {
  return prisma.knowledgeBase.updateMany({
    where: {
      id,
      ownerId,
      deletedAt: null,
    },

    data: {
      deletedAt: new Date(),
    },
  });
};
