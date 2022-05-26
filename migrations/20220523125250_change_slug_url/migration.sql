/*
  Warnings:

  - You are about to drop the column `slug` on the `Experience` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Experience_slug_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "slug",
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Experience_url_key" ON "Experience"("url");
