/*
  Warnings:

  - You are about to drop the column `audioFile` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "audioFile",
ADD COLUMN     "audioFile_filename" TEXT,
ADD COLUMN     "audioFile_filesize" INTEGER,
ADD COLUMN     "audioFile_mode" TEXT;
