/*
  Warnings:

  - You are about to drop the column `artworkImages` on the `Artifact` table. All the data in the column will be lost.
  - You are about to drop the column `artworkURL` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artifact" DROP COLUMN "artworkImages",
ADD COLUMN     "ArtifactImages" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "artworkURL",
ADD COLUMN     "artifactURL" TEXT NOT NULL DEFAULT E'';
