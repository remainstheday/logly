/*
  Warnings:

  - You are about to drop the column `slug` on the `Experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Experience_slug_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "slug";
