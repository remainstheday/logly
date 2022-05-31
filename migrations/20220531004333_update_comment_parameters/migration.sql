/*
  Warnings:

  - You are about to drop the column `artworkId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `experienceId` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "artworkId",
DROP COLUMN "experienceId",
ADD COLUMN     "artworkURL" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "experienceURL" TEXT NOT NULL DEFAULT E'';
