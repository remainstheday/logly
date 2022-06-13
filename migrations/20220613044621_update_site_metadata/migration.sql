/*
  Warnings:

  - You are about to drop the column `Title` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Site` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "Title",
DROP COLUMN "slug",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Site_url_key" ON "Site"("url");
