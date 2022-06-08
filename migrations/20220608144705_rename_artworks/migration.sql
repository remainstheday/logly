/*
  Warnings:

  - You are about to drop the `Artwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Artwork_relatedExperiences` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ObjectStatusType" AS ENUM ('published', 'draft');

-- DropForeignKey
ALTER TABLE "_Artwork_relatedExperiences" DROP CONSTRAINT "_Artwork_relatedExperiences_A_fkey";

-- DropForeignKey
ALTER TABLE "_Artwork_relatedExperiences" DROP CONSTRAINT "_Artwork_relatedExperiences_B_fkey";

-- DropTable
DROP TABLE "Artwork";

-- DropTable
DROP TABLE "_Artwork_relatedExperiences";

-- DropEnum
DROP TYPE "ArtworkStatusType";

-- CreateTable
CREATE TABLE "Object" (
    "id" UUID NOT NULL,
    "status" "ObjectStatusType" NOT NULL DEFAULT E'draft',
    "title" TEXT NOT NULL DEFAULT E'',
    "artist" TEXT NOT NULL DEFAULT E'',
    "artworkImages" TEXT NOT NULL DEFAULT E'',
    "audioFile" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',
    "qrCodes" JSONB,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Experience_relatedObject" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Object_url_key" ON "Object"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_Experience_relatedObject_AB_unique" ON "_Experience_relatedObject"("A", "B");

-- CreateIndex
CREATE INDEX "_Experience_relatedObject_B_index" ON "_Experience_relatedObject"("B");

-- AddForeignKey
ALTER TABLE "_Experience_relatedObject" ADD FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Experience_relatedObject" ADD FOREIGN KEY ("B") REFERENCES "Object"("id") ON DELETE CASCADE ON UPDATE CASCADE;
