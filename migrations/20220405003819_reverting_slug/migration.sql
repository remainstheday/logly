/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");
