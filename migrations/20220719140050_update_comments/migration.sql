/*
  Warnings:

  - You are about to drop the column `artifactTitle` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `artifactURL` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `experienceTitle` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `experienceURL` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "artifactTitle",
DROP COLUMN "artifactURL",
DROP COLUMN "experienceTitle",
DROP COLUMN "experienceURL",
ADD COLUMN     "query" JSONB DEFAULT '{}';
