/*
  Warnings:

  - A unique constraint covering the columns `[siteId]` on the table `Artifact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId]` on the table `StaticContent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artifact_siteId_key" ON "Artifact"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_siteId_key" ON "Experience"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Site_siteId_key" ON "Site"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "StaticContent_siteId_key" ON "StaticContent"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "User_siteId_key" ON "User"("siteId");
