/*
  Warnings:

  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "name",
ADD COLUMN     "relatedArtworkId" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "relatedExperienceId" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT E'';
