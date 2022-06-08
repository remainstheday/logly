/*
  Warnings:

  - You are about to drop the `Object` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Experience_relatedObject` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ArtifactStatusType" AS ENUM ('published', 'draft');

-- DropForeignKey
ALTER TABLE "_Experience_relatedObject" DROP CONSTRAINT "_Experience_relatedObject_A_fkey";

-- DropForeignKey
ALTER TABLE "_Experience_relatedObject" DROP CONSTRAINT "_Experience_relatedObject_B_fkey";

-- DropTable
DROP TABLE "Object";

-- DropTable
DROP TABLE "_Experience_relatedObject";

-- DropEnum
DROP TYPE "ObjectStatusType";

-- CreateTable
CREATE TABLE "Artifact" (
    "id" UUID NOT NULL,
    "status" "ArtifactStatusType" NOT NULL DEFAULT E'draft',
    "title" TEXT NOT NULL DEFAULT E'',
    "artist" TEXT NOT NULL DEFAULT E'',
    "artworkImages" TEXT NOT NULL DEFAULT E'',
    "audioFile" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',
    "qrCodes" JSONB,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Artifact_relatedExperiences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_url_key" ON "Artifact"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_Artifact_relatedExperiences_AB_unique" ON "_Artifact_relatedExperiences"("A", "B");

-- CreateIndex
CREATE INDEX "_Artifact_relatedExperiences_B_index" ON "_Artifact_relatedExperiences"("B");

-- AddForeignKey
ALTER TABLE "_Artifact_relatedExperiences" ADD FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artifact_relatedExperiences" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
