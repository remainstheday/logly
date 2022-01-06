/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_Post_tags";

-- CreateTable
CREATE TABLE "Experience" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "status" TEXT DEFAULT E'draft',
    "content" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',
    "publishDate" TIMESTAMP(3),
    "author" UUID,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE INDEX "Experience_author_idx" ON "Experience"("author");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
