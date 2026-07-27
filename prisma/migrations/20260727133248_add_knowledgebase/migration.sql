/*
  Warnings:

  - Added the required column `updatedAt` to the `KnowledgeBase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KnowledgeBaseStatus" AS ENUM ('CREATING', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "KnowledgeBase" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "KnowledgeBaseStatus" NOT NULL DEFAULT 'CREATING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
