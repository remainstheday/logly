/*
  Warnings:

  - You are about to drop the column `relatedArtworkId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `relatedExperienceId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `relatedMuseumId` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "relatedArtworkId",
DROP COLUMN "relatedExperienceId",
DROP COLUMN "relatedMuseumId",
ADD COLUMN     "artworkId" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "experienceId" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "museumId" TEXT NOT NULL DEFAULT E'';
