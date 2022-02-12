/*
  Warnings:

  - You are about to drop the column `soundcloudUrl` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyUrl` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "soundcloudUrl",
DROP COLUMN "spotifyUrl";
