/*
  Warnings:

  - The `status` column on the `Artwork` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExperienceStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "ArtworkStatusType" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "status",
ADD COLUMN     "status" "ArtworkStatusType" DEFAULT E'draft';

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "status",
ADD COLUMN     "status" "ExperienceStatusType" DEFAULT E'draft';
