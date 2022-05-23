/*
  Warnings:

  - You are about to drop the column `slug` on the `StaticContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `StaticContent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StaticContent_slug_key";

-- AlterTable
ALTER TABLE "StaticContent" DROP COLUMN "slug",
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "StaticContent_url_key" ON "StaticContent"("url");
