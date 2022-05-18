/*
  Warnings:

  - You are about to drop the column `museumId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `museumId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Museum` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" ADD COLUMN     "siteId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "museumId",
ADD COLUMN     "siteId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "siteId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "StaticContent" ADD COLUMN     "siteId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "museumId",
ADD COLUMN     "siteId" TEXT NOT NULL DEFAULT E'';

-- DropTable
DROP TABLE "Museum";

-- CreateTable
CREATE TABLE "Site" (
    "id" UUID NOT NULL,
    "Title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);
