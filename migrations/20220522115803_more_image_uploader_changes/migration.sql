/*
  Warnings:

  - You are about to drop the column `images` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "poster";
