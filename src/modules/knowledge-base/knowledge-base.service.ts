import prisma from "../../lib/prisma.js";
import type {
  CreateKnowledgeBaseDto,
  UpdateKnowledgeBaseDto,
} from "./knowledge-base.types.js";

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

export const getKnowledgeBases = async (ownerId: string) => {
  return prisma.knowledgeBase.findMany({
    where: {
      ownerId,
      deletedAt: null,
    },
    orderBy: {
      // in descending order of creation date
      createdAt: "desc",
    },
  });
};

export const getKnowledgeBaseById = async (id: string, ownerId: string) => {
  return prisma.knowledgeBase.findFirst({
    where: {
      id,
      ownerId,
      deletedAt: null,
    },
  });
};

export const updateKnowledgeBase = async (
  id: string,
  ownerId: string,
  dto: UpdateKnowledgeBaseDto,
) => {
  return prisma.knowledgeBase.update({
    where: {
      id,
      ownerId,
      deletedAt: null,
    },
    data: dto,
  });
};
// Soft delete the knowledge base by setting the deletedAt field to the current date and time
export const deleteKnowledgeBase = async (id: string, ownerId: string) => {
  return prisma.knowledgeBase.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
