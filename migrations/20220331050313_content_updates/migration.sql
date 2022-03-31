/*
  Warnings:

  - You are about to drop the `_Experience_artworks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Experience_artworks" DROP CONSTRAINT "_Experience_artworks_A_fkey";

-- DropForeignKey
ALTER TABLE "_Experience_artworks" DROP CONSTRAINT "_Experience_artworks_B_fkey";

-- DropTable
DROP TABLE "_Experience_artworks";

-- CreateTable
CREATE TABLE "_Artwork_experiences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Artwork_experiences_AB_unique" ON "_Artwork_experiences"("A", "B");

-- CreateIndex
CREATE INDEX "_Artwork_experiences_B_index" ON "_Artwork_experiences"("B");

-- AddForeignKey
ALTER TABLE "_Artwork_experiences" ADD FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artwork_experiences" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
