/*
  Warnings:

  - You are about to drop the column `publishDate` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "publishDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);
