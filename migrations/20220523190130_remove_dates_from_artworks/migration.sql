/*
  Warnings:

  - You are about to drop the column `endDate` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "endDate",
DROP COLUMN "startDate";
