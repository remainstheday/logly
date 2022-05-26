/*
  Warnings:

  - You are about to drop the `_Artwork_experiences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Artwork_experiences" DROP CONSTRAINT "_Artwork_experiences_A_fkey";

-- DropForeignKey
ALTER TABLE "_Artwork_experiences" DROP CONSTRAINT "_Artwork_experiences_B_fkey";

-- DropTable
DROP TABLE "_Artwork_experiences";

-- CreateTable
CREATE TABLE "_Artwork_relatedExperiences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Artwork_relatedExperiences_AB_unique" ON "_Artwork_relatedExperiences"("A", "B");

-- CreateIndex
CREATE INDEX "_Artwork_relatedExperiences_B_index" ON "_Artwork_relatedExperiences"("B");

-- AddForeignKey
ALTER TABLE "_Artwork_relatedExperiences" ADD FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artwork_relatedExperiences" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
