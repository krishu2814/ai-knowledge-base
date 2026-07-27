# AI Knowledge Base - System Architecture

> Version: 1.0
>
> Status: Initial Design
>
> Project Type: Production-Ready AI Knowledge Base Backend

---

# 1. Project Overview

## Goal

Build a production-ready AI Knowledge Base that allows users to upload documents, organize them into workspaces and collections, and interact with those documents using Retrieval-Augmented Generation (RAG).

The project is designed to simulate how an AI-powered SaaS application would be built in a real company while remaining beginner-to-intermediate in complexity.

---

# 2. Problem Statement

Modern users store knowledge across many files:

- PDF books
- Research papers
- College notes
- Markdown documentation
- TXT files
- DOCX files

Searching manually through these documents is time-consuming.

Traditional keyword search often fails because it cannot understand semantic meaning.

The goal of this project is to solve that problem by creating a semantic knowledge base powered by Large Language Models and vector search.

---

# 3. Functional Requirements

## Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Tokens
- Protected APIs

---

## Workspace Management

Each user can create multiple workspaces.

Example:

```
College

Research

AI Notes
```

---

## Collections

Each workspace contains collections.

Example

```
College

├── Operating Systems
├── Database
├── Computer Networks
└── AI
```

---

## Documents

Each collection stores:

- PDF
- DOCX
- Markdown
- TXT

Users should be able to

- Upload documents
- Delete documents
- View uploaded documents
- Track processing status

---

## AI Features

- Document processing
- Text chunking
- Embedding generation
- Semantic search
- Chat with documents
- Streaming responses
- Source citations

---

## Search

Users can search across uploaded documents using natural language.

The search should return:

- Relevant chunks
- Similarity score
- Metadata
- Source document

---

# 4. Non-Functional Requirements

- Modular architecture
- Type safety
- Production folder structure
- Layered architecture
- Error handling
- Logging
- API documentation
- Docker support
- Scalable codebase
- Easy to maintain

---

# 5. Technology Stack

## Backend

- Node.js
- TypeScript
- Express.js

---

## Database

- PostgreSQL
- Prisma ORM
- pgvector

---

## AI

- LangChain
- OpenAI / Groq / Gemini
- Embeddings
- RAG

---

## Cache

- Redis

---

## Authentication

- JWT
- Refresh Tokens
- bcrypt

---

## Documentation

- Swagger / OpenAPI

---

## Testing

- Jest
- Supertest

---

## Deployment

- Docker
- Docker Compose

---

# 6. High-Level System Architecture

```
                        React Frontend
                               │
                               │ HTTP
                               ▼
                      Express REST API
                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
      ▼                        ▼                        ▼
 Authentication          Workspace API             AI API
      │                        │                        │
      └────────────────────────┼────────────────────────┘
                               │
                               ▼
                     Business Service Layer
                               │
      ┌───────────────┬─────────┴──────────┬───────────────┐
      ▼               ▼                    ▼               ▼
 PostgreSQL        Redis Cache        AI Provider      Vector Search
                                           │
                         ┌─────────────────┼─────────────────┐
                         ▼                 ▼                 ▼
                      OpenAI             Groq            Gemini
```

---

# 7. Layered Architecture

Every request follows the same flow.

```
Client

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

Database
```

Each layer has one responsibility.

---

## Routes

Responsibilities

- Define API endpoints
- Forward requests to controllers

No business logic.

---

## Controllers

Responsibilities

- Receive request
- Validate request
- Call services
- Return HTTP response

No database queries.

No AI logic.

---

## Services

The heart of the application.

Responsible for

- Business logic
- AI orchestration
- Validation
- Calling repositories
- Calling providers

---

## Repositories

Responsible for database operations only.

Examples

- Create workspace
- Find document
- Save embeddings
- Update metadata

---

## Providers

External services.

Examples

- OpenAI
- Groq
- Gemini

The application communicates only with provider interfaces.

---

# 8. Request Flow

## Upload Document

```
User

↓

Upload File

↓

Express Route

↓

Document Controller

↓

Document Service

↓

Save File

↓

Extract Text

↓

Chunk Text

↓

Generate Embeddings

↓

Store Chunks

↓

Store Embeddings

↓

Success Response
```

---

## Chat Flow

```
User Question

↓

Chat Controller

↓

Chat Service

↓

Generate Query Embedding

↓

Semantic Search

↓

Retrieve Top Chunks

↓

Build Prompt

↓

AI Provider

↓

Streaming Response

↓

Return Sources
```

