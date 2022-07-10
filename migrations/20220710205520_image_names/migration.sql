/*
  Warnings:

  - You are about to drop the column `staticPageImages` on the `SiteContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteContent" DROP COLUMN "staticPageImages",
ADD COLUMN     "posterImage" TEXT NOT NULL DEFAULT E'';
