/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Artifact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artifact_url_key" ON "Artifact"("url");