---

# 9. RAG Pipeline

The Retrieval-Augmented Generation pipeline is the core of the application.

```
Document Upload

↓

Text Extraction

↓

Cleaning

↓

Chunking

↓

Embedding Generation

↓

Vector Storage

↓

Ready for Search
```

When the user asks a question

```
Question

↓

Embedding

↓

Similarity Search

↓

Top Matching Chunks

↓

Prompt Construction

↓

LLM

↓

Streaming Response
```

---

# 10. Folder Structure

```
src/

├── app.ts
├── server.ts
│
├── config/
│
├── routes/
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── middleware/
│
├── providers/
│
├── validators/
│
├── lib/
│
├── utils/
│
├── types/
│
├── constants/
│
└── models/
```

---

# 11. Folder Responsibilities

## config

Application configuration.

Examples

- Environment
- Database
- Redis
- Logger

---

## routes

Maps HTTP routes.

Example

```
POST /auth/login
```

↓

Authentication Controller

---

## controllers

Responsible for request and response.

Should never contain business logic.

---

## services

Contains business logic.

Examples

- Auth Service
- Chat Service
- Document Service
- Workspace Service

---

## repositories

Responsible for database interaction.

Examples

- User Repository
- Workspace Repository
- Document Repository

---

## providers

External integrations.

Examples

```
AIProvider

↓

OpenAIProvider

GroqProvider

GeminiProvider
```

---

## middleware

Reusable request middleware.

Examples

- Authentication
- Error handling
- Logging
- Rate limiting

---

## validators

Request validation.

Examples

- Login validation
- Register validation
- Upload validation

---

## utils

Utility functions.

Examples

- Date helpers
- String helpers
- File helpers

---

## lib

Initialises external libraries.

Examples

- Prisma Client
- Redis Client
- LangChain

---

# 12. AI Provider Architecture

The application should never depend directly on OpenAI.

Instead

```
Application

↓

AI Provider Interface

↓

OpenAI Provider

Groq Provider

Gemini Provider
```

Benefits

- Easy provider switching
- Better testing
- Clean architecture
- Future extensibility

---

# 13. Core Entities

```
User

↓

Workspace

↓

Collection

↓

Document

↓

Chunk

↓

Chat

↓

Message
```

Relationships

```
User

└── Workspaces

      └── Collections

             ├── Documents

             └── Chats
```

---

# 14. API Overview

## Authentication

```
POST /api/v1/auth/register

POST /api/v1/auth/login

POST /api/v1/auth/refresh
```

---

## Workspace

```
GET /api/v1/workspaces

POST /api/v1/workspaces

PATCH /api/v1/workspaces/:id

DELETE /api/v1/workspaces/:id
```

---

## Collections

```
GET /api/v1/collections

POST /api/v1/collections

PATCH /api/v1/collections/:id

DELETE /api/v1/collections/:id
```

---

## Documents

```
POST /api/v1/documents/upload

GET /api/v1/documents

GET /api/v1/documents/:id

DELETE /api/v1/documents/:id
```

---

## Chat

```
POST /api/v1/chat
```

---

# 15. Development Principles

Throughout the project we will follow

- Clean Architecture
- Layered Architecture
- Separation of Concerns
- Single Responsibility Principle
- Interface-based Design
- Type Safety
- Modular Development
- Production-ready Coding Practices
- Conventional Git Commits
- API Versioning

---

# 16. Future Improvements

Possible future enhancements include

- Enterprise RAG
- Multi-tenant organisations
- Background workers
- Hybrid search
- Re-ranking
- Multiple vector databases
- AI agents
- Cost tracking
- Evaluation framework
- Advanced observability

These are intentionally excluded from the current scope to keep this project focused on beginner-to-intermediate production practices.

---

# 17. Project Development Roadmap

```
Planning
    │
    ▼
Architecture
    │
    ▼
Project Setup
    │
    ▼
Authentication
    │
    ▼
Workspace APIs
    │
    ▼
Collection APIs
    │
    ▼
Document Upload
    │
    ▼
Document Processing
    │
    ▼
Embeddings
    │
    ▼
Semantic Search
    │
    ▼
RAG Chat
    │
    ▼
Caching
    │
    ▼
Testing
    │
    ▼
Docker Deployment
```

---

# Document Status

**Version:** 1.0

**Last Updated:** July 2026

**Status:** Initial Architecture Design

**Next Document:** `docs/database-design.md`
