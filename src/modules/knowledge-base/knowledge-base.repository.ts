import prisma from "../../lib/prisma.js";
import type { CreateKnowledgeBaseDto } from "./knowledge-base.types.js";

export class KnowledgeBaseRepository {
  async create(data: CreateKnowledgeBaseDto & { ownerId: string }) {
    return prisma.knowledgeBase.create({
      data,
    });
  }

  async findAllByUser(ownerId: string) {
    return prisma.knowledgeBase.findMany({
      where: {
        ownerId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.knowledgeBase.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Partial<CreateKnowledgeBaseDto>) {
    return prisma.knowledgeBase.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.knowledgeBase.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
