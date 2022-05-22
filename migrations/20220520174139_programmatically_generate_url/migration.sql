/*
  Warnings:

  - You are about to drop the column `slug` on the `Artwork` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Artwork` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Artwork_slug_key";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "slug",
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_url_key" ON "Artwork"("url");
