/*
  Warnings:

  - You are about to drop the column `audioFile_filename` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `audioFile_filesize` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `audioFile_mode` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "audioFile_filename",
DROP COLUMN "audioFile_filesize",
DROP COLUMN "audioFile_mode",
ADD COLUMN     "audioFile" TEXT NOT NULL DEFAULT E'';
