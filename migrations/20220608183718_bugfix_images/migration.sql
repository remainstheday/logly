/*
  Warnings:

  - You are about to drop the column `ArtifactImages` on the `Artifact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artifact" DROP COLUMN "ArtifactImages",
ADD COLUMN     "artifactImages" TEXT NOT NULL DEFAULT E'';
