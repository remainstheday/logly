/*
  Warnings:

  - You are about to drop the column `images_extension` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `images_filesize` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `images_height` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `images_id` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `images_mode` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `images_width` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "images_extension",
DROP COLUMN "images_filesize",
DROP COLUMN "images_height",
DROP COLUMN "images_id",
DROP COLUMN "images_mode",
DROP COLUMN "images_width",
ADD COLUMN     "images" JSONB;
