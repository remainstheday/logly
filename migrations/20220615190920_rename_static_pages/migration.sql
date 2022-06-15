/*
  Warnings:

  - You are about to drop the `StaticContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StaticContent";

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',
    "staticPageImages" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_url_key" ON "SiteContent"("url");

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_siteId_key" ON "SiteContent"("siteId");
