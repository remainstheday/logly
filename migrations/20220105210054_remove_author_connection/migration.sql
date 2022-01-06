/*
  Warnings:

  - You are about to drop the column `author` on the `Experience` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_author_fkey";

-- DropIndex
DROP INDEX "Experience_author_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "author";
