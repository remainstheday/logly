/*
  Warnings:

  - You are about to drop the column `poster_extension` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `poster_filesize` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `poster_height` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `poster_id` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `poster_mode` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `poster_width` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "poster_extension",
DROP COLUMN "poster_filesize",
DROP COLUMN "poster_height",
DROP COLUMN "poster_id",
DROP COLUMN "poster_mode",
DROP COLUMN "poster_width",
ADD COLUMN     "poster" JSONB;
