/*
  Warnings:

  - You are about to drop the column `images` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT E'';
