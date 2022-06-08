/*
  Warnings:

  - Made the column `status` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artwork" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "status" SET NOT NULL;
