export interface CreateKnowledgeBaseDto {
  name: string;
  description?: string;
}

export interface UpdateKnowledgeBaseDto {
  name?: string;
  description?: string;
}
