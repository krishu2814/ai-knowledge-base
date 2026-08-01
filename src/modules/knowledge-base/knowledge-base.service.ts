import { ApiError } from "../../utils/ApiError.js";
import { KnowledgeBaseRepository } from "./knowledge-base.repository.js";
import type {
  CreateKnowledgeBaseDto,
  UpdateKnowledgeBaseDto,
} from "./knowledge-base.types.js";

export class KnowledgeBaseService {
  private readonly repository: KnowledgeBaseRepository;

  constructor() {
    this.repository = new KnowledgeBaseRepository();
  }

  async create(ownerId: string, dto: CreateKnowledgeBaseDto) {
    return this.repository.create({
      ...dto,
      ownerId,
    });
  }

  async findAll(ownerId: string) {
    return this.repository.findAllByUser(ownerId);
  }

  async findById(id: string, ownerId: string) {
    const knowledgeBase = await this.repository.findById(id);

    if (
      !knowledgeBase ||
      knowledgeBase.ownerId !== ownerId ||
      knowledgeBase.deletedAt
    ) {
      throw new ApiError(404, "Knowledge base not found");
    }

    return knowledgeBase;
  }

  async update(id: string, ownerId: string, dto: UpdateKnowledgeBaseDto) {
    const knowledgeBase = await this.repository.findById(id);

    if (
      !knowledgeBase ||
      knowledgeBase.ownerId !== ownerId ||
      knowledgeBase.deletedAt
    ) {
      throw new ApiError(404, "Knowledge base not found");
    }

    return this.repository.update(id, dto);
  }

  async delete(id: string, ownerId: string) {
    const knowledgeBase = await this.repository.findById(id);

    if (
      !knowledgeBase ||
      knowledgeBase.ownerId !== ownerId ||
      knowledgeBase.deletedAt
    ) {
      throw new ApiError(404, "Knowledge base not found");
    }

    await this.repository.softDelete(id);
  }
}
